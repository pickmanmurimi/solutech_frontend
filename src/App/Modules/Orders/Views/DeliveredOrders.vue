<template>


  <!------------------------------------------------------------------------------------------------------->
  <!-- Orders -->
  <!------------------------------------------------------------------------------------------------------->
  <h1>Delivered Orders</h1>

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
  name: "DeliveredOrders",

  /**
   * components
   */
  components: {MainLayout},

  /**
   * data
   */
  data() {
    return {
      baseUrl: `/orders/order?status=delivered`,
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
                    <span class="badge badge-success"> ${row.status} </span>`
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
      ],
    }
  }
}
</script>

<style scoped>

</style>
