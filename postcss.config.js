module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/postcss')  // Add this line to resolve the issue
  ],
};
