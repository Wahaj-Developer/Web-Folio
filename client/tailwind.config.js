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
        // Design system tokens: Grey Beach & Burgundy
        'clr-slate': '#2F363F',
        'clr-burgundy': '#6E1423',
        'clr-sand': '#F4EFEA',
        'clr-mist': '#9BB7C3',
        'clr-pearl': '#FAF9F6',

        // Brand: burgundy (buttons) / ocean mist (links on dark)
        primary: '#6E1423',
        'primary-hover': '#5A101D',
        'primary-dark': '#9BB7C3',
        'primary-dark-hover': '#B4CAD3',

        // Tints
        'primary-tint': '#F4EFEA',
        'primary-tint-dark': 'rgba(155,183,195,0.14)',

        // Sand / mist helper scale (kept under the old "beach" name)
        beach: {
          50: '#FAF9F6',
          100: '#F4EFEA',
          200: 'rgba(155,183,195,0.35)',
          300: '#9BB7C3',
          400: '#9BB7C3',
        },

        // Light mode (Coastal Premium)
        surface: '#FAF9F6',
        card: '#F4EFEA',
        border: 'rgba(155,183,195,0.35)',
        'text-main': '#2F363F',
        'text-muted': 'rgba(47,54,63,0.82)',

        // Dark mode (Dusk & Dune)
        'dark-bg': '#2F363F',
        'dark-card': 'rgba(250,249,246,0.05)',
        'dark-border': 'rgba(155,183,195,0.28)',
        'text-main-dark': '#FAF9F6',
        'text-muted-dark': 'rgba(250,249,246,0.78)',

        // Neutral scales re-derived from pearl -> slate so nothing leaves the palette
        gray: {
          50: '#FAF9F6',
          100: '#F4EFEA',
          200: '#E6E6E4',
          300: '#D1D2D1',
          400: '#ADAFB0',
          500: '#8A8E91',
          600: '#6C7076',
          700: '#545960',
          800: '#3F464E',
          900: '#353C44',
          950: '#2F363F',
        },
        zinc: {
          50: '#FAF9F6',
          100: '#F4EFEA',
          200: '#E6E6E4',
          300: '#D1D2D1',
          400: '#ADAFB0',
          500: '#8A8E91',
          600: '#6C7076',
          700: '#545960',
          800: '#3F464E',
          900: '#353C44',
          950: '#2F363F',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        float: 'float 9s ease-in-out infinite',
        'float-slow': 'float 14s ease-in-out infinite reverse',
        marquee: 'marquee 38s linear infinite',
        bob: 'bob 7s ease-in-out infinite',
        'spin-slow': 'spin 22s linear infinite',
        orbit: 'orbit 26s linear infinite',
        'orbit-reverse': 'orbit 26s linear infinite reverse',
        shimmer: 'shimmer 5s linear infinite',
        ripple: 'ripple 4.5s ease-out infinite',
        drift: 'drift 10s ease-in-out infinite',
      },

      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '100%': { transform: 'scale(1.55)', opacity: '0' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) rotate(-6deg)', opacity: '0.5' },
          '50%': { transform: 'translate3d(10px,-22px,0) rotate(8deg)', opacity: '1' },
        },
        bob: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(30px,-40px,0) scale(1.08)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
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