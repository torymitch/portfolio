import Vuex from 'vuex'
import axios from 'axios'

const store = new Vuex.Store({
  state() {
    return {
      count: 0,
      lastBuildDate: ''
    }
  },
  actions: {
    async getSystemInfo(state) {
      await axios.get('http://localhost:5173/api/systemInfo')
      this.commit('updateBuildDate', state, new Date())
    }
  },
  getters: {
    lastBuildDate(state) {
      return state.lastBuildDate
    }
  },
  mutations: {
    updateBuildDate(state, response) {
      state.lastBuildDate = response.data
    }
  }
})

export default store
