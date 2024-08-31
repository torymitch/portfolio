<template>
    <v-container v-if="loaded" class="table" >
         {{ getAccountInfo(accountPositions, 'name') }}
        <v-data-table 
            class="elevation-1 overflow-y-auto"
            :headers="headers"
            :items="accountPositions"
            :items-per-page="accountPositionsPerPage"
            density="compact"
            :item-key="accountPositions.id"
            :search="search"
            next-icon
        >
            <template v-slot:item="row">
            <tr>
                <td>{{ getPositionInfo(row.item, 'name') }}</td>
                <td>{{ getPositionInfo(row.item, 'symbol') }}</td>
                <td>{{ getBuyInfo(row.item, 'shares') }}</td>
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

        <confirm-delete v-if="showDeleteModal"
            :message="deleteMsg"
            entity="Account"
            @removeAccount="removeAccount"
            @closeModal="closeModal"
        />
        
    </v-container>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';
// import AddEditAccountPositionModal from './AddEditAccountPositionModal.vue';
import ConfirmDelete from '../confirmations/ConfirmDelete.vue';
// import { toast } from 'vue3-toastify';
// import 'vue3-toastify/dist/index.css';

export default {
    components : {
        // AddEditAccountPositionModal,
        ConfirmDelete,
    },

    data() {
        return {
            loaded: false,
            info: '',
            headers: [
                { title: 'Name', value: 'position_name', sortable: true },
                { title: 'Symbol', value: 'position_symbol', sortable: true },
                { title: 'Shares', value: 'buy_shares', sortable: true },
                { title: 'Actions', value: 'actions' },
            ],
            accountPositionsPerPage: 5,
            actions: [],
            showAccountPositionModal: false,
            showDeleteModal: false,
            updateType: 'Add',
            accountPosition: {},
            deleteMsg: 'Are you sure you would like to delete this position?  <p>This action can not be undone!',
            search: '',
            account: {},
        }
    },
    computed: {
        ...mapState(['accountPositions', 'accounts', 'positions', 'buys', 'searchString']),
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
        await this.fetchAccountPositionsByAccountId(this.$route.params.id)
        if (!this.buys.length) {
            await this.fetchBuysByAccountId(this.$route.params.id)
        }
        if (!this.accounts.length) {
            await this.fetchAccounts()
        }
        if (!this.positions.length) {
            await this.fetchPositions()
        }
        
    },
    mounted() {    
        this.loaded = true
    },
    beforeUnmount() {
      if (this.search !== '') {
        this.setSearchString('')
      }
    },
    methods: {
        ...mapActions(['fetchAccountPositions', 'fetchAccountPositionsByAccountId', 'fetchBuysByAccountId', 'fetchSalesByAccountIdAndPositionId', 'fetchAccounts', 'fetchPositions', 'fetchBuys', 'fetchBuysByAccountIdAndPositionId', 'deleteAccountPosition']),
        ...mapMutations(['setSearchString']),
        getAccountInfo(item, field) {
            if (this.accounts.length) {
                let account = this.accounts.find(account => account.id === parseInt(this.$route.params.id))
                return account[field]   
            }
        },
        getPositionInfo(item, field) {
            if (this.positions.length) {
                let position = this.positions.find(position => position.id === item.positionId)
                return position[field]
            }
        },
        async getBuyInfo(item, field) {
            if (this.buys.length) {
                let buy = this.buys.find(buy => buy.positionId === item.positionId)
                return buy[field]
            }
            
        },
        confirmDelete(accountPosition) {
            this.accountPosition = accountPosition
            this.showDeleteModal = true
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