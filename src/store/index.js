import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const API = 'http://localhost:3000/'

let store = new Vuex.Store({
  state: {
    dataLoaded: false,
    pageLoading: false,
    breadcrumb: [],
    actionData: {
      authors: [],
      books: []
    }
  },
  mutations: {
    setData (state, object) {
      state.actionData[object.module] = object.data
    },
    setBreadcrumb (state, breadcrumb) {
      state.breadcrumb = breadcrumb
    }
  },
  getters: {
    getPageLoading: state => {
      return state.pageLoading
    },
    getEditedElement: state => data => {
      let editedList = state.actionData[data.items]
      let editedIndex = editedList.findIndex(x => x.id === +data.index)
      return editedList[editedIndex]
    },
    getActionData: state => actionName => {
      return state.actionData[actionName]
    },
    getBreadcrumb: state => {
      return state.breadcrumb
    }
  },
  actions: {
    updateItems (context, payload) {
      store.state.dataLoaded = false
      setTimeout(function () {
        store.state.pageLoading = !store.state.dataLoaded
      }, 100)
      return new Promise((resolve, reject) => {
        axios.patch(`${API}${payload.dataURL}/${payload.data.id}`, payload.data)
          .then(response => {
            store.state.pageLoading = false
            store.state.dataLoaded = true
            resolve()
          })
          .catch(err => {
            store.state.pageLoading = false
            store.state.dataLoaded = true
            reject(err)
          })
      })
    },
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
      context.commit('setData', { 'data': [], 'module': module })
      axios.get(API + module)
        .then(response => {
          const data = response.data
          store.state.dataLoaded = true
          store.state.pageLoading = false
          context.commit('setData', { 'data': data, 'module': module })
        }).catch(err => {
          console.log('Load error' + err)
          store.state.dataLoaded = true
          store.state.pageLoading = false
          context.commit('setData', { 'data': [], 'module': module })
        })
    }
  }
})

export default store
