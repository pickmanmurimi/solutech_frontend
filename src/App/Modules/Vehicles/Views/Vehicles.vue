<template>
  <main-layout>
    <template v-slot:content>
      <card :show-header="false">

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
  components: { MainLayout},

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
