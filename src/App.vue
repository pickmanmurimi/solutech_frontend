<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>
<style scoped>
.wrapper-enter-active {
  animation: finished 1s reverse;
}
.wrapper-leave-active {
  animation: finished 2s;
}
@keyframes finished {
  0% { opacity: 1; top: 0;}
  50% { opacity: 1; top: 0;}
  60% { opacity: 1; }
  100% { opacity: 0; top: -100vh;}
}
</style>
