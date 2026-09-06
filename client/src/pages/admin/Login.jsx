import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Lock, Mail } from 'lucide-react';
import { login, getAuthStatus } from '../../lib/auth.js';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { authenticated } = await getAuthStatus();

      if (authenticated) {
        navigate('/admin');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-8 sm:px-6 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-primary-100 dark:bg-primary-900/30 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
            <LogIn className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Admin Login
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 px-2">
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Login Card */}
        <div className="card p-5 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1.5"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none"
                />

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full min-h-11 pl-10 pr-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1.5"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none"
                />

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full min-h-11 pl-10 pr-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-lg text-sm break-words">
                ❌ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full min-h-11 btn-primary justify-center text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Small-screen spacing / footer */}
        <p className="text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-500 mt-5 sm:mt-6 px-4">
          Admin access only
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
