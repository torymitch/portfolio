import Vuex from 'vuex'
import axios from 'axios'

const store = new Vuex.Store({
  state() {
    return {
      baseURL: 'http://localhost:8080',
      userStateUpdate: false,
      users: [],
      user: [],
    }
  },
  actions: {
    async getSystemInfo(state) {
      await axios.get('http://localhost:5173/api/systemInfo')
      this.commit('updateBuildDate', state, new Date())
    },
    async fetchUser({commit, state}) {
      axios
        .get(state.baseURL + 'getUser/1')
        .then(response => {
          commit('setUsers', response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    async fetchUsers({commit, state}) {
      axios
        .get(state.baseURL + '/getUsers')
        .then(response => {
          commit('setUsers', response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // async addUser({ commit, state }, updUser) {
    //   axios
    //     // .post(`${state.baseURL}addUser`, updUser.userToAdd)
    //     .post(`${state.baseURL}addUser`, {
    //       user: updUser.userToAdd
    //     })
    //     .then(response => {
    //       commit('setUsers', response)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },

    async addUser({ commit, state }, updUser) {
      let incUser = updUser.userToAdd;
      let userParams = `/addUser?first_name=${incUser.first_name}&last_name=${incUser.last_name}&user_name=${incUser.user_name}&email_address=${incUser.email_address}&phone_number=${incUser.phone_number}`
      axios
        // .post(`${state.baseURL}addUser`, updUser.userToAdd)
        .post(`${state.baseURL}${userParams}`, {
          user: updUser.userToAdd
        })
        .then(response => {
          console.log(`Response Is ${response}`)
          commit('setUser', response)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  getters: {
    // async getUsers(state) {
    //   return state.users
    // }
  },
  mutations: {
    setUser(state, user) {
      state.user = user.data
    },
    setUsers(state, response) {
      state.users = response.data
      !state.userStateUpdate
    },
  }
})

export default store
