<template>
    <div v-if="isActive" class="modal-backdrop">
        <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription">

        <header
            class="modal-header"
            id="modalTitle"
        >
            <slot name="header">
            Purchase {{ position.name  }}
            </slot>
            <button
            type="button"
            class="btn-close"
            @click="cancel"
            aria-label="Close"
            >
            x
            </button>
        </header>

        <section class="modal-body">
            <v-col>
            <v-row>
              <v-autocomplete
                label="Account"
                variant="outlined"
                v-model="buyOrder.accountId"
                :items="accounts"
                item-title="name"
                item-value="id">
              </v-autocomplete>
            </v-row>
          </v-col>
           <v-col>
            <v-row>
              <v-autocomplete
                label="Position"
                variant="outlined"
                v-model="buyOrder.positionId"
                :items="positions"
                item-title="name"
                item-value="id">
              </v-autocomplete>
            </v-row>
           </v-col>
           <v-col>
            <v-row>
              <v-text-field label="Shares Purchased" variant="outlined" v-model="buyOrder.shares"></v-text-field>
            </v-row>
           </v-col>
           <v-col>
            <v-row>
              <v-text-field label="Cost Per Share" variant="outlined" v-model="buyOrder.costPerShare"></v-text-field>
            </v-row>
           </v-col>
           <v-col>
            <v-row>
              <v-text-field label="Total Cost" variant="outlined" v-model="buyOrder.totalCost" readonly></v-text-field>
            </v-row>
           </v-col>
        </section>

        <footer class="modal-footer">
            <div class="d-flex">
            <button
                type="button"
                class="btn-green"
                @click="addBuy"
                >
                Add Buy
            </button>
                <button
                type="button"
                class="btn-green ml-4"
                @click="cancel"
                aria-label="Close"
                >
                Cancel
                </button>
            </div>
        </footer>
    </div>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
    props: {
        position: {
            type: Object,
            required: true
        }
    },

    async created() {
      this.updPosition = {...this.position}
      await this.fetchAccounts()
      await this.fetchPositions()
      this.buyOrder.position_id = this.position.id
      this.isActive = true
    },

    computed: {
        ...mapState(['accounts', 'positions']),
    },

    watch: {
      'buyOrder.shares': function () {
        this.calculateTotal()
      },
      'buyOrder.costPerShare': function () {
        this.calculateTotal()
      },
    },
    
    data() {
        return {
            updPosition: {},
            buyOrder: {},
            isActive: false,
        }
    },

    emits: ['savePurchase', 'closeModal'],

    methods: {
      ...mapActions(['fetchAccounts', 'fetchPositions']),
      
      addBuy() {
        this.$emit('savePurchase', this.buyOrder)
      },
      cancel() {
        this.$emit('closeModal')
      },
      calculateTotal() {
        if (this.buyOrder.shares && this.buyOrder.costPerShare) {
          this.buyOrder.totalCost = this.buyOrder.shares * this.buyOrder.costPerShare
        }
      }
    },
}
</script>

<style scoped>
  .modal {
    width: 25%;
  }
</style>