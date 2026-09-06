import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Mail,
  Plus,
  Eye,
  EyeOff,
  Edit,
  Trash2,
} from 'lucide-react';
import { postsAPI, projectsAPI, contactAPI } from '../../lib/api.js';

const Dashboard = () => {
  const [stats, setStats] = useState({
    posts: { total: 0, published: 0, drafts: 0 },
    projects: { total: 0, featured: 0 },
    messages: 0,
  });

  const [recentPosts, setRecentPosts] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, projectsRes, messagesRes] = await Promise.all([
          postsAPI.getAdminAll({ limit: 5 }),
          projectsAPI.getAdminAll(),
          contactAPI.getAll({ limit: 5 }),
        ]);

        const posts = postsRes.data.data || [];
        const projects = projectsRes.data.data || [];
        const messages = messagesRes.data.data || [];

        const published = posts.filter((p) => p.published).length;
        const drafts = posts.filter((p) => !p.published).length;
        const featured = projects.filter((p) => p.featured).length;

        setStats({
          posts: {
            total: posts.length,
            published,
            drafts,
          },
          projects: {
            total: projects.length,
            featured,
          },
          messages: messagesRes.data.pagination?.total || 0,
        });

        setRecentPosts(posts.slice(0, 5));
        setRecentMessages(messages.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeletePost = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await postsAPI.delete(id);

      setRecentPosts((prev) => prev.filter((p) => p._id !== id));

      setStats((prev) => ({
        ...prev,
        posts: {
          ...prev.posts,
          total: prev.posts.total - 1,
        },
      }));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleTogglePublish = async (post) => {
    try {
      const updated = await postsAPI.update(post._id, {
        published: !post.published,
      });

      const updatedPost = updated.data.data;

      setRecentPosts((prev) =>
        prev.map((p) => (p._id === post._id ? updatedPost : p))
      );

      setStats((prev) => {
        const newPublished = updatedPost.published
          ? prev.posts.published + 1
          : prev.posts.published - 1;

        const newDrafts = updatedPost.published
          ? prev.posts.drafts - 1
          : prev.posts.drafts + 1;

        return {
          ...prev,
          posts: {
            ...prev.posts,
            published: newPublished,
            drafts: newDrafts,
          },
        };
      });
    } catch (error) {
      console.error('Failed to toggle publish:', error);

      alert('Failed to toggle publish status. Please try again.');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await contactAPI.delete(id);

      setRecentMessages((prev) =>
        prev.filter((m) => m._id !== id)
      );

      setStats((prev) => ({
        ...prev,
        messages: Math.max(0, prev.messages - 1),
      }));
    } catch (error) {
      console.error('Failed to delete message:', error);
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
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h1 className="heading-2 flex items-center gap-2 text-2xl sm:text-3xl">
                <LayoutDashboard className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500 flex-shrink-0" />
                <span>Dashboard</span>
              </h1>

              <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                Manage your portfolio content
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
              <Link
                to="/admin/projects/new"
                className="btn-secondary justify-center text-sm sm:text-base px-3 sm:px-4"
              >
                <Plus className="w-4 h-4 flex-shrink-0" />
                <span>New Project</span>
              </Link>

              <Link
                to="/admin/posts/new"
                className="btn-primary justify-center text-sm sm:text-base px-3 sm:px-4"
              >
                <Plus className="w-4 h-4 flex-shrink-0" />
                <span>New Post</span>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Posts */}
            <Link
              to="/admin/posts"
              className="card p-4 sm:p-5 md:p-6 block hover:ring-2 hover:ring-primary-500/40 transition-shadow"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    Total Posts
                  </p>

                  <p className="text-2xl sm:text-3xl font-bold mt-1">
                    {stats.posts.total}
                  </p>
                </div>

                <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-primary-500/30 flex-shrink-0" />
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs">
                <span className="text-emerald-600 dark:text-emerald-400">
                  ✓ {stats.posts.published} published
                </span>

                <span className="text-zinc-500">
                  ✗ {stats.posts.drafts} drafts
                </span>
              </div>
            </Link>

            {/* Projects */}
            <Link
              to="/admin/projects"
              className="card p-4 sm:p-5 md:p-6 block hover:ring-2 hover:ring-primary-500/40 transition-shadow"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    Projects
                  </p>

                  <p className="text-2xl sm:text-3xl font-bold mt-1">
                    {stats.projects.total}
                  </p>
                </div>

                <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-primary-500/30 flex-shrink-0" />
              </div>

              <div className="flex gap-4 mt-3 text-xs">
                <span className="text-amber-600 dark:text-amber-400">
                  ★ {stats.projects.featured} featured
                </span>
              </div>
            </Link>

            {/* Messages */}
            <div className="card p-4 sm:p-5 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    Messages
                  </p>

                  <p className="text-2xl sm:text-3xl font-bold mt-1">
                    {stats.messages}
                  </p>
                </div>

                <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-primary-500/30 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <section>
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="heading-3 text-lg sm:text-xl">
                Recent Posts
              </h2>

              <Link
                to="/admin/posts"
                className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 hover:underline whitespace-nowrap"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-3">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <div
                    key={post._id}
                    className="card p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
                  >
                    {/* Post Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base truncate">
                        {post.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="badge badge-primary max-w-full truncate">
                          {post.category || 'Uncategorized'}
                        </span>

                        {post.published ? (
                          <span className="text-emerald-600 dark:text-emerald-400">
                            Published
                          </span>
                        ) : (
                          <span className="text-zinc-500">
                            Draft
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 self-end sm:self-auto flex-shrink-0">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className="p-2.5 sm:p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
                        aria-label={
                          post.published ? 'Unpublish' : 'Publish'
                        }
                      >
                        {post.published ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>

                      <Link
                        to={`/admin/posts/${post._id}`}
                        className="p-2.5 sm:p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
                        aria-label="Edit post"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="p-2.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-red-600 dark:text-red-400"
                        aria-label="Delete post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-zinc-500 dark:text-zinc-400 text-center py-4 text-sm">
                  No posts yet. Create your first post!
                </p>
              )}
            </div>
          </section>

          {/* Recent Messages */}
          <section>
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="heading-3 text-lg sm:text-xl">
                Recent Messages
              </h2>
            </div>

            <div className="space-y-3">
              {recentMessages.length > 0 ? (
                recentMessages.map((message) => (
                  <div
                    key={message._id}
                    className="card p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4"
                  >
                    {/* Message Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3 min-w-0">
                        <span className="font-semibold text-sm sm:text-base truncate">
                          {message.name}
                        </span>

                        <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 truncate break-all">
                          {message.email}
                        </span>
                      </div>

                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 line-clamp-2 break-words">
                        {message.subject && (
                          <span className="font-medium text-zinc-800 dark:text-zinc-200">
                            {message.subject}:{' '}
                          </span>
                        )}
                        {message.message}
                      </p>

                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteMessage(message._id)}
                      className="p-2.5 sm:p-2 self-end sm:self-start rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-red-600 dark:text-red-400 flex-shrink-0"
                      aria-label="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-zinc-500 dark:text-zinc-400 text-center py-4 text-sm">
                  No messages yet.
                </p>
              )}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
