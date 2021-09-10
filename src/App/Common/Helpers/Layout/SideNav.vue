<template>
  <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
    <div class="container-fluid">
      <!-- Toggler -->
      <button @click="openMenu" class="navbar-toggler" type="button" data-toggle="collapse"

              aria-controls="sidenav-main" aria-expanded="true" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Brand -->
      <a class="navbar-brand pt-0" href="#">
        <img src="/img/icons/logo.png" class="navbar-brand-img" alt="...">
      </a>

      <!-- Collapse -->
      <div :class="'collapse navbar-collapse' + showClass" id="sidenav-collapse-main">
        <!-- Collapse header -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <a href="#!">
                <img src="/img/icons/logo.png">
              </a>
            </div>
            <div class="col-6 collapse-close">
              <button type="button" class="navbar-toggler" data-toggle="collapse" @click="closeMenu()"
                      aria-controls="sidenav-main" aria-expanded="true"
                      aria-label="Toggle sidenav">
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>

        <!-- ------------------------------------------------------------------------------------------------------- -->
        <!-- Navigation -->
        <!-- ------------------------------------------------------------------------------------------------------- -->

        <ul class="navbar-nav">
          <!-- dynamic links -->
          <dynamic-links></dynamic-links>
        </ul>
        <!-- Divider -->
        <hr class="my-3">
        <!-- Heading -->
        <h6 class="navbar-heading text-muted">User Actions</h6>
        <!-- Navigation -->

        <ul class="navbar-nav">
          <li class="nav-item">
            <a class=" nav-link" @click.prevent="logout()" href="#"> <i class="ni ni-user-run text-primary"></i>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { directive } from "vue3-click-away";
import {default as DynamicLinks} from './widgets/DynamicLinks'

export default {

  /**
   * directive
   */
  directives: {
    ClickAway: directive
  },

  /**
   * components
   */
  components: {
    'dynamic-links': DynamicLinks
  },

  data() {
    return {
      showClass: ""
    }
  },

  methods: {

    /**
     * closeMenu
     */
    closeMenu() {
      this.showClass = " "

    },

    /**
     * openMenu
     */
    openMenu() {
      this.showClass = " show"
    },
  }
}

</script>
