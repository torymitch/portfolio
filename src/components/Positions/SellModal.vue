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
            Sell {{ position.name  }}
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
                v-model="sellOrder.accountId"
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
                v-model="sellOrder.positionId"
                :items="positions"
                item-title="name"
                item-value="id">
              </v-autocomplete>
            </v-row>
           </v-col>
           <v-col>
            <v-row>
              <v-text-field label="Shares Sold" variant="outlined" v-model="sellOrder.shares"></v-text-field>
            </v-row>
           </v-col>
           <v-col>
            <v-row>
              <v-text-field label="Sold Price" variant="outlined" v-model="sellOrder.soldPrice"></v-text-field>
            </v-row>
           </v-col>
        </section>

        <footer class="modal-footer">
            <div class="d-flex">
            <button
                type="button"
                class="btn-green"
                @click="addSell"
                >
                Add Sell
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
      this.sellOrder.position_id = this.position.id
      this.isActive = true
    },

    computed: {
        ...mapState(['accounts', 'positions']),
    },

    data() {
        return {
            updPosition: {},
            sellOrder: {},
            isActive: false,
        }
    },

    emits: ['saveSell', 'closeModal'],

    methods: {
      ...mapActions(['fetchAccounts', 'fetchPositions']),
      
      addSell() {
        this.$emit('saveSell', this.sellOrder)
        },
        cancel() {
          this.$emit('closeModal')
        }
    },
}
</script>

<style scoped>
  .modal {
    width: 25%;
  }
</style>