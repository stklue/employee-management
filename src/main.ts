import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import UUID from 'vue3-uuid'
import App from './App.vue'
import router from './router'
import VueGravatar from "vue3-gravatar";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(UUID)
app.use(VueGravatar);


app.mount('#app')
