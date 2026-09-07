import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Code2, X } from 'lucide-react';


const STORAGE_KEY = 'wf_audience_prompt_dismissed';
const SHOW_DELAY_MS = 2500;

const AudienceRecommendation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let alreadyDismissed = false;

    try {
      alreadyDismissed = localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      // localStorage can throw in some privacy modes; treat as "not
      // dismissed" rather than crashing the page over a nice-to-have.
    }

    if (alreadyDismissed) return;

    const timer = setTimeout(() => setIsVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore write failures (e.g. privacy mode) — worst case it shows
      // again next visit, which isn't harmful.
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          role="dialog"
          aria-label="Choose your path"
          className="
            fixed
            bottom-4
            left-4
            right-4
            sm:left-auto
            sm:right-6
            sm:bottom-6
            sm:w-[380px]
            z-50
          "
        >
          <div className="card relative p-5 sm:p-6 shadow-xl">
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="
                absolute
                top-3
                right-3
                flex
                items-center
                justify-center
                w-7
                h-7
                rounded-full
                text-text-muted
                dark:text-text-muted-dark
                hover:text-text-main
                dark:hover:text-white
                hover:bg-gray-100
                dark:hover:bg-dark-card
                transition-colors
              "
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base sm:text-lg font-semibold text-text-main dark:text-text-main-dark pr-6 mb-1">
              New here? Pick your path.
            </h3>

            <p className="text-sm text-text-muted dark:text-text-muted-dark mb-4 leading-relaxed">
              Get straight to what's relevant to you.
            </p>

            <div className="flex flex-col gap-2.5">
              <Link
                to="/blog?type=case-study"
                onClick={dismiss}
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-lg
                  bg-primary-tint
                  dark:bg-primary-tint-dark
                  hover:bg-primary/15
                  dark:hover:bg-primary-dark/20
                  text-primary
                  dark:text-primary-dark
                  text-sm
                  font-medium
                  transition-colors
                "
              >
                <Briefcase className="w-4 h-4 shrink-0" />
                I'm a recruiter — read Case Studies
              </Link>

              <Link
                to="/blog?type=documentation"
                onClick={dismiss}
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-lg
                  border
                  border-border
                  dark:border-dark-border
                  hover:bg-gray-50
                  dark:hover:bg-dark-card
                  text-text-main
                  dark:text-text-main-dark
                  text-sm
                  font-medium
                  transition-colors
                "
              >
                <Code2 className="w-4 h-4 shrink-0" />
                I'm a developer — read Documentation
              </Link>
            </div>

            <button
              type="button"
              onClick={dismiss}
              className="w-full text-center text-xs text-text-muted dark:text-text-muted-dark hover:underline mt-3.5"
            >
              Maybe later
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudienceRecommendation;