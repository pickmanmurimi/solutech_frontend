<template>


  <!------------------------------------------------------------------------------------------------------->
  <!-- Orders -->
  <!------------------------------------------------------------------------------------------------------->
  <h1>Loading Orders</h1>

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
      baseUrl: `/vehicles/vehicle?status=loading`,
      FilterFields: [],
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
            return `<span class="badge badge-primary"> ${ row.status } </span>`
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
      actions: [],
    }
  }
}
</script>

<style scoped>

</style>
