import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import SEO from '../components/SEO.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectSkeleton from '../components/ui/ProjectSkeleton.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import ErrorState from '../components/ui/ErrorState.jsx';

import { projectsAPI } from '../lib/api.js';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        setProjects(response.data.data);
      } catch (err) {
        setError(err.message || 'Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /* =========================
     LOADING STATE
  ========================== */
  if (isLoading) {
    return (
      <>
        <SEO title="Projects | Dev Portfolio" />

        <section className="py-10 sm:py-14 md:py-20 lg:py-24">
          <div className="container">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h1 className="heading-1 mb-3 sm:mb-4">
                Projects
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-text-muted dark:text-text-muted-dark">
                Loading my work...
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {[...Array(3)].map((_, i) => (
                <ProjectSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  /* =========================
     ERROR STATE
  ========================== */
  if (error) {
    return (
      <>
        <SEO title="Projects | Dev Portfolio" />

        <section className="py-10 sm:py-14 md:py-20 lg:py-24">
          <div className="container">
            <ErrorState
              message={error}
              retry={() => window.location.reload()}
            />
          </div>
        </section>
      </>
    );
  }

  /* =========================
     PROJECTS PAGE
  ========================== */
  return (
    <>
      <SEO title="Projects | Dev Portfolio" />

      <section className="py-10 sm:py-14 md:py-20 lg:py-24">
        <div className="container">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            {/* =========================
                HEADER
            ========================== */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">

              <h1 className="heading-1 mb-3 sm:mb-4">
                Projects
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-text-muted dark:text-text-muted-dark max-w-2xl mx-auto leading-relaxed px-2">
                A collection of my work, from full-stack applications
                to open-source contributions.
              </p>

            </div>


            {/* =========================
                PROJECT GRID
            ========================== */}
            {projects.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">

                {projects.map((project, index) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    index={index}
                  />
                ))}

              </div>

            ) : (

              <div className="py-6 sm:py-10">
                <EmptyState
                  title="No Projects Yet"
                  description="Check back later for my latest work."
                />
              </div>

            )}

          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Projects;
