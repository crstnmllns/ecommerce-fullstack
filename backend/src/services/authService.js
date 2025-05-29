import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const signupService = async ({ name, email, password }) => {
  const user = new User({ name, email, password });
  await user.save();
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePwd(password))) {
    const error = new Error('Credenciales inválidas');
    error.status = 400;
    throw error;
  }

  const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '2h' });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  };
};