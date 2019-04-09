<template>
  <div>
    <DataTable :items="items" :dataURL = "dataURL"></DataTable>
  </div>
</template>

<script>
import PrototypeActionList from '@/components/prototype/ActionList'
export default {
  name: 'List',
  extends: PrototypeActionList,
  data () {
    return {
      dataURL: 'books'
    }
  }
}
</script>

<style scoped>

</style>
