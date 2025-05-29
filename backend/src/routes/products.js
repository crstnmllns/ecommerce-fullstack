import express from 'express';
import { isAuth } from '../middleware/auth.js';
import * as productCtrl from '../controllers/productController.js';

const router = express.Router();

router.post('/', isAuth, productCtrl.createProduct);
router.get('/', productCtrl.getAllProducts);
router.get('/:id', productCtrl.getProductById);
router.put('/:id', isAuth, productCtrl.updateProduct);
router.delete('/:id', isAuth, productCtrl.deleteProduct);

export default router;
