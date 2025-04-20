import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productControllers.js';
import authenticateJWT from '../middleware/authMiddleware.js'; // Import the JWT auth middleware

const router = express.Router();

// Protect the routes that need authentication
router.post('/', authenticateJWT, createProduct);
router.get('/', authenticateJWT, getAllProducts);
router.get('/:id', authenticateJWT, getProductById);
router.put('/:id', authenticateJWT, updateProduct);
router.delete('/:id', authenticateJWT, deleteProduct);

export default router;
