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
              {{ modalTitle }} 
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
              <v-text-field label="Rule" variant="outlined" v-model="updChecklist.rule"></v-text-field>
            </v-row>
          </v-col>
           <v-col>
            <v-row>
              <v-text-field label="Question" variant="outlined" v-model="updChecklist.question"></v-text-field>
            </v-row>
           </v-col>
           <v-col>
            <v-row>
              <v-text-field label="Example 1" variant="outlined" v-model="updChecklist.example_1"></v-text-field>
            </v-row>
           </v-col>
           <v-col>
            <v-row>
              <v-text-field label="Example 2" variant="outlined" v-model="updChecklist.example_2"></v-text-field>
            </v-row>
           </v-col>
           <v-col>
            <v-row>
              <v-text-field label="Example 3" variant="outlined" v-model="updChecklist.example_3"></v-text-field>
            </v-row>
           </v-col>
          </section>
  
          <footer class="modal-footer">
            <div class="d-flex">
              <button
                v-if="checklist.id === undefined"
                  type="button"
                  class="btn-green"
                  @click="createChecklist"
                >
                  Add Checklist
              </button>
              <button
                v-else
                type="button"
                class="btn-green"
                @click="editChecklist"
              >
                Edit Checklist
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
        checklist: Object,
      },
      async mounted() {
        if (this.checklist?.id) {
          this.updChecklist = {...this.checklist}
        }
        this.loaded = true
      },
      data() {
          return {
            updChecklist: {},
            checklists: [],
            loaded: false,
          }
      },
      emits: ['closeModal', 'createChecklist', 'editChecklist'],
      computed: {
        modalTitle() {
          return this.header === 'Add' ? 'Add New Checklist' : `Edit ${this.checklist.rule}`
        },
      },
      methods: {
        close() {
          this.$emit('closeModal')
        },
        createChecklist() {
          this.$emit('createChecklist', this.updChecklist);
        },  
        editChecklist() {
          this.$emit('editChecklist', this.updChecklist);
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