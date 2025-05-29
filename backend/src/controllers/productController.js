import * as productService from '../services/productService.js';

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const list = await productService.getAll();
    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getById(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updated = await productService.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await productService.remove(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    next(err);
  }
};
