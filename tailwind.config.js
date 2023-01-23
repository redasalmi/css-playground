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
      },
      animation: {
        'show-from-top': 'show-from-top 0.6s ease-in-out',
        'show-from-bottom': 'show-from-bottom 0.6s ease-in-out',
        'show-from-center': 'show-from-center 0.6s ease-in-out',
      },
    },
  },

  plugins: [],
};
