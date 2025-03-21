import User from '../models/User.js';
import Otp from '../models/Otp.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { generateOTP, sendEmail } from '../utils/otpUtils.js';

// Helper function for error responses
const errorResponse = (res, status, message) => {
  return res.status(status).json({ success: false, error: message });
};

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 409, 'User already exists');
    }

    // Create unverified user
    await User.create({ fullName, email, password });

    // Generate and store OTP
    const otp = generateOTP();
    await Otp.create({ email, otp });

    // Send verification email
    await sendEmail({
      to: email,
      subject: 'Email Verification OTP',
      text: `Your verification OTP is: ${otp} (valid for 10 minutes)`
    });

    res.status(201).json({
      success: true,
      message: 'OTP sent to email',
      data: { email }
    });

  } catch (error) {
    errorResponse(res, 500, 'Registration failed');
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find OTP record
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return errorResponse(res, 400, 'OTP expired or invalid');
    }

    // Check attempt limit
    if (otpRecord.attempts >= 3) {
      return errorResponse(res, 429, 'Too many attempts');
    }

    // Verify OTP
    if (otp !== otpRecord.otp) {
      await Otp.updateOne({ email }, { $inc: { attempts: 1 } });
      return errorResponse(res, 400, 'Invalid OTP');
    }

    // Clear OTP after successful verification
    await Otp.deleteOne({ email });

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully'
    });

  } catch (error) {
    errorResponse(res, 500, 'Verification failed');
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    if (user.isVerified) {
      return errorResponse(res, 400, 'Email already verified');
    }

    // Generate new OTP
    const otp = generateOTP();
    await Otp.findOneAndUpdate(
      { email },
      { otp, attempts: 0, createdAt: Date.now() },
      { upsert: true }
    );

    // Resend email
    await sendEmail({
      to: email,
      subject: 'New Verification OTP',
      text: `Your new OTP is: ${otp} (valid for 10 minutes)`
    });

    res.status(200).json({
      success: true,
      message: 'New OTP sent successfully'
    });

  } catch (error) {
    errorResponse(res, 500, 'Failed to resend OTP');
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000 // 1 day
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Server error during login',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate GLA email format
    if (!email.endsWith('@gla.ac.in')) {
      return errorResponse(res, 400, 'Only GLA University emails are allowed');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 409, 'User already registered');
    }

    // Generate and store OTP
    const otp = generateOTP();
    await Otp.findOneAndUpdate(
      { email },
      { otp, attempts: 0, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    // Send email
    await sendEmail({
      to: email,
      subject: 'Verification OTP - Lost & Found System',
      text: `Your verification OTP is: ${otp} (valid for 10 minutes)`
    });

    res.status(200).json({ 
      success: true,
      message: 'OTP sent to email' 
    });
  } catch (error) {
    console.error('OTP send error:', error);
    errorResponse(res, 500, 'Failed to send OTP');
  }
}; 