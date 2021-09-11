import { Orders, PendingOrders, LoadingOrders, DispatchedOrders, DeliveredOrders } from "../Views";

export default [
    {
        path: "/orders",
        component: Orders,
        name: "Orders",
        props: true,
        meta: {
            requiresAuth: true,
            onmenu: true,
            title: "Orders",
            permission: "*",
            icon: "ni ni-box-2",
            strictNoAuth: false
        },
        children : [
            {
                path: "/orders/pending",
                component: PendingOrders,
                name: "PendingOrders",
                props: true,
                meta: {
                    requiresAuth: true,
                    onmenu: true,
                    title: "Pending Orders",
                    permission: "*",
                    icon: "far fa-circle text-primary",
                    strictNoAuth: false
                },
            },
            {
                path: "/orders/loading",
                component: LoadingOrders,
                name: "LoadingOrders",
                props: true,
                meta: {
                    requiresAuth: true,
                    onmenu: true,
                    title: "Loading Orders",
                    permission: "*",
                    icon: "far fa-circle text-blue",
                    strictNoAuth: false
                },
            },
            {
                path: "/vehicles/available",
                component: DispatchedOrders,
                name: "DispatchedOrders",
                props: true,
                meta: {
                    requiresAuth: true,
                    onmenu: true,
                    title: "Dispatched Orders",
                    permission: "*",
                    icon: "far fa-circle text-warning",
                    strictNoAuth: false
                },
            },
            {
                path: "/vehicles/available",
                component: DeliveredOrders,
                name: "DeliveredOrders",
                props: true,
                meta: {
                    requiresAuth: true,
                    onmenu: true,
                    title: "Delivered Orders",
                    permission: "*",
                    icon: "far fa-circle text-success",
                    strictNoAuth: false
                },
            },
        ]
    },
]
