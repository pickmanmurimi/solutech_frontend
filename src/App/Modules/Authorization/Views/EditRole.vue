<template>
  <main-layout>
    <template slot="content">
      <card>
        <template slot="header">
          <h1 class="text-muted">Edit Role</h1>
        </template>

        <template slot="body">

            <!-- loader -->
            <center-loader colorClass="success" v-if="loading"></center-loader>

            <card headerBg="" titleColor="text-muted" subtitle="Role name, permissions." title="Edit Role">
                <template slot="body">
                    <!-- form -->
                    <div v-if="!role_updated" class="row">
                        <!-- rolename -->
                        <div class="col-md-6">
                            <BaseInput v-model="role_name" name="name" :formError="formError" text="Role Name" />
                        </div>

                        <!-- permissions -->
                        <div class="col-12">
                            <card headerBg="" titleColor="text-muted" subtitle="Select the permissions for this role."
                                title="Permissions">
                                <template slot="body">

                                    <!-- =============================================================================== -->
                                    <!-- Permissions Table -->
                                    <!-- =============================================================================== -->
                                    <table class="table table-hover border">
                                        <thead>
                                            <tr class="text-capitalize">
                                                <th scope="col"><small><strong> Modules </strong> </small></th>
                                                <!-- actions list -->
                                                <th v-for="action in actions" :key="action" scope="col"><small>
                                                        <strong> {{ action }} </strong> </small></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="_module in modules" :key="_module">
                                                <!-- module name -->
                                                <td class="text-capitalize"> <small> {{ _module }} </small>
                                                </td>
                                                <!-- td for each module -->
                                                <td class="text-capitalize" v-for="action in actions" :key="action">
                                                    <small>
                                                        <div v-if="module_permissions[_module].includes( action )"
                                                            class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                v-model="checked_permissions"
                                                                :value="_module + '.' + action" id="defaultCheck1">
                                                            <label class="form-check-label" for="defaultCheck1">
                                                                {{ module_permissions[_module].includes( action ) ? action : null }}
                                                            </label>
                                                        </div>

                                                        <div v-else class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="defaultCheck2" disabled>
                                                        </div>

                                                    </small>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div>
                                        <small class="text-danger" v-if="formError['permissions']">
                                            {{ formError['permissions'][0] }} </small>
                                    </div>

                                </template>
                            </card>
                            <!-- save -->
                            <div class="text-right">
                                <button v-if="can('role.update')" @click="update" class="btn btn-sm btn-success">Update</button>
                            </div>
                        </div>
                    </div>

                    <div v-else class="row">
                        <div class="col-12 alert alert-success ">
                            <small class="text-capitalize">{{ role_name }} role has been edited.</small>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-sm btn-primary" @click=" role_updated = !role_updated"> Go back to edit Role </button>
                            <router-link v-if="can('role.viewAny')" :to="{ name : 'TenantAuthorization' }" class="btn btn-sm btn-success"> View all Roles </router-link>
                        </div>
                    </div>
                </template>
            </card>

        </template>
      </card>
    </template>
  </main-layout>
</template>
<script>
    export default {

        /**
         * data
         */
        data() {
            return {
                formError: {},
                loading: false,
                role: {},
                role_name: '',
                permissions: [],
                modules: [],
                actions: [],
                module_permissions: [],
                checked_permissions: [],
                role_updated: false
            }
        },

        /**
         * created
         */
        created() {
            this.getRole()
            this.getPermissions()
        },

        /**
         * methods
         */
        methods: {
            /**
             * getPermissions
             */
            getPermissions() {
                this.loading = true
                this.$axios.get('/authentication/admin/roles/permissions/get/all')
                    .then(Response => {
                        this.loading = false
                        this.permissions = Response.data.data
                        this.mapPermissions()
                    })
                    .catch(err => {
                        this.loading = false
                        console.log(err)
                    })
            },

            /**
             * getRole
             */
            getRole() {
                this.loading = true
                this.$axios.get(`/authentication/admin/roles/show/${ this.$route.params.uuid }`)
                    .then(Response => {
                        this.loading = false
                        this.role = Response.data.data
                        this.role_name = this.role.name
                        this.checked_permissions = this.role.permissions_list
                    })
                    .catch(err => {
                        this.loading = false
                        console.log(err)
                    })
            },

            /**
             * update
             */
            update() {
                // start loading animation
                this.loading = true
                let update_role = {
                    name: this.role_name,
                    permissions: this.checked_permissions
                }
                // update role
                this.$axios.put(`/authentication/admin/roles/update/${ this.$route.params.uuid }`, update_role )
                    .then(Response => {
                        this.formError = {}
                        this.loading = false
                        this.getRole()
                        this.role_updated = true
                        // show success
                        this.$swal('Role Updated!', '', 'success')
                    })
                    .catch(err => {
                        this.loading = false
                        this.formError = err?.response.data.errors
                        console.log(err)
                    })
            },

            /**
             * mapPermissions
             */
            mapPermissions() {
                // get all the permissions in key values
                let permissions = this.permissions.map(permission => {
                    return permission.name.split(".")
                })

                // get all the modules
                this.modules = []
                permissions.forEach(permission => {
                    if (!this.modules.includes(permission[0])) {
                        this.modules.push(permission[0]);
                    }
                })
                // get the actions
                this.actions = []
                permissions.forEach(permission => {
                    if (!this.actions.includes(permission[1])) {
                        this.actions.push(permission[1]);
                    }
                })

                this.module_permissions = []
                this.modules.forEach(_module => {
                    this.module_permissions[_module] = []
                    // go via all permissions
                    permissions.forEach(permission => {
                        if (permission[0] == _module) {
                            this.module_permissions[_module].push(permission[1]);
                        }
                    })
                })
            }
        }
    }

</script>
