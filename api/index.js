import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// Connect to the database
initDB();

// CORS Configuration: Allow requests only from your frontend URL
const corsOptions = {
  origin: 'https://store-product-management.vercel.app',  // Your frontend URL directly here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Allow credentials if needed
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Billing System API Running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
