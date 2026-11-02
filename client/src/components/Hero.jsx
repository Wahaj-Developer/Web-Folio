import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react';

import Magnetic from './Magnetic.jsx';

const EASE = [0.22, 1, 0.36, 1];

/* ---------------------------------------------------------------
   EDIT HERE
---------------------------------------------------------------- */
const ROLES = [
  'MERN Stack Developer',
  'React Enthusiast',
  'Backend Builder',
  'Problem Solver',
];

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Wahaj-Developer', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/wahaj-a-212bb633b', Icon: Linkedin },
  { label: 'Twitter', href: 'https://x.com/WahajAhmed82826', Icon: Twitter },
  { label: 'Facebook', href: 'https://www.facebook.com/wahaj.khan.820939', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/codewithwahaj/', Icon: Instagram },
  {
    label: 'Fiverr',
    href: 'https://www.fiverr.com/sellers/wahajakhanahmed/edit?utm_medium=shared&utm_source=copy_link&utm_campaign=seller_profile_self_view&utm_term=DBpjypo',
    text: 'Fi',
  },
];

// The four letters of MERN, orbiting the profile photo
const ORBIT = [
  { label: 'MERN', pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' },
  { label: 'Express', pos: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2' },
  { label: 'React', pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' },
  { label: 'Node.js', pos: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2' },
];

// Code symbols drifting in the background
const GLYPHS = [
  { g: '</>', cls: 'top-[10%] left-[5%]', delay: 0, dur: 9 },
  { g: '{ }', cls: 'top-[20%] right-[7%]', delay: 1.2, dur: 11 },
  { g: '=>', cls: 'bottom-[16%] left-[10%]', delay: 2.1, dur: 10 },
  { g: '[ ]', cls: 'bottom-[10%] right-[12%]', delay: 0.6, dur: 12 },
  { g: '( )', cls: 'hidden sm:block top-[52%] left-[2%]', delay: 3, dur: 13 },
  { g: '&&', cls: 'hidden sm:block top-[8%] left-[46%]', delay: 1.8, dur: 10 },
  { g: '++', cls: 'hidden md:block bottom-[6%] left-[48%]', delay: 2.6, dur: 14 },
];

/* ---------------------------------------------------------------
   Word-by-word headline reveal
---------------------------------------------------------------- */
const wordVariants = {
  hidden: { y: '110%', opacity: 0, rotate: 4 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.09, ease: EASE },
  }),
};

const Words = ({ text, className = '', start = 0, shimmer = false }) =>
  text.split(' ').map((w, i) => (
    <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.25em]">
      <motion.span
        custom={start + i}
        variants={wordVariants}
        initial="hidden"
        animate="show"
        className={`inline-block ${className}`}
      >
        {shimmer ? (
          <motion.span
            className="inline-block bg-gradient-to-r from-[#6E1423] via-[#C23A55] to-[#6E1423] dark:from-[#9BB7C3] dark:via-[#FAF9F6] dark:to-[#9BB7C3] bg-[length:200%_auto] bg-clip-text text-transparent"
            animate={{ backgroundPosition: ['0% center', '200% center'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            {w}
          </motion.span>
        ) : (
          w
        )}
      </motion.span>
    </span>
  ));

/* ---------------------------------------------------------------
   Typewriter that cycles through roles
---------------------------------------------------------------- */
const Typewriter = ({ roles = ROLES }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[index];
    let timer;

    if (!deleting && text === full) {
      timer = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
    } else {
      timer = setTimeout(
        () => setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
        deleting ? 35 : 70
      );
    }

    return () => clearTimeout(timer);
  }, [text, deleting, index, roles]);

  return (
    <p className="text-lg sm:text-xl md:text-2xl text-text-muted dark:text-text-muted-dark font-medium min-h-[1.75em]">
      <span className="sr-only">{roles[0]}</span>
      <span aria-hidden="true">
        {text}
        <motion.span
          className="inline-block w-[0.55em] h-[1.1em] align-[-0.2em] ml-1 bg-primary dark:bg-clr-mist"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: 'linear' }}
        />
      </span>
    </p>
  );
};

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

const socialClass =
  'flex items-center justify-center w-10 h-10 rounded-lg text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark hover:bg-primary-tint dark:hover:bg-primary-tint-dark hover:-translate-y-1 hover:scale-110 transition-all duration-200';

/* ---------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
const Hero = () => {
  // 3D tilt on the portrait
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

  // Cursor spotlight that follows the mouse across the hero
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const smx = useSpring(mx, { stiffness: 110, damping: 20 });
  const smy = useSpring(my, { stiffness: 110, damping: 20 });
  const lightSpot = useMotionTemplate`radial-gradient(380px circle at ${smx}px ${smy}px, rgba(110,20,35,0.11), transparent 70%)`;
  const darkSpot = useMotionTemplate`radial-gradient(380px circle at ${smx}px ${smy}px, rgba(155,183,195,0.17), transparent 70%)`;

  const handleSpot = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };
  const resetSpot = () => {
    mx.set(-600);
    my.set(-600);
  };

  return (
    <section
      className="relative overflow-hidden py-10 sm:py-14 md:py-20 lg:py-28"
      onPointerMove={handleSpot}
      onPointerLeave={resetSpot}
    >
      {/* Aurora blobs */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 70, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-primary/15 dark:bg-primary/30 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -70, 20, 0], y: [0, 50, -30, 0], scale: [1, 0.9, 1.15, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/3 -right-24 w-[380px] h-[380px] rounded-full bg-beach-300/50 dark:bg-beach-300/15 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 50, -50, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-32 left-1/3 w-[320px] h-[320px] rounded-full bg-primary/10 dark:bg-clr-mist/10 blur-3xl"
      />

      {/* Cursor spotlight (desktop mouse only) */}
      <motion.div aria-hidden="true" style={{ background: lightSpot }} className="pointer-events-none absolute inset-0 hidden md:block dark:md:hidden" />
      <motion.div aria-hidden="true" style={{ background: darkSpot }} className="pointer-events-none absolute inset-0 hidden dark:md:block" />

      {/* Drifting code symbols */}
      {GLYPHS.map(({ g, cls, delay, dur }) => (
        <motion.span
          key={g}
          aria-hidden="true"
          animate={{ y: [0, -26, 0], x: [0, 12, 0], rotate: [-8, 10, -8], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: dur * 0.6, delay, repeat: Infinity, ease: 'easeInOut' }}
          className={`pointer-events-none select-none absolute font-mono text-base sm:text-lg font-bold text-primary/40 dark:text-clr-mist/50 ${cls}`}
        >
          {g}
        </motion.span>
      ))}

      <div className="container relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 sm:gap-14 lg:gap-16 items-center">
          {/* ---------------- Content ---------------- */}
          <div className="space-y-5 sm:space-y-6 text-center md:text-left">
            <div className="space-y-2.5 sm:space-y-3">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                <Words text="Hi, I'm" />
                <br className="hidden md:block" />
                <Words
                  text="Wahaj Ahmed"
                  start={2}
                  shimmer
                />
              </h1>

              <motion.div {...fadeUp(0.55)}>
                <Typewriter />
              </motion.div>
            </div>

            <motion.p
              {...fadeUp(0.7)}
              className="text-base sm:text-lg text-text-muted dark:text-text-muted-dark max-w-lg mx-auto md:mx-0 leading-relaxed"
            >
              I'm a MERN Stack Developer building web applications with
              MongoDB, Express, React, and Node.js.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(0.85)}
              className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center md:justify-start gap-3 sm:gap-4"
            >
              <Magnetic>
                <Link to="/projects" className="btn-primary justify-center group">
                  View Projects
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>

              <Link to="/blog" className="btn-secondary justify-center">
                Read Blog
              </Link>
            </motion.div>

            {/* Social links, popping in one by one */}
            <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2 flex-wrap">
              {SOCIALS.map(({ label, href, Icon, text }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0.4, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 1 + i * 0.08 }}
                  className={`${socialClass} ${text ? 'font-bold text-sm' : ''}`}
                >
                  {Icon ? <Icon className="w-5 h-5" /> : text}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ---------------- Portrait ---------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="flex justify-center mt-2 md:mt-0"
            style={{ perspective: 900 }}
            onPointerMove={handleTilt}
            onPointerLeave={resetTilt}
          >
            <motion.div className="relative" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
              {/* Sonar ripples */}
              {[0, 1.5, 3].map((d) => (
                <motion.div
                  key={d}
                  aria-hidden="true"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                  transition={{ duration: 4.5, delay: d, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border-2 border-primary/50 dark:border-clr-mist/50"
                />
              ))}

              {/* Spinning gradient ring */}
              <motion.div
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-2 rounded-full opacity-80"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0deg, #6E1423 90deg, #9BB7C3 180deg, transparent 300deg)',
                  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))',
                }}
              />

              {/* Rotating dashed ring */}
              <motion.div
                aria-hidden="true"
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="dash-ring absolute -inset-4 sm:-inset-5 rounded-full"
              />

              {/* Glow halo */}
              <motion.div
                aria-hidden="true"
                animate={{ opacity: [0.45, 0.9, 0.45], scale: [1, 1.06, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary via-primary-dark to-beach-300 blur-md"
              />

              {/* Orbiting MERN chips */}
              <motion.div
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-7 sm:-inset-10 md:-inset-12"
              >
                {ORBIT.map(({ label, pos }) => (
                  <div key={label} className={`absolute ${pos}`}>
                    <motion.span
                      className="block"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <span className="block px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide whitespace-nowrap bg-surface/90 dark:bg-dark-bg/90 text-primary dark:text-clr-mist border border-border dark:border-dark-border shadow-md backdrop-blur">
                        {label}
                      </span>
                    </motion.span>
                  </div>
                ))}
              </motion.div>

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
                className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 md:-right-3 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center text-beach-100 text-[10px] sm:text-xs md:text-sm font-bold shadow-lg ring-4 ring-surface dark:ring-dark-bg"
              >
                Wahaj
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;