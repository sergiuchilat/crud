
export default {
  state: {
    dataLoaded: false,
    pageLoading: false
  },
  getters: {
    getPageLoading: state => {
      return state.pageLoading
    }
  },
  actions: {
    showLoader (context) {
      context.commit('show')
    },
    hideLoader (context) {
      context.commit('hide')
    }
  },
  mutations: {
    show (state) {
      state.dataLoaded = false
      setTimeout(function () {
        state.pageLoading = !state.dataLoaded
      }, 100)
    },
    hide (state) {
      state.dataLoaded = true
      state.pageLoading = false
    }
  }
}
