<template>


  <!------------------------------------------------------------------------------------------------------->
  <!-- Vehicles -->
  <!------------------------------------------------------------------------------------------------------->
  <h1>Transit Vehicles</h1>

  <datatable ref="vehicles"
             :baseUrl="baseUrl"
             advancedSearch
             :FilterFields="FilterFields"
             :ajax="true"
             :ajaxPaginated="true"
             :columns="columns" :actions="actions"
             prevText="<i class='fas fa-chevron-left text-primary'></i>"
             nextText="<i class='fas fa-chevron-right text-primary'></i>"></datatable>

  <view-vehicle :vehicle="vehicle" ref="vehicle"></view-vehicle>

</template>

<script>
import MainLayout from "../../../Common/Helpers/Layout/MainLayout";
import ViewVehicle from "../Components/ViewVehicle";

export default {
  /**
   * name
   */
  name: "AvailableVehicles",

  /**
   * components
   */
  components: {ViewVehicle, MainLayout},

  /**
   * data
   */
  data() {
    return {
      baseUrl: `/vehicles/vehicle?status=transit`,
      vehicle: {
        vehicle_type : {}
      },
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
            return `<span class="badge badge-warning"> ${ row.status } </span>`
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
            this.vehicle = row
            this.$refs['vehicle'].openVehicleView()
          },
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>
