import express from 'express';
const router = express.Router();
import authenticate from '../middleware/authMiddleware.js';
import { createSuppliers,getAllSuppliers,getSuppplierById,updateSupplier,deleteSupplier } from '../controller/supplierController.js';


router.post('/', authenticate,createSuppliers)

router.get('/',authenticate,getAllSuppliers )

router.get('/:id',authenticate,getSuppplierById )

router.put('/:id',authenticate,updateSupplier )

router.delete('/:id',authenticate,deleteSupplier)

export default router;