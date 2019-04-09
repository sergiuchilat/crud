import Vue from 'vue'
import Vuex from 'vuex'
import CrudActions from '@/store/modules/CrudActions'
import PageComponents from '@/store/modules/PageComponents/'

Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    PageComponents,
    CrudActions
  }
})

export default store
