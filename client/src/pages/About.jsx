import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Code,
  Rocket,
  BookOpen,
  Coffee,
} from 'lucide-react';

import SEO from '../components/SEO.jsx';
import SkillsSection from '../components/SkillsSection.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import PostCard from '../components/PostCard.jsx';
import { projectsAPI, postsAPI } from '../lib/api.js';

const About = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

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
        setIsLoadingProjects(false);
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
      <SEO title="About | Dev Portfolio" />

      <section className="py-10 sm:py-14 md:py-20 lg:py-24">
        <div className="container">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-10 sm:space-y-12 md:space-y-16"
          >

            {/* =========================
                HEADER
            ========================== */}
            <div className="text-center space-y-3 sm:space-y-4">
              <h1 className="heading-1">
                About Me
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-text-muted dark:text-text-muted-dark max-w-2xl mx-auto leading-relaxed">
                Full-stack developer passionate about building
                amazing web experiences.
              </p>
            </div>


            {/* =========================
                PROFILE
            ========================== */}
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-center md:items-start">

              {/* Profile Image */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-primary/20 dark:ring-primary-dark/20 flex-shrink-0">
                <img
                  src="/w.png"
                  alt="Wahaj Ahmed"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      '/w.png';
                  }}
                />
              </div>

              {/* Profile Content */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                <h2 className="text-xl sm:text-2xl font-bold">
                  Hi, I'm Wahaj
                </h2>

                <p className="text-sm sm:text-base text-text-muted dark:text-text-muted-dark leading-relaxed">
                 I'm a Full-Stack MERN Developer passionate about building clean, efficient, and user-friendly web applications. I work with MongoDB, Express.js, React, and Node.js to create complete web solutions, from responsive and interactive frontends to scalable backend APIs and database-driven applications.

                Alongside development, I have also spent the past 3 months working on my personal brand as a developer, creating short-form content, sharing my learning journey, showcasing projects, and improving how I communicate technical ideas online. This experience has helped me become more confident not only in writing code, but also in presenting my work and connecting with the developer community.

                I enjoy turning ideas into real products, solving problems through code, learning new technologies, and continuously improving my skills as a developer.

                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
                  <span className="badge badge-primary">
                    Web Developer
                  </span>
                  <span className="badge badge-primary">
                    MERN Stack Developer
                  </span>
                   <span className="badge badge-primary">
                    Full Stack Developer
                  </span>
                    <span className="badge badge-primary">
                    JavaScript Developer
                  </span>
                  
                </div>
              </div>

            </div>


            {/* =========================
                JOURNEY
            ========================== */}
            <div className="space-y-5 sm:space-y-6">

              <h2 className="heading-3">
                My Journey
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">

                {/* Started */}
                <div className="card p-4 sm:p-5 md:p-6 space-y-3">
                  <Code className="w-7 h-7 sm:w-8 sm:h-8 text-primary dark:text-primary-dark" />

                  <h3 className="font-semibold text-base sm:text-lg">
                    How I Started
                  </h3>

                  <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
                  I started my coding journey with a dream of becoming a Software Engineer. I began with HTML and CSS, then moved into JavaScript and the MERN stack as I became more interested in building complete web applications. Along the way, I started creating personal projects and sharing my development journey through short-form content. I'm still learning, building, and working toward becoming a skilled Software Engineer.
                  </p>
                </div>


                {/* Current Focus */}
                <div className="card p-4 sm:p-5 md:p-6 space-y-3">
                  <Rocket className="w-7 h-7 sm:w-8 sm:h-8 text-primary dark:text-primary-dark" />

                  <h3 className="font-semibold text-base sm:text-lg">
                    Current Focus
                  </h3>

                  <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
                 I'm currently focused on mastering TypeScript and Next.js while strengthening my Advanced JavaScript, DSA, and System Design skills. Alongside development, I'm also building my personal brand through short-form content and sharing my journey as I continue growing as a developer.
                  </p>
                </div>


                {/* Learning */}
                <div className="card p-4 sm:p-5 md:p-6 space-y-3">
                  <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-primary dark:text-primary-dark" />

                  <h3 className="font-semibold text-base sm:text-lg">
                    Learning Resources
                  </h3>

                  <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
                  I constantly learn through YouTube, CodeWithHarry, Sheryians Coding School, JavaScript Mastery, official documentation, and building projects. I believe in learning by doing and improving through practice.
                  </p>
                </div>


                {/* Beyond Code */}
                <div className="card p-4 sm:p-5 md:p-6 space-y-3">
                  <Coffee className="w-7 h-7 sm:w-8 sm:h-8 text-primary dark:text-primary-dark" />

                  <h3 className="font-semibold text-base sm:text-lg">
                    Beyond Code
                  </h3>

                  <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
                   When I'm not coding, I enjoy listening to classical music, playing football, reading Urdu literature, and exploring new ideas that inspire creativity and curiosity.

                  </p>
                </div>

              </div>
            </div>


            {/* =========================
                SKILLS
            ========================== */}
            <div className="space-y-5 sm:space-y-6">

              <h2 className="heading-3 text-center">
                Skills & Technologies
              </h2>

              <SkillsSection />

            </div>


            {/* =========================
                PROJECTS
            ========================== */}
            <div className="space-y-5 sm:space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="heading-3">
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

              {isLoadingProjects ? (
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


            {/* =========================
                FEATURED BLOG
            ========================== */}
            <div className="space-y-5 sm:space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="heading-3">
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


            {/* =========================
                CONTACT
            ========================== */}
            <div className="card p-5 sm:p-7 md:p-10 lg:p-12 text-center bg-gradient-to-br from-primary/10 to-primary-tint dark:from-primary-dark/10 dark:to-primary-tint-dark border-primary/20 dark:border-primary-dark/20">

              <h2 className="heading-3 mb-3 sm:mb-4">
                Let's Work Together
              </h2>

              <p className="text-sm sm:text-base text-text-muted dark:text-text-muted-dark max-w-lg mx-auto mb-5 sm:mb-6">
                Have a project in mind? I'd love to hear about it.
              </p>

              <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
                <Link
                  to="/projects"
                  className="btn-primary justify-center"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="btn-secondary justify-center"
                >
                  Get in Touch
                </Link>
              </div>

            </div>

          </motion.div>

        </div>
      </section>
    </>
  );
};

export default About;