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
            aria-label="Close modal"
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
        </section>

        <footer class="modal-footer">
          <div v-if="updateType=== 'Add'">
            <button
              type="button"
              class="btn-green"
              @click="update"
            >
              {{updateType}} User
            </button>
          </div>
          <div v-else-if="updateType=== 'Edit'">
            <button
              type="button"
              class="btn-green"
              @click="edit"
            >
              {{updateType}} User
            </button>
          </div>
          <button
            type="button"
            class="btn-green"
            @click="close"
            aria-label="Close modal"
          >
            Close Modal
          </button>
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
    /* background: #FFFFFF; */
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 50%;
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
    /* border: 1px solid #4AAE9B; */
    border-radius: 2px;
  }
</style>