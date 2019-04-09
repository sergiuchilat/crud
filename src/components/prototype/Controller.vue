<template>
  <div>
  </div>
</template>

<script>

export default {
  name: 'PrototypeController',
  components: {},
  computed: {
    actionLoader () {
      return this.$route.params.action + 'Component'
    },
    actionName () {
      return this.$route.params.action.toLowerCase()
    }
  }
}
</script>

<style scoped>

</style>
