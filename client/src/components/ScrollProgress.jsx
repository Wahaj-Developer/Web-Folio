import { motion, useScroll, useSpring } from 'framer-motion';

// Thin burgundy-to-sand bar that fills as the page scrolls. Visual only.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[70] bg-gradient-to-r from-primary via-primary-dark to-beach-300"
    />
  );
};

export default ScrollProgress;
