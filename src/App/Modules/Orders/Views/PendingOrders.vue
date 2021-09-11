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
      baseUrl: `/orders/order`,
      FilterFields: [
        {name: 'name', type: 'text', text: 'Registration', class: 'col-md-6'},
        {name: 'make', type: 'text', text: 'Make', class: 'col-md-6'},
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
