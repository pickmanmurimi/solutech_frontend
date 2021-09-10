<template>
  <div class="header-body">
    <!-- Card stats -->
    <div class="row">
      <div class="col-xl-3 col-lg-6 mb-3">
        <div class="card card-stats mb-4 mb-xl-0">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0"> Drivers </h5>
                <span v-if="!loading" class="h2 font-weight-bold mb-0">{{ stats.Drivers }}</span>
                <center-loader v-if="loading"></center-loader>

              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-danger text-white rounded-circle shadow">
                  <router-link :to="{ name: 'Drivers'}" class="text-white">
                    <i class="fas fa-users"></i>
                  </router-link>
                </div>
              </div>
            </div>
            <p class="mt-3 mb-0 text-muted text-sm">
              <span class="text-nowrap">Wallet Balance : </span>
              <span class="text-success mr-2 font-weight-bold"> {{ stats.WalletBalance }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-6 mb-3">
        <div class="card card-stats mb-4 mb-xl-0">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0">Vehicles</h5>
                <span v-if="!loading" class="h2 font-weight-bold mb-0">{{ stats.Vehicles }}</span>
                <center-loader v-if="loading"></center-loader>

              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-warning text-white rounded-circle shadow">
                  <router-link :to="{ name: 'Drivers'}" class="text-white">
                    <i class="fas fa-car"></i>
                  </router-link>
                </div>
              </div>
            </div>
            <p class="mt-3 mb-0 text-muted text-sm">
              <!-- <span class="text-danger mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span>
              <span class="text-nowrap">Since last week</span> -->
            </p>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-6 mb-3">
        <div class="card card-stats mb-4 mb-xl-0">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0">Transactions</h5>
                <span v-if="!loading" class="h2 font-weight-bold mb-0">{{ stats.Transactions }}</span>
                <center-loader v-if="loading"></center-loader>

              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-yellow text-white rounded-circle shadow">
                  <router-link :to="{ name: 'Drivers'}" class="text-white">
                    <i class="fas fa-chart-bar"></i>
                  </router-link>
                </div>
              </div>
            </div>
            <p class="mt-3 mb-0 text-muted text-sm">
              <!-- <span class="text-warning mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span>
              <span class="text-nowrap">Since yesterday</span> -->
            </p>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-6 mb-3">
        <div class="card card-stats mb-4 mb-xl-0">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0">Stations</h5>
                <span v-if="!loading" class="h2 font-weight-bold mb-0">{{ stats.Stations }}</span>
                <center-loader v-if="loading"></center-loader>

              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                  <router-link :to="{ name: 'Drivers'}" class="text-white">
                    <i class="ni ni-shop"></i>
                  </router-link>
                </div>
              </div>
            </div>
            <p class="mt-3 mb-0 text-muted text-sm">
              <!-- <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> 12%</span>
              <span class="text-nowrap">Since last month</span> -->
            </p>
          </div>
        </div>
      </div>

<!--      At-->
      <div class="col-xl-3 col-lg-6 mb-3">
        <div class="card card-stats mb-4 mb-xl-0">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0">Africas Talking</h5>
                <span v-if="!loading"
                      class="h2 font-weight-bold mb-0"
                      :class="(stats.at_balance.status !== 200 ) ? 'text-danger' : 'text-success'"
                >{{ stats.at_balance.balance }}</span>
                <center-loader v-if="loading"></center-loader>

              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-warning text-white rounded-circle shadow">
                    <i class="fas fa-phone"></i>
                </div>
              </div>
            </div>
            <p class="mt-3 mb-0 text-muted text-sm">
              <!-- <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> 12%</span>
              <span class="text-nowrap">Since last month</span> -->
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  /**
   * props
   */
  data() {
    return {
      stats: {
        Drivers: 0,
        Vehicles: 0,
        Transactions: 0,
        Stations: 0,
        WalletBalance: 0,
        at_balance: {}
      },
      loading: false,
    }
  },

  /**
   * created
   */
  created() {
    this.getStats();
  },

  /**
   * methods
   */
  methods: {
    /**
     * getStats
     */
    getStats() {
      this.loading = true
      //show loading
      this.$axios.get('admin/reports/quick-stats').then(response => {
        //add groups to data
        let data = response.data.data;
        this.stats.Drivers = data.Drivers
        this.stats.Vehicles = data.Vehicles
        this.stats.Transactions = data.Transactions
        this.stats.Stations = data.Stations
        this.stats.WalletBalance = data.WalletBalance
        this.stats.at_balance = data.at_balance

        this.loading = false
      }).catch(err => {
        this.loading = false
        this.$swal('error', err.response.data.message, 'error')
      })
    },
  }
}

</script>
