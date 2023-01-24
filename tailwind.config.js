/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      keyframes: {
        'show-from-top': {
          from: { transform: 'translateY(-110%)' },
          to: { transform: 'translateY(0%)' },
        },
        'show-from-bottom': {
          from: { transform: 'translateY(110%)' },
          to: { transform: 'translateY(0%)' },
        },
        'show-from-center': {
          from: { width: '6rem', height: '6rem' },
          to: { width: '24rem', height: '24rem' },
        },
        'hide-to-top': {
          from: { transform: 'translateY(0%)' },
          to: { transform: 'translateY(-150%)' },
        },
        'hide-to-bottom': {
          from: { transform: 'translateY(0%)' },
          to: { transform: 'translateY(110%)' },
        },
        'hide-to-center': {
          from: { width: '24rem', height: '24rem' },
          to: { width: '6rem', height: '6rem' },
        },
      },
      animation: {
        'show-from-top': 'show-from-top 0.6s ease-in-out',
        'show-from-bottom': 'show-from-bottom 0.6s ease-in-out',
        'show-from-center': 'show-from-center 0.6s ease-in-out',
        'hide-to-top': 'hide-to-top 0.6s ease-in-out',
        'hide-to-bottom': 'hide-to-bottom 0.6s ease-in-out',
        'hide-to-center': 'hide-to-center 0.6s ease-in-out',
      },
    },
  },

  plugins: [],
};
