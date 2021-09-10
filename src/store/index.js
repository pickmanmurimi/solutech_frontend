import { createStore } from 'vuex'

import state from "./state";
import * as getters from "./getters";
import { default as mutations } from "./mutations";
import * as actions from "./actions";

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
    // ...commonStore
  }
})
