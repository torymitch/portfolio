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
            Delete User
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="cancelDelete"
            aria-label="Close"
          >
            x
          </button>
        </header>

        <section class="modal-body">
          <div v-html=message></div>
        </section>

        <footer class="modal-footer">
          <div class="d-flex">
            <button
                type="button"
                class="btn-green"
                @click="isConfirmed"
              >
                Delete User
            </button>
              <button
                type="button"
                class="btn-green ml-4"
                @click="cancelDelete"
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

export default {
    props: {
        message: { 
            type: String,
            required: true
        },
    },

    created() {
      this.isActive = true
    },

    data() {
        return {
            confirmed: false,
            isActive: false,
        }
    },

    emits: ['removeUser', 'closeModal'],

    methods: {
        isConfirmed() {
            this.isActive = false
            this.$emit('removeUser')
        },
        cancelDelete() {
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