/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0a0f',
          secondary: '#13141f',
        },
        accent: {
          primary: '#6366f1', // Indigo
          secondary: '#a855f7', // Purple
          tertiary: '#ec4899', // Pink
        },
        text: {
          primary: '#f8fafc',
          secondary: '#94a3b8',
          tertiary: '#64748b',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
        },
        glass: {
          bg: 'rgba(20, 20, 30, 0.6)',
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'btn-primary': '0 4px 15px rgba(99, 102, 241, 0.3)',
        'btn-primary-hover': '0 6px 20px rgba(168, 85, 247, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'blob-1': 'float 10s ease-in-out infinite',
        'blob-2': 'float 10s ease-in-out infinite -5s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '33%': { transform: 'translate(30px, -50px)' },
          '66%': { transform: 'translate(-20px, 20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
