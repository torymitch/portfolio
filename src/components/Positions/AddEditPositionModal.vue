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
              <v-text-field label="Name" variant="outlined" v-model="updPosition.name"></v-text-field>
            </v-row>
          </v-col>
           <v-col>
            <v-row>
              <v-text-field label="Symbol" variant="outlined" v-model="updPosition.symbol"></v-text-field>
            </v-row>
           </v-col>
           <v-col>
            <v-row>
              <v-text-field label="Price" variant="outlined" v-model="updPosition.price"></v-text-field>
            </v-row>
           </v-col>
          </section>
  
          <footer class="modal-footer">
            <div class="d-flex">
              <button
                v-if="position.id === undefined"
                  type="button"
                  class="btn-green"
                  @click="createPosition"
                >
                  Add Position
              </button>
              <button
                v-else
                type="button"
                class="btn-green"
                @click="editPosition"
              >
                Edit Position
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
        header: String,
        position: Object,
      },
      mounted() {
        if (this.position?.id) {
          this.updPosition = {...this.position}
        }
        this.loaded = true
      },
      data() {
          return {
            updPosition: {},
            loaded: false,
          }
      },
      emits: ['closeModal', 'createPosition', 'editPosition'],
      methods: {
        close() {
          this.$emit('closeModal')
        },
        createPosition() {
          this.$emit('createPosition', this.updPosition);
        },  
        editPosition() {
          this.$emit('editPosition', this.updPosition)
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