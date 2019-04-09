import Vue from 'vue'
import Router from 'vue-router'
// import store from '../../store'
import routeRules from '@/router/routes'

Vue.use(Router)

let router = new Router({
  routes: routeRules
})

export default router
