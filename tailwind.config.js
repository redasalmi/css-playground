/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        cyberwayRider: ['Cyberway-Riders'],
      },
      keyframes: {
        'show-from-top': {
          from: { transform: 'translateY(-55vh)' },
          to: { transform: 'translateY(0)' },
        },
        'show-from-bottom': {
          from: { transform: 'translateY(55vh)' },
          to: { transform: 'translateY(0)' },
        },
        'show-from-center': {
          from: { width: '6rem', height: '6rem' },
          to: { width: '24rem', height: '24rem' },
        },
        'show-from-button': {
          from: {
            top: 'var(--btn-top)',
            left: 'var(--btn-left)',
            width: 'var(--btn-width)',
            height: 'var(--btn-height)',
            margin: 0,
          },
          to: {
            inset: 0,
            width: '24rem',
            height: '24rem',
            margin: 'calc(50vh - 24rem / 2) calc(50vw - 24rem / 2)',
          },
        },
        'hide-to-top': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-100vh)' },
        },
        'hide-to-bottom': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(100vh)' },
        },
        'hide-to-center': {
          from: { width: '24rem', height: '24rem' },
          to: { width: '6rem', height: '6rem' },
        },
        'hide-to-button': {
          from: {
            inset: 0,
            width: '24rem',
            height: '24rem',
            margin: 'calc(50vh - 24rem / 2) calc(50vw - 24rem / 2)',
          },
          to: {
            top: 'var(--btn-top)',
            left: 'var(--btn-left)',
            width: 'var(--btn-width)',
            height: 'var(--btn-height)',
            margin: 0,
          },
        },
      },
      animation: {
        'show-from-top': 'show-from-top 0.3s ease-in-out',
        'show-from-bottom': 'show-from-bottom 0.3s ease-in-out',
        'show-from-center': 'show-from-center 0.3s ease-in-out',
        'show-from-button': 'show-from-button 0.3s ease-in-out forwards',
        'hide-to-top': 'hide-to-top 0.3s ease-in-out',
        'hide-to-bottom': 'hide-to-bottom 0.3s ease-in-out',
        'hide-to-center': 'hide-to-center 0.3s ease-in-out',
        'hide-to-button': 'hide-to-button 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
};
