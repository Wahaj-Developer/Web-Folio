// Infinite scrolling strip. Pure decoration, items are plain text.
const items = [
  'React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Redux',
  'REST APIs', 'Next.js', 'TypeScript', 'Git', 'Figma', 'System Design',
];

const Marquee = () => {
  const row = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-border dark:border-dark-border bg-card/70 dark:bg-dark-card py-3"
    >
      <div className="flex w-max animate-marquee gap-8 sm:gap-12 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 sm:gap-12 text-sm font-medium text-text-muted dark:text-text-muted-dark"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-primary dark:bg-primary-dark" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
