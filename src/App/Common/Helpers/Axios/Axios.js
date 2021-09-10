import Axios from "axios";
import store from "../../../../store";
import swal from "sweetalert";
import {createApp} from "vue";

let $axios = Axios.create({
  baseURL: process.env.VUE_APP_API_ROOT
});


// Add a request interceptor
$axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.headers.authorization = 'Bearer ' + store.state.solutech_web_token;
    return config;
  },
  function(error) {
    // Do something with
    console.log("request error...");
    return Promise.reject(error);
  }
);

// Add a response interceptor
$axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    if (!error.response) {
      swal("Network Error :(", "Kindly check your connection", "error").then();
      return Promise.reject(error);
    }
    switch (error.response.status) {
      case 401:
        store.dispatch("logout").then();
        return Promise.reject(error);
      case 403:
        swal(error.response.data.message, "", "error").then();
        return Promise.reject(error);
      case 500:
        swal(
          "Server Error :(",
          "Kindly contact your web master",
          "error"
        ).then();
        return Promise.reject(error);
      case 422:
        break;
      case 400:
        break;
      default:
        swal("Error :(", "Kindly contact your web master", "error").then();
    }
    return Promise.reject(error);
  }
);

export default {
  install: function(app) {
    app.config.globalProperties.$axios = $axios
  }
}
