/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['EliceDigitalBaeum', 'Noto Sans KR', 'NanumSquare', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        baemin: ['EliceDigitalBaeum', 'sans-serif'],
      },
    },
  },
  plugins: [],
}