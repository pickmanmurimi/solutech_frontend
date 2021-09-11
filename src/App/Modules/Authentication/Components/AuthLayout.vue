<template>

  <div class="container-fluid">
    <div class="row">

      <div class="col-lg-8 col-md-7 d-none d-md-block triangles-bg">
        <div class="triangles-bg-tint"></div>

        <div class="d-flex justify-content-center text-center col-12">

          <div class="mt-9 col-6">
            <!----------------------------------------------------------------------------------------------------------------->
            <!-- LOGO -->
            <!----------------------------------------------------------------------------------------------------------------->
            <a class="navbar-brand" href="#">
              <img height="100" src="/img/icons/logo.png">
            </a>

            <h1 class="text-white mt-5"> Trade Mogul dashboard. </h1>

            <p class=" text-white mt-5">

              Fleet management dashboard.
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod

            </p>
          </div>

        </div>


      </div>


      <div class="col-lg-4 col-md-5 col-12 bg-white" style="height: 100vh">

        <!----------------------------------------------------------------------------------------------------------------->
        <!-- Slot -->
        <!----------------------------------------------------------------------------------------------------------------->

        <slot name="content"></slot>

      </div>



    </div>
  </div>


</template>

<style>

.triangles-bg {
  background-image: url("/img/backgrounds/triangles.png");
  background-size: cover;
}

.triangles-bg-tint {
  background: linear-gradient(
      87deg
      , rgba(94, 114, 228, 0.8) 0, rgba(94, 228, 130, .8) 100%);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

</style>
