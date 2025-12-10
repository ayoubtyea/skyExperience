import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/AuthRoutes.js';
import contactRoutes from './routes/Contact.js';
import reservationRoutes from './routes/Reservations.js';
import flightRoutes from './routes/Flights.js';
import dashboardRoutes from './routes/Dashboard.js';

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.ORIGIN || 'http://localhost:3000,http://localhost:3001')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // In production, also allow Render and Vercel domains for flexibility
    if (process.env.NODE_ENV === 'production') {
      const isRenderDomain = origin.includes('.onrender.com');
      const isVercelDomain = origin.includes('.vercel.app');
      
      if (isRenderDomain || isVercelDomain) {
        console.log(`CORS: Allowing production origin ${origin}`);
        return callback(null, true);
      }
    }
    
    // Log the blocked origin for debugging
    console.warn(`CORS: Blocked origin ${origin}. Allowed origins: ${allowedOrigins.join(', ')}`);
    return callback(new Error(`CORS: Origin ${origin} not allowed`));
  },
  methods: ['GET','POST','PUT','PATCH','DELETE'],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  if (err.message.includes('CORS')) {
    return res.status(403).json({ message: err.message });
  }
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
