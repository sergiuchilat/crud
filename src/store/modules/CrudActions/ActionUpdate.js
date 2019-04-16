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
    updateSelectedItem (state, object) {
      let updatedList = store.state.CrudActions.ActionFetch.actionData
      for (let key in object.data) {
        if (object.data.hasOwnProperty(key)) {
          updatedList[updatedList.findIndex(i => i.id === object.id)][key] = object.data[key]
        }
      }
    }
  },
  actions: {
    fetchItem (context, payload) {
      store.dispatch('showLoader').then().then()
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/' + payload.moduleName + '/' + payload.id)
          .then((res) => {
            store.dispatch('hideLoader').then()
            context.commit('setUpdatedItem', res.data)
            resolve(res)
          })
          .catch((err) => {
            store.dispatch('hideLoader').then()
            context.commit('setUpdatedItem', {})
            reject(err)
          })
      })
    },
    patchUpdateItems (context, payload) {
      store.dispatch('showLoader').then()
      return new Promise((resolve, reject) => {
        axios.patch(`http://localhost:3000/${payload.moduleName}/${payload.id}`, payload.data)
          .then(res => {
            context.commit('updateSelectedItem', payload)
            store.dispatch('hideLoader').then()
            resolve(res)
          })
          .catch(err => {
            store.dispatch('hideLoader').then()
            reject(err)
          })
      })
    }
  }
}
