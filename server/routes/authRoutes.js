import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, sendOTP } from '../controllers/authController.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', 
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('phone')
      .matches(/^[6-9]\d{9,11}$/)
      .withMessage('Invalid Indian phone number (10-12 digits starting with 6-9)'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/[0-9]/)
      .withMessage('Password must contain at least 1 number'),
    body('course').trim().notEmpty(),
    body('year').trim().notEmpty(),
    body('section').trim().notEmpty()
  ],
  registerUser
);

router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  loginUser
);

router.post('/send-otp', sendOTP);

router.get('/check', (req, res) => {
  const token = req.cookies.authToken;
  
  if (!token) {
    return res.json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      authenticated: true,
      user: {
        id: decoded.userId,
        role: decoded.role
      }
    });
  } catch (error) {
    res.json({ authenticated: false });
  }
});

export const logoutUser = (req, res) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.json({ success: true, message: 'Logged out successfully' });
};

export default router; 