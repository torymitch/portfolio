import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PortfolioHome from '../views/Portfolio/PortfolioHome.vue'
import WatchList from '../views/Portfolio/WatchList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/portfolioHome',
      name: 'portfolioHome',
      component: PortfolioHome
    },
    {
      path: '/watchList',
      name: 'watchList',
      component: WatchList
    }
  ]
})

export default router
