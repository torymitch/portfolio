<template>
  <div class="modal-backdrop">
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
            <v-text-field label="First Name" variant="outlined" v-model="updUser.first_name"></v-text-field>
          </v-row>
         </v-col>
         <v-col>
          <v-row>
            <v-text-field label="Last Name" variant="outlined" v-model="updUser.last_name"></v-text-field>
          </v-row>
         </v-col>
        </section>

        <footer class="modal-footer">
          <div class="d-flex">
            <button 
                v-if="updateType=== 'Add'"
                type="button"
                class="btn-green"
                @click="createUser"
              >
                {{updateType}} User
            </button>
            <button
              v-else-if="updateType=== 'Edit'"
              type="button"
              class="btn-green"
              @click="edit"
            >
              {{updateType}} User
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
      user: Object,
    },
    data() {
        return {
          updUser: {},
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
      update() {
        this.$emit('createUser')
      },
      edit() {
        this.$emit('editUser')
      }
    }
}
</script>
<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 50%;
    background-color: transparent;
    background-color: black;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee; 
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

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