<template>
  <div>
    <auth-layout>
      <template slot="content">
        <div>
          <!-- Page content -->
          <div class="container mt--8 pb-5">
            <div class="row justify-content-center">
              <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                  <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2 mb-3">
                      <small>Sign in</small>
                    </div>
                    <div class="btn-wrapper text-center">
                      <router-link :to="{ name: 'Login'}" class="btn btn-neutral btn-icon">
                                            <span class="btn-inner--icon"><img
                                                src="/img/icons/logo.png"></span>
                        <span class="btn-inner--text">Trade Mogul</span>
                      </router-link>
                    </div>
                  </div>
                  <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                      <small>sign in with credentials</small>
                    </div>

                    <!------------------------------------------------------------------------------------------------->
                    <!-- Form -->
                    <!------------------------------------------------------------------------------------------------->
                    <div class="text-left">

                      <!----------------------------------------------------------------------------------------------->
                      <!-- email -->
                      <!----------------------------------------------------------------------------------------------->

                      <div class="form-group mb-3">
                        <div class="input-group input-group-alternative">

                          <!-- icon-->
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                          </div>

                          <!-- input-->
                          <input
                              class="form-control"
                              v-model="loginData.email"
                              placeholder="Email"
                              type="email"
                              :disabled="loading || authentication_loader">

                        </div>
                        <!-- error-->
                        <small class="form-text text-danger" v-if="formError['email']"> {{
                            formError.email[0]
                          }} </small>
                      </div>

                      <!----------------------------------------------------------------------------------------------->
                      <!-- password -->
                      <!----------------------------------------------------------------------------------------------->

                      <div class="form-group">
                        <div class="input-group input-group-alternative">

                          <!-- icon-->
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="ni ni-lock-circle-open"></i></span>
                          </div>

                          <!-- input-->
                          <input
                              class="form-control"
                              v-model="loginData.password"
                              placeholder="Password"
                              type="password"
                              :disabled="loading || authentication_loader">

                        </div>
                        <!-- error-->
                        <small class="form-text text-danger" v-if="formError['password']">
                          {{ formError.password[0] }} </small>
                      </div>

                      <!----------------------------------------------------------------------------------------------->
                      <!-- Loader -->
                      <!----------------------------------------------------------------------------------------------->
                      <center-loader color="warning" v-if="loading"></center-loader>
                      <center-loader color="success" v-if="authentication_loader"></center-loader>

                      <!----------------------------------------------------------------------------------------------->
                      <!-- sign in -->
                      <!----------------------------------------------------------------------------------------------->

                      <div class="text-center">
                        <button :disabled="loading || authentication_loader" type="button" @click="login()" class="btn btn-primary my-4">Sign
                          in
                        </button>
                      </div>

                    </div>
                  </div>
                </div>

                <!----------------------------------------------------------------------------------------------------->
                <!-- Forgot Password -->
                <!----------------------------------------------------------------------------------------------------->
                <div class="row mt-3">
                  <div class="col-6">
                    <!-- <a href="#" class="text-light"><small>Forgot password?</small></a> -->
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </template>
    </auth-layout>
  </div>
</template>

<script>
import AuthLayout from "@/App/Modules/Authentication/Components/AuthLayout";

export default {

  /**
   * name
   */
  name: "Login",

  /**
   * components
   */
  components: {AuthLayout},

  /**
   * data
   * @return {{loginData: {password: string, email: string}, formError: []}}
   */
  data() {
    return {
      loginData: {
        email: '',
        password: '',
      },
      formError: [],
      loading: false,
      user_details_loading: false
    }
  },

  /**
   * methods
   */
  methods: {
    /**
     * login
     */
    login() {
      this.loading = true;
      this.formError = []
      this.$axios({
        baseURL: process.env.VUE_APP_AUTH_API_ROOT,
        url: '/admin/login',
        method: 'post',
        data: this.loginData
      })
          .then(response => {
            this.loading = false;
            let token = response.data.access_token;

            //set token to store
            if (token) {
              this.$store.dispatch('set_token', token);
              this.setUserDetails();
              this.loading = false;
            }
          })
          .catch(err => {
            this.loading = false;
            if (err.response.data.errors !== undefined) {
              this.formError = err.response.data.errors
            }
          })
    },
  }
}
</script>

<style scoped>

</style>
