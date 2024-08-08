import Vuex from 'vuex'
import axios from 'axios'

const store = new Vuex.Store({
  state() {
    return {
      baseURL: 'http://localhost:8080',
      userStateUpdate: false,
      users: [],
      user: [],
      searchString: '',
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
    //     .post(`${state.baseURL}/addUser`, {
    //       user: updUser
    //     })
    //     .then(response => {
    //       commit('setUsers', response)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },

    async addUser({ state, dispatch }, user) {
      let userParams = `/addUser?first_name=${user.firstName}&last_name=${user.lastName}&user_name=${user.userName}&email_address=${user.emailAddress}&phone_number=${user.phoneNumber}`
      axios
        .post(`${state.baseURL}${userParams}`, {
          user: user
        })
        .then(response => {
          console.log(`Response Is ${response}`)
          dispatch('fetchUsers')
        })
        .catch(error => {
          console.log(error)
        })
    },

    async updateUser({ state, dispatch }, user) {
      let userParams = `/updateUser?id=${user.id}&first_name=${user.firstName}&last_name=${user.lastName}&user_name=${user.userName}&email_address=${user.emailAddress}&phone_number=${user.phoneNumber}`
      axios
        .put(`${state.baseURL}${userParams}`, {
          user: user
        })
        .then(response => {
          console.log(`Response Is ${response}`)
          dispatch('fetchUsers')
        })
        .catch(error => {
          console.log(error)
        })
    },

    async deleteUser({ state, dispatch }, user) {
      axios
        .delete(`${state.baseURL}/deleteUser?id=${user.id}`, {
          user: user
        })
        .then(response => {
          console.log(`Response Is ${response}`)
          dispatch('fetchUsers')
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
    setSearchString(state, payload) {
      console.log(`Search String ${payload.searchString}`)
      state.searchString = payload.searchString
      console.log(state.searchString)
    }
  }
})

export default store
