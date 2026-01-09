/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pure monochrome palette
        dark: {
          950: '#000000', // Pure black
          900: '#0a0a0a', // Almost black
          850: '#121212', // Dark charcoal
          800: '#1a1a1a', // Charcoal
          700: '#2a2a2a', // Dark gray
          600: '#404040', // Medium dark gray
          500: '#525252', // Medium gray
          400: '#737373', // Light medium gray
          300: '#a3a3a3', // Light gray
          200: '#d4d4d4', // Very light gray
          100: '#e5e5e5', // Off white gray
          50: '#f5f5f5',  // Almost white
        },
        white: {
          DEFAULT: '#ffffff',
          dark: '#fafafa',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSubtle: {
          '0%, 100%': { 
            opacity: '0.5',
            transform: 'scale(1)',
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #0a0a0a 0%, #2a2a2a 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}