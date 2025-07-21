import type { Config } from 'tailwindcss';

const config: Config = {
  // Dark mode configuration
  darkMode: ['class'],
  
  // Content paths for purging unused styles
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts}',
  ],
  
  // Future-proof configuration
  future: {
    hoverOnlyWhenSupported: true,
  },
  
  theme: {
    extend: {
      // Typography configuration for educational content
      fontFamily: {
        sans: ['Poppins', 'Source Sans Pro', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
        bengali: ['Kalpurush', 'SolaimanLipi', 'sans-serif'],
      },
      
      // Educational content color palette
      colors: {
        // Base colors
        'sf-bg': '#212121',           // Full-page background
        'sf-button': '#febc38',       // All button backgrounds
        'sf-text-bold': '#cfcfcf',    // Bold text
        'sf-highlight': '#d2cbc7',    // Highlight box background
        'sf-text-subtle': '#e8e8e8',  // Subtitle text (dark off-white)
        'sf-text-muted': '#b8b8b8',   // Muted text
        
        // Educational content specific colors
        grammar: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        question: {
          50: '#fefce8',
          100: '#fef3c7',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        
        // Level-specific colors
        hsc: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
        },
        ssc: {
          50: '#fdf4ff',
          100: '#fae8ff',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
        },
      },
      
      // Spacing for educational layouts
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Background patterns and gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-educational': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'pattern-dots': 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
        'pattern-grid': 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
      },
      
      // Border radius for educational components
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2rem',
      },
      
      // Box shadows for depth
      boxShadow: {
        'educational': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(254, 188, 56, 0.3)',
        'glow-strong': '0 0 30px rgba(254, 188, 56, 0.5)',
        'glow-hover': '0 0 40px rgba(254, 188, 56, 0.6)',
        'premium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'premium-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'glow-premium': '0 0 20px rgba(254, 188, 56, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-strong': '0 8px 32px 0 rgba(31, 38, 135, 0.5)',
      },
      
      // Animation keyframes
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
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'bounce-gentle': {
          '0%, 100%': {
            transform: 'translateY(-2px)',
          },
          '50%': {
            transform: 'translateY(0)',
          },
        },
        'pulse-educational': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.8',
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
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      
      // Animations
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.4s ease-out',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'pulse-educational': 'pulse-educational 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-down': 'slide-down 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
      
      // Typography scale
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      
      // Screen sizes for educational content
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  
  // Plugins
  plugins: [
    require('tailwindcss-animate'),
    require('daisyui'),
  ],
  
  // DaisyUI configuration
  daisyui: {
    themes: [
      {
        // Educational dark theme
        dark: {
          primary: '#febc38',
          'primary-focus': '#e6a832',
          'primary-content': '#212121',
          secondary: '#64748b',
          'secondary-focus': '#475569',
          'secondary-content': '#ffffff',
          accent: '#a855f7',
          'accent-focus': '#9333ea',
          'accent-content': '#ffffff',
          neutral: '#212121',
          'neutral-focus': '#1a1a1a',
          'neutral-content': '#cfcfcf',
          'base-100': '#212121',
          'base-200': '#2a2a2a',
          'base-300': '#3a3a3a',
          'base-content': '#cfcfcf',
          info: '#3b82f6',
          'info-content': '#ffffff',
          success: '#22c55e',
          'success-content': '#ffffff',
          warning: '#febc38',
          'warning-content': '#212121',
          error: '#ef4444',
          'error-content': '#ffffff',
        },
        // Educational light theme
        light: {
          primary: '#febc38',
          'primary-focus': '#e6a832',
          'primary-content': '#212121',
          secondary: '#64748b',
          'secondary-focus': '#475569',
          'secondary-content': '#ffffff',
          accent: '#a855f7',
          'accent-focus': '#9333ea',
          'accent-content': '#ffffff',
          neutral: '#f8fafc',
          'neutral-focus': '#f1f5f9',
          'neutral-content': '#1e293b',
          'base-100': '#ffffff',
          'base-200': '#f8fafc',
          'base-300': '#f1f5f9',
          'base-content': '#1e293b',
          info: '#3b82f6',
          'info-content': '#ffffff',
          success: '#22c55e',
          'success-content': '#ffffff',
          warning: '#febc38',
          'warning-content': '#212121',
          error: '#ef4444',
          'error-content': '#ffffff',
        },
      },
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: false,
    themeRoot: ':root',
  },
  
  // Safelist for dynamic classes
  safelist: [
    'animate-fade-in',
    'animate-fade-in-up',
    'animate-slide-in-right',
    'animate-bounce-gentle',
    'animate-pulse-educational',
    'text-grammar-500',
    'text-question-500',
    'text-hsc-500',
    'text-ssc-500',
    'bg-grammar-50',
    'bg-question-50',
    'bg-hsc-50',
    'bg-ssc-50',
    'border-grammar-500',
    'border-question-500',
    'border-hsc-500',
    'border-ssc-500',
  ],
};

export default config;