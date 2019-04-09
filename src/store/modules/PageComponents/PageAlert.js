export default {
  state: {
    resultStatus: {
      label: '',
      class: ''
    }
  },
  getters: {
    getAlertStatus: state => {
      return state.resultStatus
    }
  },
  actions: {
    setAlertStatus (context, payload) {
      context.commit('setResultStatus', payload)
    }
  },
  mutations: {
    setResultStatus (state, object) {
      state.resultStatus = object
    }
  }
}
