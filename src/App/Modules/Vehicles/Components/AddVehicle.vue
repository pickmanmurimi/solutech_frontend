<template>
  <!------------------------------------------------------------------------------------------------------->
  <!-- Load off canvas -->
  <!------------------------------------------------------------------------------------------------------->
  <OffCanvas ref="viewVehicle" title="Add Vehicle">

    <div>
      <h3>Registration</h3>
      <BaseInput
                 v-model="vehicle['registration']" formClass="form-control-sm" name="registration"
                 placeholder="Registration"
                 :formError="formError" text="Vehicle registration"/>

      <h3>Make</h3>
      <BaseInput
          v-model="vehicle['make']" formClass="form-control-sm" name="make"
          placeholder="Make"
          :formError="formError" text="Vehicle make"/>

      <h3>Type</h3>
      <Multiselect
          v-model="selected_vehicle_type"
          track-by="id"
          label="name"
          :options="vehicle_types"
      />
      <!-- error-->
      <small class="form-text text-danger" v-if="formError['vehicle_type_id']">
        {{ formError.vehicle_type_id[0] }} </small>

      <hr>

      <button class="btn btn-primary" @click="addVehicle"> add </button>

    </div>

  </OffCanvas>
</template>

<script>
import Multiselect from '@suadelabs/vue3-multiselect'

export default {
  /**
   * name
   */
  name: "AddVehicle",

  /**
   * emits
   */
  emits:['added'],

  /**
   * components
   */
  components : { Multiselect },

  /**
   * data
   */
  data() {
    return {
      formError : [],
      selected_vehicle_type : {},
      vehicle: {
        vehicle_type : {}
      },
      vehicle_types: []
    }
  },

  /**
   * created
   */
  created() {
    this.getVehicleTypes()
  },

  /**
   * methods
   */
  methods : {
    /**
     * openVehicleView
     */
    openVehicleView() {
      this.formError = []
      this.$refs['viewVehicle'].openOffCanvas()
    },

    /**
     * getVehicleTypes
     */
    getVehicleTypes() {
      // this.$loading.show()
      this.$axios.get('vehicles/vehicle-type')
          .then((response) => {
            this.$loading.hide()
            this.vehicle_types = response?.data?.data
          })
          .catch(( err ) => {
            this.$loading.hide()
          })
    },

    /**
     * addVehicle
     */
    addVehicle() {
      this.$loading.show()
      this.formError = []
      this.vehicle.vehicle_type_id = this.selected_vehicle_type?.id
      this.$axios.post(`vehicles/vehicle`, this.vehicle)
          .then(() => {
            swal("Vehicle added", "", "success")
            this.$loading.hide()
            this.$refs['viewVehicle'].closeOffCanvas()
            this.$emit("added")
          })
          .catch(( err ) => {
            this.$loading.hide()
            if ( err?.response?.data) {
              this.formError = err?.response?.data?.errors
              console.log(this.formError)

            }
          })
    }
  },
}
</script>
<style src="@suadelabs/vue3-multiselect/dist/vue3-multiselect.css"></style>

<style scoped>

</style>
