import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
              <Route path="/blog/:slug" element={<PageWrapper><BlogPost /></PageWrapper>} />

              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/posts" element={<ProtectedRoute><AdminPosts /></ProtectedRoute>} />
              <Route path="/admin/posts/new" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
              <Route path="/admin/posts/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
              <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
              <Route path="/admin/projects/new" element={<ProtectedRoute><NewProject /></ProtectedRoute>} />
              <Route path="/admin/projects/:id" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;