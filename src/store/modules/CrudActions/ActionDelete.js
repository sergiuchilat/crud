import axios from 'axios'
import store from '@/store'

export default {
  mutations: {
    spliceDeletedItem (state, payload) {
      let updatedList = store.state.CrudActions.ActionFetch.actionData
      let updatedIndex = updatedList.findIndex(i => i.id === payload.data)
      updatedList.splice(updatedIndex, 1)
    }
  },
  actions: {
    deleteItems (context, payload) {
      store.dispatch('showLoader')
      return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:3000/${payload.moduleName}/${payload.data}`)
          .then(res => {
            store.dispatch('hideLoader')
            context.commit('spliceDeletedItem', payload)
            resolve(res)
          })
          .catch(err => {
            store.dispatch('hideLoader')
            reject(err)
          })
      })
    }
  }
}
