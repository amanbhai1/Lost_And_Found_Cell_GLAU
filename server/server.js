import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import msal from '@azure/msal-node';
import feedbackRouter from './routes/feedback.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();
const app = express();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['Content-Length', 'Content-Type']
}));

// Add security middleware before routes
app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "http://localhost:5000"]
    }
  }
}));
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


const authCodeUrlParameters = {
  scopes: ["user.read"],
  redirectUri: "",
};

// MSAL Routes
app.get("/msal", (req, res) => {
  const authUrl = pca.getAuthCodeUrl(authCodeUrlParameters);
  res.redirect(authUrl);
});

app.get("/auth-callback", async (req, res) => {
  try {
    const response = await pca.acquireTokenByCode(tokenRequest);
    console.log("Token acquired:", response.accessToken);
    res.redirect("/home");
  } catch (error) {
    console.log("Error during token acquisition:", error);
    res.status(500).send("Error during token acquisition.");
  }
});

// Multer Storage Configurations
const foundItemStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './foundItemImages');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, 'image-' + uniqueSuffix + extname);
  },
});

const lostItemStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './lostItemImages');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, 'image-' + uniqueSuffix + extname);
  },
});

const foundItemUpload = multer({ 
  storage: foundItemStorage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  }
});

const lostItemUpload = multer({ 
  storage: lostItemStorage,
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});

// Models
const FoundItem = mongoose.model('FoundItem', new mongoose.Schema({
  description: String,
  date: String,
  category: String,
  subcategory: String,
  itemName: String,
  place: String,
  ownerName: String,
  details: String,
  isIdentifiable: Boolean,
  images: [String],
}, { collection: 'foundItem' }));

const LostItem = mongoose.model('LostItem', new mongoose.Schema({
  description: String,
  date: String,
  phone: String,
  name: String,
  sapId: String,
  category: String,
  subcategory: String,
  itemName: String,
  images: [String],
  place: String,
}, { collection: 'lostItem' }));

const CollectedItem = mongoose.model('CollectedItem', new mongoose.Schema({
  description: String,
  date: String,
  category: String,
  subcategory: String,
  itemName: String,
  place: String,
  ownerName: String,
  details: String,
  isIdentifiable: Boolean,
  images: [String],
  name: String,
  email: String,
  sapId: String,
  branch: String,
  year: String,
  contactNumber: String,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/feedback', feedbackRouter);

// Item Routes
app.post('/api/submitFoundItem', foundItemUpload.array('images', 6), async (req, res) => {
  try {
    const images = req.files.map(file => file.filename);
    
    const foundItem = new FoundItem({
      ...req.body,
      images: images
    });

    await foundItem.save();
    
    res.status(201).json({
      success: true,
      message: 'Found item submitted successfully',
      data: foundItem
    });
    
  } catch (error) {
    console.error('Error submitting found item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit found item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.post('/api/submitLostItem', lostItemUpload.array('images', 6), async (req, res) => {
  try {
    // Get uploaded files
    const images = req.files.map(file => file.filename);
    
    // Create new lost item with images array
    const lostItem = new LostItem({
      ...req.body,
      images: images
    });

    await lostItem.save();
    
    res.status(201).json({
      success: true,
      message: 'Lost item report submitted successfully',
      data: lostItem
    });
    
  } catch (error) {
    console.error('Error submitting lost item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit lost item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/getAllItems', async (req, res) => {
  try {
    const items = await FoundItem.find();
    res.json({
      success: true,
      data: items.map(item => ({
        ...item._doc,
        images: item.images.map(img => `/foundItemImages/${img}`)
      }))
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ 
      success: false,
      error: "Error fetching items" 
    });
  }
});

app.get('/getLostItems', async (req, res) => {
  try {
    const items = await LostItem.find();
    res.json({
      success: true,
      data: items.map(item => ({
        ...item._doc,
        images: item.images.map(img => `/lostItemImages/${img}`)
      }))
    });
  } catch (error) {
    console.error("Error fetching lost items:", error);
    res.status(500).json({ 
      success: false,
      error: "Error fetching lost items" 
    });
  }
});

app.post('/claimItem/:id', async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

    const collectedItem = new CollectedItem({
      ...item.toObject(),
      ...req.body,
      images: item.images
    });

    await collectedItem.save();
    await FoundItem.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Item claimed successfully',
      data: collectedItem
    });
    
  } catch (error) {
    console.error('Error claiming item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to claim item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Add this route before the static files section
app.get('/api/getItemDetails/:id', async (req, res) => {
  try {
    // Check both collections with proper error handling
    const foundItem = await FoundItem.findById(req.params.id).lean();
    if (foundItem) {
      return res.json({
        success: true,
        item: {
          ...foundItem,
          type: 'found',
          images: foundItem.images.map(img => `/foundItemImages/${img}`),
          location: foundItem.place,
          contactInfo: foundItem.ownerName || 'Not provided'
        }
      });
    }

    const lostItem = await LostItem.findById(req.params.id).lean();
    if (lostItem) {
      return res.json({
        success: true,
        item: {
          ...lostItem,
          type: 'lost',
          images: lostItem.images.map(img => `/lostItemImages/${img}`),
          location: lostItem.place,
          contactInfo: `Name: ${lostItem.name}, Phone: ${lostItem.phone}`
        }
      });
    }

    res.status(404).json({ 
      success: false,
      message: 'Item not found' 
    });

  } catch (error) {
    console.error("Error fetching item details:", error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Static Files
app.use('/foundItemImages', express.static(join(__dirname, 'foundItemImages')));
app.use('/lostItemImages', express.static(join(__dirname, 'lostItemImages')));

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 