import { z } from 'zod';
import { errorResponse } from '../utils/apiResponse.js';

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
        return res.status(400).json(errorResponse(errors.join(', ')));
      }
      next(error);
    }
  };
};

// Validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  author: z.string().min(2, 'Author name is required'),
  image: z.string().optional().nullable(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isCaseStudy: z.boolean().optional(),
  isDocumentation: z.boolean().optional(),
  featured: z.boolean().optional(),
  relatedProject: z.string().optional().nullable(),
  published: z.boolean().optional(),
});

// Used for PATCH updates: every field is optional since only changed
// fields (e.g. just `published` when toggling publish state) are sent.
export const postUpdateSchema = postSchema.partial();

export const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  techStack: z.array(z.string()).min(1, 'At least one technology is required'),
  image: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  liveUrl: z.string().url('Invalid URL').optional().nullable(),
  githubUrl: z.string().url('Invalid URL').optional().nullable(),
  featured: z.boolean().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  subject: z.string().optional(),
  email: z.string().email('Invalid email format'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});