
<script>

export default {
  name: 'ActionDelete',
  props: ['deletedItems', 'moduleName', 'closeModal'],
  methods: {
    deleteItem () {
      let deletedItem
      if (!this.deletedItems.length) {
        deletedItem = [this.deletedItems]
      } else {
        deletedItem = this.deletedItems
      }
      this.$store.dispatch('deleteItems', {
        deletedItem,
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
        <v-card-title>
            <span class="headline">Delete</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                Are you sure you want to delete this items?
                <v-container grid-list-md v-if="deletedItems.length" pt3>
                    <v-layout v-for="item in deletedItems">
                        <v-flex v-for="(value, key) in item">
                                {{key}}: {{value}}
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-layout v-else pt3>
                    <v-flex v-for="(key, value) in deletedItems">
                            {{value}}: {{key}}
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
