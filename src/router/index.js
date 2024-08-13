import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import Accounts from '../components/Account/AllAccounts.vue'
import Positions from '../components/Positions/AllPositions.vue'
import AccountPositions from '../components/Account/AccountPositions.vue'
import WatchList from '../components/Watchlist/WatchList.vue'
import AddWatchList from '../components/Watchlist/AddWatchList.vue'
import ContactUs from '../components/ContactUs.vue'
import Users from '../components/Users/AllUsers.vue'
import UserPositions from '../components/Users/UserPositions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: HomePage
    },
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/home',
      component: HomePage
    },
    {
      path: '/accounts',
      component: Accounts,
    },
    {
      path: '/accounts/:id',
      component: AccountPositions,
    },
    {
      path: '/contactUs',
      component: ContactUs
    },
    {
      path: '/positions',
      component: Positions
    },
    {
      path: '/watchList',
      component: WatchList
    },
    {
      path: '/addWatchList',
      component: AddWatchList
    },
    {
      path: '/users',
      component: Users
    },
    {
      path: '/user/:id',
      component: UserPositions,
    },
  ]
})

export default router
