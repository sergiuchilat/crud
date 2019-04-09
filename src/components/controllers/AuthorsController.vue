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
const updateComponent = () => import('@/components/prototype/ActionUpdate')

export default {
  name: 'AuthorsController',
  extends: Controller,
  components: {
    listComponent,
    createComponent,
    updateComponent
  }
}
</script>

<style scoped>

</style>
