import axios from 'axios'
import store from '@/store/'

export default {
  state: {
    updatedItem: {}
  },
  getters: {
    getUpdatedItem: state => {
      return state.updatedItem
    }
  },
  mutations: {
    setUpdatedItem (state, object) {
      state.updatedItem = object
    },
    spliceUpdatedItem (state, object) {
      let updatedList = store.state.CrudActions.ActionFetch.actionData
      let updatedIndex = updatedList.findIndex(i => i.id === object.id)
      updatedList.splice(updatedIndex, 1, object)
    }
  },
  actions: {
    getItemForUpdate (context, payload) {
      store.dispatch('showLoader')
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/' + payload.moduleName + '/' + payload.id)
          .then((res) => {
            store.dispatch('hideLoader')
            context.commit('setUpdatedItem', res.data)
            resolve(res)
          })
          .catch((err) => {
            store.dispatch('hideLoader')
            context.commit('setUpdatedItem', {})
            reject(err)
          })
      })
    },
    getUpdatedItem (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/' + payload.moduleName + '/' + payload.data.id)
          .then((res) => {
            context.commit('spliceUpdatedItem', res.data)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    patchUpdateItems (context, payload) {
      store.dispatch('showLoader')
      return new Promise((resolve, reject) => {
        axios.patch(`http://localhost:3000/${payload.moduleName}/${payload.data.id}`, payload.data)
          .then(res => {
            store.dispatch('getUpdatedItem', payload)
              .then(() => {
                store.dispatch('hideLoader')
                resolve(res)
              })
          })
          .catch(err => {
            store.dispatch('hideLoader')
            reject(err)
          })
      })
    }
  }
}
