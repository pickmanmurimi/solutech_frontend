<template>
  <main-layout>
    <template slot="content">
      <card>
        <template slot="header">
          <h1 class="text-muted">Roles</h1>
        </template>

        <template slot="body">

            <!-- loader -->
            <center-loader v-if="gettingTableData" colorClass="success"></center-loader>
            <!-- ============================================================== -->
            <!-- Add Role -->
            <!-- ============================================================== -->
            <div class="mb-3">
                <router-link
                    v-if="can('role.create')" :to="{ name: 'AddRole'}"
                    class="btn btn-sm btn-primary"> New Role + </router-link>
            </div>
            <!-- ============================================================== -->
            <!-- Authorization -->
            <!-- ============================================================== -->
                <!-- body -->
                    <datatable :data="roles" :ajaxLoading="tableLoading" :columns="role_columns" :actions="role_actions"
                        prevText="<i class='fas fa-chevron-left text-primary'></i>"
                        nextText="<i class='fas fa-chevron-right text-primary'></i>"></datatable>
        </template>
      </card>
    </template>
  </main-layout>
</template>

<script>
    import { default as RolesTableSetup } from '../Mixins/RolesTableSetup'

    export default {

        /**
         * mixins
         */
        mixins: [ RolesTableSetup ],

        /**
         * data
         */
        data() {
            return {
                tableLoading: false,
                gettingTableData: false,
                roles:[],
                show_roles: true,
                single_role:{},
                permissions: []
            }
        },
        
        /**
         * created
         */
        created() {
            this.getRoles()
        },
        /**
         * methods
         */
        methods: {

            /**
             * getRoles
             */
            getRoles() {
                this.tableLoading = true
                this.gettingTableData = true

                this.$axios.get('/authentication/admin/roles/get/all')
                    .then(Response => {
                        let data = Response.data.data
                        this.roles = data
                        this.gettingTableData = false
                    })
                    .catch(err => {
                        this.gettingTableData = false
                        console.log(err)
                    })
            },
        }
    }

</script>
