import Vuex from 'vuex'
import axios from 'axios'

const store = new Vuex.Store({
  state() {
    return {
      baseURL: 'http://localhost:8080',
      users: [],
      user: [],
      positions: [],
      accounts: [],
      searchString: '',
    }
  },
  actions: {
    async getSystemInfo(state) {
      await axios.get('http://localhost:5173/api/systemInfo')
      this.commit('updateBuildDate', state, new Date())
    },

    //Users 
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
        .then( dispatch('fetchUsers') )
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
        .then( dispatch('fetchUsers') )
        .catch(error => {
          console.log(error)
        })
    },

    // Positions
    async fetchPositions({commit, state}) {
      axios
        .get(state.baseURL + '/getPositions')
        .then(response => {
          commit('setPositions', response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    async addPosition({ state, dispatch }, position) {
      // let positionParams = `/addPosition?name=${position.name}&symbol=${position.symbol}&price=${position.price}&total=${position.total}&cost=${position.cost}`
      // let positionParams = `/addPosition?id=${position.id}&name=${position.name}&symbol=${position.symbol}&price=0f&total=0f&cost=0f`
      let positionParams = `/addPosition?id=${position.id}&name=${position.name}&symbol=${position.symbol}&price=${position.price}&total=0f&cost=0f`
      
      axios
        .post(`${state.baseURL}${positionParams}`, {
          position: position
        })
        .then(response => {
          console.log(`Response Is ${response}`)
          dispatch('fetchPositions')
        })
        .catch(error => {
          console.log(error)
        })
    },
    async updatePosition({ state, dispatch }, position) {
      // let positionParams = `/updatePosition?id=${position.id}&name=${position.name}&symbol=${position.symbol}&price=${position.price}&total=${position.total}&cost=${position.cost}`
      let positionParams = `/updatePosition?id=${position.id}&name=${position.name}&symbol=${position.symbol}&price=${position.price}&total=0.00&cost=0.00`
      axios
        .put(`${state.baseURL}${positionParams}`, {
          position: position
        })
        .then(response => {
          console.log(`Response Is ${response}`)
          dispatch('fetchPositions')
        })
        .catch(error => {
          console.log(error)
        })
    },

    async deletePosition({ state, dispatch }, position) {
      axios
        .delete(`${state.baseURL}/deletePosition?id=${position.id}`, {
          position: position
        })
        .then(response => {
          console.log(`Response Is ${response}`)
          dispatch('fetchPositions')
        })
        .catch(error => {
          console.log(error)
        })
    },

    // Accounts
    async fetchAccounts({commit, state}) {
      axios
        .get(state.baseURL + '/getAccounts')
        .then(response => {
          commit('setAccounts', response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    async addAccount({ state, dispatch }, account) {
      let accountParams = `/addAccount?name=${account.name}&number=${account.number}&user_id=${account.user_id}`
      
      axios
        .post(`${state.baseURL}${accountParams}`, {
          account: account
        })
        .then( dispatch('fetchAccounts') )
        .catch(error => {
          console.log(error)
        })
    },
    async updateAccount({ state, dispatch }, account) {
      let accountParams = `/updateAccount?id=${account.id}&name=${account.name}&number=${account.number}&user_id=${account.user_id}`
      axios
        .put(`${state.baseURL}${accountParams}`, {
          account: account
        })
        .then(response => {
          console.log(`Response Is ${response}`)
          dispatch('fetchAccounts')
        })
        .catch(error => {
          console.log(error)
        })
    },
    async deleteAccount({ state, dispatch }, account) {
      axios
        .delete(`${state.baseURL}/deleteAccount?id=${account.id}`, {
          account: account
        })
        .then( dispatch('fetchAccounts') )
        .catch(error => {
          console.log(error)
        })
    },
  },
  getters: {
    async getUsersByFullName(state) {
      let userNames = []
      state.users.forEach(user => {
        userNames.push({
          user_id: user.id,
          name: `${user.firstName} ${user.lastName}`
        });
      })
      return userNames
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user.data
    },
    setUsers(state, response) {
      state.users = response.data
    },
    setPositions(state, response) {
      state.positions = response.data
    },
    setAccounts(state, response) {
      state.accounts = response.data
    },
    setSearchString(state, searchString) {
      state.searchString = searchString
    }
  }
})

export default store
