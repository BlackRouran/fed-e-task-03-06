import Vue from 'vue'
import Vuex from 'vuex'
import { localStorageSet } from '@/utils/utils.ts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    updateUser (state, payload) {
      state.user = JSON.parse(payload)
      localStorageSet('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
