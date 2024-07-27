<template>
    <v-app>
    <v-container v-if="loaded">
        <v-data-table 
            :headers="headers"
            :items="users"
            :items-per-page="usersPerPage"
            density="compact"
            :item-key="users.userName"
        >
    </v-data-table>
    </v-container>
  </v-app>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            loaded: false,
            info: '',
            headers: [
                { title: 'First Name', value: 'firstName' },
                { title: 'Last Name', value: 'lastName' },
                { title: 'User Name', value: 'userName' },
                { title: 'Phone', value: 'phone' },
            ],
            usersPerPage: 5,
        }
    },
    computed: {
        ...mapState(['users']),
        ...mapActions(['fetchUsers']),
    },
    async created() {
        await this.fetchUsers
    },
    async mounted() {
        this.loaded = true
    },
}

</script>
