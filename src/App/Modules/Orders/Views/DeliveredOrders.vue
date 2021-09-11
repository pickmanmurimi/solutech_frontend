<template>

  <!------------------------------------------------------------------------------------------------------->
  <!-- Orders -->
  <!------------------------------------------------------------------------------------------------------->
  <h1>Delivered Orders</h1>

  <datatable ref="vehicles"
             :baseUrl="baseUrl"
             advancedSearch
             :FilterFields="FilterFields"
             :ajax="true"
             :ajaxPaginated="true"
             :columns="columns" :actions="actions"
             prevText="<i class='fas fa-chevron-left text-primary'></i>"
             nextText="<i class='fas fa-chevron-right text-primary'></i>"></datatable>

</template>

<script>
import MainLayout from "../../../Common/Helpers/Layout/MainLayout";

export default {
  /**
   * name
   */
  name: "AvailableVehicles",

  /**
   * components
   */
  components: {MainLayout},

  /**
   * data
   */
  data() {
    return {
      baseUrl: `/vehicles/vehicle?status=available`,
      FilterFields: [
        {name: 'registration', type: 'text', text: 'Registration', class: 'col-md-6'},
        {name: 'make', type: 'text', text: 'Make', class: 'col-md-6'},
      ],
      columns: [
        {
          name: "registration",
          th: "Registration"
        },
        {
          name: "make",
          th: "Make"
        },
        {
          th: "Status",
          render(row) {
            return `<span class="badge badge-success"> ${row.status} </span>`
          }
        },
        {
          th: "Type",
          render(row) {
            return row?.vehicle_type?.name
          }
        },
        {
          name: "created_at_readable",
          th: "Created At"
        },

      ],
      actions: [
        {
          text: "view",
          color: "success",
          size: "sm mr-2",
          show: () => {
            return true
          },
          action: (row, index) => {
            // this.$router.push({
            //   name: 'Driver',
            //   params: {uuid: row.uuid}
            // })
          },
        },
        {
          text: "Load",
          color: "primary",
          size: "sm mr-2",
          show: () => {
            return true
          },
          action: (row, index) => {
            // this.$router.push({
            //   name: 'Driver',
            //   params: {uuid: row.uuid}
            // })
          },
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>
