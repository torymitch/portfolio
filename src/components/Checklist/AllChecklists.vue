<template>
    <v-container v-if="loaded" class="table" >
        <v-btn text="Add" @click="showAddEditChecklist"></v-btn>
        <v-data-table 
            class="elevation-1 overflow-y-auto"
            :headers="headers"
            :items="checklists"
            :items-per-page="checklistsPerPage"
            density="compact"
            :item-key="checklist.rule"
            :search="search"
            next-icon
        >
        <template v-slot:item="row">
            <tr>
                <td>{{row.item.rule}}</td>
                <td>{{row.item.question}}</td>
                <td>{{row.item.example_1}}</td>
                <td>{{row.item.example_2}}</td>
                <td>{{row.item.example_3}}</td>
                <td>
                    <v-btn
                        class="me-2 action-btn"
                        dark
                        small
                        @click="showEditChecklist(row.item)"
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
                </td>
            </tr>
            </template>
        </v-data-table>
        <add-edit-checklist-modal v-if="showChecklistModal"
            @closeModal="closeModal"
            @createChecklist="createChecklist"
            @editChecklist="editChecklist"
            :checklist="checklist"
        />
        <confirm-delete v-if="showDeleteModal"
            :message="deleteMsg"
            entity="Checklist"
            @removeChecklist="removeChecklist"
            @closeModal="closeModal"
        />
    </v-container>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';
import AddEditChecklistModal from './AddEditChecklistModal.vue';
import ConfirmDelete from '../confirmations/ConfirmDelete.vue';

export default {
    components : {
        AddEditChecklistModal,
        ConfirmDelete,
    },

    data() {
        return {
            loaded: false,
            info: '',
            headers: [
                { title: 'Rule', value: 'rule', sortable: true, key: 'rule' },
                { title: 'Question', value: 'question', sortable: true },
                { title: 'Example_1', value: 'example_1', sortable: true },
                { title: 'Example_2', value: 'example_2', sortable: true },
                { title: 'Example_3', value: 'example_3', sortable: true },
                { title: 'Actions', value: 'actions' },
            ],
            checklistsPerPage: 10,
            actions: [],
            showChecklistModal: false,
            showDeleteModal: false,
            updateType: 'Add',
            checklist: {},
            deleteMsg: 'Are you sure you would like to delete this checklist?  <p>This action can not be undone!',
            search: ''
        }
    },
    computed: {
        ...mapState(['checklists', 'searchString']),
    },
    watch: {
      searchString (val) {
        if (!val) {
          this.search = ''
          return
        }
        this.search = val
        
      }
    },
    async created() {
        await this.fetchChecklists()
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
        ...mapActions(['addChecklist', 'fetchChecklist', 'fetchChecklists', 'updateChecklist', 'deleteChecklist']),
        ...mapMutations(['setSearchString']),
        closeModal() {
            this.showChecklistModal = false
            this.showDeleteModal = false
            this.updateType = 'Add'
            this.checklist = {}
        },
        showAddEditChecklist(checklist) {
            this.checklist = checklist 
            this.showChecklistModal = true
        },
        showEditChecklist(checklist) {
            this.updateType = 'Edit'
            this.showAddEditChecklist(checklist)
        },
        createChecklist(checklist) {
            this.addChecklist(checklist)
            this.closeModal()
        },

        editChecklist(checklist) {
            this.updateChecklist(checklist)
            this.closeModal()
        },
        confirmDelete(checklist) {
            this.checklist = checklist
            this.showDeleteModal = true
        },
        removeChecklist() {
            this.deleteChecklist(this.checklist)
            this.closeModal()
        },
    },
}

</script>
<style lang="scss">
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
