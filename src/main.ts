

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)

app.mount('#app')

const pinia = createPinia()
app.use(createPinia())

createApp(App).use(router).use(pinia).mount('#app')