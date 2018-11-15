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
        "undoManager.isEnabled": true, // 打开Ctrl-Z撤销和Ctrl-Y重做功能
        layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 })
      })

      myDiagram.nodeTemplate = $(go.Node, "Horizontal", 
      { background: "#44CCFF"},
      $(go.Picture, { margin: 10, width: 50, height: 50, background: "red" }, new go.Binding("source")),
      $(go.TextBlock, "默认文本", { margin: 12, stroke: "shite", font: "bold 16px sans-serif" }, new go.Binding("text", "name"))
      )

      let myModel = $(go.GraphLinksModel)
      myModel.nodeDataArray = [
          {key: "Alpha", source: ""},
          {key: "Spring", source: ""},
          {key: "Gamma", source: ""}
      ]
      myModel.linkDataArray = [
          {from: "Alpha", to: "Spring"},
          {from: "Spring", to: "Gamma"}
      ]
      myDiagram.model = myModel
  }
}
</script>

