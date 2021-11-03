module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      20: '5rem',
    },
    maxHeight: {
      '4/5': '80%',
      '1/2-screen': '50vh',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
