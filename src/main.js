import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// libs

//internals
import axios from "./App/Common/Helpers/Axios/Axios";

import Authentication from "@/App/Common/Mixins/Authentication";
import { default as Helpers } from "./App/Common/Helpers";

createApp(App)
    .use(store)
    .use(router)
    .use(axios)
    .use(Helpers)
    .mixin(Authentication)
    .mount('#app')
