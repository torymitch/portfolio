<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn @click="raiseAlert">What Is This About</v-btn>
  </div>
</template>

<script>
export default {
  data() {
        return {
            name: 'Tory',
            age: 0,
        }
    },
  computed: {
        displayProfile() {
         return `My name is ${this.name} and i am ${this.age}`;
        }
    },
  methods: {
      raiseAlert() {
         alert(this.displayProfile)   
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
