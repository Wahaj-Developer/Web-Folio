import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isCaseStudy: {
      type: Boolean,
      default: false,
    },
    isDocumentation: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    relatedProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      default: null,
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to set publishedAt
postSchema.pre('save', function (next) {
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  if (!this.published) {
    this.publishedAt = null;
  }
  next();
});

// Index for search
postSchema.index({ title: 'text', description: 'text', content: 'text' });

const Post = mongoose.model('Post', postSchema);

export default Post;