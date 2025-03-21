import express from 'express';
import nodemailer from 'nodemailer';
import User from '../models/User.js';

const router = express.Router();
const otpStore = new Map();

// Rest of your auth routes code remains the same
// ... (keep all your existing OTP implementation) 