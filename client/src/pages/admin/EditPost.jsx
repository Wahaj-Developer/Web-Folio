import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { postsAPI, projectsAPI } from '../../lib/api.js';

const EditPost = () => {
  const { id } = useParams();
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, projectsRes] = await Promise.all([
          postsAPI.getAdminById(id),
          projectsAPI.getAdminAll(),
        ]);

        const post = postRes.data.data;

        setFormData({
          title: post.title || '',
          description: post.description || '',
          content: post.content || '',
          author: post.author || '',
          image: post.image || '',
          category: post.category || '',
          tags: post.tags || [],
          isCaseStudy: post.isCaseStudy || false,
          isDocumentation: post.isDocumentation || false,
          featured: post.featured || false,
          relatedProject: post.relatedProject?._id || '',
          published: post.published || false,
        });

        setProjects(projectsRes.data.data || []);
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

      await postsAPI.update(id, data);

      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 md:py-12">
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
            className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-5 sm:mb-6"
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            <span>Back to Dashboard</span>
          </Link>

          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="heading-2 text-2xl sm:text-3xl md:text-4xl">
              Edit Post
            </h1>

            <p className="mt-1 text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
              Update your blog post details and content.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Error */}
            {error && (
              <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-lg text-sm break-words">
                ❌ {error}
              </div>
            )}

            {/* Title */}
            <div className="card p-4 sm:p-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium mb-2"
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
                className="w-full min-w-0 px-3 sm:px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                placeholder="Post title"
              />
            </div>

            {/* Description */}
            <div className="card p-4 sm:p-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
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
                className="w-full min-w-0 px-3 sm:px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-y"
                placeholder="Short description (max 300 characters)"
              />

              <p className="text-xs text-zinc-400 mt-1.5 text-right">
                {formData.description.length}/300
              </p>
            </div>

            {/* Content */}
            <div className="card p-4 sm:p-6 overflow-hidden">
              <label className="block text-sm font-medium mb-2">
                Content *
              </label>

              <div
                data-color-mode="light"
                className="w-full max-w-full overflow-hidden"
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
                  className="max-w-full"
                />
              </div>
            </div>

            {/* Author */}
            <div className="card p-4 sm:p-6">
              <label
                htmlFor="author"
                className="block text-sm font-medium mb-2"
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
                className="w-full min-w-0 px-3 sm:px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                placeholder="Author name"
              />
            </div>

            {/* Cover Image */}
            <div className="card p-4 sm:p-6">
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full min-w-0 flex-1 px-3 sm:px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  placeholder="Image URL or /assets/path.jpg"
                />

                <label
                  className={`cursor-pointer btn-secondary justify-center w-full sm:w-auto ${
                    uploading ? 'opacity-70 pointer-events-none' : ''
                  }`}
                >
                  <Upload className="w-4 h-4 flex-shrink-0" />

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

              {formData.image && (
                <div className="mt-4">
                  <p className="text-xs text-zinc-500 mb-2">
                    Preview
                  </p>

                  <div className="relative w-full max-w-md">
                    <img
                      src={formData.image}
                      alt="Cover preview"
                      className="w-full aspect-video object-cover rounded-lg border border-zinc-200 dark:border-zinc-800"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Category */}
            <div className="card p-4 sm:p-6">
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-2"
              >
                Category
              </label>

              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full min-w-0 px-3 sm:px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                placeholder="e.g., Development, Design, Case Study"
              />
            </div>

            {/* Tags */}
            <div className="card p-4 sm:p-6">
              <label className="block text-sm font-medium mb-2">
                Tags
              </label>

              <div className="flex flex-col sm:flex-row gap-2">
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
                  className="w-full min-w-0 flex-1 px-3 sm:px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  placeholder="Add a tag"
                />

                <button
                  type="button"
                  onClick={handleAddTag}
                  className="btn-secondary w-full sm:w-auto justify-center"
                >
                  Add
                </button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs sm:text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-md max-w-full"
                    >
                      <span className="truncate max-w-[180px]">
                        {tag}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="flex-shrink-0 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${tag}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Options */}
            <div className="card p-4 sm:p-6 space-y-4">
              {/* Case Study */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="isCaseStudy"
                  name="isCaseStudy"
                  checked={formData.isCaseStudy}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-zinc-300 dark:border-zinc-700 text-primary-600 focus:ring-primary-500"
                />

                <span className="text-sm font-medium leading-5">
                  This is a Case Study
                </span>
              </label>

              {/* Documentation */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="isDocumentation"
                  name="isDocumentation"
                  checked={formData.isDocumentation}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-zinc-300 dark:border-zinc-700 text-primary-600 focus:ring-primary-500"
                />

                <span className="text-sm font-medium leading-5">
                  This is Documentation
                </span>
              </label>

              {/* Related Project */}
              {(formData.isCaseStudy || formData.isDocumentation) && (
                <div className="pt-2">
                  <label
                    htmlFor="relatedProject"
                    className="block text-sm font-medium mb-2"
                  >
                    Related Project
                  </label>

                  <select
                    id="relatedProject"
                    name="relatedProject"
                    value={formData.relatedProject}
                    onChange={handleChange}
                    className="w-full min-w-0 px-3 sm:px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
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
              <label className="flex items-start gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-zinc-300 dark:border-zinc-700 text-primary-600 focus:ring-primary-500"
                />

                <span className="text-sm font-medium leading-5">
                  Show in Featured Blog (Home &amp; About pages)
                </span>
              </label>

              {/* Published */}
              <label className="flex items-start gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-zinc-300 dark:border-zinc-700 text-primary-600 focus:ring-primary-500"
                />

                <span className="text-sm font-medium leading-5">
                  Published
                </span>
              </label>
            </div>

            {/* Submit Actions */}
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
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditPost;
