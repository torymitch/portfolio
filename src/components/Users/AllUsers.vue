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
            <template v-slot:item="row">
            <tr>
                <td>{{row.item.firstName}}</td>
                <td>{{row.item.lastName}}</td>
                <td>{{row.item.userName}}</td>
                <td>{{row.item.phone}}</td> 
                <td>
                    <v-btn
                        class="me-2"
                        dark
                        small
                        icon="mdi-pencil"
                        @click="showAddEditUser(row.item)"
                    >
                        Edit
                    </v-btn>
                    <v-btn
                        class="me-2"
                        dark
                        small
                        @click="deleteUser(row.item)"
                    >
                        mdi-delete
                    </v-btn> 
                </td>
            </tr>
            </template>
        </v-data-table>
        <add-edit-user-modal v-if="showUserModal"
            @closeModal="closeModal"
            @createUser="createUser"
            @editUser="editUser"
            :user="user"
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
            user: {},
        }
    },
    computed: {
        ...mapState(['users']),
        ...mapMutations(['setUser']),
    },
    async created() {
        await this.fetchUsers()
        // await this.fetchUser
    },
    async mounted() {
        this.loaded = true
    },
    methods: {
        ...mapActions(['addUser', 'fetchUser', 'fetchUsers', 'updateUser', 'deleteUser']),
        closeModal() {
            this.showUserModal = false;
        },
        showAddEditUser(user) {
            this.closeModal()
            this.user = user 
            this.showUserModal = true
        },
        async createUser(user) {
            this.closeModal()
            await this.addUser(user)
            .then(await this.fetchUsers())
        },
        editUser(user) {
            this.closeModal()
            this.updateUser(user)
            this.user = {}
        },
        async deleteAUser(user) {
            await this.deleteUser(user)
            .then(await this.fetchUsers())
        },
    },
}

</script>
<style scoped>
.table{
    min-width: 100dvw;
}
</style>
