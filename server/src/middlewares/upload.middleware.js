import multer from 'multer';
import path from 'path';
import { errorResponse } from '../utils/apiResponse.js';

// Configure multer storage (memory storage for Cloudinary)
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm|mov|avi/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed'));
  }
};

// Create multer upload instance
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  fileFilter,
});

// Middleware for single file upload
export const uploadSingle = (fieldName) => {
  return upload.single(fieldName);
};

// Middleware for multiple files
export const uploadMultiple = (fieldName, maxCount) => {
  return upload.array(fieldName, maxCount);
};

// Error handler for multer
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json(errorResponse('File too large. Max size is 5MB'));
    }
    return res.status(400).json(errorResponse(err.message));
  }
  if (err) {
    return res.status(400).json(errorResponse(err.message));
  }
  next();
};
