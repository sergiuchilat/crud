<template>
  <div>
    <DataTable :items="items" :dataURL = "dataURL"></DataTable>
  </div>
</template>

<script>
import PrototypeAction from '@/components/prototype/ActionList'
export default {
  name: 'List',
  extends: PrototypeAction,
  data () {
    return {
      dataURL: 'authors'
    }
  }
}
</script>

<style scoped>

</style>
