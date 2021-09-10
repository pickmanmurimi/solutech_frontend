import { _View } from "../Views";

export default [
    {
        path: "/_base-view",
        component: _View,
        name: "_base-view",
        meta: {
            requiresAuth: false,
            onmenu: true,
            title: "_base-view",
            strictNoAuth: true
        }
    },
]