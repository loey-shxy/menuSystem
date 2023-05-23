import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index'
import '@/assets/scss/index.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())
    .use(router)
    .mount('#app')
