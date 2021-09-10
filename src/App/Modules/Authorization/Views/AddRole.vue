<template>
  <main-layout>
    <template slot="content">
      <card>
        <template slot="header">
          <h1 class="text-muted">Create Role</h1>
        </template>

        <template slot="body">

          <!-- loader -->
          <center-loader v-if="loading" colorClass="success"></center-loader>

          <card headerBg="" subtitle="Role name, permissions." title="New Role" titleColor="text-muted">
            <template slot="body">
              <!-- form -->
              <div class="row">
                <!-- roleName -->
                <div class="col-md-6">
                  <BaseInput v-model="role" :formError="formError" name="name" text="Role Name"/>
                </div>

                <!-- permissions -->
                <div class="col-12">
                  <card headerBg="" subtitle="Select the permissions for this role." title="Permissions"
                        titleColor="text-muted">
                    <template slot="body">

                      <!-- =============================================================================== -->
                      <!-- Permissions Table -->
                      <!-- =============================================================================== -->
                      <table class="table table-hover border text-capitalize">
                        <thead>
                        <tr>
                          <th class="border-right" scope="col"><small><strong> Modules </strong> </small></th>
                          <!-- actions list -->
                          <th v-for="action in actions" :key="action" class="border-right" scope="col"><small>
                            <strong> {{ action }} </strong> </small></th>
                        </tr>
                        </thead>
                        <tbody>
                        <center-loader v-if="loading"></center-loader>
                        <tr v-for="_module in modules" :key="_module">
                          <!-- module name -->
                          <td class="text-capitalize border-right"><small> {{ _module }} </small>
                          </td>
                          <!-- td for each module -->
                          <td v-for="action in actions" :key="action" class="text-capitalize border-right">
                            <small>
                              <div v-if="module_permissions[_module].includes( action )"
                                   class="form-check">
                                <input id="defaultCheck1" v-model="checked_permissions"
                                       :value="_module + '.' + action"
                                       class="form-check-input" type="checkbox">
                                <label class="form-check-label" for="defaultCheck1">
                                  {{ module_permissions[_module].includes(action) ? action : null }}
                                </label>
                              </div>

                              <div v-else class="form-check">
                                <input id="defaultCheck2" class="form-check-input" disabled
                                       type="checkbox" value="">
                              </div>

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
                  <!-- save -->
                  <div class="text-right">
                    <button v-if="can('role.create')" class="btn btn-sm btn-success" @click="add">Save</button>
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
      role: '',
      permissions: [],
      modules: [],
      actions: [],
      module_permissions: [],
      checked_permissions: []
    }
  },

  /**
   * created
   */
  created() {
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
     * add
     */
    add() {
      // start loading animation
      this.loading = true
      let new_role = {
        name: this.role,
        permissions: this.checked_permissions
      }
      // add role
      this.$axios.post('/authentication/admin/roles/store', new_role)
          .then(Response => {
            this.formError = {}
            this.loading = false
            this.role = ''
            this.checked_permissions = []
            // show success
            this.$swal('Role Added!', '', 'success')
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

      console.log(this.module_permissions)
    }
  }
}

</script>
