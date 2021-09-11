<template>
  <div v-if="loading" class="loading-screen" v-bind:class="classes" v-bind:style="{backgroundColor:bc}">
    <div class="text-center">
      <div class="loading-circle"></div>
      <p class="loading-text">{{ text }}</p>
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
      text: 'Loading',
      dark: false,
      classes: null,
      loading: false,
      background: null,
    }
  },

  /**
   * computed
   */
  computed: {
    /**
     * background color
     * @return {string}
     */
    bc() {
      return this.background || (this.dark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)')
    }
  },
}
</script>
<style scoped>
.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
  flex-direction: column;
  user-select: none;
}

.loading-circle {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid transparent;
  border-left-color: #ababab;
  animation: circleanimation .45s linear infinite
}

.loading-text {
  margin-top: 15px;
  color: #808080;
  font-size: 12px;
  text-align: center;
}

@keyframes circleanimation {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
