import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Briefcase,
} from 'lucide-react';
import { postsAPI } from '../../lib/api.js';

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postsAPI.getAdminAll();
        setPosts(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await postsAPI.delete(id);

      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleTogglePublish = async (post) => {
    try {
      // PATCH only the field that is being changed.
      // The admin posts list does not load content/author, so sending
      // the whole post caused validation to fail with HTTP 400.
      const updateData = {
        published: !post.published,
      };

      const updated = await postsAPI.update(post._id, updateData);

      setPosts((prev) =>
        prev.map((p) =>
          p._id === post._id ? updated.data.data : p
        )
      );
    } catch (error) {
      console.error('Failed to toggle publish:', error);
      alert('Failed to toggle publish status. Please try again.');
    }
  };

  const handleToggleFeatured = async (post) => {
    try {
      // PATCH only the field that is being changed.
      // The admin posts list does not load content/author, so sending
      // the whole post caused validation to fail with HTTP 400.
      const updateData = {
        featured: !post.featured,
      };

      const updated = await postsAPI.update(post._id, updateData);

      setPosts((prev) =>
        prev.map((p) =>
          p._id === post._id ? updated.data.data : p
        )
      );
    } catch (error) {
      console.error('Failed to toggle featured:', error);
      alert('Failed to toggle featured status. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"
          aria-label="Loading"
        />
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-10 lg:py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h1 className="heading-2 text-2xl sm:text-3xl break-words">
                Blog Posts
              </h1>

              <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                Manage your blog posts
              </p>
            </div>

            {/* Header Actions */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex items-stretch sm:items-center gap-2 w-full lg:w-auto">
              <Link
                to="/admin/projects"
                className="btn-secondary w-full sm:w-auto justify-center"
              >
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>Projects</span>
              </Link>

              <Link
                to="/admin/posts/new"
                className="btn-primary w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4 shrink-0" />
                <span>New Post</span>
              </Link>
            </div>
          </div>

          {/* Posts */}
          {posts.length > 0 ? (
            <div className="grid gap-3 sm:gap-4">
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="
                    card
                    p-4
                    sm:p-5
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                    min-w-0
                  "
                >
                  {/* Post Information */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="
                        font-semibold
                        text-sm
                        sm:text-base
                        leading-6
                        break-words
                        line-clamp-2
                      "
                    >
                      {post.title}
                    </h3>

                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-x-3
                        gap-y-2
                        mt-2
                        text-xs
                        text-zinc-500
                        dark:text-zinc-400
                      "
                    >
                      <span className="badge badge-primary max-w-full truncate">
                        {post.category || 'Uncategorized'}
                      </span>

                      {post.featured && (
                        <span className="text-amber-600 dark:text-amber-400 whitespace-nowrap">
                          ★ Featured
                        </span>
                      )}

                      {post.published ? (
                        <span className="text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                          Published
                        </span>
                      ) : (
                        <span className="text-zinc-500 whitespace-nowrap">
                          Draft
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className="
                      flex
                      items-center
                      justify-end
                      gap-1
                      flex-shrink-0
                      w-full
                      sm:w-auto
                      border-t
                      sm:border-t-0
                      border-zinc-200
                      dark:border-zinc-800
                      pt-3
                      sm:pt-0
                    "
                  >
                    {/* Feature / Unfeature */}
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(post)}
                      className="
                        p-2.5
                        sm:p-2
                        rounded-lg
                        hover:bg-zinc-100
                        dark:hover:bg-zinc-800
                        transition-colors
                        text-zinc-600
                        dark:text-zinc-400
                        touch-manipulation
                      "
                      aria-label={
                        post.featured ? 'Remove featured' : 'Make featured'
                      }
                      title={
                        post.featured ? 'Remove featured' : 'Make featured'
                      }
                    >
                      {post.featured ? (
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ) : (
                        <StarOff className="w-4 h-4" />
                      )}
                    </button>

                    {/* Publish / Unpublish */}
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(post)}
                      className="
                        p-2.5
                        sm:p-2
                        rounded-lg
                        hover:bg-zinc-100
                        dark:hover:bg-zinc-800
                        transition-colors
                        text-zinc-600
                        dark:text-zinc-400
                        touch-manipulation
                      "
                      aria-label={
                        post.published ? 'Unpublish' : 'Publish'
                      }
                      title={
                        post.published ? 'Unpublish' : 'Publish'
                      }
                    >
                      {post.published ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>

                    {/* Edit */}
                    <Link
                      to={`/admin/posts/${post._id}`}
                      className="
                        p-2.5
                        sm:p-2
                        rounded-lg
                        hover:bg-zinc-100
                        dark:hover:bg-zinc-800
                        transition-colors
                        text-zinc-600
                        dark:text-zinc-400
                        touch-manipulation
                      "
                      aria-label="Edit post"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDelete(post._id)}
                      className="
                        p-2.5
                        sm:p-2
                        rounded-lg
                        hover:bg-red-50
                        dark:hover:bg-red-950/30
                        transition-colors
                        text-red-600
                        dark:text-red-400
                        touch-manipulation
                      "
                      aria-label="Delete post"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div
              className="
                card
                text-center
                px-4
                py-10
                sm:py-12
                text-zinc-500
                dark:text-zinc-400
              "
            >
              <p className="mb-4 text-sm sm:text-base">
                No posts yet.
              </p>

              <Link
                to="/admin/posts/new"
                className="btn-primary inline-flex w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4" />
                Create your first post
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPosts;
