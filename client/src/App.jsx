import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './lib/ThemeContext.jsx';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import PageWrapper from './components/PageWrapper.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Pages
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';

// Admin pages
import Login from './pages/admin/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import NewPost from './pages/admin/NewPost.jsx';
import EditPost from './pages/admin/EditPost.jsx';
import AdminPosts from './pages/admin/Posts.jsx';
import AdminProjects from './pages/admin/Projects.jsx';
import NewProject from './pages/admin/NewProject.jsx';
import EditProject from './pages/admin/EditProject.jsx';

function PublicHostingNotice() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('hosting-notice-dismissed');

    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('hosting-notice-dismissed', 'true');
    setVisible(false);
  };

  // Don't show the notice inside the admin panel.
  if (location.pathname.startsWith('/admin') || !visible) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-auto sm:max-w-md">
      <div
        className="
          flex items-start gap-3
          rounded-xl
          border border-zinc-200 dark:border-zinc-800
          bg-white/95 dark:bg-zinc-950/95
          px-4 py-3
          shadow-lg shadow-black/10 dark:shadow-black/30
          backdrop-blur-md
        "
      >
        {/* Icon */}
        <div
          className="
            flex h-8 w-8 shrink-0 items-center justify-center
            rounded-lg
            bg-amber-100 dark:bg-amber-400/10
            text-amber-600 dark:text-amber-400
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
            />
          </svg>
        </div>

        {/* Message */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Small heads-up
          </p>

          <p className="mt-0.5 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
            This portfolio runs on Vercel's free tier, so the backend may
            take a few seconds to respond when waking up.
          </p>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Dismiss notice"
          className="
            shrink-0
            rounded-md
            p-1
            text-zinc-400
            transition-colors
            hover:bg-zinc-100
            hover:text-zinc-700
            dark:hover:bg-zinc-800
            dark:hover:text-zinc-200
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">

          <Navbar />

          {/* Public hosting notice */}
          <PublicHostingNotice />

          <main className="flex-grow pt-16">
            <Routes>

              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                }
              />

              <Route
                path="/about"
                element={
                  <PageWrapper>
                    <About />
                  </PageWrapper>
                }
              />

              <Route
                path="/projects"
                element={
                  <PageWrapper>
                    <Projects />
                  </PageWrapper>
                }
              />

              <Route
                path="/contact"
                element={
                  <PageWrapper>
                    <Contact />
                  </PageWrapper>
                }
              />

              <Route
                path="/blog"
                element={
                  <PageWrapper>
                    <Blog />
                  </PageWrapper>
                }
              />

              <Route
                path="/blog/:slug"
                element={
                  <PageWrapper>
                    <BlogPost />
                  </PageWrapper>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/login"
                element={<Login />}
              />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/posts"
                element={
                  <ProtectedRoute>
                    <AdminPosts />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/posts/new"
                element={
                  <ProtectedRoute>
                    <NewPost />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/posts/:id"
                element={
                  <ProtectedRoute>
                    <EditPost />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/projects"
                element={
                  <ProtectedRoute>
                    <AdminProjects />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/projects/new"
                element={
                  <ProtectedRoute>
                    <NewProject />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/projects/:id"
                element={
                  <ProtectedRoute>
                    <EditProject />
                  </ProtectedRoute>
                }
              />

            </Routes>
          </main>

          <Footer />

        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;