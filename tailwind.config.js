/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        dark: '#212123', // Добавленный цвет
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}