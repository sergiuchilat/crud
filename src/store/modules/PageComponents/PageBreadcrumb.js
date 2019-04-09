
export default {
  state: {
    breadcrumb: []
  },
  mutations: {
    setBreadcrumb (state, breadcrumb) {
      state.breadcrumb = breadcrumb
    }
  },
  getters: {
    getBreadcrumb: state => {
      return state.breadcrumb
    }
  }
}
