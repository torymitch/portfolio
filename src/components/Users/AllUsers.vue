<template>
    <v-container v-if="loaded" class="table" >
        <v-btn text="Add" @click="showAddEditUser"></v-btn>
        <v-data-table 
            class="elevation-1"
            :headers="headers"
            :items="users"
            :items-per-page="usersPerPage"
            density="compact"
            :item-key="users.userName"
            next-icon
        >
        </v-data-table>
        <add-edit-user-modal v-if="showUserModal"
            @closeModal="closeModal"
            @createUser="createUser"
            @editUser="editUser"
            :updateType="updateType"
        />
    </v-container>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';
import AddEditUserModal from './AddEditUserModal.vue';

export default {
    components : {
        AddEditUserModal,
    },

    data() {
        return {
            loaded: false,
            info: '',
            headers: [
                { title: 'First Name', value: 'firstName', sortable: true, key: 'firstName' },
                { title: 'Last Name', value: 'lastName', sortable: true },
                { title: 'User Name', value: 'userName', sortable: true },
                { title: 'Phone', value: 'phone' },
                { title: 'Actions', value: 'actions' },
            ],
            usersPerPage: 5,
            actions: [],
            showUserModal: false,
            updateType: 'Add',
        }
    },
    computed: {
        ...mapState(['users']),
        ...mapActions(['addUser', 'fetchUser', 'fetchUsers', 'updateUser']),
        ...mapMutations(['setUser']),
    },
    async created() {
        await this.fetchUsers
        // await this.fetchUser
    },
    async mounted() {
        this.loaded = true
    },
    methods: {
        closeModal() {
            this.showUserModal = false;
        },
        showAddEditUser() {
            this.showUserModal = true;
        },
        createUser(user) {
            this.addUser(user)
        },
        editUser(user) {
            this.updateUser(user)
        },
    },
}

</script>
<style scoped>
.table{
    min-width: 100dvw;
}
</style>
