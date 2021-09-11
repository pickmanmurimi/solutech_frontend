<template>
  <main-layout>

    <template v-slot:header-body>
      <stats-header></stats-header>
    </template>


    <template v-slot:content>

          <card>
            <template v-slot:header>
                <DashboardCardHeader></DashboardCardHeader>
            </template>

            <template v-slot:body>
              <p class="mt-3 mb-0 text-muted text-sm">
                Dashboard Control
              </p>
            </template>

          </card>

    </template>
  </main-layout>
</template>

<script>
import DashboardCardHeader from "@/App/Modules/Home/Components/DashboardCardHeader";
import StatsHeader from "@/App/Modules/Home/Components/StatsHeader";
export default {
  /**
   * name
   */
  name: "Home",


  /**
   * components
   */
  components: {DashboardCardHeader, StatsHeader}
}
</script>

<style scoped>

</style>
