<template>
  <div>
    <div v-for=" route in routes " :key="route.id">
      <!--------------------------------------------------------------------------------------------------------------->
      <!--      Routes with children -->
      <!--------------------------------------------------------------------------------------------------------------->
      <template v-if="route.children && route.meta.onmenu">
        <li class="nav-item mb-3">
          <a :aria-expanded="( currentParent === route.name ) ? 'true' : 'false'"
             :href="'#' + route.name"
             aria-controls="navbar-components" class="nav-link parent" data-toggle="collapse"
             role="button"
             :class="( currentParent === route.name ) ? 'active-parent' : ''"
             @click.prevent>
            <i :class="route.meta.icon" class="text-primary "></i>
            {{ route.meta.title ? route.meta.title : route.name }}
          </a>
          <div :id="route.name" :class="( currentParent === route.name ) ? 'show' : ''" class="collapse" style="">
            <ul class="nav nav-sm flex-column">
              <li v-for=" child in route.children " :key="child.id" class="nav-item">
                <router-link v-if="child.meta.onmenu"
                             :to="{ name: child.name}"
                             class="nav-link nav-link-mini">
                  <i :class="child.meta.icon" class=""></i>
                  <span class="sidenav-normal"> {{ child.meta.title ? child.meta.title : child.name }} </span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </template>


      <!--------------------------------------------------------------------------------------------------------------->
      <!--      Routes with no children -->
      <!--------------------------------------------------------------------------------------------------------------->
      <template v-else>
        <li class="nav-item mb-3">
          <router-link v-if="route.meta.onmenu" :to="{ name: route.name}" class="nav-link text-capitalize">
            <i :class="route.meta.icon" class="text-primary "></i>
            {{ route.name }}
          </router-link>
        </li>
      </template>

    </div>

  </div>
</template>

<script>

export default {

  /**
   * data
   */
  data() {
    return {
      route: {},
    }
  },

  /**
   * created
   */
  created() {
  },

  /**
   * computed properties
   */
  computed: {
    /**
     * routes
     */
    routes() {
      return this.$router.options.routes
    },

    /**
     * currentRoute
     */
    currentRoute() {
      return this.$route.name
    },

    /**
     * currentParent
     */
    currentParent() {
      return this.$route.meta.parent
    },
  }
}
</script>

<style scoped>
.router-link-active {
  top: 0.25rem;
  bottom: 0.25rem;
  left: 0;
  right: auto;
  border-left: 2px solid #324cdd;
  border-bottom: 0;

  margin-right: .5rem;
  margin-left: .5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: .375rem;
  background: #f6f9fc;
}

.active-parent{
  top: 0.25rem;
  bottom: 0.25rem;
  left: 0;
  right: auto;
  border-left: 4px solid #324cdd;
  padding-left: 1rem;

}

.nav-link-mini {
  padding-left: 2.75rem !important;
}
</style>
