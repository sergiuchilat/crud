
<script>

export default {
  name: 'ActionDelete',
  props: ['deletedItem', 'moduleName', 'closeModal'],
  methods: {
    deleteItem () {
      this.$store.dispatch('deleteItems', {
        data: this.deletedItem.id,
        moduleName: this.moduleName
      })
        .then(() => {
          this.$store.dispatch('fetchData', this.moduleName)
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
        <v-card-title>
            <span class="headline">Delete</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                Are you sure you want to delete this item?
                <v-layout pt3>
                    <v-flex v-for="(key, value) in deletedItem">
                        <div>
                            {{value}} : {{key}}
                        </div>
                    </v-flex>
                </v-layout>
                <v-layout wrap>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeModal">Cancel</v-btn>
            <v-btn color="error" flat @click="deleteItem">Delete</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped>

</style>
