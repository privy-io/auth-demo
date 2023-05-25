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
        // sans: ['Adelle Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'privy-color-background': 'var(--privy-color-background)',
        'privy-color-background-2': 'var(--privy-color-background-2)',

        'privy-color-foreground': 'var(--privy-color-foreground)',
        'privy-color-foreground-2': 'var(--privy-color-foreground-2)',
        'privy-color-foreground-3': 'var(--privy-color-foreground-3)',
        'privy-color-foreground-4': 'var(--privy-color-foreground-4)',
        'privy-color-foreground-accent': 'var(--privy-color-foreground-accent)',

        'privy-color-accent': 'var(--privy-color-accent)',
        'privy-color-accent-light': 'var(--privy-color-accent-light)',
        'privy-color-accent-dark': 'var(--privy-color-accent-dark)',

        'privy-color-success': 'var(--privy-color-success)',
        'privy-color-error': 'var(--privy-color-error)',

        privurple: '#696FFD',
        privurpleaccent: '#4f56ea',
        coral: '#FF8271',
        lightgray: '#D1D5DB',
        coralaccent: '#FB6956',
        'privy-navy': '#160B45',
        'privy-light-blue': '#EFF1FD',
        'privy-blueish': '#D4D9FC',
        'privy-pink': '#FF8271',
      },
      backgroundImage: {
        'conic-gradient': "url('/images/conic-gradient.jpg')",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
