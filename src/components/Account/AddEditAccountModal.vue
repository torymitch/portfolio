<template>
    <div v-if="loaded" class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
          <header
            class="modal-header"
            id="modalTitle"
          >
            <slot name="header">
              {{ header }} 
            </slot>
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close"
            >
              x
            </button>
          </header>
  
          <section
            class="modal-body"
            id="modalDescription"
          >
           <v-col>
            <v-row>
              <v-text-field label="Name" variant="outlined" v-model="updAccount.name"></v-text-field>
            </v-row>
          </v-col>
           <v-col>
            <v-row>
              <v-text-field label="Account Number" variant="outlined" v-model="updAccount.number"></v-text-field>
            </v-row>
           </v-col>
           <v-col>
            <v-row>
              <v-autocomplete
                label="User"
                variant="outlined"
                v-model="updAccount.user_id"
                :items="users"
                item-title="name"
                item-value="user_id">
              </v-autocomplete>
            </v-row>
           </v-col>
          </section>
  
          <footer class="modal-footer">
            <div class="d-flex">
              <button
                v-if="account.id === undefined"
                  type="button"
                  class="btn-green"
                  @click="createAccount"
                >
                  Add Account
              </button>
              <button
                v-else
                type="button"
                class="btn-green"
                @click="editAccount"
              >
                Edit Account
              </button>
                <button
                  type="button"
                  class="btn-green ml-4"
                  @click="close"
                  aria-label="Close"
                >
                  Close
                </button>
            </div>
          </footer> 
        </div>
      </div>
  </template>
  
  <script>
import { mapGetters } from 'vuex';
  
  export default {
      props: {
        header: String,
        account: Object,
      },
      async mounted() {
        if (this.account?.id) {
          this.updAccount = {...this.account}
        }
        if (!this.users.length) {
          this.users = await this.getUsersByFullName
        }
        this.loaded = true
      },
      data() {
          return {
            updAccount: {},
            users: [],
            loaded: false,
          }
      },
      emits: ['closeModal', 'createAccount', 'editAccount'],
      computed: {
        ...mapGetters(['getUsersByFullName']),
      },
      methods: {
        close() {
          this.$emit('closeModal')
        },
        createAccount() {
          this.$emit('createAccount', this.updAccount);
        },  
        editAccount() {
          this.$emit('editAccount', this.updAccount)
        },
        getUserFullName(userId) {
            let user = this.users.find(user => user.id === userId) 
            if (user !== undefined) {
                return `${user.firstName} ${user.lastName}`
            } else {
                return ''
            }
        },
      }
  }
  </script>
  <style>
    
    .btn-close {
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      font-size: 20px;
      padding: 10px;
      cursor: pointer;
      font-weight: bold;
      color: #4AAE9B;
      background: transparent;
    }
  
    .btn-green {
      color: white;
      background: #4AAE9B;
      border: 1px solid #4AAE9B;
      border-radius: 2px;
    }
  </style>