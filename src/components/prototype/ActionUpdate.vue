
<script>

export default {
  name: 'ActionUpdate',
  props: ['editItem', 'moduleName', 'closeModal'],
  computed: {
    updatedItem () {
      return this.$store.getters.getUpdatedItem
    }
  },
  mounted () {
    this.initAction({
      moduleName: this.moduleName,
      id: this.editItem,
      breadcrumb: true
    })
  },
  methods: {
    initAction (params) {
      params.moduleName && params.id && this.loadData(params)
      // (params.breadcrumb) && this.loadBreadcrumbs()
    },
    loadData (params) {
      this.$store.dispatch('getItemForUpdate', params)
        .then(() => {
        })
        .catch(() => {
          this.$store.dispatch('setAlertStatus', {
            label: 'errors.server',
            class: 'error'
          })
        })
    },
    Save () {
      this.$store.dispatch('patchUpdateItems', {
        data: this.updatedItem,
        moduleName: this.moduleName
      })
        .then(() => {
          this.$store.dispatch('getUpdatedItem', {
            data: this.editItem,
            moduleName: this.moduleName + ''
          })
            .then(
              this.$store.dispatch('setAlertStatus', {
                label: 'success.saved',
                class: 'success'
              }))
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
          <v-layout class="pt-5" justify-center align-center>
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
