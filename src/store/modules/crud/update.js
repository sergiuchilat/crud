import axios from 'axios'
import store from '@/store'

const update = {
  state: {
  },
  mutations: {

  },
  getters: {

  },
  actions: {
    fetchItem (context, payload) {
      axios.get('http://localhost:3000/' + payload.moduleName + '/' + payload.id)
        .then(function (response) {
          // handle success
          context.commit('setData', { 'data': [response.data] })
        })
        .catch(function (error) {
          context.commit('setData', { 'data': [] })
        })
    },
    updateItems (context, payload) {
      store.state.dataLoaded = false
      setTimeout(function () {
        store.state.pageLoading = !store.state.dataLoaded
      }, 100)
      return new Promise((resolve, reject) => {
        axios.patch(`http://localhost:3000/${payload.dataURL}/${payload.data.id}`, payload.data)
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
    }
  }
}

export default update
