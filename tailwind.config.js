/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-pink': '#ff2a6d',
        'cyber-blue': '#05d9e8',
        'cyber-purple': '#7700ff',
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': { 'text-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #05d9e8, 0 0 40px #05d9e8' },
          'to': { 'text-shadow': '0 0 20px #fff, 0 0 30px #ff2a6d, 0 0 40px #ff2a6d, 0 0 50px #ff2a6d' },
        },
      },
    },
  },
  plugins: [],
};