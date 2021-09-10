import AuthenticationRoutes from "./Modules/Authentication/Router"
import HomeRoutes from "./Modules/Home/Router"
import AuthorizationRoutes from "./Modules/Authorization/Router"

export default [
    ...AuthenticationRoutes,
    ...HomeRoutes,
    ...AuthorizationRoutes,
]
