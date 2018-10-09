<template>
<div id="container">
</div>
</template>
<script>
import * as d3 from 'd3'
import china from '../../static/data/china.json'
let VMap = require('../index')
let map =  null

// let VMap = require('../index');
export default {
  name: "d3Map01",
  data () {
      return {
          AreaList: []
      }
  },
  mounted() {
    // console.log(china)
    // 如果写变量的话，会报json文件有问题
    d3.json("../../static/data/china.json").then((json) => {

        map = new VMap(json, document.getElementById('container'), {})

        json.features.map((item) => {
            this.AreaList.push(item.properties.name)
        })
    })
  }
}
</script>
<style lang="scss" scoped>
#container {
    width: 100%;
    height: 100%;
}
</style>

