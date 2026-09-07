import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { projectsAPI } from '../../lib/api.js';

const NewProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    videoUrl: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
  });

  const [techStack, setTechStack] = useState([]);
  const [techInput, setTechInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddTech = () => {
    const tech = techInput.trim();

    if (tech && !techStack.includes(tech)) {
      setTechStack([...techStack, tech]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploadingImage(true);

    try {
      const response = await projectsAPI.uploadImage(file);

      setFormData({
        ...formData,
        image: response.data.data.url,
      });
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploadingVideo(true);

    try {
      // Direct-to-Cloudinary upload avoids Vercel's 4.5MB serverless
      // body limit, which the old projectsAPI.uploadVideo() route hits
      // for anything but very short clips.
      const response = await projectsAPI.uploadVideoDirect(file);

      setFormData({
        ...formData,
        videoUrl: response.data.data.url,
      });
    } catch (err) {
      setError('Failed to upload video');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);

    try {
      const data = {
        ...formData,
        techStack,
      };

      await projectsAPI.create(data);

      navigate('/admin/projects');
    } catch (err) {
      setError(err.message || 'Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            to="/admin/projects"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-5 sm:mb-6"
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            <span>Back to Projects</span>
          </Link>

          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="heading-2 text-2xl sm:text-3xl md:text-4xl">
              Create New Project
            </h1>

            <p className="mt-1 text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
              Add a new project to your portfolio.
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
                placeholder="Project title"
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
                rows={4}
                className="w-full min-w-0 px-3 sm:px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-y"
                placeholder="Short project description"
              />
            </div>

            {/* Cover Image */}
            <div className="card p-4 sm:p-6">
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>

              <div className="flex flex-col sm:flex-row gap-2">
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
                    uploadingImage ? 'opacity-70 pointer-events-none' : ''
                  }`}
                >
                  <Upload className="w-4 h-4 flex-shrink-0" />

                  <span>
                    {uploadingImage ? 'Uploading...' : 'Upload'}
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
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

            {/* Video */}
            <div className="card p-4 sm:p-6">
              <label className="block text-sm font-medium mb-2">
                Demo Video
              </label>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  className="w-full min-w-0 flex-1 px-3 sm:px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  placeholder="Video URL"
                />

                <label
                  className={`cursor-pointer btn-secondary justify-center w-full sm:w-auto ${
                    uploadingVideo ? 'opacity-70 pointer-events-none' : ''
                  }`}
                >
                  <Upload className="w-4 h-4 flex-shrink-0" />

                  <span>
                    {uploadingVideo ? 'Uploading...' : 'Upload'}
                  </span>

                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    disabled={uploadingVideo}
                  />
                </label>
              </div>
            </div>

            {/* Live URL */}
            <div className="card p-4 sm:p-6">
              <label
                htmlFor="liveUrl"
                className="block text-sm font-medium mb-2"
              >
                Live URL
              </label>

              <input
                type="text"
                id="liveUrl"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                className="w-full min-w-0 px-3 sm:px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                placeholder="https://example.com"
              />
            </div>

            {/* GitHub URL */}
            <div className="card p-4 sm:p-6">
              <label
                htmlFor="githubUrl"
                className="block text-sm font-medium mb-2"
              >
                GitHub URL
              </label>

              <input
                type="text"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full min-w-0 px-3 sm:px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                placeholder="https://github.com/username/repo"
              />
            </div>

            {/* Tech Stack */}
            <div className="card p-4 sm:p-6">
              <label className="block text-sm font-medium mb-2">
                Tech Stack
              </label>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTech();
                    }
                  }}
                  className="w-full min-w-0 flex-1 px-3 sm:px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  placeholder="Add a technology"
                />

                <button
                  type="button"
                  onClick={handleAddTech}
                  className="btn-secondary w-full sm:w-auto justify-center"
                >
                  Add
                </button>
              </div>

              {techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs sm:text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-md max-w-full"
                    >
                      <span className="truncate max-w-[180px]">
                        {tech}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="flex-shrink-0 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${tech}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Featured */}
            <div className="card p-4 sm:p-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-zinc-300 dark:border-zinc-700 text-primary-600 focus:ring-primary-500"
                />

                <span className="text-sm font-medium leading-5">
                  Feature this project
                </span>
              </label>
            </div>

            {/* Submit Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate('/admin/projects')}
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
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Create Project</span>
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

export default NewProject;