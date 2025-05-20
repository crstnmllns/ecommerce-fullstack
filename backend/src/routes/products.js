import express from 'express';
import Product from '../models/Product.js';
import { isAuth } from '../middleware/auth.js';
const router = express.Router();

// Crear producto (protegido)
router.post('/', isAuth, async (req, res) => {
  const prod = new Product(req.body);
  const saved = await prod.save();
  res.status(201).json(saved);
});

// Leer todos
router.get('/', async (req, res) => {
  const list = await Product.find();
  res.json(list);
});

// Leer uno
router.get('/:id', async (req, res) => {
  const prod = await Product.findById(req.params.id);
  res.json(prod);
});

// Actualizar (protegido)
router.put('/:id', isAuth, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Eliminar (protegido)
router.delete('/:id', isAuth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Producto eliminado' });
});

export default router;
