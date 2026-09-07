import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getAllProjectsAdmin,
  uploadProjectImage,
  uploadProjectVideo,
  getVideoUploadSignature,
} from '../controllers/project.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate, projectSchema } from '../middlewares/validation.middleware.js';
import { uploadSingle, handleMulterError } from '../middlewares/upload.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getProjects);
// Admin route
router.get('/admin/all', protect, getAllProjectsAdmin);


router.get('/video-upload-signature', protect, getVideoUploadSignature);

// Public route
router.get('/:id', getProjectById);

// Admin routes
router.post('/', protect, validate(projectSchema), createProject);
router.patch('/:id', protect, validate(projectSchema), updateProject);
router.delete('/:id', protect, deleteProject);
router.post('/upload-image', protect, uploadSingle('image'), handleMulterError, uploadProjectImage);
router.post('/upload-video', protect, uploadSingle('video'), handleMulterError, uploadProjectVideo);

export default router;