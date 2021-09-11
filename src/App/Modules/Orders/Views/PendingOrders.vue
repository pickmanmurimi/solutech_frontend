<template>

  <!------------------------------------------------------------------------------------------------------->
  <!-- Orders -->
  <!------------------------------------------------------------------------------------------------------->
  <h1>Pending Orders</h1>

  <datatable ref="orders"
             :baseUrl="baseUrl"
             advancedSearch
             :FilterFields="FilterFields"
             :ajax="true"
             :ajaxPaginated="true"
             :columns="columns" :actions="actions"
             prevText="<i class='fas fa-chevron-left text-primary'></i>"
             nextText="<i class='fas fa-chevron-right text-primary'></i>"></datatable>

  <!------------------------------------------------------------------------------------------------------->
  <!-- Load off canvas -->
  <!------------------------------------------------------------------------------------------------------->
  <OffCanvas ref="loadOrder" title="Load Order" :show="showOffCanvas">

    <h3>Order</h3>
    <p>{{ currentOrder.name }}</p>

    <h3>Delivery Address</h3>
    <p>{{ currentOrder.address }}</p>

    <h3>Current Depot</h3>
    <p>{{ currentOrder.depot.name }}</p>

    <h3> Depot Address</h3>
    <p>{{ currentOrder.depot.address }}</p>

    <hr>

    <h3>Select Vehicle</h3>


    <hr>

    <button class="btn btn-sm btn-primary">Load Vehicle</button>

  </OffCanvas>


</template>

<script>
import MainLayout from "../../../Common/Helpers/Layout/MainLayout";

export default {
  /**
   * name
   */
  name: "PendingOrders",

  /**
   * components
   */
  components: {MainLayout},

  /**
   * data
   */
  data() {
    return {
      showOffCanvas: false,
      currentOrder: {
        depot: {}
      },
      baseUrl: `/orders/order?status=pending`,
      FilterFields: [
        {name: 'name', type: 'text', text: 'name', class: 'col-md-6'},
        {name: 'address', type: 'text', text: 'delivery address', class: 'col-md-6'},
        { name: 'depot', type: 'select',text:'Select Depot', class: 'col-md-4',  options: [ 'Nairobi', 'Mombasa']},
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
          name: "created_at_readable",
          th: "Created At"
        },

      ],
      actions: [
        {
          text: "Load",
          color: "primary",
          size: "sm mr-2",
          show: () => {
            return true
          },
          action: (row, index) => {
            this.currentOrder = row
            this.$refs['loadOrder'].openOffCanvas()
          },
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>
