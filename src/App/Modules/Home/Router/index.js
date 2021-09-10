import { Home } from "../Views";

export default [
    {
        path: "/home",
        component: Home,
        name: "Home",
        meta: {
            requiresAuth: true,
            onmenu: true,
            title: "Home",
            icon: "ni ni-tv-2",
            permission: '*'
        }
    },
]