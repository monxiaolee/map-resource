<template>
<div class="particle">
  <!-- <h1>粒子效果测试</h1> -->
  <div id="world">

  </div>
</div>
</template>
<script>
import ThreeDWorld from './particle'

export default {
  name: 'particle',
  data() {
      return {

      }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      new ThreeDWorld(document.getElementById("world"))
    }
  }
}
</script>



