import axios from 'axios'
import store from '@/store'

export default {
  mutations: {
    spliceDeletedItem (state, payload) {
      let updatedList = store.state.CrudActions.ActionFetch.actionData
      let updatedIndex = updatedList.findIndex(i => i.id === payload.id)
      updatedList.splice(updatedIndex, 1)
    }
  },
  actions: {
    deleteItems (context, payload) {
      store.dispatch('showLoader').then()
      payload.deletedItem.map((value, key) => {
        return new Promise((resolve, reject) => {
          axios.delete(`http://localhost:3000/${payload.moduleName}/${value.id}`)
            .then(res => {
              store.dispatch('hideLoader')
              context.commit('spliceDeletedItem', value)
              resolve(res)
            })
            .catch(err => {
              store.dispatch('hideLoader')
              reject(err)
            })
        })
      })
    }
  }
}
