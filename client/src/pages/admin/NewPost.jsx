import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { postsAPI, projectsAPI } from '../../lib/api.js';

const NewPost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: '',
    image: '',
    category: '',
    tags: [],
    isCaseStudy: false,
    isDocumentation: false,
    featured: false,
    relatedProject: '',
    published: false,
  });

  const [tagInput, setTagInput] = useState('');
  const [projects, setProjects] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAdminAll();
        setProjects(response.data.data || []);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();

    if (tag && !formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      });

      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

    try {
      const response = await postsAPI.uploadImage(file);

      setFormData({
        ...formData,
        image: response.data.data.url,
      });
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);

    try {
      const data = {
        ...formData,
        tags: formData.tags,
      };

      await postsAPI.create(data);

      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-full py-6 sm:py-8 lg:py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl mx-auto"
        >
          {/* Back */}
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm text-text-muted dark:text-text-muted-dark hover:text-primary transition-colors mb-5 sm:mb-6"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Back to Dashboard</span>
          </Link>

          {/* Heading */}
          <div className="mb-6 sm:mb-8">
            <h1 className="heading-2 mb-2">
              Create New Post
            </h1>

            <p className="text-sm sm:text-base text-text-muted dark:text-text-muted-dark">
              Create and publish a new article, case study, or documentation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

            {/* Error */}
            {error && (
              <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 rounded-xl text-sm">
                ❌ {error}
              </div>
            )}

            {/* Main form wrapper */}
            <div className="space-y-5 sm:space-y-6">

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1.5"
                >
                  Title *
                </label>

                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full min-w-0 px-3.5 sm:px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-card text-text-main dark:text-text-main-dark placeholder:text-text-muted dark:placeholder:text-text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Post title"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1.5"
                >
                  Description *
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  maxLength={300}
                  className="w-full min-w-0 px-3.5 sm:px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-card text-text-main dark:text-text-main-dark placeholder:text-text-muted dark:placeholder:text-text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                  placeholder="Short description (max 300 characters)"
                />

                <div className="mt-1 text-xs text-text-muted dark:text-text-muted-dark text-right">
                  {formData.description.length}/300
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Content *
                </label>

                <div
                  data-color-mode="light"
                  className="w-full min-w-0 overflow-hidden rounded-xl"
                >
                  <MDEditor
                    value={formData.content}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        content: value || '',
                      })
                    }
                    preview="edit"
                    height={400}
                  />
                </div>
              </div>

              {/* Author */}
              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium mb-1.5"
                >
                  Author *
                </label>

                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full min-w-0 px-3.5 sm:px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-card text-text-main dark:text-text-main-dark placeholder:text-text-muted dark:placeholder:text-text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Author name"
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Cover Image
                </label>

                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full min-w-0 flex-1 px-3.5 sm:px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-card text-text-main dark:text-text-main-dark placeholder:text-text-muted dark:placeholder:text-text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Image URL or /assets/path.jpg"
                  />

                  <label
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card text-text-main dark:text-text-main-dark hover:border-primary hover:text-primary transition-colors cursor-pointer shrink-0 ${
                      uploading ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  >
                    <Upload className="w-4 h-4" />

                    <span>
                      {uploading ? 'Uploading...' : 'Upload'}
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>

                {uploading && (
                  <p className="text-sm text-text-muted dark:text-text-muted-dark mt-2">
                    Uploading image...
                  </p>
                )}

                {formData.image && (
                  <div className="mt-3 relative w-full max-w-md">
                    <img
                      src={formData.image}
                      alt="Cover preview"
                      className="w-full h-40 sm:h-48 object-cover rounded-xl border border-border"
                    />
                  </div>
                )}
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-1.5"
                >
                  Category
                </label>

                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full min-w-0 px-3.5 sm:px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-card text-text-main dark:text-text-main-dark placeholder:text-text-muted dark:placeholder:text-text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="e.g., Development, Design, Case Study"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Tags
                </label>

                <div className="flex flex-col xs:flex-row gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="w-full min-w-0 flex-1 px-3.5 sm:px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-card text-text-main dark:text-text-main-dark placeholder:text-text-muted dark:placeholder:text-text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Add a tag"
                  />

                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="btn-secondary w-full xs:w-auto justify-center shrink-0"
                  >
                    Add
                  </button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm bg-primary-tint dark:bg-primary-tint-dark text-primary dark:text-primary-dark rounded-lg border border-primary/10"
                      >
                        <span className="break-all">{tag}</span>

                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-primary/70 hover:text-primary transition-colors shrink-0"
                          aria-label={`Remove ${tag}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Post Type Options */}
              <div className="space-y-3 p-4 sm:p-5 rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card">
                <p className="text-sm font-medium mb-2">
                  Post Options
                </p>

                {/* Case Study */}
                <label
                  htmlFor="isCaseStudy"
                  className="flex items-start gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="isCaseStudy"
                    name="isCaseStudy"
                    checked={formData.isCaseStudy}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary shrink-0"
                  />

                  <span className="text-sm leading-5">
                    This is a Case Study
                  </span>
                </label>

                {/* Documentation */}
                <label
                  htmlFor="isDocumentation"
                  className="flex items-start gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="isDocumentation"
                    name="isDocumentation"
                    checked={formData.isDocumentation}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary shrink-0"
                  />

                  <span className="text-sm leading-5">
                    This is Documentation
                  </span>
                </label>

                {/* Related Project */}
                {(formData.isCaseStudy || formData.isDocumentation) && (
                  <div className="pt-2">
                    <label
                      htmlFor="relatedProject"
                      className="block text-sm font-medium mb-1.5"
                    >
                      Related Project
                    </label>

                    <select
                      id="relatedProject"
                      name="relatedProject"
                      value={formData.relatedProject}
                      onChange={handleChange}
                      className="w-full min-w-0 px-3.5 sm:px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-card text-text-main dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    >
                      <option value="">Select a project</option>

                      {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                          {project.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Featured */}
                <label
                  htmlFor="featured"
                  className="flex items-start gap-3 cursor-pointer pt-1"
                >
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary shrink-0"
                  />

                  <span className="text-sm leading-5">
                    Show in Featured Blog (Home &amp; About pages)
                  </span>
                </label>

                {/* Published */}
                <label
                  htmlFor="published"
                  className="flex items-start gap-3 cursor-pointer pt-1"
                >
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary shrink-0"
                  />

                  <span className="text-sm leading-5">
                    Publish immediately
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="btn-secondary w-full sm:w-auto justify-center"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Create Post
                    </>
                  )}
                </button>
              </div>

            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default NewPost;
