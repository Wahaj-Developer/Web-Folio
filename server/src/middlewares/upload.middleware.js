import multer from 'multer';
import path from 'path';
import { errorResponse } from '../utils/apiResponse.js';

// Configure multer storage (memory storage for Cloudinary)
const storage = multer.memoryStorage();

// File filter
const allowedExtensions = new Set([
  '.jpeg', '.jpg', '.jfif', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff', '.tif',
  '.heic', '.heif', '.avif',
  '.mp4', '.webm', '.mov', '.avi', '.mkv',
]);

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const isImageOrVideoMime = /^image\/|^video\//.test(file.mimetype);
  const isAllowedExt = allowedExtensions.has(ext);

  // Accept if either the mimetype OR the extension clearly indicates an
  // image/video. Browsers/OSes are inconsistent about reporting mimetypes
  // for newer formats (HEIC, AVIF, etc.), so relying on mimetype alone
  // rejects valid files; relying on extension alone can be spoofed but is
  // fine here since files go straight to Cloudinary, not executed.
  if (isImageOrVideoMime || isAllowedExt) {
    return cb(null, true);
  }

  cb(new Error('Only images and videos are allowed'));
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