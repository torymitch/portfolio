<template>
  <main>
    <WelcomeItem>
      <template #icon>
        <v-icon icon="mdi-list-box"></v-icon>
      </template>
      <RouterLink to="/accounts">Accounts</RouterLink>
      Select this link to see your accounts
    </WelcomeItem>
    <WelcomeItem>
      <template #icon>
        <v-icon icon="mdi-cash"></v-icon>
      </template>
      <RouterLink to="/positions">Positions</RouterLink>
      Select this link to see your positions
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <v-icon icon="mdi-watch"></v-icon>
      </template>
      <RouterLink to="/watchList">Watch List</RouterLink>
      Select to choose a watch ist to view
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <v-icon icon="mdi-account"></v-icon>
      </template>
      <RouterLink to="/users">Users</RouterLink>
      Select to see users in the application
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <v-icon icon="mdi-help"></v-icon>
      </template>
      <RouterLink to="/contactUs">Contact Us</RouterLink>
      Select to ask a question about the application
    </WelcomeItem>
  </main>
</template>

<script>
import WelcomeItem from './WelcomeItem.vue'

export default {

  components : {
    WelcomeItem,
  },
  data() {
      return {
        navItems: [
          { title: 'Home', icon: 'mdi-home-export-outline', route: '/home' },
          { title: 'Account', icon: 'mdi-home-export-outline', route: '/account' },
          { title: 'Portfolio', icon: 'mdi-cash', route: '/positions' },
          { title: 'Watchlist', icon: 'mdi-watch', route: '/watchList' },
          { title: 'Users', icon: 'mdi-account', route: '/users' },
          { title: 'Contact us', icon: 'mdi-help', route: '/contactUs' },
        ],
      }
    },
}
</script>
