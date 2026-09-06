
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  darkMode: 'class',

  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Brand
        primary: '#D70F64',
        'primary-hover': '#B00C52',

        'primary-dark': '#FF2B7A',
        'primary-dark-hover': '#E01563',

        // Brand tints
        'primary-tint': '#FFF0F5',
        'primary-tint-dark': '#2D121E',

        // Light mode
        card: '#F9FAFB',
        border: '#E5E7EB',

        'text-main': '#1F2937',
        'text-muted': '#6B7280',

        // Dark mode
        'dark-bg': '#0D0B0D',
        'dark-card': '#171217',
        'dark-border': '#30252B',

        'text-main-dark': '#F8FAFC',
        'text-muted-dark': '#A8A0A5',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },

        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },

  plugins: [],
};
