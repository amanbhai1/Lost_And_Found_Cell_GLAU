import nodemailer from 'nodemailer';

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // For local development only
  }
});

// Email sending function
export const sendEmail = async ({ to, subject, text }) => {
  try {
    await transporter.sendMail({
      from: `"Lost & Found System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: `<b>${text}</b>` // Add HTML version
    });
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}; 