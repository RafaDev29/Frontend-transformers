
import { createApp } from 'vue'
import App from './App.vue'


import { vuetify } from '@/plugins/vuetify'
import './styles/tailwind.css'
import router from './router'
import eventBus from './plugins/eventBus'
import icons from './plugins/icons'


import { createPinia } from 'pinia'

import { installInterceptors } from '@/services/api/interceptors'

import VueApexCharts from "vue3-apexcharts"


const app = createApp(App)
const pinia = createPinia()


app.use(pinia)
app.use(router)
app.use(vuetify)

app.component("ApexChart", VueApexCharts)

installInterceptors(pinia)

import { useAuthStore } from '@/features/auth/stores/authStore'
const auth = useAuthStore(pinia)
auth.loadSession()

app.config.globalProperties.$bus = eventBus
app.config.globalProperties.$icons = icons

app.mount('#app')
