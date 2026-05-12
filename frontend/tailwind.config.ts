/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef1f9',
          100: '#d5dbef',
          200: '#aab7df',
          300: '#8093cf',
          400: '#5570bf',
          500: '#3D5192',
          600: '#314175',
          700: '#253158',
          800: '#19213a',
          900: '#0c101d',
        },
        accent: {
          50: '#eef8eb',
          100: '#d5eece',
          200: '#abdd9d',
          300: '#82cc6c',
          400: '#6fc053',
          500: '#5EB348',
          600: '#4b8f3a',
          700: '#386b2b',
          800: '#26481d',
          900: '#13240e',
        },
        danger: {
          500: '#E52528',
          600: '#b81e20',
        },
        dark: {
          50: '#f5f5f5',
          100: '#e5e5e7',
          200: '#cbcccf',
          300: '#a1a2a6',
          400: '#76777c',
          500: '#4a4b50',
          600: '#38393d',
          700: '#2a2b2e',
          800: '#1E1E2E',
          900: '#151520',
          950: '#0d0d14',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'paw-walk': 'pawWalk 0.8s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pawWalk: {
          '0%': { transform: 'rotate(-3deg)' },
          '100%': { transform: 'rotate(3deg)' },
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #3D5192 0%, #5EB348 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1E1E2E 0%, #2a2b3e 100%)',
      },
    },
  },
  plugins: [],
};
