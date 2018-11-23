<template>
<div class="" id="myDiagramDiv" style="width: 100%; height: 100%; background-color: #DAE4E4;">
</div>
</template>
<script>
import go from 'gojs'
let $ = go.GraphObject.make  //后边很多用到该变量来初始化diagram

let colors = {
    blue:   "#00B5CB",
    orange: "#F47321",
    green:  "#C8DA2B",
    gray:   "#888",
    white:  "#F5F5F5"
}
export default {
  name: "topo",
  data() {
      return {

      }
  },
  mounted() {

    // let ParallelRouteLink;


    let myDiagram = $(go.Diagram, "myDiagramDiv", {
        initialContentAlignment: go.Spot.Center,
        "undoManager.isEnabled": true
    })

    myDiagram.nodeTemplate = $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse),
        $(go.Shape,
          {
            portId: "",
            fromLinkable: true, toLinkable: true,
            fromLinkableDuplicates: true, toLinkableDuplicates: true,
            cursor: "pointer"
          },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { margin: 8 },
          new go.Binding("text"))
    ) 
        

    myDiagram.linkTemplate = $(go.Link,
        { reshapable: true, resegmentable: true },
        //{ routing: go.Link.Orthogonal },  // optional, but need to keep LinkingTool.temporaryLink in sync, above
        { adjusting: go.Link.Stretch },  // optional
        new go.Binding("points", "points").makeTwoWay(),
        $(go.Shape, { strokeWidth: 1.5 }),
        $(go.Shape, { toArrow: "OpenTriangle" })
    );

    // myDiagram.linkTemplate = $(go.Link,
    //     { routing: go.Link.Orthogonal, corner: 5, toShortLength: -2, fromShortLength: -2 },
    //     $(go.Shape, { strokeWidth: 5, stroke: colors["gray"] })
    // ); 

    // myDiagram.linkTemplate =
    //   $(ParallelRouteLink,
    //     {
    //       relinkableFrom: true, relinkableTo: true,
    //       reshapable: true //, resegmentable: true
    //     },
    //     $(go.Shape, { strokeWidth: 2 },
    //       new go.Binding("stroke", "fromNode", function(node) { return node.port.fill; }).ofObject()),
    //     $(go.Shape, { toArrow: "OpenTriangle", strokeWidth: 1.5 },
    //       new go.Binding("stroke", "fromNode", function(node) { return node.port.fill; }).ofObject())
    //   );


     myDiagram.model = new go.GraphLinksModel([
      { key: 1, text: "节点1", color: "lightblue", loc: "0 0" },
      { key: 2, text: "节点2", color: "orange", loc: "330 170" },
      { key: 3, text: "节点3", color: "lightgreen", loc: "0 270" }
    ], [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
    ]);


    //   let myDiagram = $(go.Diagram, "myDiagramDiv", {
    //     initialContentAlignment: go.Spot.Center,
    //     "undoManager.isEnabled": true,
    //     layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 })
    //   })

    //   myDiagram.nodeTemplate = $(go.Node, "Horizontal", 
    //   { background: "#44CCFF"},
    //   $(go.Picture, { margin: 10, width: 50, height: 50, background: "red" }, new go.Binding("source")),
    //   $(go.TextBlock, "默认文本", { margin: 12, stroke: "shite", font: "bold 16px sans-serif" }, new go.Binding("text", "name"))
    //   )

    //   let myModel = $(go.GraphLinksModel)
    //   myModel.nodeDataArray = [
    //       {key: "Alpha", source: ""},
    //       {key: "Spring", source: ""},
    //       {key: "Gamma", source: ""}
    //   ]
    //   myModel.linkDataArray = [
    //       {from: "Alpha", to: "Spring"},
    //       {from: "Spring", to: "Gamma"}
    //   ]
    //   myDiagram.model = myModel


  }
}
</script>

