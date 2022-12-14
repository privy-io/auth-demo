const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 0.7s ease-in-out infinite',
        'bounce-short': 'bounce 0.8s ease-in-out 2.5',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {transform: 'rotate(-15deg)'},
          '50%': {transform: 'rotate(15deg)'},
        },
      },
      fontFamily: {
        sans: ['Adelle Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        privurple: '#696FFD',
        privurpleaccent: '#7075D2',
        coral: '#FF8271',
        lightgray: '#D1D5DB',
        coralaccent: '#FB6956',
        'privy-navy': '#160B45',
        'privy-light-blue': '#EFF1FD',
        'privy-blueish': '#D4D9FC',
        'privy-pink': '#FF8271',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
