import { useEffect, useState } from 'react';

const OnThisPage = ({ content }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (!content) return;

    const headingRegex = /^#{2,4}\s+(.+)$/gm;
    const matches = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[0].split(' ')[0].length;
      const text = match[1];
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      matches.push({ level, text, id });
    }

    setHeadings(matches);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-20">
      <div className="card p-5">
        <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          On This Page
        </h4>
        <nav className="space-y-1">
          {headings.map((heading, index) => (
            <a
              key={index}
              href={`#${heading.id}`}
              className={`block text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                heading.level === 3 ? 'pl-4' : ''
              } ${heading.level === 4 ? 'pl-8' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default OnThisPage;
