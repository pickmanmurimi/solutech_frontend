<template>
  <div class="text-center" :class="hCenter ? 'h-center-loader' : 'center-loader'" >
    <div class="spinner-border" :class="'text-' + color " role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <small v-if="text" :class="'text-' + color "> {{ text }}</small>

  </div>
</template>

<script>
export default {
  /**
   * name
   */
  name: "CenterLoader",

  /**
   * props
   */
  props: {
    color: {
      default : () => { return 'success'}
    },
    text: {
      default : () => { return ''}
    },
    hCenter: {
      default : () => { return false}
    }
  }
}
</script>

<style scoped>
.center-loader {
  position: absolute;
  left: 50%;
  top: 50%;
}

.h-center-loader {
  position: absolute;
  left: 50%;
}
</style>