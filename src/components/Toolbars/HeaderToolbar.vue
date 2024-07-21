<template>
  <v-card>
    <!-- <v-card class="h-auto w-100 toolbar"> -->
    <mdicon name="menu" />
    <v-spacer />
    <mdicon name="account" />
  </v-card>
  <v-card class="h-auto w-100" color="grey-lighten-4" flat>
    <v-toolbar density="compact">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

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
    </v-toolbar>
  </v-card>
</template>

<style scoped>
.toolbar {
  background-color: rgb(255, 0, 30);
}
</style>
