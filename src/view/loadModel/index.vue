<template>
  <div>
      <h1>测试加载模型</h1>
  </div>
</template>
<script>
import * as THREE from 'three'
// import * as TWEEN from "tween";
import { OBJLoader } from '../particle/OBJLoader'
// import '../particle/FBXLoader1'
// import '../../../lib/three.min.js'

export default {
  data() {
      return {

      }
  },
  mounted() {
      let objLoader = new OBJLoader();
      console.log(objLoader)
      objLoader.load("../../../static/model/obj/tree.obj", function() {
          console.log("执行回调了。。。")
      })
  },
  methods: {

  }
}
</script>
