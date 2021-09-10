import * as types from "./types";
import router from "../router/index.js";

export const set_token = ({ commit }, token) => {
  localStorage.setItem("solutech_web_token", token);
  commit(types.SET_TOKEN, token);
};

export const set_user = ({ commit }, user) => {
  localStorage.setItem("user", JSON.stringify(user));
  commit(types.SET_USER, user);
};

export const unset_token = ({ commit }) => {
  localStorage.removeItem("solutech_web_token");
  commit(types.UNSET_TOKEN);
};

export const unset_user = ({ commit }) => {
  localStorage.removeItem("user");
  commit(types.UNSET_USER);
};

export const logout = context => {
  context.dispatch("unset_token").then();
  context.dispatch("unset_user").then();
  router.push({ name: "Login" }).catch(err => {
    console.log(err);
  });
};
