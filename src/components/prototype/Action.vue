<template>
<div></div>
</template>

<script>
export default {
  name: 'Action',
  props: {
    moduleName: {
      type: String,
      required: true
    },
    actionName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      resultStatus: {
        label: '',
        class: ''
      },
      breadcrumb: [
        {
          text: this.$t('homeLinkText'),
          href: '#/'
        },
        {
          text: this.$t('modules.' + this.moduleName + '.moduleName'),
          href: '#/' + this.moduleName.toLowerCase() + '/list'
        },
        {
          text: this.$t('modules.' + this.moduleName + '.actions.' + this.actionName.toLowerCase()),
          active: true
        }
      ]
    }
  },
  methods: {
    loadBreadcrumbs () {
      this.$store.commit('setBreadcrumb', this.breadcrumb)
    }
  }
}
</script>

<style scoped>

</style>
