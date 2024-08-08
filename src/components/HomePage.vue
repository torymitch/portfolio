<template>
  <main>
    <WelcomeItem>
      <template #icon>
        <v-icon icon="mdi-cash"></v-icon>
      </template>
      <RouterLink to="/portfolioHome">Portfolio</RouterLink>
      Select this link to see your accounts
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
      <RouterLink to="/about">About</RouterLink>
      Select to learn details about the application
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
          { title: 'Portfolio', icon: 'mdi-cash', route: '/portfolioHome' },
          { title: 'Watchlist', icon: 'mdi-watch', route: '/watchList' },
          { title: 'Users', icon: 'mdi-account', route: '/users' },
          { title: 'About', icon: 'mdi-menu', route: '/about' },
        ],
      }
    },
}
</script>
