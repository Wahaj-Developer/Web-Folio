import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext.jsx';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg hover:bg-primary-tint dark:hover:bg-primary-tint-dark transition-colors text-text-muted dark:text-text-muted-dark ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;