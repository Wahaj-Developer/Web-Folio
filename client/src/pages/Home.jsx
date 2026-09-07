import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react';

import SEO from '../components/SEO.jsx';
import SkillsSection from '../components/SkillsSection.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import PostCard from '../components/PostCard.jsx';
import AudienceRecommendation from '../components/AudienceRecommendation.jsx';
import { projectsAPI, postsAPI } from '../lib/api.js';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll({ featured: true });
        setFeaturedProjects(response.data.data.slice(0, 2));
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postsAPI.getAll({ featured: true, limit: 2 });
        setFeaturedPosts(response.data.data.slice(0, 2));
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <SEO title="Home | Dev Portfolio" />

      <AudienceRecommendation />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="py-10 sm:py-14 md:py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5 sm:space-y-6 text-center md:text-left"
            >
              <div className="space-y-2.5 sm:space-y-3">
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                  Hi, I'm{' '}
                  <span className="text-primary dark:text-primary-dark">
                    Wahaj Ahmed
                  </span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-text-muted dark:text-text-muted-dark font-medium">
                  MERN Stack Developer
                </p>
              </div>

              <p className="text-base sm:text-lg text-text-muted dark:text-text-muted-dark max-w-lg mx-auto md:mx-0 leading-relaxed">
                I'm a MERN Stack Developer with a full-stack nature,
                working across both frontend and backend development.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center md:justify-start gap-3 sm:gap-4">
                <Link
                  to="/projects"
                  className="btn-primary justify-center"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/blog"
                  className="btn-secondary justify-center"
                >
                  Read Blog
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2 flex-wrap">
                <a
                  href="https://github.com/Wahaj-Developer"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/wahaj-a-212bb633b"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href="https://x.com/WahajAhmed82826"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>

                <a
                  href="https://www.facebook.com/wahaj.khan.820939"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                <a
                  href="https://www.instagram.com/codewithwahaj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href="https://www.fiverr.com/sellers/wahajakhanahmed/edit?utm_medium=shared&utm_source=copy_link&utm_campaign=seller_profile_self_view&utm_term=DBpjypo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fiverr"
                  className="flex items-center justify-center w-10 h-10 rounded-lg font-bold text-sm text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark transition-colors"
                >
                  Fi
                </a>
              </div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mt-2 md:mt-0"
            >
              <div className="relative">

                <div className="w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden ring-4 ring-primary/20 dark:ring-primary-dark/20">
                  <img
                    src="/w.png"
                    alt="Wahaj Ahmed"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        '/w.png';
                    }}
                  />
                </div>

                {/* Initial Badge */}
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 md:-right-3 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-primary dark:bg-primary-dark rounded-full flex items-center justify-center text-white text-base sm:text-xl md:text-2xl font-bold shadow-lg ring-4 ring-white dark:ring-dark-main">
                  Wahaj
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT TEASER
      ====================================================== */}
      <section className="py-10 sm:py-14 md:py-16 bg-gray-50 dark:bg-dark-card/50">
        <div className="container">

          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center">

            {/* Small Profile */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-primary/20 dark:ring-primary-dark/20 flex-shrink-0">
              <img
                src="/w.png"
                alt="Wahaj Ahmed"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    '/w.png';
                }}
              />
            </div>

            {/* About Content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                About Me
              </h2>

              <p className="text-sm sm:text-base text-text-muted dark:text-text-muted-dark max-w-2xl mx-auto md:mx-0 leading-relaxed">
                My name is Wahaj Ahmed, and I'm a web developer from
                Pakistan. I'm a MERN Stack Developer with a full-stack
                approach, working across both frontend and backend
                development. I enjoy building modern web applications,
                solving problems, and continuously improving my skills.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-4 text-primary dark:text-primary-dark font-medium hover:underline"
              >
                Learn more
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED PROJECTS
      ====================================================== */}
      <section className="py-10 sm:py-14 md:py-16">
        <div className="container">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7 sm:mb-8">
            <h2 className="heading-2">
              Featured Projects
            </h2>

            <Link
              to="/projects"
              className="text-primary dark:text-primary-dark font-medium hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Loading */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="card animate-pulse overflow-hidden"
                >
                  <div className="aspect-video bg-gray-200 dark:bg-dark-border" />

                  <div className="p-4 sm:p-5 lg:p-6 space-y-3">
                    <div className="h-5 sm:h-6 w-3/4 bg-gray-200 dark:bg-dark-border rounded" />
                    <div className="h-4 w-full bg-gray-200 dark:bg-dark-border rounded" />
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-dark-border rounded" />
                  </div>
                </div>
              ))}

            </div>
          ) : featuredProjects.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                />
              ))}
            </div>

          ) : (

            <p className="text-text-muted dark:text-text-muted-dark text-center py-8">
              No featured projects yet.
            </p>

          )}

        </div>
      </section>

      {/* =====================================================
          FEATURED BLOG
      ====================================================== */}
      <section className="py-10 sm:py-14 md:py-16">
        <div className="container">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7 sm:mb-8">
            <h2 className="heading-2">
              Featured Blog
            </h2>

            <Link
              to="/blog"
              className="text-primary dark:text-primary-dark font-medium hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Loading */}
          {isLoadingPosts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="card animate-pulse overflow-hidden"
                >
                  <div className="aspect-video bg-gray-200 dark:bg-dark-border" />

                  <div className="p-4 sm:p-5 lg:p-6 space-y-3">
                    <div className="h-5 sm:h-6 w-3/4 bg-gray-200 dark:bg-dark-border rounded" />
                    <div className="h-4 w-full bg-gray-200 dark:bg-dark-border rounded" />
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-dark-border rounded" />
                  </div>
                </div>
              ))}

            </div>
          ) : featuredPosts.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {featuredPosts.map((post, index) => (
                <PostCard
                  key={post._id}
                  post={post}
                  index={index}
                />
              ))}
            </div>

          ) : (

            <p className="text-text-muted dark:text-text-muted-dark text-center py-8">
              No featured articles yet.
            </p>

          )}

        </div>
      </section>

      {/* =====================================================
          SKILLS
      ====================================================== */}
      <section className="py-10 sm:py-14 md:py-16 bg-gray-50 dark:bg-dark-card/50">
        <div className="container">

          <h2 className="heading-2 text-center mb-7 sm:mb-8">
            Skills & Technologies
          </h2>

          <SkillsSection />

        </div>
      </section>

      {/* =====================================================
          CONTACT CTA
      ====================================================== */}
      <section className="py-10 sm:py-14 md:py-16">
        <div className="container">

          <div className="card p-5 sm:p-7 md:p-10 lg:p-12 text-center bg-gradient-to-br from-primary/10 to-primary-tint dark:from-primary-dark/10 dark:to-primary-tint-dark border-primary/20 dark:border-primary-dark/20">

            <h2 className="heading-2 mb-3 sm:mb-4">
              Let's Work Together
            </h2>

            <p className="text-sm sm:text-base text-text-muted dark:text-text-muted-dark max-w-lg mx-auto mb-5 sm:mb-6">
              Have a project in mind? I'd love to hear about it.
            </p>

            <Link
              to="/contact"
              className="btn-primary justify-center"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

        </div>
      </section>
    </>
  );
};

export default Home;