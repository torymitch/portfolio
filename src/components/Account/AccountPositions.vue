<template>
    <v-container v-if="loaded" class="table" >
        <v-btn text="Add" @click="showAddEditAccount"></v-btn>
        <v-data-table 
            class="elevation-1 overflow-y-auto"
            :headers="headers"
            :items="accounts"
            :items-per-page="accountsPerPage"
            density="compact"
            :item-key="account.name"
            :search="search"
            next-icon
        >
            <template v-slot:item="row">
            <tr>
                <td><a v-bind:href="`accounts/${row.item.number}`"> {{row.item.name}} </a></td>
                <td>{{row.item.number}}</td>
                <td><a v-bind:href="`user/${row.item.userId}`">{{ getUserFullName(row.item.userId) }}</a></td>
                <td>
                    <v-btn
                        class="me-2 action-btn"
                        dark
                        small
                        @click="showEditAccount(row.item)"
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
        <!-- <add-edit-account-modal v-if="showAccountModal"
            @closeModal="closeModal"
            @createAccount="createAccount"
            @editAccount="editAccount"
            :account="account"
            :updateType="updateType"
            modalTitle="Account"
        />
        <confirm-delete v-if="showDeleteModal"
            :message="deleteMsg"
            entity="Account"
            @removeAccount="removeAccount"
            @closeModal="closeModal"
        /> -->
    </v-container>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';
// import AddEditAccountModal from './AddEditAccountModal.vue';
// import ConfirmDelete from '../confirmations/ConfirmDelete.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components : {
        // AddEditAccountModal,
        // ConfirmDelete,
    },

    data() {
        return {
            loaded: false,
            info: '',
            headers: [
                { title: 'Name', value: 'name', sortable: true, key: 'name' },
                { title: 'Account No', value: 'number', sortable: true },
                { title: 'Owner', value: 'user_id', sortable: true },
                { title: 'Actions', value: 'actions' },
            ],
            accountsPerPage: 5,
            actions: [],
            showAccountModal: false,
            showDeleteModal: false,
            updateType: 'Add',
            account: {},
            deleteMsg: 'Are you sure you would like to delete this account?  <p>This action can not be undone!',
            search: ''
        }
    },
    computed: {
        ...mapState(['accounts', 'users', 'searchString']),
    },
    watch: {
      searchString (val) {
        if (!val) {
          this.search = ''
          return
        }
        this.search = val
        
      }
    },
    async created() {
        await this.fetchAccounts()
        await this.fetchUsers()
    },
    async mounted() {
        this.loaded = true
    },
    beforeUnmount() {
      if (this.search !== '') {
        this.setSearchString('')
      }
    },
    methods: {
        ...mapActions(['addAccount', 'fetchAccount', 'fetchAccounts', 'fetchUsers', 'updateAccount', 'deleteAccount']),
        ...mapMutations(['setSearchString']),
        closeModal() {
            this.showAccountModal = false
            this.showDeleteModal = false
            this.updateType = 'Add'
            this.account = {}
        },
        showAddEditAccount(account) {
            this.account = account 
            this.showAccountModal = true
        },
        showEditAccount(account) {
            this.updateType = 'Edit'
            this.showAddEditAccount(account)
        },
        async createAccount(account) {
            await this.addAccount(account)
                .then(
                    toast('Account Created Succesfully', {
                        autoClose: 1000,
                    }))
                .then( this.closeModal() )
        },
        async editAccount(account) {
            await this.updateAccount(account)
                .then(
                    toast('Account Updated Succesfully', {
                        autoClose: 1000,
                    }))
                .then( this.closeModal() )
        },
        confirmDelete(account) {
            this.account = account
            this.showDeleteModal = true
        },
        async removeAccount() {
            await this.deleteAccount(this.account)
            .then(
                    toast('Account Deleted Succesfully', {
                        autoClose: 1000,
                    }))    
            .then( this.closeModal() )
        },
        getUserFullName(userId) {
            let user = this.users.find(user => user.id === userId) 
            if (user !== undefined) {
                return `${user.firstName} ${user.lastName}`
            } else {
                return ''
            }
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