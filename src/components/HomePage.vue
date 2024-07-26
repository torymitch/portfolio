<template>
  <main>
    <WelcomeItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <RouterLink to="/portfolioHome">Portfolio</RouterLink>
      Select this link to see your accounts
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <ToolingIcon />
      </template>
      <RouterLink to="/watchList">Watch List</RouterLink>
      Select to choose a watch ist to view
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <ToolingIcon />
      </template>
      <RouterLink to="/addWatchList">Create Watch List</RouterLink>
      Select to create a new watch list
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <ToolingIcon />
      </template>
      <RouterLink to="/about">About</RouterLink>
      Select to learn details about the application
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <ToolingIcon />
      </template>
      <RouterLink to="/">Don't Click Me</RouterLink>
      <v-btn class="ml-5" @click="raiseAlert">SpringBoot Back-End Test Call</v-btn>
    </WelcomeItem>
  </main>
</template>

<script>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import axios from 'axios'
import { toast } from 'vue3-toastify';

export default {

  components : {
    WelcomeItem,
    DocumentationIcon,
    ToolingIcon
  },
  data() {
      return {
        info: '',
      }
  },
  methods: {
    raiseAlert() {
      console.log('Made It Here - Test SB Call')
      axios
        .get('http://localhost:8080/getUser?lastName=Jones&firstname=Tim')
        .then(response => {
          toast(response.data, {
            autoClose: 1000,
          })
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    }
  }
}
</script>
