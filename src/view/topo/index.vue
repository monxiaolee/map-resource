<template>
<div class="" id="myDiagramDiv" style="width: 100%; height: 100%; background-color: #DAE4E4;">
</div>
</template>
<script>
import go from 'gojs'
let $ = go.GraphObject.make  //后边很多用到该变量来初始化diagram
export default {
  name: "topo",
  data() {
      return {

      }
  },
  mounted() {
      let myDiagram = $(go.Diagram, "myDiagramDiv", {
        initialContentAlignment: go.Spot.Center, // 居中显示Diagram内容
        "undoManager.isEnabled": true // 打开Ctrl-Z撤销和Ctrl-Y重做功能
      })

      let myModel = $(go.Model)
      myModel.nodeDataArray = [
          {key: "Alpha"},
          {key: "spring"},
          {key: "Gamma"}
      ]
      myDiagram.model = myModel
  }
}
</script>

