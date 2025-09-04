// main.js
import { createApp } from 'vue'
import App from './App.vue'

// Plugins y estilos
import { vuetify } from '@/plugins/vuetify'
import './styles/tailwind.css'
import router from './router'
import eventBus from './plugins/eventBus'
import icons from './plugins/icons'

// Pinia
import { createPinia } from 'pinia'

// Interceptores
import { installInterceptors } from '@/services/api/interceptors'

// 📊 ApexCharts
import VueApexCharts from "vue3-apexcharts"

// Crear app y store global
const app = createApp(App)
const pinia = createPinia()

// Registrar Pinia y router
app.use(pinia)
app.use(router)
app.use(vuetify)

// Registrar ApexCharts como componente global
app.component("ApexChart", VueApexCharts)


// Instalar interceptores después de tener Pinia
installInterceptors(pinia)

// Cargar sesión de usuario
import { useAuthStore } from '@/features/auth/stores/authStore'
const auth = useAuthStore(pinia)
auth.loadSession()

// Variables globales
app.config.globalProperties.$bus = eventBus
app.config.globalProperties.$icons = icons

// Montar app
app.mount('#app')
