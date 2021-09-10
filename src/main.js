import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// libs
// import VuePageTransition from 'vue-page-transition'


//internals
// require("./App/Common/Helpers/Axios/Axios");

import { default as Helpers } from "./App/Common/Helpers";
import { default as swalPlugin } from './App/Common/Helpers/Plugins/swal'

createApp(App)
    .use(store)
    .use(router)
    // .use(VuePageTransition)
    .mount('#app')
