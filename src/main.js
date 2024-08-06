import { createApp } from 'vue'
import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

// Components
import App from './App.vue'
import router from './router'
import store from './store/index.js'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
  // iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
  iconfont: 'md' // || 'mdi' || 'fa' || 'fa4'
})

createApp(App).use(vuetify).use(router).use(store).mount('#app')
