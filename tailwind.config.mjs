/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'display': ['Raleway']
    },
    extend: {
      colors: {
        primary: {
          light: '#14B8A6', // teal-500
          DEFAULT: '#0E7490', // teal-600
          dark: '#155E75', // teal-700
        },
        secondary: {
          light: '#38BDF8', // sky-400
          DEFAULT: '#0EA5E9', // sky-500
          dark: '#0284C7', // sky-700
        },
        accent: {
          light: '#FDE68A', // amber-200
          DEFAULT: '#F59E0B', // amber-500
          dark: '#B45309', // amber-700
        },
        neutral: {
          light: '#F9FAFB', // gray-50
          DEFAULT: '#374151', // gray-700
          dark: '#111827', // gray-900
        },
        success: {
          light: '#34D399', // emerald-400
          DEFAULT: '#10B981', // emerald-500
          dark: '#047857', // emerald-700
        }
      }
    },
  },
  plugins: [],
};
