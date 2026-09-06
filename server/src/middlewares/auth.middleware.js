import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/apiResponse.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Check for token in Authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json(errorResponse('Not authorized, no token'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = decoded;
      next();
    } catch (error) {
      return res.status(401).json(errorResponse('Not authorized, token invalid'));
    }
  } catch (error) {
    return res.status(401).json(errorResponse('Not authorized'));
  }
};
