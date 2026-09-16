import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const galleryPhotos = [
  { id: 1, image: '/gallery/moment.jpeg', caption: 'Sketching out a new project idea', fit: 'cover' },
  { id: 2, image: '/gallery/meme1.png', caption: 'Jealousy Driven Development', fit: 'contain' },
  { id: 3, image: '/gallery/editing.png', caption: 'Editing a project demo video', fit: 'cover' },
  { id: 4, image: '/gallery/meme2.png', caption: 'Surviving the tech industry', fit: 'cover' },
  { id: 5, image: '/gallery/notes.jpeg', caption: 'Studying DSA & JS core concepts', fit: 'contain' },
  { id: 6, image: '/gallery/late.jpeg', caption: 'Late night setup & desk vibe', fit: 'cover' },
];

const SocialGallery = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, galleryPhotos.length - 1));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(index);
  };

  return (
    <div>
      {/* Hides the native scrollbar on the mobile carousel track below */}
      <style>{`
        .gallery-scroll::-webkit-scrollbar { display: none; }
        .gallery-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* =========================
          DESKTOP / TABLET — GRID
      ========================== */}
      <div className="hidden sm:grid grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {galleryPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative block rounded-2xl overflow-hidden card-hover"
          >
            <div className="aspect-square w-full overflow-hidden bg-gray-100 dark:bg-dark-border">
              <img
                src={photo.image}
                alt={photo.caption}
                loading="lazy"
                className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                  photo.fit === 'contain' ? 'object-contain' : 'object-cover'
                }`}
              />
            </div>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

            <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white text-xs sm:text-sm font-medium leading-tight">
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* =========================
          MOBILE — TESTIMONIAL-STYLE SWIPE CAROUSEL
      ========================== */}
      <div className="sm:hidden">
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="gallery-scroll flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
          >
            {galleryPhotos.map((photo) => (
              <div key={photo.id} className="snap-center shrink-0 w-full">
                <div className="mx-1 rounded-2xl overflow-hidden card">
                  <div className="aspect-square w-full overflow-hidden bg-gray-100 dark:bg-dark-border">
                    <img
                      src={photo.image}
                      alt={photo.caption}
                      loading="lazy"
                      className={`w-full h-full ${
                        photo.fit === 'contain' ? 'object-contain' : 'object-cover'
                      }`}
                    />
                  </div>
                  <p className="text-center text-sm text-text-muted dark:text-text-muted-dark py-3 px-3">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next arrows */}
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            aria-label="Previous photo"
            className="absolute left-1 top-[38%] -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-dark-card/90 shadow-md text-primary dark:text-primary-dark disabled:opacity-30"
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            aria-label="Next photo"
            className="absolute right-1 top-[38%] -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-dark-card/90 shadow-md text-primary dark:text-primary-dark disabled:opacity-30"
            disabled={activeIndex === galleryPhotos.length - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {galleryPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to photo ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-6 bg-primary dark:bg-primary-dark'
                  : 'w-2 bg-gray-300 dark:bg-dark-border'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialGallery;