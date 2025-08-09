// tailwind.config.js - COLORES ADICIONALES RECOMENDADOS
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Tus colores actuales
        color1: '#1e7f14',
        color2: '#4d9f3f', 
        color3: '#7dbf6b',
        color4: '#acdf96',
        color5: '#dcffc2',
        colorDark1: '#145214',
        colorDark2: '#1a5e1a',
        colorDark3: '#266326',
        petroleum: '#0f3d3e',
        
     
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          primary: '#059669',   // Verde más profesional
          secondary: '#0891b2', // Azul complementario
          warning: '#d97706',   // Naranja para alertas
          danger: '#dc2626',    // Rojo para errores
          success: '#16a34a',   // Verde para éxito
        },
        neutral: {
          light: '#f8fafc',
          medium: '#64748b', 
          dark: '#1e293b',
        }
      },
    },
  },
  plugins: [],
}