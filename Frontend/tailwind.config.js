/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/react-datepicker/dist/**/*.js'
    ],
    theme: {
      extend: {
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        },
        backdropBlur: {
          xs: '2px',
        }
      },
    },
    darkMode: 'class',
    plugins: [],
  };
  