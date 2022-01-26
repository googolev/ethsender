import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { initDirectives } from './directives/index'

export const app = createApp(App)

initDirectives()

app.mount('#app')
