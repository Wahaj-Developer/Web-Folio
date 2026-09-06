import express from 'express';
import {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getAllPostsAdmin,
  getPostByIdAdmin,
  uploadPostImage,
} from '../controllers/post.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate, postSchema, postUpdateSchema } from '../middlewares/validation.middleware.js';
import { uploadSingle, handleMulterError } from '../middlewares/upload.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/slug/:slug', getPostBySlug);

// Admin routes
router.get('/admin', protect, getAllPostsAdmin);
router.get('/admin/:id', protect, getPostByIdAdmin);
router.post('/', protect, validate(postSchema), createPost);
router.patch('/:id', protect, validate(postUpdateSchema), updatePost);
router.delete('/:id', protect, deletePost);
router.post('/upload-image', protect, uploadSingle('image'), handleMulterError, uploadPostImage);

export default router;