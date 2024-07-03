<template>
    Made It Here
</template>

<script>
export default {
    mounted() {
        alert(`Welcome To Your Portfolio.  You Have Visited ${this.$store.state.count} Times`)
    },
}
</script>
