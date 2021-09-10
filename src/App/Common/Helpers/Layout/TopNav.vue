<template>
  <nav class="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">

    <div class="container-fluid">
      <!-- Brand -->
      <a class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="#"> {{ this.$route.name }} </a>

      <!-- User -->
      <ul class="navbar-nav align-items-center d-none d-md-flex">
        <li :class=" 'nav-item dropdown' + showClass">
          <a class="nav-link pr-0" @click="openDropdown()" href="#" role="button" data-toggle="dropdown"
             aria-haspopup="true" :aria-expanded="showDropDown">
            <div class="media align-items-center">
                            <span class="avatar avatar-sm rounded-circle">
                                <img alt="Image placeholder" src="/img/icons/logo.png">
                            </span>
              <div class="media-body ml-2 d-none d-lg-block">
                <span class="mb-0 text-sm  font-weight-bold">Admin</span>
              </div>
            </div>
          </a>
          <div v-show="showDropDown" v-click-away="closeDropdown"
               :class="'dropdown-menu dropdown-menu-arrow dropdown-menu-right' + showClass">
            <div class=" dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <div class="dropdown-divider"></div>

            <a href="#!" @click.prevent="logout()" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { directive } from "vue3-click-away";

export default {

  /**
   * directives
   */
  directives : {
    ClickAway: directive
  },

  /**
   * data
   * @return {{showClass: string, showDropDown: boolean}}
   */
  data() {
    return {
      showDropDown: false,
      showClass: " "
    }
  },

  methods: {

    closeDropdown() {
      this.showDropDown = false
      this.showClass = " "

    },

    openDropdown() {
      this.showDropDown = true
      this.showClass = " show"
    },
  }
}

</script>

<style scoped>
.dropdown-menu {
  display: inline !important;
}
</style>
