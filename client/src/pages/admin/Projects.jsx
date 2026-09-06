import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Star,
  StarOff,
} from 'lucide-react';
import { projectsAPI } from '../../lib/api.js';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAdminAll();
        setProjects(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAPI.delete(id);

      setProjects((prev) =>
        prev.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const handleToggleFeatured = async (project) => {
    try {
      const updated = await projectsAPI.update(project._id, {
        ...project,
        featured: !project.featured,
      });

      setProjects((prev) =>
        prev.map((p) =>
          p._id === project._id ? updated.data.data : p
        )
      );
    } catch (error) {
      console.error('Failed to toggle featured:', error);
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
    <div className="py-8 sm:py-10 md:py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5 sm:space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Projects
              </h1>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
                Manage your portfolio projects
              </p>
            </div>

            <Link
              to="/admin/projects/new"
              className="btn-primary w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4" />
              New Project
            </Link>
          </div>

          {/* Projects */}
          {projects.length > 0 ? (
            <div className="grid gap-3 sm:gap-4">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="card p-4 sm:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  {/* Project Info */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    {/* Image */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl sm:text-2xl font-bold text-zinc-400">
                          {project.title?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base truncate">
                        {project.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        <span>
                          {project.techStack?.length || 0} technologies
                        </span>

                        {project.featured && (
                          <span className="text-amber-600 dark:text-amber-400">
                            ★ Featured
                          </span>
                        )}

                        {project.hasCaseStudy && (
                          <span className="text-emerald-600 dark:text-emerald-400">
                            📄 Has Case Study
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 self-end md:self-auto flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(project)}
                      className="p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
                      aria-label={
                        project.featured
                          ? 'Remove featured'
                          : 'Make featured'
                      }
                      title={
                        project.featured
                          ? 'Remove featured'
                          : 'Make featured'
                      }
                    >
                      {project.featured ? (
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ) : (
                        <StarOff className="w-4 h-4" />
                      )}
                    </button>

                    <Link
                      to={`/admin/projects/${project._id}`}
                      className="p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
                      aria-label={`Edit ${project.title}`}
                      title="Edit project"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(project._id)}
                      className="p-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-red-600 dark:text-red-400"
                      aria-label={`Delete ${project.title}`}
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-10 sm:py-12 px-4 text-zinc-500 dark:text-zinc-400">
              <p className="mb-4 text-sm sm:text-base">
                No projects yet.
              </p>

              <Link
                to="/admin/projects/new"
                className="btn-primary inline-flex w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4" />
                Create your first project
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProjects;