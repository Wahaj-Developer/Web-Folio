import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Layers,
  FileText,
  Sparkles,
  Clapperboard,
  Rocket,
} from 'lucide-react';

import SEO from '../components/SEO.jsx';
import Magnetic from '../components/Magnetic.jsx';
import SkillsSection from '../components/SkillsSection.jsx';

/* ---------------------------------------------------------------
   EDIT HERE. Add, remove or re-order services, and set honest
   capability levels. level: 1 (learning) -> 5 (core strength).
---------------------------------------------------------------- */
const LEVELS = {
  5: 'Core strength',
  4: 'Very comfortable',
  3: 'Comfortable',
  2: 'Growing',
  1: 'Learning',
};

const services = [
  {
    icon: Layers,
    title: 'Full-Stack MERN Web Apps',
    goodFor: 'Products with logins, a database and a dashboard.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    level: 5,
    proof: 'Interview Copilot, Food View',
  },
  {
    icon: FileText,
    title: 'Portfolio, Blog & CMS Sites',
    goodFor: 'Personal brands and content sites you can edit yourself.',
    stack: ['React', 'Markdown', 'MongoDB', 'Admin dashboard'],
    level: 5,
    proof: 'This portfolio',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Web Tools',
    goodFor: 'Apps that use an AI model to review, generate or coach.',
    stack: ['React', 'Express', 'Gemini API'],
    level: 3,
    proof: 'AI Code Reviewer',
  },
  {
    icon: Clapperboard,
    title: 'Media & Content Apps',
    goodFor: 'Video or image sharing with uploads and profiles.',
    stack: ['React', 'Node.js', 'ImageKit', 'MongoDB'],
    level: 3,
    proof: 'Food View',
  },
  {
    icon: Rocket,
    title: 'Next.js & TypeScript Builds',
    goodFor: 'Fast, SEO-friendly sites. Still being learned.',
    stack: ['Next.js', 'TypeScript'],
    level: 2,
    proof: 'In progress',
  },
];

const steps = [
  { t: 'Talk', d: 'You tell me the goal and who it is for.' },
  { t: 'Scope', d: 'We agree on what gets built and what does not.' },
  { t: 'Build', d: 'I build it and show progress along the way.' },
  { t: 'Deliver', d: 'You get the code, a live site and a handover.' },
];

const ServiceCard = ({ service, index }) => {
  const { icon: Icon, title, goodFor, stack, level, proof } = service;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card card-hover group relative overflow-hidden p-5 sm:p-6 flex flex-col gap-4 w-full"
    >
      {/* sliding accent line */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-[3px] w-0 bg-clr-burgundy group-hover:w-full transition-all duration-500"
      />

      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-clr-mist/25 text-clr-burgundy dark:text-clr-mist transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
          <Icon className="w-5 h-5" />
        </span>
        <span className="badge badge-primary">{LEVELS[level]}</span>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
        <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
          {goodFor}
        </p>
      </div>

      {/* capability bar */}
      <div className="space-y-1.5" role="img" aria-label={`Capability ${level} out of 5`}>
        <motion.div
          className="flex gap-1.5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } } }}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-1.5 flex-1 rounded-full bg-clr-mist/25 overflow-hidden">
              <motion.div
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: n <= level ? 1 : 0, transition: { duration: 0.5 } } }}
                className="h-full origin-left rounded-full bg-clr-burgundy dark:bg-clr-mist"
              />
            </div>
          ))}
        </motion.div>
        <p className="text-xs text-text-muted dark:text-text-muted-dark">
          Capability: {level}/5
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {stack.map((t) => (
          <span
            key={t}
            className="px-2 py-1 text-[11px] sm:text-xs font-medium bg-surface dark:bg-dark-card text-text-main dark:text-text-main-dark border border-border dark:border-dark-border rounded-md"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-3 border-t border-border dark:border-dark-border flex items-center justify-between gap-3 text-sm">
        <span className="text-text-muted dark:text-text-muted-dark">
          Proof: <span className="font-medium text-text-main dark:text-text-main-dark">{proof}</span>
        </span>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1 font-medium text-primary dark:text-clr-mist hover:underline underline-offset-4 dark:hover:text-clr-pearl transition-colors shrink-0"
        >
          See work
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
};

const Services = () => (
  <>
    <SEO
      title="Services | Dev Portfolio"
      description="Types of websites and web apps I can build, and how capable I am at each."
    />

    {/* Header */}
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 right-0 w-[360px] h-[360px] rounded-full bg-clr-mist/30 dark:bg-clr-mist/10 blur-3xl animate-float" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <h1 className="heading-1">
            What I can <span className="text-primary dark:text-primary-dark">build for you</span>
          </h1>
          <p className="text-body mt-4 text-base sm:text-lg">
            The kinds of websites and apps I take on, with an honest read on how
            strong I am at each one. Every card points back to real work.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Grid */}
    <section className="pb-12 sm:pb-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 sm:gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`lg:col-span-2 flex ${
                services.length % 3 === 2 && i === services.length - 2 ? 'lg:col-start-2' : ''
              }`}
            >
              <ServiceCard service={s} index={i} />
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs sm:text-sm text-text-muted dark:text-text-muted-dark">
          Capability runs from 1 (still learning) to 5 (core strength).
        </p>
      </div>
    </section>

    {/* Skills */}
    <section className="pb-14 sm:pb-20">
      <div className="container">
        <h2 className="heading-2 text-center mb-2">Tools I work with</h2>
        <p className="text-body text-center mb-8 sm:mb-10">
          The stack behind every service above.
        </p>
        <SkillsSection />
      </div>
    </section>

    {/* How I work */}
    <section className="py-12 sm:py-16 bg-card/70 dark:bg-dark-card">
      <div className="container">
        <h2 className="heading-2 mb-8">How we would work together</h2>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((st, i) => (
            <motion.li
              key={st.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative pl-5 border-l-2 border-clr-mist"
            >
              <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-clr-burgundy ring-4 ring-card dark:ring-dark-bg" />
              <h3 className="font-semibold">{st.t}</h3>
              <p className="text-sm text-text-muted dark:text-text-muted-dark mt-1">{st.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>

    {/* CTA */}
    <section className="py-12 sm:py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="card p-6 sm:p-10 text-center"
        >
          <h2 className="heading-2 mb-3">Have something in mind?</h2>
          <p className="text-body max-w-lg mx-auto mb-6">
            Tell me what you want to build and I will tell you honestly if I am
            the right person for it.
          </p>
          <Magnetic className="inline-block">
            <Link to="/contact" className="btn-primary justify-center">
              Start a project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  </>
);

export default Services;