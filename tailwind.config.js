/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        7: '1.75rem', // 28px
        17: '4.5rem', // 72px
      },
      margin: {
        54: '13.5rem', // 216px
      },
      fontFamily: {
        unbounded: ['var(--font-unbounded)'],
        manrope: ['var(--font-manrope)'],
      },
      keyframes: {
        slide: {
          '0%, 7%, 93%, 100%': {
            transform: 'translate3d(0px 0px 0px)',
          },
          '50%': {
            transform: 'translate3d(0px, -1095px, 0px)',
          },
        },
      },
      animation: {
        slide: 'slide 20s infinite',
      },
    },
    colors: {
      primary: {
        DEFAULT: '#FED18C',
        600: '#CBA770',
        700: '#987D54',
      },
      blue: '#1746A2',
      white: {
        DEFAULT: '#FFF',
        600: '#C6C6C6',
        200: '#2D2D2D',
        100: '#999999',
      },
      black: {
        DEFAULT: '#000',
      },
      grey: {
        DEFAULT: '#111111',
        900: '#1A1A1A',
        800: '#121212',
        700: '#131313',
        500: '#444444',
        400: '#171616',
        300: '#868686',
        200: '#1F1F1F',
        150: '#3F3F3F',
        100: '#0F0E0E',
      },
    },
    fontSize: {
      'really-sm': '0.75rem', // 12px
      sm: '0.8125rem', // 13px
      'semi-sm': ['0.875rem', '145%'], // 14px
      base: '1rem', // 16px
      p2: ['1.125rem', '140%'], // 18px
      'md-small': ['1.25rem', '140%'], // 20px
      md: ['1.5rem', '150%'], // 24px
      lg: ['2rem', '120%'], // 32px
      '2xl': ['2.5rem', '120%'], // 40px
      xl: ['4.0625rem', '120%'], // 65px
    },
  },
  safelist: [
    'before:w-[20%]',
    'before:w-[25%]',
    'before:w-[40%]',
    'before:w-[50%]',
    'before:w-[60%]',
    'before:w-[75%]',
    'before:w-[80%]',
    'before:w-[100%]',
  ],
  plugins: [],
};
