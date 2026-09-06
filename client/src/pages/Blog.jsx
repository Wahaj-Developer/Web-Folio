import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import SEO from '../components/SEO.jsx';
import PostCard from '../components/PostCard.jsx';
import PostSkeleton from '../components/ui/PostSkeleton.jsx';
import Pagination from '../components/Pagination.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import ErrorState from '../components/ui/ErrorState.jsx';

import { postsAPI } from '../lib/api.js';

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchTerm = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(searchTerm);

  const currentPage = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = {
          page: currentPage,
          limit: 9,
        };

        if (searchTerm) {
          params.search = searchTerm;
        }

        const response = await postsAPI.getAll(params);

        setPosts(response.data.data);
        setPagination(response.data.pagination);
      } catch (err) {
        setError(err.message || 'Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    }

    params.set('page', '1');

    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(page));

    setSearchParams(params);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <SEO title="Blog | Dev Portfolio" />

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
                Blog
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-text-muted dark:text-text-muted-dark max-w-2xl mx-auto leading-relaxed px-2">
                Thoughts, tutorials, and case studies about web development.
              </p>

            </div>


            {/* =========================
                SEARCH
            ========================== */}
            <div className="w-full max-w-md mx-auto mb-8 sm:mb-10">

              <form
                onSubmit={handleSearch}
                className="flex flex-col xs:flex-row gap-2"
              >

                <div className="relative flex-1">

                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search posts..."
                    aria-label="Search blog posts"
                    className="
                      w-full
                      px-4
                      py-3
                      pl-11
                      rounded-lg
                      border
                      border-border
                      dark:border-dark-border
                      bg-white
                      dark:bg-dark-card
                      text-text-main
                      dark:text-text-main-dark
                      placeholder:text-text-muted
                      dark:placeholder:text-text-muted-dark
                      focus:outline-none
                      focus:ring-2
                      focus:ring-primary
                      focus:border-primary
                      transition-all
                      duration-200
                    "
                  />

                  <Search
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      w-4
                      h-4
                      text-text-muted
                      dark:text-text-muted-dark
                      pointer-events-none
                    "
                  />

                </div>

                <button
                  type="submit"
                  className="
                    w-full
                    xs:w-auto
                    shrink-0
                    px-5
                    py-3
                    bg-primary
                    hover:bg-primary-hover
                    text-white
                    text-sm
                    font-medium
                    rounded-lg
                    transition-colors
                    duration-200
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary
                    focus:ring-offset-2
                    dark:focus:ring-offset-dark-bg
                  "
                >
                  Search
                </button>

              </form>

            </div>


            {/* =========================
                CONTENT
            ========================== */}
            {isLoading ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">

                {[...Array(6)].map((_, i) => (
                  <PostSkeleton key={i} />
                ))}

              </div>

            ) : error ? (

              <ErrorState
                message={error}
                retry={() => window.location.reload()}
              />

            ) : posts.length > 0 ? (

              <>

                {/* =========================
                    POSTS GRID
                ========================== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">

                  {posts.map((post, index) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      index={index}
                    />
                  ))}

                </div>


                {/* =========================
                    PAGINATION
                ========================== */}
                {pagination && (
                  <div className="mt-8 sm:mt-10 md:mt-12 overflow-x-auto">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={pagination.pages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}

              </>

            ) : (

              <div className="py-4 sm:py-8">

                <EmptyState
                  title="No Posts Found"
                  description={
                    searchTerm
                      ? 'No results found for your search.'
                      : 'No posts published yet.'
                  }
                />

              </div>

            )}

          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Blog;
