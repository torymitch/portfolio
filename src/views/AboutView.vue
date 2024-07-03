<template>
  <div class="about">
    <h1 class="pr-5">This is an about page</h1>
    <v-btn @click="raiseAlert" >Display Details</v-btn>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  data() {
        return {
            name: 'Tory Mitchell',
        }
    },
  computed: {
        today() {
          return new Date()
        },
        displayProfile() {
         return `Created On ${this.today} by ${this.name}`;
        }
    },
  methods: {
      raiseAlert() {
        toast(this.displayProfile, {
          autoClose: 1000,
        });
    },
    mounted() {
        console.log('Application mounted');
    },
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
