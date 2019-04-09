
<script>
import AlertMessage from '@/components/widgets/AlertMessage'
export default {
  name: 'ActionDelete',
  components: { AlertMessage },
  props: ['deletedItem', 'dataURL', 'closeModal'],
  data () {
    return {
      resultStatus: {
        label: '',
        class: ''
      }
    }
  },
  methods: {
    deleteItem () {
      this.$store.dispatch('deleteItems', {
        data: this.deletedItem.id,
        dataURL: this.dataURL
      })
        .then(() => {
          this.$store.dispatch('fetchData', this.dataURL)
            .then(() => {
              this.resultStatus = {
                label: 'success.saved',
                class: 'success'
              }
              this.closeModal()
            })
            .catch(() => {
              this.resultStatus = {
                label: 'E:SERVER_ERROR',
                class: 'error'
              }
            })
        })
        .catch(() => {
          this.resultStatus = {
            label: 'errors.server',
            class: 'error'
          }
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
        <AlertMessage :resultStatus="resultStatus" />
    </v-card>
</template>

<style scoped>

</style>
