<script>
import ActionDelete from '@/components/prototype/ActionDelete'
import ActionUpdate from '@/components/prototype/ActionUpdate'

export default {
  name: 'DataTable',
  props: ['items', 'moduleName'],
  components: {
    ActionDelete,
    ActionUpdate
  },
  data: () => ({
    pagination: {
      descending: true,
      page: 1,
      rowsPerPage: 10,
      totalItems: 0
    },
    totalVisiblePage: 6,
    deleteModal: false,
    editModal: false,
    headers: [{
      text: 'Actions',
      value: 'id',
      align: 'center',
      sortable: false
    }],
    deletedItem: {},
    editItem: {}
  }),
  watch: {
    deleteModal (val) {
      val || this.close()
    },
    items () {
      this.pagination.totalItems = this.items.length
      if (this.headers.length === 1) {
        this.getHeaders()
      }
    },
    'pagination.page' () {
      this.$router.push(`/${this.moduleName}/${this.$route.params.action}/page/${this.pagination.page}`)
    },
    currentRoute () {
      this.pagination.page = +this.currentRoute
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    currentRoute () {
      return this.$route.params.page || 1
    },
    showPagination () {
      return this.pagination.totalItems > this.pagination.rowsPerPage
    }
  },
  methods: {
    getHeaders () {
      for (let key in this.items[0]) {
        this.headers.splice(-1, 0, {
          text: key,
          value: key,
          align: 'center'
        })
      }
    },
    getElementForUpdate (item) {
      this.editModal = true
      this.editItem = item
    },
    getElementForDelete (item) {
      this.deleteModal = true
      this.deletedItem = item
    },
    close () {
      this.deleteModal = false
      this.editModal = false
      setTimeout(() => {
        this.deletedItem = {}
        this.editItem = {}
      }, 300)
    }
  }
}
</script>

<template>
  <div>
    <v-toolbar flat color="white">
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" :to="`/${moduleName}/create`">New Item</v-btn>
      <v-dialog v-model="deleteModal" max-width="500px">
       <ActionDelete
               v-if="deleteModal"
               :deletedItem = "deletedItem"
               :moduleName = "moduleName"
               :closeModal = "close"
       />
      </v-dialog>
      <v-dialog v-model="editModal" fullscreen hide-overlay transition="dialog-bottom-transition">
        <ActionUpdate
                v-if="editModal"
                :editItem = "editItem.id"
                :moduleName = "moduleName"
                :closeModal = "close"
        />
        />
      </v-dialog>
    </v-toolbar>
    <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
            :pagination.sync="pagination"
            class="elevation-1"
    >
      <template v-slot:items="props">
        <td v-for="(value) in props.item" class="text-xs-center">{{value}}</td>
        <td class="justify-center layout px-0 ">
          <v-icon
                  small
                  class="mr-2"
                  @click="getElementForUpdate(props.item)"
          >
            edit
          </v-icon>
          <v-icon
                  small
                  @click="getElementForDelete(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-4">
      <v-pagination
              v-if="showPagination"
              :total-visible="totalVisiblePage"
              v-model="pagination.page"
              :length="pages"
      >
      </v-pagination>
    </div>
  </div>
</template>
