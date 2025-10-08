import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: '#0f172a',    
          surface: '#1e293b',       
          primary: '#1e7f14',       
          secondary: '#4d9f3f',     
          accent: '#059669',
          error: '#dc2626',
          warning: '#d97706',
          success: '#16a34a',
        },
      },
      light: {
        dark: false,
        colors: {
          background: '#ffffff',
          surface: '#f8fafc',       
          primary: '#1e7f14',
          secondary: '#4d9f3f',
          accent: '#059669',
          error: '#dc2626',
          warning: '#d97706',
          success: '#16a34a',
        },
      },
    },
  },
})