// tailwind.config.js
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        color1: '#1e7f14',
        color2: '#4d9f3f',
        color3: '#7dbf6b',
        color4: '#acdf96',
        color5: '#dcffc2',
      },
    },
  },
  plugins: [],
}
