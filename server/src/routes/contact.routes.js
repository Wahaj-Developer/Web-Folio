import express from 'express';
import {
  sendContactMessage,
  getContactMessages,
  deleteContactMessage,
  getContactMessageCount,
} from '../controllers/contact.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate, contactSchema } from '../middlewares/validation.middleware.js';
import { rateLimit } from 'express-rate-limit';

const router = express.Router();

// Rate limiting for contact
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per window
  message: 'Too many contact messages, please try again later',
});

router.post('/', contactLimiter, validate(contactSchema), sendContactMessage);

// Admin routes
router.get('/', protect, getContactMessages);
router.delete('/:id', protect, deleteContactMessage);
router.get('/count', protect, getContactMessageCount);

export default router;
