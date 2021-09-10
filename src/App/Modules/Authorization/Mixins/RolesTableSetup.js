export default {
    data() {
        return {
            role_columns: [
                {
                    name: "name",
                    th: "Name"
                },
                {
                    name: "created_at",
                    th: "Created at",
                }
            ],
            role_actions: [
                {
                    text: "View",
                    color: "primary",
                    show: (row, index) => { return ( this.can('role.view') ) },
                    size: "sm mr-2",
                    action: (row, index) => {
                        this.$router.push({ name: 'TenantViewRole', params: { uuid: row.id } } ).catch(err => {})
                    }
                },
                {
                    text: "Edit",
                    color: "warning",
                    size: "sm",
                    show: (row, index) => { return ( this.can('role.update') ) },
                    action: (row, index) => {
                        this.$router.push({ name: 'TenantEditRole', params: { uuid: row.id } } ).catch(err => {})
                    }
                }
            ],
        }
    }
}
