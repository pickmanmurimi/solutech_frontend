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
  <OffCanvas ref="loadOrder" title="Load Order">

    <div>
      <h3>Order</h3>

      <div v-if="Object.keys(formError).length !== 0" class="alert alert-danger">
        {{ formError.message }} <br>
        Please select a a vehicle form the available vehicles.
      </div>

      <p>{{ currentOrder.name }}</p>

      <h3>Delivery Address</h3>
      <p>{{ currentOrder.address }}</p>

      <h3>Current Depot</h3>
      <p>{{ currentOrder.depot.name }}</p>

      <h3> Depot Address</h3>
      <p>{{ currentOrder.depot.address }}</p>

      <hr>

      <h3>Select Vehicle</h3>

      <button class="btn btn-sm btn-primary" @click="showAvailableVehicles">Get Available Vehicles</button>

      <div class="row mt-2" v-if="vehicle.vehicle_type.length">
        <div class="col-md-4">
          <h3> Registration </h3>
          <p>{{ vehicle.registration }}</p>
        </div>
        <div class="col-md-4">
          <h3> Type </h3>
          <p>{{ vehicle.vehicle_type.name }}</p>
        </div>
        <div class="col-md-4">
          <h3> Make </h3>
          <p>{{ vehicle.make }}</p>
        </div>
      </div>


      <hr>

      <button :disabled="vehicle.vehicle_type.length" class="btn btn-primary" @click="loadOrder">Load Order</button>
    </div>


  </OffCanvas>

  <!------------------------------------------------------------------------------------------------------->
  <!-- Current Vehicles Modal -->
  <!------------------------------------------------------------------------------------------------------->
  <modal title="Available Vehicles"
         modalId="AvailableVehicles"
         size="lg">
    <template v-slot:body>
      <AvailableVehiclesList @selected="selectVehicle"></AvailableVehiclesList>
    </template>

  </modal>

</template>

<script>
import MainLayout from "../../../Common/Helpers/Layout/MainLayout";
import AvailableVehiclesList from "../../Vehicles/Components/AvailableVehiclesList";

export default {
  /**
   * name
   */
  name: "PendingOrders",

  /**
   * components
   */
  components: {AvailableVehiclesList, MainLayout},

  /**
   * data
   */
  data() {
    return {
      showOffCanvas: false,
      currentOrder: {
        depot: {}
      },
      vehicles: [],
      formError: {},
      vehicle: {
        vehicle_type: {}
      },
      baseUrl: `/orders/order?status=pending`,
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
  },


  /**
   * methods
   */
  methods: {

    /**
     * showAvailableVehicles
     */
    showAvailableVehicles() {
      $('#AvailableVehicles').modal('show')
    },
    /**
     * selectVehicle
     */
    selectVehicle(vehicle) {
      $('#AvailableVehicles').modal('hide')
      this.vehicle = vehicle
    },

    /**
     * loadOrder
     */
    loadOrder() {
      this.$loading.show()
      const order = {
        "vehicle_uuid": this.vehicle.uuid,
        "order_uuid": this.currentOrder.uuid
      }
      this.formError = {}
      this.$axios.post('orders/delivery/load', order)
          .then(() => {
            this.$loading.hide()
            swal("Order is loading", "", "success")
            this.vehicle = {
              vehicle_type: {}
            }
            this.$refs['loadOrder'].closeOffCanvas()
            this.$refs['orders'].reload()
          })
          .catch(err => {
            this.$loading.hide()
            if (err?.response?.data) {
              this.formError = err?.response?.data
              console.log(this.formError)
            }
          })
    }
  }
}
</script>

<style scoped>

</style>
