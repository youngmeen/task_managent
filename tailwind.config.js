/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['EliceDigitalBaeum', 'Noto Sans KR', 'NanumSquare', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        baemin: ['EliceDigitalBaeum', 'sans-serif'],
      },
      colors: {
        dark: {
          primary: '#111827',   // gray-900
          secondary: '#1f2937', // gray-800
          accent: '#3b82f6',    // blue-500
          text: {
            primary: '#f9fafb',   // gray-50
            secondary: '#e5e7eb', // gray-200
            accent: '#93c5fd',    // blue-300
          },
          border: '#374151',      // gray-700
        },
      },
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
        'dark': '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.6)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.6)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}