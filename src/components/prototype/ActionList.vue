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
      (params.moduleName) && this.loadData(params.moduleName);
      (params.breadcrumb) && this.loadBreadcrumbs()
    },
    loadData (moduleName) {
      this.$store.dispatch('fetchData', moduleName)
        .then(() => {
        })
        .catch(() => {
          this.$store.dispatch('setAlertStatus', {
            label: 'errors.server',
            class: 'error'
          })
        })
    }
  },
  computed: {
    items () {
      let data = this.$store.getters.getActionData
      return data || []
    }
  },
  mounted () {
    this.initAction({
      moduleName: this.moduleName,
      breadcrumb: true
    })
  }
}
</script>

<style scoped>

</style>
