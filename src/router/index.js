import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import PortfolioHome from '../views/Portfolio/PortfolioHome.vue'
import WatchList from '../views/Portfolio/WatchList.vue'
import CreateWatchList from '../views/Portfolio/CreateWatchList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage
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
    },
    {
      path: '/createWatchList',
      name: 'createWatchList',
      component: CreateWatchList
    }
  ]
})

export default router
