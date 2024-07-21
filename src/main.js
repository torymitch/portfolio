import { createApp } from 'vue'
import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'
import router from './router'
import store from './store/index.js'

import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  }
})

createApp(App).use(vuetify).use(router).use(store).use(mdiVue, { icons: mdijs }).mount('#app')
