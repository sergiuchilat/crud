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
      rowsPerPage: 12,
      totalItems: 0
    },
    totalVisiblePage: 6,
    modalShowed: {
      delete: false,
      edit: false
    },
    headers: [{
      text: 'Actions',
      value: 'id',
      align: 'center',
      sortable: false
    }],
    deletedItem: {},
    editedItem: {},
    selectedItems: []
  }),
  watch: {
    modalShowed (val) {
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
      this.modalShowed.edit = true
      this.editedItem = item
    },
    getElementForDelete (item) {
      this.modalShowed.delete = true
      this.deletedItem = item
    },
    close () {
      this.modalShowed = {
        delete: false,
        edit: false
      }
      setTimeout(() => {
        this.deletedItem = {}
        this.editedItem = {}
      }, 300)
    }
  }
}
</script>

<template>
  <div>
    <v-toolbar flat color="white">
      <v-spacer></v-spacer>
     <v-icon
             large
             class="mr-3"
             @click="$router.push(`/${moduleName}/create`)"
     >
       add_circle_outline
     </v-icon>
      <transition name="slide-fade">
      <v-icon
              v-if="selectedItems.length"
              large
              @click="getElementForDelete(selectedItems)"
      >
        delete_outline
      </v-icon>
      </transition>
      <v-dialog v-model="modalShowed.delete" max-width="500px">
       <ActionDelete
               v-if="modalShowed.delete"
               :deletedItems = "deletedItem"
               :moduleName = "moduleName"
               :closeModal = "close"
       />
      </v-dialog>
      <v-dialog v-model="modalShowed.edit" fullscreen hide-overlay transition="fade">
        <ActionUpdate
                v-if="modalShowed.edit"
                :editedItem = "editedItem.id"
                :moduleName = "moduleName"
                :closeModal = "close"
        />
      </v-dialog>
    </v-toolbar>
    <v-data-table
            v-model="selectedItems"
            :headers="headers"
            :items="items"
            :pagination.sync="pagination"
            select-all
            hide-actions
            class="elevation-1"
    >
      <template v-slot:items="props">
        <tr>
            <td>
                <v-checkbox
                        v-model="props.selected"
                        primary
                        hide-details
                ></v-checkbox>
            </td>
            <td v-for="(value) in props.item" :key="value" class="text-xs-center">{{value}}</td>
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
        </tr>
      </template>
        <template v-slot:footer="">
            <tr>
                <td v-if="showPagination" :colspan="headers.length + 1" class="pt-3 pb-3">
                    <v-pagination
                            :total-visible="totalVisiblePage"
                            v-model="pagination.page"
                            :length="pages"
                    >
                    </v-pagination>
                </td>
            </tr>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
