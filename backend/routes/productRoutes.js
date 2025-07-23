import express from 'express';
const router = express.Router();
import authenticate from '../middleware/authMiddleware.js';
import { createProduct,getAllProduct,getSingleProduct,deleteProduct,updateProduct } from '../controller/productController.js';

router.post('/', authenticate,createProduct );

router.get('/', authenticate,getAllProduct )

router.get('/:id', authenticate,getSingleProduct );

router.delete('/:id', authenticate,deleteProduct)

router.put('/:id',authenticate,updateProduct)

export default router;

