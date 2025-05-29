import Product from '../models/Product.js';

export const create = async (data) => {
  const prod = new Product(data);
  return await prod.save();
};

export const getAll = async () => {
  return await Product.find();
};

export const getById = async (id) => {
  return await Product.findById(id);
};

export const update = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id) => {
  return await Product.findByIdAndDelete(id);
};
