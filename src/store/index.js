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
  
    async addUser({ state, dispatch }, user) {
      axios
        .post(`${state.baseURL}/addUser`, user)
        .then(response => {
          if (response.status === 200) {
            dispatch('fetchUsers')
            toast('User Created Succesfully', {
                autoClose: state.toastAutoClose,
            })
          } else {
            toast('User Creation Failed', {
              autoClose: state.toastAutoClose,
          })}
        })
        .catch(error => {
          console.log(error)
        })
    },

    async updateUser({ state, dispatch }, user) {
      axios
        .put(`${state.baseURL}/updateUser`, user)
        .then(response => {
          if (response.status === 200) {
            dispatch('fetchUsers')
            toast('User Updated Succesfully', {
                autoClose: state.toastAutoClose,
            })
          } else {
            toast('User Update Failed', {
              autoClose: state.toastAutoClose,
          })}
        })
        .catch(error => {
          console.log(error)
        })
    },

    async deleteUser({ state, dispatch }, user) {
      axios
        .delete(`${state.baseURL}/deleteUser?id=${user.id}`)
        .then(response => {
          if (response.status === 200) {
            dispatch('fetchUsers')
            toast(`User, ${user.firstName} ${user.lastName}, Deleted Succesfully`, {
              autoClose: state.toastAutoClose
            })
          }})
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
        axios
          .post(`${state.baseURL}/addBuy`, buy)
          .then(response => {
            if (response.status === 200) {
              dispatch('fetchPositions')
              toast('Buy Order Created Succesfully', {
                  autoClose: state.toastAutoClose,
              })
            } else {
              toast('Buy Order Creation Failed', {
                autoClose: state.toastAutoClose,
            })}

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
    async addSell({ state, dispatch }, sell) {
      axios
        .post(`${state.baseURL}/addSell`, sell)
        .then(response => {
          if (response.status === 200) {
            dispatch('fetchPositions')
            toast('Sell Order Created Succesfully', {
                autoClose: state.toastAutoClose,
            })
          } else {
            toast('Sell Order Creation Failed', {
              autoClose: state.toastAutoClose,
          })}
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
            toast('Account Creation Errored:\n', {
              autoClose: state.toastAutoClose,
          })}})
        .catch(error => {
          let errorToDisplay = ''

          Object.values(error.response.data).forEach(value => {
            errorToDisplay = errorToDisplay.concat(`\n${value}`) 
          })
        
          toast(`Account Creation Errored:\n ${errorToDisplay}`, {
            autoClose: state.toastAutoClose,
        })})
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
          let errorToDisplay = ''

          Object.values(error.response.data).forEach(value => {
            errorToDisplay = errorToDisplay.concat(`\n${value}`) 
          })
        
          toast(`Account Update Errored:\n ${errorToDisplay}`, {
            autoClose: state.toastAutoClose,
        })})
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
          toast(`Account Update Errored:\n ${error.message}`, {
            autoClose: state.toastAutoClose,
        })})
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
