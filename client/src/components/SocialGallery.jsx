import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter,Instagrame , ArrowUpRight } from 'lucide-react';


const socials = [
 
    {
    name: 'Instagrame',
    handle: '@codewithwahaj',
    url: 'https://www.instagram.com/codewithwahaj/',
    icon: Instagrame,
    image: '/w.png',
  },
  {
    name: 'LinkedIn',
    handle: 'Wahaj Ahmed',
    url: 'https://www.linkedin.com/in/wahaj-a-212bb633b',
    icon: Linkedin,
    image: '/w.png',
  },
  {
    name: 'Twitter / X',
    handle: '@WahajAhmed82826',
    url: 'https://x.com/WahajAhmed82826',
    icon: Twitter,
    image: '/w.png',
  },
 
];

const SocialGallery = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
      {socials.map((social, index) => {
        const Icon = social.icon;

        return (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative block rounded-2xl overflow-hidden card-hover"
          >
            {/* Photo */}
            <div className="aspect-square w-full overflow-hidden bg-gray-100 dark:bg-dark-border">
              <img
                src={social.image}
                alt={`${social.name} profile`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Darkening hover overlay with the external-link cue */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <ArrowUpRight
                className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                strokeWidth={2.5}
              />
            </div>

            {/* Platform icon badge */}
            <div className="absolute top-2.5 right-2.5 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-dark-card shadow-md text-primary dark:text-primary-dark">
              <Icon className="w-4 h-4" />
            </div>

            {/* Name / handle */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white text-xs sm:text-sm font-semibold leading-tight">
                {social.name}
              </p>
              <p className="text-white/80 text-[11px] sm:text-xs leading-tight truncate">
                {social.handle}
              </p>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialGallery;