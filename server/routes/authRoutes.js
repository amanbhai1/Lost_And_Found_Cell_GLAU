import express from 'express';
import { body } from 'express-validator';
import { 
  register, 
  loginUser, 
  sendOTP, 
  verifyOtp, 
  resendOtp 
} from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting for OTP requests
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,
  message: 'Too many requests from this IP, please try again later'
});

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
      .matches(/[0-9]/).withMessage('Password needs at least 1 number')
      .matches(/[a-zA-Z]/).withMessage('Password needs at least 1 letter'),
    body('course').trim().notEmpty(),
    body('year').trim().notEmpty(),
    body('section').trim().notEmpty()
  ],
  register
);

router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  loginUser
);

router.post('/send-otp', otpLimiter, sendOTP);
router.post('/verify-otp', otpLimiter, verifyOtp);
router.post('/resend-otp', otpLimiter, resendOtp);

export default router; 