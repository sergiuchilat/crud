<template>
  <div>
    <DataTable :items="items" :moduleName = "moduleName"></DataTable>
  </div>
</template>

<script>
import PrototypeActionList from '@/components/prototype/ActionList'
export default {
  name: 'List',
  extends: PrototypeActionList
}
</script>

<style scoped>

</style>
