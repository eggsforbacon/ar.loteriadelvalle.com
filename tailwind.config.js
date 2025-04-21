/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#E21826',
        'primary-light': '#FF5C5C',
        'primary-dark': '#A30000',
        secondary: '#BB0014',
        accent: '#FEE503',
        background: '#FFFFFF',
        surface: '#F7F2FA',
        'on-surface': '#000000',
      },
    },
  },
  plugins: [],
};