/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#E21826',
        secondary: '#BA0012',
        accent: '#FFE504',
      },
    },
  },
  plugins: [],
};
