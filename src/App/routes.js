import AuthenticationRoutes from "./Modules/Authentication/Router"
import HomeRoutes from "./Modules/Home/Router"
import OrdersRoutes from "./Modules/Orders/Router"
import VehiclesRoutes from "./Modules/Vehicles/Router"

export default [
    ...AuthenticationRoutes,
    ...HomeRoutes,
    ...OrdersRoutes,
    ...VehiclesRoutes,
]
