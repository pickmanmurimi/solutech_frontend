<template>
  <main-layout>
    <template v-slot:content>
      <card>
        <template v-slot:header>
          <button class="btn btn-primary">Add new Vehicle</button>
        </template>

        <template v-slot:body>
          <!------------------------------------------------------------------------------------------------------->
          <!-- Vehicles -->
          <!------------------------------------------------------------------------------------------------------->
          <router-view></router-view>

        </template>
      </card>
    </template>
  </main-layout>
</template>

<script>
import MainLayout from "../../../Common/Helpers/Layout/MainLayout";
export default {
  /**
   * name
   */
  name: "Vehicles",

  /**
   * components
   */
  components: {MainLayout},

  /**
   * data
   */
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
