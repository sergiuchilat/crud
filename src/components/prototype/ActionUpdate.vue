
<script>
import AlertMessage from '@/components/widgets/AlertMessage'
import Action from './Action'
export default {
  name: 'ActionUpdate',
  extends: Action,
  components: {
    AlertMessage
  },
  data () {
    return {
      resultStatus: {
        label: '',
        class: ''
      }
    }
  },
  computed: {
    updatedItem () {
      return this.$store.getters.getActionData[0]
    }
  },
  mounted () {
    this.initAction({
      moduleName: this.moduleName,
      id: this.$route.params.id,
      breadcrumb: true
    })
  },
  methods: {
    initAction (params) {
      params.moduleName && params.id && this.loadData(params)
      // (params.breadcrumb) && this.loadBreadcrumbs()
    },
    loadData (params) {
      this.$store.dispatch('fetchItem', params)
        .then(() => {
        })
        .catch(() => {
          this.resultStatus = {
            label: 'E:SERVER_ERROR',
            class: 'danger'
          }
        })
    },
    Return () {
      this.$router.push(`/${this.moduleName}/list`)
    },
    Save () {
      this.$store.dispatch('updateItems', {
        data: this.updatedItem,
        dataURL: this.moduleName
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
        <v-flex v-for="(value, key) in updatedItem">
          <v-flex v-if="key !== 'id'">
            <v-text-field v-model="updatedItem[key]" :label="key"></v-text-field>
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
