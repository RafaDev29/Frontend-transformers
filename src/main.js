import { createApp } from 'vue'
import App from './App.vue'
import { vuetify } from '@/plugins/vuetify'
import './styles/tailwind.css'
import router from './router';
import eventBus from './plugins/eventBus';
import icons from './plugins/icons' 
const app = createApp(App)
app.config.globalProperties.$bus = eventBus;
app.config.globalProperties.$icons = icons 
app.use(vuetify)
app.use(router)

app.mount('#app')