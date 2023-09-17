import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/lists',
      alias: '/browse',
      name: 'lists',
      component: () => import('../views/BrowseView.vue')
    },
    {
      path: '/lists/:id',
      name: 'listById',
      component: () => import('../views/GameListView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    }
  ]
})

export default router
