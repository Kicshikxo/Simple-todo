import Home from '@/pages/Home.vue'
import Todos from '@/pages/Todos.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/todos',
            name: 'todos',
            component: Todos
        }
    ]
})

export default router
