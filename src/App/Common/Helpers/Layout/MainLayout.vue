<template>
  <div>
    <!--  ---------------------------------------------------------------------------------------------------------  -->
    <!--  sideNav -->
    <!--  ---------------------------------------------------------------------------------------------------------  -->
    <side-nav></side-nav>

    <div class="main-content">
      <!--  ---------------------------------------------------------------------------------------------------------  -->
      <!--  topNav -->
      <!--  ---------------------------------------------------------------------------------------------------------  -->
      <top-nav></top-nav>

      <!--  ---------------------------------------------------------------------------------------------------------  -->
      <!--  Main Header -->
      <!--  ---------------------------------------------------------------------------------------------------------  -->
      <main-header>
        <template slot="header-body">
          <!--  ---------------------------------------------------------------------------------------------------------  -->
          <!--  Header Body Slot -->
          <!--  ---------------------------------------------------------------------------------------------------------  -->
          <slot name="header-body"></slot>

        </template>

      </main-header>

      <div class="container-fluid mt--7">
        <!--  ---------------------------------------------------------------------------------------------------------  -->
        <!--  content -->
        <!--  ---------------------------------------------------------------------------------------------------------  -->
        <div class="row text-left">
          <div class="w-100">
            <slot name="content"></slot>
          </div>
        </div>

        <!--  ---------------------------------------------------------------------------------------------------------  -->
        <!--  footer -->
        <!--  ---------------------------------------------------------------------------------------------------------  -->
        <MainFooter></MainFooter>

      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "@/App/Common/Helpers/Layout/SideNav";
import TopNav from "@/App/Common/Helpers/Layout/TopNav";
import Header from "@/App/Common/Helpers/Layout/Header";
import MainFooter from "@/App/Common/Helpers/Layout/MainFooter";

export default {
  name: "MainLayout",
  components: {
    MainFooter,
    'main-header': Header, TopNav, SideNav
  }
};
</script>

<style scoped>

#page-container {
  position: relative;
  min-height: 100vh;
}

#content-wrap {
  padding-bottom: 300px; /* Footer height */
}

#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 300px; /* Footer height */
}

.margin-top {
  margin-top: 100px
}

</style>
