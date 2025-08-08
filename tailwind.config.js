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

        // Verdes oscuros
        colorDark1: '#145214',
        colorDark2: '#1a5e1a',
        colorDark3: '#266326',

        // Verde petróleo
        petroleum: '#0f3d3e', 
      },
    },
  },
  plugins: [],
}
