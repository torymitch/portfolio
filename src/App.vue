<template>
  <v-container>
  <HeaderBanner />
  <RouterView />
  <!-- <FooterBanner /> -->
</v-container>
</template>

<script>
import HeaderBanner from './components/banners/HeaderBanner.vue'
import { RouterView } from 'vue-router'
// import FooterBanner from './components/banners/FooterBanner.vue'

export default {
    components : {
      HeaderBanner,
      RouterView,
      // FooterBanner,
    },
}

</script>

<style scoped>
</style>
