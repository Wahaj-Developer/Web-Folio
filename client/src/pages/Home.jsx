import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import SEO from '../components/SEO.jsx';
import SkillsSection from '../components/SkillsSection.jsx';
import Marquee from '../components/Marquee.jsx';
import Hero from '../components/Hero.jsx';
import MobileCarousel from '../components/MobileCarousel.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import PostCard from '../components/PostCard.jsx';
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


      <Hero />

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
            <MobileCarousel label="Loading" gridClassName="md:grid md:grid-cols-2 md:gap-6">

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

            </MobileCarousel>
          ) : featuredProjects.length > 0 ? (

            <MobileCarousel label="Featured projects" gridClassName="md:grid md:grid-cols-2 md:gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                />
              ))}
            </MobileCarousel>

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
            <MobileCarousel label="Loading" gridClassName="md:grid md:grid-cols-2 md:gap-6">

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

            </MobileCarousel>
          ) : featuredPosts.length > 0 ? (

            <MobileCarousel label="Featured posts" gridClassName="md:grid md:grid-cols-2 md:gap-6">
              {featuredPosts.map((post, index) => (
                <PostCard
                  key={post._id}
                  post={post}
                  index={index}
                />
              ))}
            </MobileCarousel>

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