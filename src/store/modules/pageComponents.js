import axios from 'axios'

const pageComponents = {
  state: {
    dataLoaded: false,
    pageLoading: false,
    breadcrumb: [],
    actionData: []
  },
  mutations: {
    setData (state, object) {
      state.actionData = object.data
    },
    setBreadcrumb (state, breadcrumb) {
      state.breadcrumb = breadcrumb
    }
  },
  getters: {
    getPageLoading: state => {
      return state.pageLoading
    },
    getActionData: state => {
      return state.actionData
    },
    getBreadcrumb: state => {
      return state.breadcrumb
    }
  },
  actions: {
  
  }
}

export default pageComponents
