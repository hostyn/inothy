import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/views/**/*.{js,jsx,ts,tsx}',
    './src/services/**/*.{js,jsx,ts,tsx}',
  ],

  // Files to exclude
  exclude: [],

  globalCss: { extend: { 'button, a': { cursor: 'pointer' } } },

  // Useful for theme customization
  theme: {
    tokens: {
      colors: {
        white: { value: '#FFFFFF' },
        primary: {
          100: { value: '#DBE6F3' },
          200: { value: '#97C1F3' },
          300: { value: '#6095D4' },
          400: { value: '#2B5F9D' },
          500: { value: '#163D6B' },
          600: { value: '#103561' },
          700: { value: '#0D3059' },
          800: { value: '#0A2B52' },
          900: { value: '#08213F' },
        },
        red: {
          100: { value: '#FFE5EA' },
          200: { value: '#FFA1B2' },
          300: { value: '#F66E86' },
          400: { value: '#D93552' },
          500: { value: '#EA0029' },
          600: { value: '#B80020' },
          700: { value: '#9F001C' },
          800: { value: '#620011' },
          900: { value: '#330009' },
        },
        grey: {
          100: { value: '#E4E6E9' },
          200: { value: '#B2BAC3' },
          300: { value: '#838D99' },
          400: { value: '#616D7B' },
          500: { value: '#384453' },
          600: { value: '#283749' },
          700: { value: '#203146' },
          800: { value: '#172638' },
          900: { value: '#0F1C2D' },
        },
        green: {
          100: { value: '#E5FFF0' },
          200: { value: '#A1FFC7' },
          300: { value: '#6EF6A5' },
          400: { value: '#30F27E' },
          500: { value: '#06D358' },
          600: { value: '#00B84A' },
          700: { value: '#009F40' },
          800: { value: '#006227' },
          900: { value: '#003314' },
        },
      },

      spacing: {
        '2xs': { value: '2px' },
        xs: { value: '4px' },
        sm: { value: '8px' },
        md: { value: '16px' },
        lg: { value: '24px' },
        xl: { value: '32px' },
        '2xl': { value: '40px' },
        '3xl': { value: '48px' },
        '4xl': { value: '56px' },
        '5xl': { value: '64px' },
        '6xl': { value: '72px' },
        '7xl': { value: '80px' },
        '8xl': { value: '88px' },
        '9xl': { value: '96px' },
      },

      radii: {
        md: { value: '5px' },
        lg: { value: '15px' },
      },

      fontSizes: {
        xs: { value: '0.75rem' },
        sm: { value: '0.875rem' },
        md: { value: '1rem' },
        lg: { value: '1.25rem' },
        xl: { value: '1.5rem' },
        '2xl': { value: '2rem' },
        '3xl': { value: '2.5rem' },
        '4xl': { value: '3rem' },
        '5xl': { value: '3.5rem' },
        '6xl': { value: '4rem' },
      },

      sizes: {
        '9xs': { value: '1rem' },
        '8xs': { value: '1.25rem' },
        '7xs': { value: '1.5rem' },
        '6xs': { value: '2rem' },
        '5xs': { value: '2.5rem' },
        '4xs': { value: '3rem' },
        '3xs': { value: '3.5rem' },
        '2xs': { value: '4rem' },
        xs: { value: '4.5rem' },
        sm: { value: '6rem' },
        md: { value: '8rem' },
        lg: { value: '12rem' },
        xl: { value: '16rem' },
        '2xl': { value: '24rem' },
        '3xl': { value: '32rem' },
        '4xl': { value: '48rem' },
        '5xl': { value: '64rem' },

        '6xl': { value: '80rem' },
        '7xl': { value: '96rem' },
        '8xl': { value: '112rem' },
        '9xl': { value: '128rem' },
      },

      shadows: {
        regular: {
          value:
            'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
        },
      },
    },

    semanticTokens: {
      colors: {
        text: { value: '{colors.primary.500}' },
        error: { value: '{colors.red.400}' },
      },
    },

    extend: {
      keyframes: {
        slideDown: {
          from: {
            height: 0,
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },

        slideUp: {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: 0,
          },
        },

        dropDownClose: {
          from: {
            maxHeight: 'var(--dropdown-height)',
            maxWidth: '16rem',
            opacity: 1,
          },
          to: {
            maxHeight: 0,
            maxWidth: 0,
            opacity: 0,
          },
        },

        dropDownOpen: {
          from: {
            maxHeight: 0,
            maxWidth: 0,
            opacity: 0,
          },
          to: {
            maxHeight: 'var(--dropdown-height)',
            maxWidth: '16rem',
            opacity: 1,
          },
        },

        overlayShow: {
          from: {
            opacity: 0,
            backdropFilter: 'none',
          },
          to: {
            opacity: 1,
            backdropFilter: 'blur(2px)',
          },
        },

        overlayHide: {
          from: {
            opacity: 1,
            backdropFilter: 'blur(2px)',
          },
          to: {
            opacity: 0,
            backdropFilter: 'none',
          },
        },

        contentShow: {
          from: {
            opacity: 0,
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
          to: {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
          },
        },

        contentHide: {
          from: {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
          },
          to: {
            opacity: 0,
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
        },

        tabsShow: {
          '0%': {
            opacity: 0,
            transform: 'translateX(30px)',
          },
          '50%': {
            opacity: 0,
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: 1,
          },
        },

        tabsHide: {
          '0%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0,
            transform: 'translateX(-30px)',
          },
          '100%': {
            opacity: 0,
            transform: 'translateX(-30px)',
          },
        },

        tabsDisplay: {
          from: {
            display: 'flex',
          },
          to: {
            display: 'none',
          },
        },

        progressStart: {
          from: {
            width: 0,
          },
          to: {
            width: '100%',
          },
        },
      },
    },
  },

  jsxFramework: 'react',

  // The output directory for your css system
  outdir: './src/styled-system',
})
