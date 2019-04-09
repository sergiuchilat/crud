<script>
import ActionDelete from '@/components/prototype/ActionDelete'

export default {
  name: 'DataTable',
  props: ['items', 'dataURL'],
  components: {
    ActionDelete
  },
  data: () => ({
    pagination: {
      descending: true,
      page: 1,
      rowsPerPage: 10,
      totalItems: 0
    },
    totalVisiblePage: 6,
    dialog: false,
    headers: [{
      text: 'Actions',
      value: 'id',
      align: 'center',
      sortable: false
    }],
    deletedItem: {}
  }),
  watch: {
    dialog (val) {
      val || this.close()
    },
    items () {
      this.pagination.totalItems = this.items.length
      if (this.headers.length === 1) {
        this.getHeaders()
      }
    },
    'pagination.page' () {
      this.$router.push(`/${this.dataURL}/${this.$route.params.action}/${this.pagination.page}`)
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
    getElementForDelete (item) {
      this.dialog = true
      this.deletedItem = item
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.deletedItem = {}
      }, 300)
    }
  }
}
</script>

<template>
  <div>
    <v-toolbar flat color="white">
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" :to="`/${dataURL}/create`">New Item</v-btn>
        </template>
       <ActionDelete
               :deletedItem = "deletedItem"
               :dataURL = "dataURL"
               :closeModal = "close"
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
                  @click="$router.push(`/edit/${dataURL}/${props.item.id}`)"
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
