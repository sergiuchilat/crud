<template>
  <v-breadcrumbs :items="items">
    <template v-slot:divider>
      <v-icon>chevron_right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'Breadcrumb',
  computed: {
    items () {
      return this.$store.getters.getBreadcrumb
    }
  }
}
</script>

<style scoped>

</style>
