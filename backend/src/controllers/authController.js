import { loginService, signupService } from '../services/authService.js';

export const signup = async (req, res, next) => {
  try {
    await signupService(req.body);
    res.status(201).json({ msg: 'Usuario creado' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { token, user } = await loginService(req.body);
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};