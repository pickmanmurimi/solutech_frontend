import * as Types from "./types";

export default {
  [Types.SET_TOKEN]: (state, token) => {
    state.solutech_web_token = token;
  },

  [Types.SET_USER]: (state, user) => {
    state.user = user;
  },

  [Types.UNSET_TOKEN]: state => {
    state.solutech_web_token = "";
  },

  [Types.UNSET_USER]: state => {
    state.user = {};
  }
};
