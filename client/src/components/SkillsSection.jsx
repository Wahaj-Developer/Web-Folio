import { motion } from 'framer-motion';

const skills = {
  frontend: [
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

  backend: [
    'Node.js',
    'Express',
    'MongoDB',
    'Rest APIs'
  ],

  tools: [
    'Git',
    'GitHub',
    'Cursor AI',
    'Figma',
    'VS Code',
    'GitHub Copilot',
    'Claude AI',
    'ImageKit',
    'Squarespace',
  ],

  currently: [
    'TypeScript',
    'Next.js',
    'System Design',
    'Data Structures & Algorithms (DSA)',
    'Personal Branding',
    'Advanced JavaScript',
  ],
};

const SkillCategory = ({ title, items, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay,
    }}
    viewport={{
      once: true,
      margin: '-50px',
    }}
    className="space-y-3 sm:space-y-4"
  >
    {/* Category Title */}
    <h3 className="text-xs sm:text-sm font-semibold text-text-muted dark:text-text-muted-dark uppercase tracking-[0.12em]">
      {title}
    </h3>

    {/* Skills */}
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {items.map((skill) => (
        <span
          key={skill}
          className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300 border border-transparent dark:border-dark-border hover:bg-primary-tint dark:hover:bg-primary-tint-dark hover:text-primary dark:hover:text-primary-dark hover:border-primary/20 dark:hover:border-primary-dark/20 rounded-lg transition-all duration-200 cursor-default"
        >
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const SkillsSection = () => {
  return (
    <div className="space-y-7 sm:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7 sm:gap-x-8 sm:gap-y-9 lg:gap-x-12 lg:gap-y-10">
        <SkillCategory
          title="Frontend"
          items={skills.frontend}
          delay={0}
        />

        <SkillCategory
          title="Backend"
          items={skills.backend}
          delay={0.1}
        />

        <SkillCategory
          title="Tools"
          items={skills.tools}
          delay={0.2}
        />

        <SkillCategory
          title="Currently Learning & Focusing On"
          items={skills.currently}
          delay={0.3}
        />
      </div>
    </div>
  );
};

export default SkillsSection;