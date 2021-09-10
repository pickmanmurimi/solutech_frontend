import { Login } from "@/App/Modules/Authentication/Views";

export default [
    {
        path: "/",
        component: Login,
        name: "Login",
        meta: {
            requiresAuth: false,
            onmenu: false,
            title: "Login",
            strictNoAuth: true
        }
    },
]