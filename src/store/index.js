import Vuex from 'vuex'
import axios from 'axios'

const store = new Vuex.Store({
  state() {
    return {
      baseURL: 'http://localhost:8080/',
      userStateUpdate: false,
      users: [],
    }
  },
  actions: {
    async getSystemInfo(state) {
      await axios.get('http://localhost:5173/api/systemInfo')
      this.commit('updateBuildDate', state, new Date())
    },
    async fetchUsers({commit, state}) {
      axios
        .get(state.baseURL + 'getUsers')
        .then(response => {
          commit('setUsers', response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    // async getUsers(state) {
    //   return state.users
    // }
  },
  mutations: {
    setUsers(state, response) {
      state.users = response.data
      !state.userStateUpdate
    },
  }
})

export default store
