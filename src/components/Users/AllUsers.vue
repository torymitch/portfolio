<template>
    <v-container v-if="loaded" class="table" >
        <v-btn text="Add" @click="showAddEditUser"></v-btn>
        <v-data-table 
            class="elevation-1 overflow-y-auto"
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
                <td>{{row.item.emailAddress}}</td>
                <td>{{row.item.phoneNumber}}</td> 
                <td>
                    <v-btn
                        class="me-2 action-btn"
                        dark
                        small
                        @click="showEditUser(row.item)"
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                        class="me-2 action-btn"
                        dark
                        small
                        @click="confirmDelete(row.item)"
                    >
                    <v-icon>mdi-trash-can</v-icon>
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
        <confirm-delete v-if="showDeleteModal"
            :message="deleteMsg"
            @removeUser="removeUser"
            @closeModal="closeModal"
        />
    </v-container>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';
import AddEditUserModal from './AddEditUserModal.vue';
import ConfirmDelete from '../confirmations/ConfirmDelete.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components : {
        AddEditUserModal,
        ConfirmDelete,
    },

    data() {
        return {
            loaded: false,
            info: '',
            headers: [
                { title: 'First Name', value: 'firstName', sortable: true, key: 'firstName' },
                { title: 'Last Name', value: 'lastName', sortable: true },
                { title: 'User Name', value: 'userName', sortable: true },
                { title: 'Email', value: 'emailAddress', sortable: true },
                { title: 'Phone', value: 'phone' },
                { title: 'Actions', value: 'actions' },
            ],
            usersPerPage: 2,
            actions: [],
            showUserModal: false,
            showDeleteModal: false,
            updateType: 'Add',
            user: {},
            deleteMsg: 'Are you sure you would like to delete this user?  <p>This action can not be undone!'
        }
    },
    computed: {
        ...mapState(['users']),
        ...mapMutations(['setUser']),
    },
    async created() {
        await this.fetchUsers()
    },
    async mounted() {
        this.loaded = true
    },
    methods: {
        ...mapActions(['addUser', 'fetchUser', 'fetchUsers', 'updateUser', 'deleteUser']),
        closeModal() {
            this.showUserModal = false
            this.showDeleteModal = false
            this.updateType = 'Add'
            this.user = {}
        },
        showAddEditUser(user) {
            this.user = user 
            this.showUserModal = true
        },
        showEditUser(user) {
            this.updateType = 'Edit'
            this.showAddEditUser(user)
        },
        async createUser(user) {
            await this.addUser(user)
                .then(
                    toast('User Created Succesfully', {
                        autoClose: 1000,
                    }))
                .then( this.closeModal() )
        },
        async editUser(user) {
            await this.updateUser(user)
                .then(
                    toast('User Updated Succesfully', {
                        autoClose: 1000,
                    }))
                .then( this.closeModal() )
        },
        confirmDelete(user) {
            this.user = user
            this.showDeleteModal = true
        },
        async removeUser() {
            await this.deleteUser(this.user)
            .then(
                    toast('User Deleted Succesfully', {
                        autoClose: 1000,
                    }))    
            .then( this.closeModal() )
        },
    },
}

</script>
<style lang="scss">
.table{
    min-width: 100dvw;
}
.v-data-table-footer {
    padding-right: 150px !important;
}
.action-btn {
    border-width: inherit;
}
</style>
