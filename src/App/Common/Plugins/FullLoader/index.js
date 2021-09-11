import Loading from './Loading.vue'
import {createApp} from "vue";

import { useLoading } from 'vue3-loading-overlay';
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

let vm = {}
export default {
    /**
     * Install
     * @param app
     */
    install:  function (app) {
        app.config.globalProperties.$loading = useLoading()
    }
}

/**
 * asyncLoading
 * @param fn
 * @return {Promise<unknown>}
 */
export const asyncLoading = function (fn) {
    return new Promise((resolve, reject) => {
        vm.loading = true
        const finished = cb => {
            return (result) => {
                cb(result);
                vm.loading = false
            }
        }
        fn.then(finished(resolve)).catch(finished(reject))
    })
}
