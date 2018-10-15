<template>
<div id="container">

</div>
</template>
<script>
import * as d3 from 'd3'
import china from '../../static/data/china.json'
import VMap from '../index'
// import TestFunctions from './TestFunctions'
import * as dat from 'dat.gui';
// let VMap = require('../index')
let map =  null
// let test = new TestFunctions();
const gui = new dat.GUI();
let CurrentArea = china

export default {
  name: "d3Map01",
  data () {
      return {
          AreaList: []
      }
  },
  mounted() {
    console.log("zhixing")
    // console.log(china)
    // 如果写变量的话，会报json文件有问题


    class TestFunctions {
        constructor() {
            this.AREA = CurrentArea;
        }

        switchMap(AREA) {
            window.location.href = '?area=' + AREA;
        }

        setBars(){
            var areas = _.sampleSize(this.AreaList, _.random(1, this.AreaList.length-1));
            var arr = [];
            areas.map(function(area){
                arr.push({
                    area:area,
                    count:_.random(0,10000)
                })
            });
            map.setBars(arr);
        }

        clearBars(){
            map.setBars([]);
        }

        setLines(){
            var arr = [];
            for(var i=0,_i=_.random(5,20);i<_i;i++){
                var areas = _.sampleSize(this.AreaList, 2);
                arr.push({
                    from: areas[0],
                    to:areas[1],
                    data:_.random(10000),
                })
            }
            map.setLines(arr);
        }
        clearLines(){
            map.setLines([]);
        }

        setColors(){
            var areas = _.sampleSize(this.AreaList, _.random(1, this.AreaList.length-1));
            var arr = [];
            areas.map(function(area){
                arr.push({
                    area:area,
                    fill:_.sample(d3.schemeCategory20)
                })
            });
            map.setColors(arr);
        }

        clearColors(){
            map.setColors([]);
        }
        
        setPoints(){
            map.setPoints(_.sampleSize(this.AreaList, _.random(1,AreaList.length-1)));
        }

        flyArea(){
            var areas = _.sampleSize(this.AreaList, 2);
            map.fly(areas[0],areas[1]);
        }
        
        flyRandom(){
            var element = document.getElementById('container');
            var [w,h] = [element.clientWidth,element.clientHeight];
            map.fly([_.random(0,w),_.random(0,h)],[_.random(0,w),_.random(0,h)]);
        }

    }

    var test = new TestFunctions();

    d3.json("../../static/data/china.json").then((json) => {
        console.log(json)

        map = new VMap(json, document.getElementById('container'), {
            Bar:{
                OnMouserOver:function(item){
                    map.showTip(`${item.area} : ${item.count}`);
                },
                OnMouserOut:function(item){
                    map.hideTip();
                },
                OnClick:function(item){
                    console.log(item,'clicked');
                }
            },
            Lines:{
                OnMouserOver:function(item){
                    map.showTip(`${item.from} -> ${item.to} : ${item.data}`);
                },
                OnMouserOut:function(item){
                    map.hideTip();
                },
                OnClick:function(item){
                    console.log(item,'clicked');
                }
            },
            Fly: {
                EffectMin: 1000,
                EffectMax: 2000,
            },
            OnSelect:function(areaname){
                map.setPoints([areaname]);
            }
        })


        json.features.map((item) => {
            this.AreaList.push(item.properties.name)
        })

        gui.add(test, 'AREA', {
            '中国': 'china',
            '湖北': 'hubei',
            '武汉': 'wuhan'
        }).onChange(test.switchMap);

        //设置条形图
        gui.add(test,'setBars');
        //清空条形图
        gui.add(test,'clearBars');
        //设置连线
        gui.add(test,'setLines');
        //清空连线
        gui.add(test,'clearLines');

        //随机出现一条链接飞线
        gui.add(test,'flyArea');
        //随机出现一条链接飞线
        gui.add(test,'flyRandom');
        //随机生成地图颜色
        gui.add(test,'setColors');
        //随机生成地图颜色
        gui.add(test,'clearColors');
        //随机生成扩散点
        gui.add(test,'setPoints');

    })
  },
  created() {

  },
  methods: {
      
  }
}
</script>
<style lang="scss" scoped>
#container {
    width: 100%;
    height: 100%;
}
</style>

