<template>
  <div class="off-canvas off-canvas-end" :class="[showOffCanvas ? 'visible' : '']">
    <!------------------------------------------------------------------------------------->
    <!--header-->
    <!------------------------------------------------------------------------------------->
    <div class="off-canvas-header">
      <a class="close-button" href="#" @click.prevent="closeOffCanvas">
        <i class="fas fa-times-circle text-warning"></i>
      </a>
      <!------------------------------------------------------------------------------------->
      <!--Title-->
      <!------------------------------------------------------------------------------------->
      <h1> {{title}} </h1>
    </div>

    <!------------------------------------------------------------------------------------->
    <!--body-->
    <!------------------------------------------------------------------------------------->

    <div class="off-canvas-body">
      <slot></slot>
    </div>

  </div>

  <div class="off-canvas-backdrop" @click="closeOffCanvas" :class="[showOffCanvas ? 'show' : '']"></div>

</template>

<script>
import {directive} from "vue3-click-away";

export default {

  /**
   * directives
   */
  directives: {
    ClickAway: directive
  },

  /**
   * props
   */
  props: {
    title: {
      type: String,
      required: true
    },
  },

  /**
   * data
   */
  data() {
    return {
      showOffCanvas : false
    }
  },

  /**
   * mounted
   */
  mounted() {
  },

  /**
   * methods
   */
  methods: {
    /**
     * closeOffCanvas
     */
    closeOffCanvas() {
      this.showOffCanvas = false
    },

    /**
     * openOffCanvas
     */
    openOffCanvas() {
      this.showOffCanvas = true
    }
  },
}

</script>

<style scoped>
.off-canvas {
  position: fixed;
  bottom: 0;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  visibility: hidden;
  background-color: #fff;
  background-clip: padding-box;
  outline: 0;
  transition: transform .3s ease-in-out;
}

.off-canvas-end {
  top: 0;
  right: 0;
  width: 400px;
  border-left: 1px solid rgba(0, 0, 0, .2);
  transform: translateX(100%);
}

.close-button {
  position: absolute;
  left: auto;
  right: 30px;
}

.visible {
  transform: none;
  /*visibility: visible;*/
}

.off-canvas-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  visibility: hidden;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: .5;
}

.off-canvas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
}

.off-canvas-body {
  flex-grow: 1;
  padding: 1rem 1rem;
  overflow-y: auto;
}

.show {
  visibility: visible;
}


</style>
