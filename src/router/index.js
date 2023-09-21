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
      path: '/lists/new',
      name: 'newlist',
      component: () => import('../views/NewGameListView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/lists/:id',
      name: 'details',
      component: () => import('../views/GameListView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    }
  ]
})

export default router
