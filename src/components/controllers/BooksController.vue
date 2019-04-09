<template>
  <div>
    <component
      :is="actionLoader"
      :moduleName="'books'"
      :actionName="actionName"
    ></component>
  </div>
</template>

<script>
import Controller from '@/components/prototype/Controller'

const listComponent = () => import('@/components/actions/books/List')
const createComponent = () => import('@/components/actions/books/Create')

export default {
  name: 'BooksController',
  extends: Controller,
  components: {
    listComponent,
    createComponent
  }
}
</script>

<style scoped>

</style>
