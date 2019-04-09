import axios from 'axios'
import store from '@/store'

export default {
  actions: {
    fetchData (context, module) {
      store.dispatch('showLoader')
      context.commit('setData', { 'data': [] })
      axios.get('http://localhost:3000/' + module)
        .then(res => {
          const data = res.data
          store.dispatch('hideLoader')
          context.commit('setData', { 'data': data })
        }).catch(err => {
          store.dispatch('hideLoader')
          context.commit('setData', { 'data': [] })
        })
    }
  }
}
