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

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.ORIGIN || 'http://localhost:3000,http://localhost:3001')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cookieParser());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS: Origin ${origin} not allowed`));
  },
  methods: ['GET','POST','PUT','PATCH','DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/dashboard', dashboardRoutes);


connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
