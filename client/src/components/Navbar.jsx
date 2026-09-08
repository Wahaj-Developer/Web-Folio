import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Sun,
  Moon,
  Home,
  User,
  Briefcase,
  Mail,
  BookOpen,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';

import { useTheme } from '../lib/ThemeContext.jsx';
import { getAuthStatus, logout } from '../lib/auth.js';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const { authenticated } = await getAuthStatus();
      setIsAdmin(authenticated);
    };

    checkAuth();
  }, [location]);

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Give the navbar a subtle elevation once the page has scrolled, so it
  // reads as "floating" over content instead of blending flatly into it.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsAdmin(false);
    setIsOpen(false);
    window.location.href = '/';
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/about', label: 'About', icon: User },
    { to: '/projects', label: 'Projects', icon: Briefcase },
    { to: '/blog', label: 'Blog', icon: BookOpen },
    { to: '/contact', label: 'Contact', icon: Mail },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(path);
  };

  const baseLinkStyles =
    'flex items-center gap-2 rounded-lg text-sm font-medium transition-all duration-200';

  const desktopInactiveStyles =
    'text-text-muted dark:text-text-muted-dark hover:text-text-main dark:hover:text-text-main-dark hover:bg-gray-100 dark:hover:bg-dark-card';

  const desktopActiveTextStyles = 'text-primary dark:text-primary-dark';

  const mobileInactiveStyles =
    'text-text-muted dark:text-text-muted-dark hover:text-text-main dark:hover:text-text-main-dark hover:bg-gray-100 dark:hover:bg-dark-card';

  const mobileActiveStyles =
    'text-primary dark:text-primary-dark bg-primary-tint dark:bg-primary-tint-dark';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md border-b transition-shadow duration-300 ${
        isScrolled
          ? 'border-border dark:border-dark-border shadow-sm shadow-black/5 dark:shadow-black/20'
          : 'border-transparent'
      }`}
    >
      <div className="container">
        {/* Main Navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1.5 text-lg sm:text-xl font-bold text-text-main dark:text-text-main-dark shrink-0 transition-transform duration-200 hover:scale-[1.03]"
          >
            <span className="text-primary dark:text-primary-dark">
              Web|
            </span>
            <span>|Folio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`${baseLinkStyles} relative px-3 xl:px-4 py-2 ${
                  isActive(to)
                    ? desktopActiveTextStyles
                    : desktopInactiveStyles
                }`}
              >
                {isActive(to) && (
                  <motion.span
                    layoutId="navActivePill"
                    className="absolute inset-0 rounded-lg bg-primary-tint dark:bg-primary-tint-dark"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon className="w-4 h-4 shrink-0 relative z-10" />
                <span className="relative z-10">{label}</span>
              </Link>
            ))}

            {/* Admin */}
            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  className={`${baseLinkStyles} relative px-3 xl:px-4 py-2 ${
                    location.pathname.startsWith('/admin')
                      ? desktopActiveTextStyles
                      : desktopInactiveStyles
                  }`}
                >
                  {location.pathname.startsWith('/admin') && (
                    <motion.span
                      layoutId="navActivePill"
                      className="absolute inset-0 rounded-lg bg-primary-tint dark:bg-primary-tint-dark"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <LayoutDashboard className="w-4 h-4 shrink-0 relative z-10" />
                  <span className="relative z-10">Dashboard</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className={`${baseLinkStyles} px-3 xl:px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30`}
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-1 p-2 rounded-lg hover:bg-primary-tint dark:hover:bg-primary-tint-dark transition-colors text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Tablet / Mobile Controls */}
          <div className="flex lg:hidden items-center gap-1">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg hover:bg-primary-tint dark:hover:bg-primary-tint-dark transition-colors text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors text-text-muted dark:text-text-muted-dark"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden border-t border-border dark:border-dark-border overflow-hidden"
            >
              <div className="flex flex-col gap-1 py-3 sm:py-4">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={`${baseLinkStyles} px-4 py-3 ${
                    isActive(to)
                      ? mobileActiveStyles
                      : mobileInactiveStyles
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{label}</span>
                </Link>
              ))}

              {/* Admin Links */}
              {isAdmin && (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className={`${baseLinkStyles} px-4 py-3 ${
                      location.pathname.startsWith('/admin')
                        ? mobileActiveStyles
                        : mobileInactiveStyles
                    }`}
                  >
                    <LayoutDashboard className="w-5 h-5 shrink-0" />
                    <span>Dashboard</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className={`${baseLinkStyles} w-full px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30`}
                  >
                    <LogOut className="w-5 h-5 shrink-0" />
                    <span>Logout</span>
                  </button>
                </>
              )}

              {/* Mobile Theme Button */}
              <button
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className={`${baseLinkStyles} w-full px-4 py-3 text-left text-text-muted dark:text-text-muted-dark hover:text-text-main dark:hover:text-text-main-dark hover:bg-gray-100 dark:hover:bg-dark-card`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 shrink-0" />
                ) : (
                  <Moon className="w-5 h-5 shrink-0" />
                )}

                <span>
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;