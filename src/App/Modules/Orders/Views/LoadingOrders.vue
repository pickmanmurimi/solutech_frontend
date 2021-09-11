<template>


  <!------------------------------------------------------------------------------------------------------->
  <!-- Orders -->
  <!------------------------------------------------------------------------------------------------------->
  <h1>Loading Orders</h1>

  <datatable ref="orders"
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
      baseUrl: `/orders/order?status=loading`,
      FilterFields: [
        {name: 'name', type: 'text', text: 'name', class: 'col-md-6'},
        {name: 'address', type: 'text', text: 'delivery address', class: 'col-md-6'},
        {name: 'depot', type: 'select', text: 'Select Depot', class: 'col-md-4', options: ['Nairobi', 'Mombasa']},
        {name: 'depot_address', type: 'text', text: 'depot address', class: 'col-md-4'},
      ],
      columns: [
        {
          th: "Name",
          render(row) {
            return `<span class="d-block"> ${row.name} </span>
                    <span class="badge badge-primary"> ${row.status} </span>`
          }
        },
        {
          name: "address",
          th: "Delivery Address"
        },
        {
          th: "depot",
          render(row) {
            return `<span class="d-block"> ${row.depot.name} </span>
                    <span class="d-block"> ${row.depot.address} </span>`
          }
        },
        {
          th: "vehicle",
          render(row) {
            return `<span class="d-block"> ${row.vehicle.registration} </span>
                    <span class="d-block"> ${row.vehicle.vehicle_type.name} </span>`
          }
        },

      ],
      actions: [
        {
          text: "Dispatch",
          color: "primary",
          size: "sm mr-2",
          show: () => {
            return true
          },
          action: (row, index) => {
            this.$loading.show()
            let order = { 'order_uuid' : row.uuid }
            this.$axios.post('orders/delivery/dispatch', order)
            .then(() => {
              swal("Order dispatched", "", "success")
              this.$loading.hide()
              this.$refs['orders'].reload()
            })
            .catch(() => {
              this.$loading.hide()
            })
          },
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>
