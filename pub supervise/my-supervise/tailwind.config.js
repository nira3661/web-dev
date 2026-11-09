/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        sand: {
          50: '#faf8f5',
          100: '#f5f1ec',
          150: '#eee9e1',
          200: '#e4ddd3',
          300: '#d4cabb',
          400: '#b8a994',
          500: '#9a8b76',
          600: '#7d6f5c',
          700: '#5c5244',
          800: '#3d372e',
          900: '#2a2520',
        },
        leaf: {
          50: '#f0f6f1',
          100: '#e0ede3',
          200: '#c5dccb',
          300: '#a5c9b0',
          400: '#72ab82',
          500: '#4d8f60',
          600: '#3a7349',
          700: '#2f5c3c',
          800: '#274a32',
          900: '#1e3a28',
        },
        plum: {
          50: '#f5f0f8',
          100: '#ece4f2',
          200: '#ddd0e8',
          300: '#c7b3d9',
          400: '#a98bc2',
          500: '#8b68a8',
          600: '#6f4f8b',
          700: '#5a3f72',
          800: '#47335b',
          900: '#362847',
        },
        clay: {
          50: '#faf2f0',
          100: '#f5e5e1',
          400: '#c97070',
          500: '#b85858',
          600: '#a04545',
          700: '#843a3a',
        },
        honey: {
          50: '#fdf8ed',
          100: '#faf0d5',
          200: '#f3e0b0',
          400: '#d4a042',
          500: '#c08d2f',
          600: '#a67a28',
        },
      }
    }
  },
  plugins: [],
}