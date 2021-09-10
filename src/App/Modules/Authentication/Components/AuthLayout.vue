<template>
  <div class="bg-wa">
    <!----------------------------------------------------------------------------------------------------------------->
    <!-- Nav Content-->
    <!----------------------------------------------------------------------------------------------------------------->
    <div class="main-content">
      <nav class="navbar navbar-top navbar-horizontal navbar-expand-md navbar-dark">
        <div class="container px-4">
          <!----------------------------------------------------------------------------------------------------------------->
          <!-- LOGO -->
          <!----------------------------------------------------------------------------------------------------------------->
          <a class="navbar-brand" href="#">
            <img src="/img/icons/logo.png">
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse"
                  data-target="#navbar-collapse-main" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbar-collapse-main">
            <!-- Collapse header -->
            <div class="navbar-collapse-header d-md-none">
              <div class="row">
                <div class="col-6 collapse-brand">
                  <!----------------------------------------------------------------------------------------------------------------->
                  <!-- header logo-->
                  <!----------------------------------------------------------------------------------------------------------------->
                  <a href="../index.html">
                    <img src="/img/icons/logo.png">
                  </a>
                </div>
                <div class="col-6 collapse-close">
                  <button type="button" class="navbar-toggler" data-toggle="collapse"
                          data-target="#navbar-collapse-main" aria-controls="sidenav-main"
                          aria-expanded="false" aria-label="Toggle sidenav">
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
            <!-- Navbar items -->
          </div>
        </div>
      </nav>

      <!----------------------------------------------------------------------------------------------------------------->
      <!-- Header -->
      <!----------------------------------------------------------------------------------------------------------------->
      <div class="header bg-gradient-warning py-7 py-lg-8">
        <div class="container">
          <div class="header-body text-center mb-7">
            <div class="row justify-content-center">
              <div class="col-lg-5 col-md-6">
                <!----------------------------------------------------------------------------------------------------------------->
                <!-- Tag Line-->
                <!----------------------------------------------------------------------------------------------------------------->
                <h1 class="text-white">Welcome!</h1>
                <p class="text-lead text-light"> Trade Mogul admin</p>
              </div>
            </div>
          </div>
        </div>
        <div class="separator separator-bottom separator-skew zindex-100">
          <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
               xmlns="http://www.w3.org/2000/svg">
            <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </div>

      <!----------------------------------------------------------------------------------------------------------------->
      <!-- Slot -->
      <!----------------------------------------------------------------------------------------------------------------->

      <slot name="content"></slot>

      <!-- ./slot -->

      <!----------------------------------------------------------------------------------------------------------------->
      <!-- Footer-->
      <!----------------------------------------------------------------------------------------------------------------->
      <footer class="py-5">
        <div class="container">
          <div class="row align-items-center justify-content-xl-between">
            <div class="col-xl-6">
              <div class="copyright text-center text-xl-left text-muted">
                © 2019 <a href="trademogul.co.ke" class="font-weight-bold ml-1" target="_blank">Trade Mogul</a>
              </div>
            </div>
            <div class="col-xl-6">

            </div>
          </div>
        </div>
      </footer>

    </div>
  </div>

</template>
