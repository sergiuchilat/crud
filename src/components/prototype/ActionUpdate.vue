
<script>
import AlertMessage from '@/components/widgets/AlertMessage'
export default {
  name: 'ActionUpdate',
  components: {
    AlertMessage
  },
  data () {
    return {
      editedItem: {},
      resultStatus: {
        label: '',
        class: ''
      }
    }
  },
  mounted () {
    this.editedItem = this.$store.getters.getEditedElement({
      items: this.$route.params.items,
      index: this.$route.params.id
    })
  },
  methods: {
    Return () {
      this.$router.push(`/${this.$route.params.items}/list`)
    },
    Save () {
      this.$store.dispatch('updateItems', {
        data: this.editedItem,
        dataURL: this.$route.params.items
      })
        .then(() => {
          this.resultStatus = {
            label: 'success.saved',
            class: 'success'
          }
          this.Return()
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
  <div>
    <v-layout justify-center>
      <v-flex xs3>
        <v-flex v-for="(value, key) in editedItem">
          <v-flex v-if="key !== 'id'">
            <v-text-field v-model="editedItem[key]" :label="key"></v-text-field>
          </v-flex>
        </v-flex >
        <v-layout row justify-center>
          <v-btn @click="Save" color = "warning">Save</v-btn>
          <v-btn @click="Return" color = "error">Return</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <AlertMessage :resultStatus="resultStatus"></AlertMessage>
  </div>
</template>

<style scoped>

</style>
