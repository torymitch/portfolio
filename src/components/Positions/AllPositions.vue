<template>
    <v-container v-if="loaded" class="table" >
        <v-btn text="Add Position" @click="showAddEditPosition"></v-btn>
        <v-data-table 
            class="elevation-1 overflow-y-auto"
            :headers="headers"
            :items="positions"
            :items-per-page="positionsPerPage"
            density="compact"
            :item-key="positions.id"
            :search="search"
            next-icon
        >
            <template v-slot:item="row">
            <tr>
                <td>{{row.item.name}}</td>
                <td>{{row.item.symbol}}</td>
                <td>{{row.item.shares}}</td>
                <td>{{row.item.price}}</td>
                <td>{{getTotal(row.item)}}</td>
                <td>{{row.item.cost}}</td>
                <td>
                    <v-btn
                        class="me-2 action-btn"
                        dark
                        small
                        @click="showEditPosition(row.item)"
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
                    <v-btn
                        class="me-2 action-btn"
                        dark
                        small
                        @click="addPurchase(row.item)"
                    >
                        <v-icon>mdi-plus-box</v-icon>
                    </v-btn> 
                    <v-btn
                        class="me-2 action-btn"
                        dark
                        small
                        :disabled="saleDisabled(row.item)"
                        @click="addSale(row.item)"
                    >
                        <v-icon>mdi-minus-box</v-icon>
                    </v-btn> 
                </td>
            </tr>
            </template>
        </v-data-table>
        <add-edit-position-modal v-if="showPositionModal"
            @closeModal="closeModal"
            @createPosition="createPosition"
            @editPosition="editPosition"
            header="Add Position"
            :position="position"
        />
        <confirm-delete v-if="showDeleteModal"
            :message="deleteMsg"
            entity="Position"
            @removePosition="removePosition"
            @closeModal="closeModal"
        />
        <purchase-modal v-if="showPurchaseModal"
            :position="position"
            @savePurchase="savePurchase"
            @closeModal="closeModal"
        />
        <sell-modal v-if="showSellModal"
            :position="position"
            @saveSell="saveSell"
            @closeModal="closeModal"
        />
    </v-container>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';
import AddEditPositionModal from './AddEditPositionModal.vue';
import ConfirmDelete from '../confirmations/ConfirmDelete.vue';
import PurchaseModal from './PurchaseModal.vue';
import SellModal from './SellModal.vue'

export default {
    components : {
        AddEditPositionModal,
        ConfirmDelete,
        PurchaseModal,
        SellModal,
    },

    data() {
        return {
            loaded: false,
            info: '',
            headers: [
                { title: 'Name', value: 'name', sortable: true, key: 'name' },
                { title: 'Symbol', value: 'symbol', sortable: true },
                { title: 'Shares', value: 'shares', sortable: true },
                { title: 'Price', value: 'price', sortable: true },
                { title: 'Total' },
                { title: 'Cost', value: 'cost' },
                { title: 'Actions', value: 'actions' },
            ],
            positionsPerPage: 5,
            actions: [],
            showPortfolioModal: false,
            showPositionModal: false,
            showDeleteModal: false,
            showPurchaseModal: false,
            showSellModal: false,
            updateType: 'Add',
            position: {},
            deleteMsg: 'Are you sure you would like to delete this position?  <p>This action can not be undone!',
            search: ''
        }
    },
    computed: {
        ...mapState(['positions', 'searchString'])
    },
    async created() {
        await this.fetchPositions()
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
        ...mapActions(['addPosition', 'addBuy', 'addSell', 'fetchPosition', 'fetchPositions', 'updatePosition', 'deletePosition']),
        ...mapMutations(['setSearchString']),
        closeModal() {
            this.showDeleteModal = false
            this.showPortfolioModal = false
            this.showPositionModal = false
            this.showPurchaseModal = false
            this.showSellModal = false
            this.updateType = 'Add'
            this.user = {}
        },
        showAddEditPosition(position) {
            this.position = position 
            this.showPositionModal = true
        },
        showEditPosition(position) {
            this.updateType = 'Edit'
            this.showAddEditPosition(position)
        },
        async createPosition(position) {
            await this.addPosition(position)
                .then( this.closeModal() )
        },
        async editPosition(position) {
            await this.updatePosition(position)
                .then( this.closeModal() )
        },
        confirmDelete(position) {
            this.position = position
            this.showDeleteModal = true
        },
        async removePosition() {
            await this.deletePosition(this.position)
            .then( this.closeModal() )
        },
        addPurchase(position) {
            this.position = position
            this.showPurchaseModal = true
        },
        saleDisabled(position) {
            if (!position.shares) {
                return true 
            } 
            return false
        },
        addSale(position) {
            this.position = position
            this.showSellModal = true
        },
        savePurchase(buy) {
            this.addBuy(buy)
            this.showPurchaseModal = false
        },
        saveSell(sell) {
            this.addSell(sell)
            this.showSellModal = false
        },
        getTotal(item) {
            return item.shares * item.price;
        }
    },
}

</script>
<style scoped lang="scss">
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
