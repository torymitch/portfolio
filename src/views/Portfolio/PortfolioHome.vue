<template>
    Portfolio Is Under Construction
</template>

<script>
export default {
    async mounted() {
        const info = await this.$store.dispatch('getSystemInfo')
        alert(`Welcome To Your Portfolio.  You Have Visited ${this.$store.state.count} Times and The System Is ${info}`)
    },
}
</script>
