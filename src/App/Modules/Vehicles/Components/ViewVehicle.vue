<template>
  <!------------------------------------------------------------------------------------------------------->
  <!-- Load off canvas -->
  <!------------------------------------------------------------------------------------------------------->
  <OffCanvas ref="viewVehicle" title="Vehicle">

    <div>
      <h3>Registration</h3>

      <p>{{ vehicle.registration }}</p>

      <h3>Make</h3>
      <p>{{ vehicle.make }}</p>

      <h3>Type</h3>
      <p>{{ vehicle.vehicle_type.name }}</p>

      <h3> Status</h3>
      <p>{{ vehicle.status }}</p>

    </div>

  </OffCanvas>
</template>

<script>
export default {
  /**
   * name
   */
  name: "ViewVehicle",

  /**
   * props
   */
  props : {
    vehicle : {
      required : true,
      default: () => {
        return {
          vehicle_type : {}
        }
      }
    }
  },

  /**
   * methods
   */
  methods : {
    /**
     * openVehicleView
     */
    openVehicleView() {
      this.$refs['viewVehicle'].openOffCanvas()
    },

    /**
     * closeVehicleView
     */
    closeVehicleView() {
      this.$refs['viewVehicle'].closeOffCanvas()
    }
  }
}
</script>

<style scoped>

</style>
