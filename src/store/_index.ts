import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      // username:"korakot0082@gmail.com"
      email: "korakot0082@gmail.com"
    }
  },
  mutations: {
    setUser(state, user: any) {
      state.user = { ...user }; // reference
    }
  },
  actions: {},
  modules: {}
});
