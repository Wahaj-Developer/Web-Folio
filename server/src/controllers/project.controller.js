import Project from '../models/Project.js';
import Post from '../models/Post.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import cloudinary from '../config/cloudinary.js';

// Public: Get all projects
export const getProjects = async (req, res, next) => {
  try {
    const { featured } = req.query;

    const query = {};
    if (featured === 'true') {
      query.featured = true;
    }

    const projects = await Project.find(query)
      .sort({ featured: -1, createdAt: -1 });

    // Check if each project has a case study and docs via related posts
    const projectsWithFlags = await Promise.all(
      projects.map(async (project) => {
        let hasCaseStudy = false;
        let hasDocs = false;
        let caseStudySlug = null;
        let docsSlug = null;

        // Find posts linked to this project
        const linkedPosts = await Post.find({
          relatedProject: project._id,
          published: true,
        });

        // Check for case study and documentation posts
        const caseStudyPost = linkedPosts.find(p => p.isCaseStudy === true);
        const docsPost = linkedPosts.find(p => p.isDocumentation === true);

        if (caseStudyPost) {
          hasCaseStudy = true;
          caseStudySlug = caseStudyPost.slug;
        }

        if (docsPost) {
          hasDocs = true;
          docsSlug = docsPost.slug;
        }

        return {
          ...project.toObject(),
          hasCaseStudy,
          hasDocs,
          caseStudySlug,
          docsSlug,
        };
      })
    );

    res.json(successResponse(projectsWithFlags, 'Projects retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

// Public: Get single project
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json(errorResponse('Project not found'));
    }

    let hasCaseStudy = false;
    let hasDocs = false;
    let caseStudySlug = null;
    let docsSlug = null;

    // Find posts linked to this project
    const linkedPosts = await Post.find({
      relatedProject: project._id,
      published: true,
    });

    const caseStudyPost = linkedPosts.find(p => p.isCaseStudy === true);
    const docsPost = linkedPosts.find(p => p.isDocumentation === true);

    if (caseStudyPost) {
      hasCaseStudy = true;
      caseStudySlug = caseStudyPost.slug;
    }

    if (docsPost) {
      hasDocs = true;
      docsSlug = docsPost.slug;
    }

    res.json(successResponse({
      ...project.toObject(),
      hasCaseStudy,
      hasDocs,
      caseStudySlug,
      docsSlug,
    }, 'Project retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

// Admin: Create project
export const createProject = async (req, res, next) => {
  try {
    const { 
      title, 
      description, 
      techStack, 
      image, 
      videoUrl, 
      liveUrl, 
      githubUrl, 
      featured 
    } = req.body;

    const project = await Project.create({
      title,
      description,
      techStack: techStack || [],
      image,
      videoUrl,
      liveUrl,
      githubUrl,
      featured: featured || false,
    });

    res.status(201).json(successResponse(project, 'Project created successfully'));
  } catch (error) {
    next(error);
  }
};

// Admin: Update project
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      techStack, 
      image, 
      videoUrl, 
      liveUrl, 
      githubUrl, 
      featured 
    } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json(errorResponse('Project not found'));
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title: title || project.title,
        description: description || project.description,
        techStack: techStack || project.techStack,
        image: image !== undefined ? image : project.image,
        videoUrl: videoUrl !== undefined ? videoUrl : project.videoUrl,
        liveUrl: liveUrl !== undefined ? liveUrl : project.liveUrl,
        githubUrl: githubUrl !== undefined ? githubUrl : project.githubUrl,
        featured: featured !== undefined ? featured : project.featured,
      },
      { new: true, runValidators: true }
    );

    res.json(successResponse(updatedProject, 'Project updated successfully'));
  } catch (error) {
    next(error);
  }
};

// Admin: Delete project
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json(errorResponse('Project not found'));
    }

    await project.deleteOne();

    res.json(successResponse(null, 'Project deleted successfully'));
  } catch (error) {
    next(error);
  }
};

// Admin: Get all projects (admin)
export const getAllProjectsAdmin = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    // Compute flags for admin view
    const projectsWithFlags = await Promise.all(
      projects.map(async (project) => {
        const linkedPosts = await Post.find({
          relatedProject: project._id,
          published: true,
        });

        const hasCaseStudy = linkedPosts.some(p => p.isCaseStudy === true);
        const hasDocs = linkedPosts.some(p => p.isDocumentation === true);

        return {
          ...project.toObject(),
          hasCaseStudy,
          hasDocs,
        };
      })
    );

    res.json(successResponse(projectsWithFlags, 'Projects retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

// Admin: Upload project image
export const uploadProjectImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json(errorResponse('No file uploaded'));
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio/projects',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    res.json(successResponse({
      url: result.secure_url,
      publicId: result.public_id,
    }, 'Image uploaded successfully'));
  } catch (error) {
    next(error);
  }
};

// Admin: Upload project video
export const uploadProjectVideo = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json(errorResponse('No file uploaded'));
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio/videos',
          resource_type: 'video',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    res.json(successResponse({
      url: result.secure_url,
      publicId: result.public_id,
    }, 'Video uploaded successfully'));
  } catch (error) {
    next(error);
  }
};