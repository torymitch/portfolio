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
            {{updateType}} User
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
            <v-text-field label="First Name" variant="outlined" v-model="updUser.firstName"></v-text-field>
          </v-row>
        </v-col>
         <v-col>
          <v-row>
            <v-text-field label="Last Name" variant="outlined" v-model="updUser.lastName"></v-text-field>
          </v-row>
         </v-col>
         <v-col>
          <v-row>
            <v-text-field label="User Name" variant="outlined" v-model="updUser.userName"></v-text-field>
          </v-row>
         </v-col>
         <v-col>
          <v-row>
            <v-text-field label="Email" variant="outlined" v-model="updUser.emailAddress"></v-text-field>
          </v-row>
         </v-col>
         <v-col>
          <v-row>
            <v-text-field label="Phone No" variant="outlined" v-model="updUser.phoneNumber"></v-text-field>
          </v-row>
         </v-col>
        </section>

        <footer class="modal-footer">
          <div class="d-flex">
            <button
                v-if="user.id === undefined" 
                type="button"
                class="btn-green"
                @click="createUser"
              >
                Add User
            </button>
            <button
              v-else
              type="button"
              class="btn-green"
              @click="editUser"
            >
              Edit User
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

export default {
    props: {
      updateType: String,
      user: Object
    },
    mounted() {
      if (this.user?.id) {
        this.updUser = {...this.user}
      }
      this.loaded = true
    },
    data() {
        return {
          updUser: {},
          loaded: false,
        }
    },
    emits: ['closeModal', 'createUser', 'editUser'],
    methods: {
      close() {
        this.$emit('closeModal')
      },
      createUser() {
        this.$emit('createUser', this.updUser);
      },  
      editUser() {
        this.$emit('editUser', this.updUser)
      }
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