import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MobileCarousel = ({
  children,
  gridClassName = 'md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6',
  itemClassName = '',
  label = 'Carousel',
}) => {
  const trackRef = useRef(null);
  const frame = useRef(0);
  const [active, setActive] = useState(0);

  const items = Children.toArray(children);
  const count = items.length;

  // Work out which slide is closest to the centre of the track
  const updateActive = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const middle = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDistance = Infinity;

    Array.from(el.children).forEach((child, i) => {
      const distance = Math.abs(child.offsetLeft + child.offsetWidth / 2 - middle);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });

    setActive(best);
  }, []);

  const handleScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(updateActive);
  };

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // If the list changes (e.g. skeleton -> real data) reset to the first slide
  useEffect(() => {
    const el = trackRef.current;
    if (el) el.scrollLeft = 0;
    setActive(0);
  }, [count]);

  const goTo = (index) => {
    const el = trackRef.current;
    if (!el) return;

    const next = Math.max(0, Math.min(count - 1, index));
    const child = el.children[next];
    if (!child) return;

    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  const slideClass = (i) =>
    typeof itemClassName === 'function' ? itemClassName(i) : itemClassName;

  return (
    <div>
      {/* Track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className={`
          relative flex gap-3 overflow-x-auto snap-x snap-mandatory overscroll-x-contain no-scrollbar
          -mx-4 sm:-mx-6 px-[8vw] sm:px-[20vw] pb-3 pt-1
          focus-visible:outline-none
          md:mx-0 md:px-0 md:pb-0 md:pt-0 md:overflow-visible md:snap-none
          ${gridClassName}
        `}
      >
        {items.map((child, i) => (
          <div
            key={child.key ?? i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className={`
              snap-center shrink-0 w-[84vw] sm:w-[60vw] flex
              transition-all duration-500 ease-out
              [&>*]:w-full [&>*]:min-w-0
              md:w-auto md:shrink md:min-w-0
              ${
                i === active
                  ? 'scale-100 opacity-100'
                  : 'scale-[0.95] opacity-60 md:scale-100 md:opacity-100'
              }
              ${slideClass(i)}
            `}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Controls (mobile only) */}
      {count > 1 && (
        <div className="md:hidden flex items-center justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border dark:border-dark-border text-text-main dark:text-text-main-dark bg-surface dark:bg-dark-card active:scale-90 transition disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center" role="tablist" aria-label={`${label} slides`}>
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className="h-6 px-[3px] flex items-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-6 bg-primary dark:bg-primary-dark'
                      : 'w-2 bg-clr-mist/60 dark:bg-clr-mist/40'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === count - 1}
            aria-label="Next"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border dark:border-dark-border text-text-main dark:text-text-main-dark bg-surface dark:bg-dark-card active:scale-90 transition disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileCarousel;