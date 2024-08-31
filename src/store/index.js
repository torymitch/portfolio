import Vuex from 'vuex'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const store = new Vuex.Store({
  state() {
    return {
      baseURL: 'http://localhost:8080',
      users: [],
      user: [],
      positions: [],
      accounts: [],
      buys: [],
      accountPositions: [],
      searchString: '',
      toastAutoClose: 1000,
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
      axios
        .post(`${state.baseURL}/addPosition`, position)
        .then(response => {
          if (response.status === 200) {
            dispatch('fetchPositions')
            toast('Position Created Succesfully', {
                autoClose: state.toastAutoClose,
            })
          } else {
            toast('Position Creation Failed', {
              autoClose: state.toastAutoClose,
          })}
        })
        .catch(error => {
          console.log(error)
        })
    },
    async updatePosition({ state, dispatch }, position) {
      axios
        .put(`${state.baseURL}/updatePosition`, position)
        .then(response => {
          if (response.status === 200) {
            dispatch('fetchPositions')
            toast('Position Updated Succesfully', {
                autoClose: state.toastAutoClose,
            })
          } else {
            toast('Position Creation Failed', {
              autoClose: state.toastAutoClose,
          })}
        })
        .catch(error => {
          console.log(error)
        })
    },

    async deletePosition({ state, dispatch }, position) {
      axios
        .delete(`${state.baseURL}/deletePosition?id=${position.id}`)
        .then(response => {
          if (response.status === 200) {
            dispatch('fetchPositions')
            toast(`Position, ${position.symbol}, Deleted Succesfully`, {
              autoClose: state.toastAutoClose
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    // Account Positions
    async fetchAccountPositions({commit, state}) {
      axios
        .get(state.baseURL + '/getAccountPositions')
        .then(response => {
          commit('setAccountPositions', response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    async fetchAccountPositionsByAccountId({commit, state}, id) {
      let params = `/getAccountPositionsByAccountId?id=${id}`
      axios
        .get(`${state.baseURL}${params}`)
        .then(response => {
          commit('setAccountPositions', response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    // Buys
    async addBuy({ state, dispatch }, buy) {
      let buyParams = `/addBuy?accountId=${buy.accountId}&positionId=${buy.positionId}&shares=${buy.shares}&costPerShare=${buy.costPerShare}&totalCost=${buy.totalCost}`
      
      axios
        .post(`${state.baseURL}${buyParams}`, {
          buy: buy
        })
        .then(response => {
          console.log(`Response Is ${response}`)
          dispatch('fetchPositions')
        })
        .catch(error => {
          console.log(error)
        })
    },

    fetchBuysByAccountId({ state, commit }, id) {
      let params = `/fetchBuysByAccountId?id=${id}`
      axios
        .get(`${state.baseURL}${params}`)
        .then(response => {
          commit('setBuys', response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    fetchBuysByAccountIdAndPositionId({ state, commit }, object) {
      let params = `/fetchBuysByAccountIdAndPositionId?accountId=${object.accountId}&positionId=${object.positionId}`
      axios
        .get(`${state.baseURL}${params}`)
        .then(response => {
          commit('setBuys', response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    // Sells
    async addSell({ state, dispatch }, sale) {
      let sellParams = `/addSell?accountId=${sale.accountId}&positionId=${sale.positionId}&shares=${sale.shares}&soldPrice=${sale.soldPrice}`
      
      axios
        .post(`${state.baseURL}${sellParams}`, {
          sale: sale
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

    addAccount({ state, dispatch }, account) {
      axios
        .post(`${state.baseURL}/addAccount`, account)
        .then( response => {
          if (response.status === 200) {
            dispatch('fetchAccounts') 
            toast('Account Created Succesfully', {
                autoClose: state.toastAutoClose,
            })
          } else {
            toast('Account Creation Errored', {
              autoClose: state.toastAutoClose,
          })}})
        .catch(error => {
          console.log(error)
        })
    },
    updateAccount({ state, dispatch }, account) {
      axios
        .put(`${state.baseURL}/updateAccount`, account)
        .then(response => {
          if (response.status === 200) {
            dispatch('fetchAccounts')
            toast('Account Updated Succesfully', {
              autoClose: state.toastAutoClose,
          })}})
        .catch(error => {
          console.log(error)
        })
    },

    deleteAccount({ state, dispatch }, account) {
      axios
        .delete(`${state.baseURL}/deleteAccount?id=${account.id}`)
        .then(response => {
          if (response.status === 200) {
            dispatch('fetchAccounts') 
            toast(`Account, ${account.name}, Deleted Succesfully`, {
                autoClose: state.toastAutoClose,
            })
          }
        })
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
          userId: user.id,
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
    setBuys(state, response) {
      state.buys = response.data
    },
    setAccountPositions(state, response) {
      state.accountPositions = response.data
    },
    setSearchString(state, searchString) {
      state.searchString = searchString
    }
  }
})

export default store
