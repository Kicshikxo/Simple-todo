import { createApp } from 'vue'

import App from '@/App.vue'

import vuetify from '@/plugins/vuetify'
import router from '@/router'
import { todoStore, todoStoreKey } from '@/store/todos'

import '@/assets/main.css'
import '@/assets/rubik.fontface.css'

const app = createApp(App)

app.use(vuetify).use(router).use(todoStore, todoStoreKey)

app.mount('#app')
