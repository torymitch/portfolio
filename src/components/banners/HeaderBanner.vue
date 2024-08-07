<template>
    <v-card class="mx-auto" color="grey-lighten-3" max-width="448">
    <v-layout>
      <!-- image="https://picsum.photos/1920/1080?random" -->
      <v-app-bar
        color="teal-darken-4"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-menu" v-bind="props"></v-btn>
            </template>

            <v-list density="compact">
              <v-list-item
                v-for="(item, i) in navItems"
                :key="i"
              >
                <v-btn @click="navigate(item.route)">
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>

        <v-app-bar-title>Take Me To The Moon</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
    </v-layout>
  </v-card>
</template>

<script>
export default {
    data() {
      return {
        navItems: [
          { title: 'Home', icon: 'mdi-home-export-outline', route: '/home' },
          { title: 'Portfolio', icon: 'mdi-clock', route: '/portfolioHome' },
          { title: 'Watchlist', icon: 'mdi-clock', route: '/watchList' },
          { title: 'Users', icon: 'mdi-menu', route: '/users' },
          { title: 'About', icon: 'mdi-menu', route: '/about' },
        ],
      }
    },
    methods: {
      navigate(route) {
        this.$router.push(route)
      },
      navHome() {
        this.$router.push('/')
      },
    }
}
</script>
