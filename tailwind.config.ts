import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Source Sans Pro', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Custom ShipFast-inspired color palette
        'sf-bg': '#212121',           // Full-page background
        'sf-button': '#febc38',       // All button backgrounds
        'sf-text-bold': '#cfcfcf',    // Bold text
        'sf-highlight': '#d2cbc7',    // Highlight box background
        'sf-text-subtle': '#e8e8e8',  // Subtitle text (dark off-white)
        'sf-text-muted': '#b8b8b8',   // Muted text
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(254, 188, 56, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(254, 188, 56, 0.5)',
          },
        },
        'slide-down': {
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(-100%)',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-down': 'slide-down 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          primary: '#febc38',
          secondary: '#febc38',
          accent: '#febc38',
          neutral: '#212121',
          'base-100': '#212121',
          'base-200': '#2a2a2a',
          'base-300': '#3a3a3a',
          info: '#3b82f6',
          success: '#10b981',
          warning: '#febc38',
          error: '#ef4444',
        },
      },
    ],
    darkTheme: 'dark',
  },
};
export default config;