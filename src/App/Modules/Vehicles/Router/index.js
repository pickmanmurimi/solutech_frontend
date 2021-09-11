import { Vehicles, AvailableVehicles, LoadingVehicles, TransitVehicles } from "../Views";

export default [
    {
        path: "/vehicles",
        component: Vehicles,
        name: "Vehicles",
        props: true,
        meta: {
            requiresAuth: true,
            onmenu: true,
            title: "Vehicles",
            permission: "*",
            icon: "fas fa-truck-moving",
            strictNoAuth: false
        },
        children : [
            {
                path: "/vehicles/available",
                component: AvailableVehicles,
                name: "AvailableVehicles",
                props: true,
                meta: {
                    requiresAuth: true,
                    onmenu: true,
                    title: "Available Vehicles",
                    permission: "*",
                    icon: "far fa-circle text-success",
                    strictNoAuth: false
                },
            },
            {
                path: "/vehicles/loading",
                component: LoadingVehicles,
                name: "LoadingVehicles",
                props: true,
                meta: {
                    requiresAuth: true,
                    onmenu: true,
                    title: "Loading Vehicles",
                    permission: "*",
                    icon: "far fa-circle text-primary",
                    strictNoAuth: false
                },
            },
            {
                path: "/vehicles/available",
                component: TransitVehicles,
                name: "TransitVehicles",
                props: true,
                meta: {
                    requiresAuth: true,
                    onmenu: true,
                    title: "Transit Vehicles",
                    permission: "*",
                    icon: "far fa-circle text-warning",
                    strictNoAuth: false
                },
            },
        ]
    },
]
