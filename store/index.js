import Vue from 'vue'
import Vuex from 'vuex'
import state from "./state"
import mutations from "./mutations"

// Vuexの厳格モードをオフにする
export const strict = false

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    state,
    mutations,
    actions: {
    }
  })
}

export default store