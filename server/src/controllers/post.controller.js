import Post from '../models/Post.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { generateUniqueSlug } from '../utils/slugify.js';
import cloudinary from '../config/cloudinary.js';

// Public: Get all published posts
export const getPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      tag,
      isCaseStudy,
      featured,
    } = req.query;

    const query = { published: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    if (tag) {
      query.tags = tag;
    }

    if (isCaseStudy !== undefined) {
      query.isCaseStudy = isCaseStudy === 'true';
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Post.countDocuments(query);

    const posts = await Post.find(query)
     .select('title slug description content image category tags publishedAt isCaseStudy isDocumentation')
      .sort({ featured: -1, publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('relatedProject', 'title slug');

    // Calculate reading time for each post
    const postsWithReadingTime = posts.map(post => {
      const content = post.content || '';
      const wordsPerMinute = 200;
      const words = content.split(/\s+/).length;
      const readingTime = Math.ceil(words / wordsPerMinute);
      return {
        ...post.toObject(),
        readingTime: readingTime || 1,
      };
    });

    res.json(successResponse(
      postsWithReadingTime,
      'Posts retrieved successfully',
      {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      }
    ));
  } catch (error) {
    next(error);
  }
};

// Public: Get single post by slug
export const getPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOne({ slug, published: true })
      .populate('relatedProject', 'title slug description image');

    if (!post) {
      return res.status(404).json(errorResponse('Post not found'));
    }

    // Calculate reading time
    const words = post.content.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200) || 1;

    // Get related posts
    const relatedPosts = await Post.find({
      _id: { $ne: post._id },
      published: true,
      $or: [
        { category: post.category },
        { tags: { $in: post.tags } },
      ],
    })
      .select('title slug description image publishedAt')
      .limit(3)
      .sort({ publishedAt: -1 });

    // Get previous and next posts
    const [prevPost] = await Post.find({
      published: true,
      publishedAt: { $lt: post.publishedAt },
    })
      .sort({ publishedAt: -1 })
      .limit(1)
      .select('title slug');

    const [nextPost] = await Post.find({
      published: true,
      publishedAt: { $gt: post.publishedAt },
    })
      .sort({ publishedAt: 1 })
      .limit(1)
      .select('title slug');

    res.json(successResponse({
      ...post.toObject(),
      readingTime,
      relatedPosts,
      prevPost,
      nextPost,
    }, 'Post retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

// Admin: Create post
export const createPost = async (req, res, next) => {
  try {
    const { 
      title, 
      description, 
      content, 
      author, 
      image, 
      category, 
      tags, 
      isCaseStudy,
      isDocumentation,
      featured,
      relatedProject, 
      published 
    } = req.body;

    const slug = await generateUniqueSlug(Post, title);

    const post = await Post.create({
      title,
      slug,
      description,
      content,
      author,
      image,
      category,
      tags: tags || [],
      isCaseStudy: isCaseStudy || false,
      isDocumentation: isDocumentation || false,
      featured: featured || false,
      relatedProject: relatedProject || null,
      published: published || false,
    });

    res.status(201).json(successResponse(post, 'Post created successfully'));
  } catch (error) {
    next(error);
  }
};

// Admin: Update post
export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      content, 
      author, 
      image, 
      category, 
      tags, 
      isCaseStudy,
      isDocumentation,
      featured,
      relatedProject, 
      published 
    } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json(errorResponse('Post not found'));
    }

    // Generate new slug if title changed
    let slug = post.slug;
    if (title && title !== post.title) {
      slug = await generateUniqueSlug(Post, title, id);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title: title || post.title,
        slug,
        description: description || post.description,
        content: content || post.content,
        author: author || post.author,
        image: image !== undefined ? image : post.image,
        category: category !== undefined ? category : post.category,
        tags: tags || post.tags,
        isCaseStudy: isCaseStudy !== undefined ? isCaseStudy : post.isCaseStudy,
        isDocumentation: isDocumentation !== undefined ? isDocumentation : post.isDocumentation,
        featured: featured !== undefined ? featured : post.featured,
        relatedProject: relatedProject !== undefined ? relatedProject : post.relatedProject,
        published: published !== undefined ? published : post.published,
      },
      { new: true, runValidators: true }
    );

    res.json(successResponse(updatedPost, 'Post updated successfully'));
  } catch (error) {
    next(error);
  }
};

// Admin: Delete post
export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json(errorResponse('Post not found'));
    }

    await post.deleteOne();

    res.json(successResponse(null, 'Post deleted successfully'));
  } catch (error) {
    next(error);
  }
};

// Admin: Get all posts (including drafts)
export const getAllPostsAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const query = {};
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Post.countDocuments(query);

    const posts = await Post.find(query)
      .select('title slug description image category tags published isCaseStudy isDocumentation featured publishedAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('relatedProject', 'title');

    res.json(successResponse(
      posts,
      'Posts retrieved successfully',
      {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      }
    ));
  } catch (error) {
    next(error);
  }
};

// Admin: Get single post (including drafts)
export const getPostByIdAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate('relatedProject', 'title slug');

    if (!post) {
      return res.status(404).json(errorResponse('Post not found'));
    }

    res.json(successResponse(post, 'Post retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

// Admin: Upload post image
export const uploadPostImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json(errorResponse('No file uploaded'));
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio/posts',
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