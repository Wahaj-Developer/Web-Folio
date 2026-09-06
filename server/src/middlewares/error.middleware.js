import { errorResponse } from '../utils/apiResponse.js';

const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json(errorResponse(errors.join(', ')));
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json(errorResponse(`${field} already exists`));
  }

  // Multer error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json(errorResponse('File too large. Max size is 5MB'));
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json(errorResponse('Invalid token'));
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  return res.status(statusCode).json(errorResponse(message));
};

export default errorMiddleware;
