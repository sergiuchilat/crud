<template>
  <div></div>
</template>

<script>
import DataTable from '@/components/widgets/DataTable'
import Action from '@/components/prototype/Action'
export default {
  name: 'ActionList',
  extends: Action,
  components: {
    DataTable
  },
  methods: {
    initAction (params) {
      (params.dataURL) && this.loadData(params.dataURL);
      (params.breadcrumb) && this.loadBreadcrumbs()
    },
    loadData (dataURL) {
      this.$store.dispatch('fetchData', dataURL)
        .then(() => {
        })
        .catch(() => {
          this.resultStatus = {
            label: 'E:SERVER_ERROR',
            class: 'danger'
          }
        })
    }
  },
  computed: {
    items () {
      let data = this.$store.getters.getActionData(this.dataURL)
      return data || []
    }
  },
  mounted () {
    this.initAction({
      dataURL: this.dataURL,
      breadcrumb: true
    })
  }
}
</script>

<style scoped>

</style>
