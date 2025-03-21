import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

dotenv.config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Add security middleware before routes
app.use(helmet());
app.use(mongoSanitize());

// Rate limiting for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', apiLimiter);

// Database Connection
connectDB();

// Add this check after dotenv.config()
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined');
  process.exit(1);
}

// Routes
app.use('/api/auth', authRoutes);

// Add temporary test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 