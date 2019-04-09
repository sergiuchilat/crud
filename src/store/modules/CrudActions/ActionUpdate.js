import axios from 'axios'
import store from '@/store/'

export default {
  actions: {
    fetchItem (context, payload) {
      axios.get('http://localhost:3000/' + payload.moduleName + '/' + payload.id)
        .then((res) => {
          context.commit('setData', { 'data': [res.data] })
        })
        .catch((err) => {
          context.commit('setData', { 'data': [] })
        })
    },
    updateItems (context, payload) {
      store.dispatch('showLoader')
      return new Promise((resolve, reject) => {
        axios.patch(`http://localhost:3000/${payload.moduleName}/${payload.data.id}`, payload.data)
          .then(res => {
            store.dispatch('hideLoader')
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
