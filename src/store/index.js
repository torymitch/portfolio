import Vuex from 'vuex'

const store = new Vuex.Store({
    state () {
        return {
            count: 0
        }
    },
    mutations: {
        increment (state) {
            state.count++
        }
    },
})

export default store