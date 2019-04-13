<template>
  <div>
    <component
      :is="actionLoader"
      :moduleName="'authors'"
      :actionName="actionName"
    ></component>
  </div>
</template>

<script>
import Controller from '@/components/prototype/Controller'

const listComponent = () => import('@/components/actions/authors/List')
const createComponent = () => import('@/components/actions/authors/Create')

export default {
  name: 'AuthorsController',
  extends: Controller,
  components: {
    listComponent,
    createComponent
  }
}
</script>

<style scoped>

</style>
