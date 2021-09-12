import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isLoggedIn: false
  },
  mutations: {

    loginSign(state) {
      state.isLoggedIn = true;
    },

    setUser(state, userData) {
      state.user = userData;
    }

  },
  actions: {
    setUserAction(context, userData) {
      context.commit('setUser', userData);
    },

    loginSignAction(context) {
      context.commit('loginSign');
    }

  },
  getters: {
    user(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    }
  },

  modules: {
  }
})
