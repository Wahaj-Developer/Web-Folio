import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  FileText,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import SEO from '../components/SEO.jsx';
import OnThisPage from '../components/OnThisPage.jsx';
import PostSkeleton from '../components/ui/PostSkeleton.jsx';
import ErrorState from '../components/ui/ErrorState.jsx';
import { postsAPI } from '../lib/api.js';

const BlogPost = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await postsAPI.getBySlug(slug);
        setPost(response.data.data);
      } catch (err) {
        setError(err.message || 'Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <PostSkeleton />
          </div>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <ErrorState
            message={error || 'Post not found'}
            retry={() => window.location.reload()}
          />

          <div className="text-center mt-4">
            <Link
              to="/blog"
              className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        image={post.image || '/assets/profile.jpg'}
      />

      <section className="py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Back Button */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>Back to Blog</span>
              </Link>

              {/* Header */}
              <header className="space-y-4 sm:space-y-5">
                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  {post.isCaseStudy && (
                    <span className="badge badge-case-study inline-flex items-center">
                      <FileText className="w-3 h-3 mr-1 shrink-0" />
                      <span>Case Study / Documentation</span>
                    </span>
                  )}

                  {post.category && (
                    <span className="badge badge-primary">
                      {post.category}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="heading-1 break-words">
                  {post.title}
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {post.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  <span className="break-words">
                    By {post.author}
                  </span>

                  {formattedDate && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>{formattedDate}</span>
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{post.readingTime || 3} min read</span>
                  </span>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md break-words"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Cover Image */}
              {post.image && (
                <div className="rounded-lg sm:rounded-xl overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              )}

              {/* Related Project */}
              {post.relatedProject && (
                <div className="card p-4 sm:p-5 bg-primary-50/50 dark:bg-primary-950/30 border-primary-200 dark:border-primary-800">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Related Project:{' '}
                    <Link
                      to="/projects"
                      className="text-primary-600 dark:text-primary-400 font-medium hover:underline break-words"
                    >
                      {post.relatedProject.title}
                    </Link>
                  </p>
                </div>
              )}

              {/* Content + TOC */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Article Content */}
                <div className="lg:col-span-3 min-w-0">
                  <div className="prose max-w-none dark:prose-invert break-words">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[
                        rehypeSlug,
                        [
                          rehypeAutolinkHeadings,
                          { behavior: 'wrap' },
                        ],
                      ]}
                      components={{
                        code({
                          node,
                          inline,
                          className,
                          children,
                          ...props
                        }) {
                          const match = /language-(\w+)/.exec(
                            className || ''
                          );

                          return !inline && match ? (
                            <div className="relative my-4 sm:my-6 overflow-hidden rounded-lg">
                              <div className="overflow-x-auto">
                                <SyntaxHighlighter
                                  style={oneDark}
                                  language={match[1]}
                                  PreTag="div"
                                  className="!m-0 !rounded-lg !text-xs sm:!text-sm"
                                  customStyle={{
                                    margin: 0,
                                    minWidth: '100%',
                                  }}
                                  {...props}
                                >
                                  {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                              </div>

                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    String(children).replace(/\n$/, '')
                                  );
                                }}
                                className="absolute top-2 right-2 bg-zinc-700/70 hover:bg-zinc-700 text-white text-xs px-2.5 sm:px-3 py-1.5 rounded transition-colors"
                              >
                                Copy
                              </button>
                            </div>
                          ) : (
                            <code
                              className={`${className || ''} break-words`}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },

                        img({ src, alt, ...props }) {
                          return (
                            <img
                              src={src}
                              alt={alt || ''}
                              loading="lazy"
                              className="max-w-full h-auto rounded-lg"
                              {...props}
                            />
                          );
                        },

                        table({ children }) {
                          return (
                            <div className="w-full overflow-x-auto my-6">
                              <table className="min-w-full">
                                {children}
                              </table>
                            </div>
                          );
                        },

                        pre({ children }) {
                          return (
                            <pre className="max-w-full overflow-x-auto">
                              {children}
                            </pre>
                          );
                        },
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Table of Contents */}
                <aside className="hidden lg:block min-w-0">
                  <div className="sticky top-24">
                    <OnThisPage content={post.content} />
                  </div>
                </aside>
              </div>

              {/* Related Posts */}
              {post.relatedPosts && post.relatedPosts.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h2 className="heading-3">
                    Related Posts
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {post.relatedPosts.map((related) => (
                      <Link
                        key={related._id}
                        to={`/blog/${related.slug}`}
                        className="card p-4 card-hover min-w-0"
                      >
                        <h3 className="font-semibold text-sm line-clamp-2 break-words">
                          {related.title}
                        </h3>

                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                          {new Date(
                            related.publishedAt
                          ).toLocaleDateString()}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Previous / Next Navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                {/* Previous */}
                <div className="min-w-0">
                  {post.prevPost && (
                    <Link
                      to={`/blog/${post.prevPost.slug}`}
                      className="group flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors min-w-0"
                    >
                      <ArrowLeft className="w-4 h-4 mt-1 shrink-0" />

                      <span className="min-w-0">
                        <span className="block text-xs text-zinc-500 mb-1">
                          Previous
                        </span>

                        <span className="block break-words line-clamp-2">
                          {post.prevPost.title}
                        </span>
                      </span>
                    </Link>
                  )}
                </div>

                {/* Next */}
                <div className="min-w-0">
                  {post.nextPost && (
                    <Link
                      to={`/blog/${post.nextPost.slug}`}
                      className="group flex items-start justify-end gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors text-right min-w-0"
                    >
                      <span className="min-w-0">
                        <span className="block text-xs text-zinc-500 mb-1">
                          Next
                        </span>

                        <span className="block break-words line-clamp-2">
                          {post.nextPost.title}
                        </span>
                      </span>

                      <ArrowRight className="w-4 h-4 mt-1 shrink-0" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;