import { motion } from 'framer-motion';

// Edit skills here. Every page that shows skills uses this one component.
const groups = [
  {
    title: 'frontend',
    items: [
      'React',
      'HTML',
      'CSS',
      'JavaScript',
      'Redux',
      'Tailwind CSS',
      'SCSS',
      'shadcn/ui',
      'Bootstrap',
    ],
  },
  {
    title: 'backend',
    items: ['Node.js', 'Express', 'MongoDB', 'Rest APIs'],
  },
  {
    title: 'tools',
    items: [
      'Git',
      'GitHub',
      'Cursor AI',
      'Figma',
      'VS Code',
      'GitHub Copilot',
      'Claude AI',
      'ImageKit',
    ],
  },
  {
    title: 'learning',
    note: 'currently learning & focusing on',
    items: [
      'TypeScript',
      'Next.js',
      'System Design',
      'Data Structures & Algorithms (DSA)',
      'Personal Branding',
      'Advanced JavaScript',
    ],
  },
];

const Group = ({ group, delay }) => (
  <motion.section
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.45, delay }}
    className="space-y-2.5"
  >
    <h3 className="font-mono font-semibold text-clr-mist">
      <span aria-hidden="true" className="text-clr-pearl/50">
        &gt;{' '}
      </span>
      {group.title}/
      {group.note && (
        <span className="ml-2 font-normal text-clr-pearl/60"># {group.note}</span>
      )}
    </h3>

    <ul className="flex flex-wrap gap-1.5 sm:gap-2">
      {group.items.map((skill) => (
        <li
          key={skill}
          className="px-2 py-1 rounded border border-clr-mist/25 bg-clr-pearl/5 text-clr-pearl cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:bg-clr-burgundy hover:border-clr-burgundy"
        >
          {skill}
        </li>
      ))}
    </ul>
  </motion.section>
);

const SkillsSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="relative mx-auto max-w-4xl"
  >
    {/* soft glow behind the floating card */}
    <div
      aria-hidden="true"
      className="absolute -inset-3 sm:-inset-5 -z-10 rounded-3xl bg-gradient-to-br from-clr-burgundy/25 via-transparent to-clr-mist/30 blur-2xl"
    />

    <div className="animate-bob">
      <div
        role="group"
        aria-label="Skills and technologies"
        className="overflow-hidden rounded-xl border border-clr-mist/30 bg-clr-slate dark:bg-black/25 text-clr-pearl font-mono shadow-[0_28px_60px_-24px_rgba(47,54,63,0.65)] dark:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.7)]"
      >
        {/* title bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-clr-mist/20 bg-clr-pearl/5">
          <span aria-hidden="true" className="flex gap-1.5">
            <i className="block w-3 h-3 rounded-full bg-clr-burgundy" />
            <i className="block w-3 h-3 rounded-full bg-clr-mist" />
            <i className="block w-3 h-3 rounded-full bg-clr-sand" />
          </span>
          <span className="text-[11px] sm:text-xs text-clr-mist truncate">
            wahaj@portfolio: ~/skills
          </span>
        </div>

        {/* body */}
        <div className="p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
          <p>
            <span aria-hidden="true" className="text-clr-mist">$ </span>
            ls skills/
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {groups.map((group, i) => (
              <Group key={group.title} group={group} delay={i * 0.08} />
            ))}
          </div>

          <p aria-hidden="true">
            <span className="text-clr-mist">$ </span>
            <span className="cursor-blink" />
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default SkillsSection;