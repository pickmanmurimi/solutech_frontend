import { Authorization, AddRole, EditRole, ViewRole, AuthorizationModule } from "../Views"

export default [
    {
        path: '/authorization',
        component: AuthorizationModule,
        name:'TenantAuthorizationModule',
        meta:{
            requiresAuth: true,
            onmenu: true,
            title: 'Authorization',
            permission: '*',
            icon : 'fas fa-lock'
        },
        children: [
            {
                path: '/authorization/view-all',
                component: Authorization,
                name:'TenantAuthorization',
                meta:{
                    requiresAuth: true,
                    onmenu: true,
                    title: 'Roles',
                    parent:'TenantAuthorizationModule',
                    permission: '*',
                    icon : 'fas fa-lock'
                }
            },
            {
                path: '/authorization/add-role',
                component: AddRole,
                name:'AddRole',
                meta:{
                    requiresAuth: true,
                    onmenu: true,
                    title: 'Add Role',
                    parent:'TenantAuthorizationModule',
                    permission: '*',
                    icon : 'fas fa-lock'
                }
            },
            {
                path: '/authorization/edit-role/:uuid',
                component: EditRole,
                name:'TenantEditRole',
                meta:{
                    requiresAuth: true,
                    onmenu: false,
                    title: 'EditRole',
                    parent:'TenantAuthorizationModule',
                    permission: '*',
                    icon : 'fas fa-lock'
                }
            },
            {
                path: '/authorization/view-role/:uuid',
                component: ViewRole,
                name:'TenantViewRole',
                meta:{
                    requiresAuth: true,
                    onmenu: false,
                    title: 'ViewRole',
                    parent:'TenantAuthorizationModule',
                    permission: '*',
                    icon : 'fas fa-lock'
                }
            },
        ]
    },
]