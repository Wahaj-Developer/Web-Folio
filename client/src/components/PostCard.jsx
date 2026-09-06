import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  FileText,
} from 'lucide-react';

const PostCard = ({ post, index = 0 }) => {
  const {
    slug,
    title,
    description,
    image,
    category,
    tags = [],
    publishedAt,
    readingTime = 3,
    isCaseStudy = false,
  } = post;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      viewport={{ once: true, margin: '-50px' }}
      className="card card-hover overflow-hidden group"
    >
      <Link to={`/blog/${slug}`} className="block">
        {/* Cover Image */}
        <div className="relative aspect-video min-h-[180px] sm:min-h-0 bg-gradient-to-br from-primary/15 via-primary-tint to-primary-dark/10 dark:from-primary-dark/15 dark:via-primary-tint-dark dark:to-primary-dark/10 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
              <span className="text-4xl sm:text-5xl font-bold text-white/30">
                {title?.charAt(0)}
              </span>
            </div>
          )}

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Case Study Badge */}
          {isCaseStudy && (
            <div className="absolute top-3 right-3">
              <span className="badge badge-case-study shadow-sm">
                <FileText className="w-3 h-3 mr-1 shrink-0" />
                Case Study
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-text-muted dark:text-text-muted-dark">
            {category && (
              <span className="badge badge-primary">
                {category}
              </span>
            )}

            {formattedDate && (
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>{formattedDate}</span>
              </span>
            )}

            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{readingTime} min read</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-semibold text-text-main dark:text-text-main-dark line-clamp-2 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors duration-200">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed line-clamp-3 sm:line-clamp-2">
            {description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-[11px] sm:text-xs font-medium bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 border border-transparent dark:border-dark-border rounded-md"
                >
                  {tag}
                </span>
              ))}

              {tags.length > 3 && (
                <span className="px-2 py-1 text-[11px] sm:text-xs font-medium text-text-muted dark:text-text-muted-dark">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
};

export default PostCard;
