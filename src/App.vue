<template>
  <v-app>
    <div id="app">
      <Menu/>
      <Breadcrumb/>
      <page-loader/>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
import Menu from '@/components/widgets/Menu'
import Breadcrumb from '@/components/widgets/Breadcrumb'
import PageLoader from '@/components/widgets/PageLoader'

export default {
  name: 'App',
  components: {
    Menu,
    Breadcrumb,
    PageLoader
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
  }
</style>
