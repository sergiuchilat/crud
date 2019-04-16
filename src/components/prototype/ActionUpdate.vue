
<script>

export default {
  name: 'ActionUpdate',
  props: ['editedItem', 'moduleName', 'closeModal'],
  data () {
    return {
      oldValues: [],
      showForm: false
    }
  },
  computed: {
    updatedItem () {
      return this.$store.getters.getUpdatedItem
    }
  },
  mounted () {
    this.initAction({
      moduleName: this.moduleName,
      id: this.editedItem,
      breadcrumb: true
    })
    console.log('mounted')
  },
  methods: {
    initAction (params) {
      params.moduleName && params.id && this.loadData(params)
      // (params.breadcrumb) && this.loadBreadcrumbs()
    },
    loadData (params) {
      this.$store.dispatch('fetchItem', params)
        .then(() => {
          this.saveOldValues()
          this.showForm = true
        })
        .catch(() => {
          this.showForm = false
          this.$store.dispatch('setAlertStatus', {
            label: 'errors.server',
            class: 'error'
          })
        })
    },
    saveOldValues () {
      this.oldValues = Object.assign({}, this.updatedItem)
    },
    prepareData () {
      let changedFields = {}
      // changedFields.id = this.updatedItem.id
      for (let key in this.updatedItem) {
        if (
          this.updatedItem.hasOwnProperty(key) &&
          this.oldValues.hasOwnProperty(key) &&
          this.updatedItem[key] !== this.oldValues[key]
        ) {
          changedFields[key] = this.updatedItem[key]
        }
      }
      return changedFields
    },
    Save () {
      this.$store.dispatch('patchUpdateItems', {
        data: this.prepareData(),
        id: this.updatedItem.id,
        moduleName: this.moduleName
      })
        .then(() => {
          this.$store.dispatch('setAlertStatus', {
            label: 'success.saved',
            class: 'success'
          })
          this.closeModal()
        })
        .catch(() => {
          this.$store.dispatch('setAlertStatus', {
            label: 'errors.server',
            class: 'error'
          })
        })
    }
  }
}
</script>

<template>
    <v-card>
      <v-toolbar dark color="grey">
        <v-toolbar-title>Update</v-toolbar-title>
        <v-spacer>
        </v-spacer>
        <v-toolbar-items>
          <v-btn icon dark @click="closeModal">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
          <v-layout class="pt-5" justify-center align-center v-if="showForm">
            <v-flex xs3>
              <v-flex v-for="(value, key) in updatedItem">
                <v-flex v-if="key !== 'id'">
                  <v-text-field v-model="updatedItem[key]" :label="key"></v-text-field>
                </v-flex>
              </v-flex >
              <v-layout row justify-center>
                <v-btn block @click="Save" color = "warning">Save</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
    </v-card>
</template>

<style scoped>
</style>
