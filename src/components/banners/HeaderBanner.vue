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
                v-show="!isHidden(item)"
                v-for="(item, i) in navItems"
                :key="i"
              >
                <v-btn 
                  @click="navigate(item.route)">
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

        <v-btn v-if="!showSearch"  @click="displaySearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-text-field v-else
          class="search-field"
          v-model="searchString"
          placeholder="Search"
          width="20%"
          prepend-inner-icon="mdi-database-search-outline"
          append-inner-icon="mdi-magnify"
          @click:append-inner="hideSearch"
          
        >
        </v-text-field>

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
import { mapMutations } from 'vuex';

export default {
    data() {
      return {
        navItems: [
          { title: 'Home', icon: 'mdi-home-export-outline', route: '/home' },
          { title: 'Portfolio', icon: 'mdi-cash', route: '/portfolioHome' },
          { title: 'Watchlist', icon: 'mdi-watch', route: '/watchList' },
          { title: 'Users', icon: 'mdi-account', route: '/users' },
          { title: 'About', icon: 'mdi-help', route: '/about' },
        ],
        showSearch: false,
        searchString: ''
      }
    },
    watch: {
      searchString (val) {
        this.fetchEntriesDebounced(val)
      }
    },
    methods: {
      ...mapMutations(['setSearchString']),
      navigate(route) {
        this.searchString = ''
        this.hideSearch()
        this.$router.push(route)
      },
      isHidden (route) {
        return this.$router.currentRoute.value.fullPath === route.route
      },
      navHome() {
        this.$router.push('/')
      },
      displaySearch() {
        this.showSearch = true
      },
      hideSearch() {
        this.showSearch = false
      },
      fetchEntriesDebounced(val) {
        setTimeout(() => {
          this.setSearchString(val)
        }, 1000)
      },
    }
}
</script>

<style scoped>
.v-input.v-input--horizontal.v-input--center-affix.v-input--density-default.v-theme--dark.v-locale--is-ltr.v-text-field.search-field {
  height: 70px;
  margin-top: 15px;
}
</style>
