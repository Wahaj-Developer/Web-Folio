import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Github,
  ExternalLink,
  FileText,
  BookOpen,
} from 'lucide-react';

const ProjectCard = ({ project, index = 0 }) => {
  const {
    _id,
    title,
    description,
    techStack = [],
    image,
    videoUrl,
    liveUrl,
    githubUrl,
    hasCaseStudy = false,
    hasDocs = false,
    caseStudySlug,
    docsSlug,
  } = project;

  const hasVideo = videoUrl && videoUrl.length > 0;
  const hasImage = image && image.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      viewport={{ once: true, margin: '-50px' }}
      className="card card-hover overflow-hidden group"
    >
      {/* Media */}
      <div className="relative aspect-video min-h-[180px] sm:min-h-0 bg-gradient-to-br from-primary/15 via-primary-tint to-primary-dark/10 dark:from-primary-dark/15 dark:via-primary-tint-dark dark:to-primary-dark/10 overflow-hidden">
        {hasVideo ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : hasImage ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
            <span className="text-4xl sm:text-5xl font-bold text-white/50">
              {title?.charAt(0)}
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
        {/* Title + Badges */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <h3 className="text-lg sm:text-xl font-semibold text-text-main dark:text-text-main-dark line-clamp-2 sm:line-clamp-1 min-w-0">
            {title}
          </h3>

          <div className="flex flex-wrap gap-1.5 shrink-0">
            {hasCaseStudy && (
              <span className="badge badge-case-study">
                <FileText className="w-3 h-3 mr-1 shrink-0" />
                Case Study
              </span>
            )}

            {hasDocs && (
              <span className="badge badge-primary">
                <BookOpen className="w-3 h-3 mr-1 shrink-0" />
                Docs
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed line-clamp-3 sm:line-clamp-2">
          {description}
        </p>

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-[11px] sm:text-xs font-medium bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 border border-transparent dark:border-dark-border rounded-md"
              >
                {tech}
              </span>
            ))}

            {techStack.length > 4 && (
              <span className="px-2 py-1 text-[11px] sm:text-xs font-medium text-text-muted dark:text-text-muted-dark">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1.5 sm:pt-2 flex-wrap">
          {/* GitHub */}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:p-2 rounded-lg text-text-muted dark:text-text-muted-dark hover:text-text-main dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
              aria-label="GitHub repository"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only sm:hidden">
                GitHub repository
              </span>
            </a>
          )}

          {/* Live Demo */}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:p-2 rounded-lg text-text-muted dark:text-text-muted-dark hover:text-text-main dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
              aria-label="Live demo"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="sr-only sm:hidden">
                Live demo
              </span>
            </a>
          )}

          {/* Case Study */}
          {hasCaseStudy && caseStudySlug && (
            <Link
              to={`/blog/${caseStudySlug}`}
              className="inline-flex items-center gap-1.5 min-h-10 px-3 py-2 text-xs sm:text-sm font-medium text-primary dark:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Read Case Study</span>
            </Link>
          )}

          {/* Documentation */}
          {hasDocs && docsSlug && (
            <Link
              to={`/blog/${docsSlug}`}
              className="inline-flex items-center gap-1.5 min-h-10 px-3 py-2 text-xs sm:text-sm font-medium text-primary dark:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark rounded-lg transition-colors"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Read Docs</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
