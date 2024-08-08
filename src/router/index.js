import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import PortfolioHome from '../components/Portfolio/PortfolioHome.vue'
import WatchList from '../components/Watchlist/WatchList.vue'
import AddWatchList from '../components/Watchlist/AddWatchList.vue'
import AboutView from '../components/AboutView.vue'
import Users from '../components/Users/AllUsers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'homePage',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
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
      path: '/addWatchList',
      name: 'addWatchList',
      component: AddWatchList
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    }
  ]
})

export default router
