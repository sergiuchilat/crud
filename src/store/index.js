import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import actionUpdate from '@/store/modules/crud/update'
import pageComponents from '@/store/modules/pageComponents'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const API = 'http://localhost:3000/'

let store = new Vuex.Store({
  modules: {
    pageComponents,
    actionUpdate
  },
  state: {
  
  },
  actions: {
    addItems (context, payload) {
      store.state.dataLoaded = false
      setTimeout(function () {
        store.state.pageLoading = !store.state.dataLoaded
      }, 100)
      return new Promise((resolve, reject) => {
        axios.post(`${API}${payload.dataURL}`, payload.data)
          .then(response => {
            store.state.pageLoading = false
            resolve()
          })
          .catch(err => {
            store.state.pageLoading = false
            reject(err)
          })
      })
    },
    deleteItems (context, payload) {
      store.state.dataLoaded = false
      setTimeout(function () {
        store.state.pageLoading = !store.state.dataLoaded
      }, 100)
      return new Promise((resolve, reject) => {
        axios.delete(`${API}${payload.dataURL}/${payload.data}`)
          .then(response => {
            store.state.pageLoading = false
            resolve()
          })
          .catch(err => {
            store.state.pageLoading = false
            reject(err)
          })
      })
    },
    fetchData (context, module) {
      store.state.dataLoaded = false
      setTimeout(function () {
        store.state.pageLoading = !store.state.dataLoaded
      }, 100)
      context.commit('setData', { 'data': []})
      axios.get(API + module)
        .then(response => {
          const data = response.data
          store.state.dataLoaded = true
          store.state.pageLoading = false
          context.commit('setData', { 'data': data})
        }).catch(err => {
          console.log('Load error' + err)
          store.state.dataLoaded = true
          store.state.pageLoading = false
          context.commit('setData', { 'data': []})
        })
    }
  }
})

export default store
