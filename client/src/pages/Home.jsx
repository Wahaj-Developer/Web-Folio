import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
import Marquee from '../components/Marquee.jsx';
import Magnetic from '../components/Magnetic.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import PostCard from '../components/PostCard.jsx';
import { projectsAPI, postsAPI } from '../lib/api.js';


const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Words = ({ text, className = '', start = 0 }) =>
  text.split(' ').map((w, i) => (
    <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.25em]">
      <motion.span
        custom={start + i}
        variants={wordVariants}
        initial="hidden"
        animate="show"
        className={`inline-block ${className}`}
      >
        {w}
      </motion.span>
    </span>
  ));

const Home = () => {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [10, -10]), { stiffness: 140, damping: 16 });
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-10, 10]), { stiffness: 140, damping: 16 });

  const handleTilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - r.left) / r.width - 0.5);
    tiltY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

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


      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden py-10 sm:py-14 md:py-20 lg:py-28">
        {/* Floating colour blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-primary/12 dark:bg-primary/30 blur-3xl sm:animate-float" />
        <div aria-hidden="true" className="pointer-events-none absolute top-1/3 -right-24 w-[380px] h-[380px] rounded-full bg-beach-300/50 dark:bg-beach-300/15 blur-3xl sm:animate-float-slow" />

        <div className="container relative">
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
                  <Words text="Hi, I'm" />
                  <br className="hidden md:block" />
                  <Words text="Wahaj Ahmed" className="text-primary dark:text-primary-dark" start={2} />
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-text-muted dark:text-text-muted-dark font-medium">
                  MERN Stack Developer
                </p>
              </div>

              <p className="text-base sm:text-lg text-text-muted dark:text-text-muted-dark max-w-lg mx-auto md:mx-0 leading-relaxed">
                I'm a MERN Stack Developer building web applications with
                MongoDB, Express, React, and Node.js.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center md:justify-start gap-3 sm:gap-4">
                <Magnetic>
                  <Link
                    to="/projects"
                    className="btn-primary justify-center group"
                  >
                    View Projects
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Magnetic>

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
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark hover:-translate-y-1 transition-all duration-200"
                >
                  <Github className="w-5 h-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/wahaj-a-212bb633b"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark hover:-translate-y-1 transition-all duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href="https://x.com/WahajAhmed82826"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark hover:-translate-y-1 transition-all duration-200"
                >
                  <Twitter className="w-5 h-5" />
                </a>

                <a
                  href="https://www.facebook.com/wahaj.khan.820939"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark hover:-translate-y-1 transition-all duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                <a
                  href="https://www.instagram.com/codewithwahaj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark hover:-translate-y-1 transition-all duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href="https://www.fiverr.com/sellers/wahajakhanahmed/edit?utm_medium=shared&utm_source=copy_link&utm_campaign=seller_profile_self_view&utm_term=DBpjypo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fiverr"
                  className="flex items-center justify-center w-10 h-10 rounded-lg font-bold text-sm text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark hover:-translate-y-1 transition-all duration-200"
                >
                  Fi
                </a>
              </div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center mt-2 md:mt-0"
              style={{ perspective: 900 }}
              onPointerMove={handleTilt}
              onPointerLeave={resetTilt}
            >
              <motion.div className="relative" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>

                {/* Rotating dashed ring */}
                <div aria-hidden="true" className="dash-ring absolute -inset-4 sm:-inset-5 rounded-full animate-spin-slow" />

                {/* Sand halo */}
                <div aria-hidden="true" className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary via-primary-dark to-beach-300 opacity-70 blur-md" />

                <div className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden ring-4 ring-beach-200 dark:ring-dark-border">
                  <img
                    src="/w.webp"
                    alt="Wahaj Ahmed"
                    width="640"
                    height="640"
                    decoding="async"
                    fetchpriority="high"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/w.png';
                    }}
                  />
                </div>

                {/* Initial Badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ translateZ: 40 }}
                  className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 md:-right-3 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-primary dark:bg-primary rounded-full flex items-center justify-center text-beach-100 text-[10px] sm:text-xs md:text-sm font-bold shadow-lg ring-4 ring-surface dark:ring-dark-bg"
                >
                  Wahaj
                </motion.div>

              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <Marquee />

      {/* =====================================================
          ABOUT TEASER
      ====================================================== */}
      <section className="py-10 sm:py-14 md:py-16 bg-card/70 dark:bg-dark-card">
        <div className="container">

          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center">

            {/* Small Profile */}
            <div className="hidden lg:block w-32 h-32 rounded-full overflow-hidden ring-2 ring-primary/20 dark:ring-primary-dark/20 flex-shrink-0">
              <img
                src="/w-sm.webp"
                alt="Wahaj Ahmed"
                width="256"
                height="256"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/w.png';
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
                Pakistan. I'm a MERN Stack Developer working with MongoDB,
                Express, React, and Node.js. I enjoy building modern
                web applications,
                solving problems, and continuously improving my skills.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-4 text-primary dark:text-primary-dark font-medium hover:underline"
              >
                Learn more about me
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
              View all projects
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
              View all posts
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
      <section className="py-10 sm:py-14 md:py-16 bg-card/70 dark:bg-dark-card">
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

          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="card relative overflow-hidden p-5 sm:p-7 md:p-10 lg:p-12 text-center bg-gradient-to-br from-beach-100 via-clr-mist/30 to-primary/15 dark:from-primary-tint-dark dark:via-dark-card dark:to-primary-dark/15 border-primary/20 dark:border-primary-dark/20">

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

          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Home;