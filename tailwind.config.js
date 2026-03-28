/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffdf6',
          100: '#fff8e9',
          200: '#ffefcf'
        },
        quest: {
          green: '#36a56f',
          blue: '#4f80ff',
          orange: '#ff9f45',
          dark: '#223042'
        }
      },
      boxShadow: {
        soft: '0 8px 20px rgba(34,48,66,0.08)'
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.96)', opacity: '0.7' },
          '50%': { transform: 'scale(1.04)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        floatUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-24px)', opacity: '0' }
        },
        pulseBar: {
          '0%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.1)' },
          '100%': { filter: 'brightness(1)' }
        }
      },
      animation: {
        pop: 'pop 360ms ease-out',
        float: 'floatUp 900ms ease-out forwards',
        pulseBar: 'pulseBar 450ms ease-in-out'
      }
    }
  },
  plugins: []
};
