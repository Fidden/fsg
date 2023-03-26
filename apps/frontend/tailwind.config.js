/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },
    extend: {
      fontFamily: {
        sans: ['Inter, sans-serif;'],
      },
      fontSize: {
        sm: ['12.8px', '150%'],
        md: ['14px', '150%'],
        prebase: ['15px', '150%'],
        base: ['16px', '150%'],
        lg: ['20px', '120%'],
        xl: ['25px', '120%'],
      },
      colors: {
        primary: {
          100: 'rgba(22, 22, 26, 1)',
          85: 'rgba(22, 22, 26, 0.85)',
          60: 'rgba(22, 22, 26, 0.6)',
          16: 'rgba(22, 22, 26, 0.16)',
          8: 'rgba(22, 22, 26, 0.08)',
          4: 'rgba(22, 22, 26, 0.04)',
          2: 'rgba(22, 22, 26, 0.02)',
        },
        brand: {
          100: 'rgba(255, 101, 52, 1)',
          60: 'rgba(255, 101, 52, 0.6)',
          4: 'rgba(255, 101, 52, 0.04)',
        },
        reverse_primary: {
          85: 'rgba(255, 255, 255, 0.85)',
        },
        accent_1: {
          100: 'rgba(39, 174, 96, 1)',
          10: 'rgba(39, 174, 96, 0.1)',
        },
        accent_2: {
          100: 'rgba(242, 153, 74, 1)',
          10: 'rgba(242, 153, 74, .1)',
        },
        accent_3: {
          100: 'rgba(235, 87, 87, 1)',
          10: 'rgba(235, 87, 87, .1)',
        },
        accent_4: {
          100: 'rgba(47, 128, 237, 1)',
          10: 'rgba(47, 128, 237, .1)',
        },
        accent_5: {
          100: 'rgba(187, 107, 217, 1)',
          10: 'rgba(187, 107, 217, .1)',
        },
      },
      boxShadow: {
        xl: '0px 2px 8px rgba(22, 22, 26, 0.1);',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
