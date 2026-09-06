import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border dark:border-dark-border bg-white dark:bg-dark-bg">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-muted dark:text-text-muted-dark">
              © {currentYear} Dev Portfolio. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>

            <Link
              to="/contact"
              className="text-text-muted dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
              aria-label="Contact"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
