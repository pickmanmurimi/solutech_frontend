<template>
  <main-layout>
    <template slot="content">
      <card>
        <template slot="header">
          <h1 class="text-muted">View Role</h1>
        </template>

        <template slot="body">

          <!-- loader -->
          <center-loader v-if="loading" colorClass="success"></center-loader>

          <card headerBg="" subtitle="Role name, permissions." title="Edit Role" titleColor="text-muted">
            <template slot="body">
              <!-- form -->
              <div class="row">
                <!-- rolename -->
                <div class="col-md-6">
                  <small>Role Name</small>
                  <p class="lead"> {{ role_name }} </p>
                </div>

                <!-- permissions -->
                <div class="col-12">
                  <card headerBg="" subtitle="Select the permissions for this role." title="Permissions"
                        titleColor="text-muted">
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
                          <td class="text-capitalize"><small> {{ _module }} </small>
                          </td>
                          <!-- td for each module -->
                          <td v-for="action in actions" :key="action" class="text-capitalize">
                            <small>
                              <i v-if="module_permissions[_module].includes( action ) && checked_permissions.includes( _module + '.' + action )"
                                 class="fas fa-check text-success"></i>
                              <i v-else-if="!module_permissions[_module].includes( action )"
                                 class="fas fa-times text-danger" data-placement="bottom" data-toggle="tooltip"
                                 title="Permission Not Available"></i>
                              <i v-else class="fas fa-minus-circle text-secondary" data-placement="bottom" data-toggle="tooltip"
                                 title="Permission Denied"></i>

                            </small>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                      <div>
                        <small v-if="formError['permissions']" class="text-danger">
                          {{ formError['permissions'][0] }} </small>
                      </div>

                    </template>
                  </card>
                  <!-- View all Roles -->
                  <div class="text-right">
                    <router-link :to="{ name : 'TenantAuthorization' }" class="btn btn-sm btn-success"> View all Roles
                    </router-link>
                  </div>
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
      this.$axios.get(`/authentication/admin/roles/show/${this.$route.params.uuid}`)
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
