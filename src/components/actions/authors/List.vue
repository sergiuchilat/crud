<template>
  <div>
    <DataTable :items="items" :moduleName = "moduleName"></DataTable>
  </div>
</template>

<script>
import PrototypeAction from '@/components/prototype/ActionList'
export default {
  name: 'List',
  extends: PrototypeAction
}
</script>

<style scoped>

</style>
