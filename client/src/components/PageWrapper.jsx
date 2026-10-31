import { motion } from 'framer-motion';

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative min-h-screen"
    >
      {/* Soft colour wash behind the top of every page (no clipping of page content) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[460px] overflow-hidden -z-0"
      >
        <div className="absolute -top-28 -right-20 w-[380px] h-[380px] rounded-full bg-clr-mist/25 dark:bg-clr-mist/10 blur-3xl animate-float" />
        <div className="absolute -top-32 -left-24 w-[320px] h-[320px] rounded-full bg-clr-burgundy/10 dark:bg-clr-burgundy/25 blur-3xl animate-float-slow" />
      </div>
      <div className="relative">{children}</div>
    </motion.div>
  );
};

export default PageWrapper;
