<template>
<div id="container">
    <svg>
        <!-- 条形图样式 -->
        <linearGradient id="f-bar" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#02CBFE"></stop>
            <stop offset="100%" stop-color="#0D365D"></stop>
        </linearGradient>
        <linearGradient id="f-bar-hover" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#C94BC3"></stop>
            <stop offset="100%" stop-color="#0D365D"></stop>
        </linearGradient>

        <!-- 连线样式 -->
        <linearGradient id="f-line" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="transparent" />
            <stop offset=".33" stop-color="#A17095" />
            <stop offset=".67" stop-color="#D04DC1" />
            <stop offset="1" stop-color="#D1EACC" />
        </linearGradient>

        <!-- 连线点样式 -->
        <radialGradient id="f-line-point">
            <stop offset="0%" style="stop-color: transparent;" />
            <stop offset="40%" style="stop-color: #FF7770;" />
            <stop offset="100%" style="stop-color: #D1F9D6;" />
        </radialGradient>

        <!-- 飞线样式 -->
        <linearGradient id="f-fly" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#0e374f" />
            <stop offset=".33" stop-color="#069a2b" />
            <stop offset=".67" stop-color="#d6f252" />
            <stop offset="1" stop-color="#ffffff" />
        </linearGradient>

        <!-- 扩散点样式 -->
        <radialGradient id="f-point">
            <stop offset="0%" style="stop-color: transparent;" />
            <stop offset="40%" style="stop-color: transparent;" />
            <stop offset="100%" style="stop-color: #00F6FF;" />
        </radialGradient>


        <!-- 地图伪3D阴影效果 -->
        <filter id="f-shadow">
            <feColorMatrix type="matrix" values="
            0 0 0 0 0
            0 0 0 .8 0
            0 0 0 .8 0
            0 0 0 0.5 0
        "></feColorMatrix>
            <feGaussianBlur stdDeviation="1" result="colorBlur1"></feGaussianBlur>

            <feOffset result="offsetBlur0" in="colorBlur1" dx="1" dy="1" />
            <feOffset result="offsetBlur1" in="colorBlur1" dx="3" dy="3" />
            <feOffset result="offsetBlur2" in="colorBlur1" dx="5" dy="5" />

            <feSpecularLighting in="SourceGraphic" lighting-color="#ffb8b8" surfaceScale="1" specularConstant="1" specularExponent="115"
                result="light">
                <feDistantLight elevation="1" azimuth="1"></feDistantLight>
            </feSpecularLighting>
            <feComposite in="light" in2="SourceGraphic" operator="in" result="light-effect"></feComposite>

            <feBlend in="light" in2="SourceGraphic" mode="screen"></feBlend>
            <feMerge>
                <feMergeNode in="offsetBlur0" />
                <feMergeNode in="offsetBlur1" />
                <feMergeNode in="offsetBlur2" />
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="light-effect" />
            </feMerge>
        </filter>
    </svg>
</div>
</template>
<script>
import * as d3 from 'd3'
import china from '../../static/data/china.json'
import VMap from '../index'
// import TestFunctions from './TestFunctions'
import * as dat from 'dat.gui';
let map =  null
// let test = new TestFunctions();
const gui = new dat.GUI();
let CurrentArea = china
let AreaList = []

export default {
  name: "d3Map01",
  data () {
      return {
        //   AreaList: []
      }
  },
  mounted() {
    // 如果写变量的话，会报json文件有问题

    class TestFunctions {
        constructor() {
            this.AREA = CurrentArea;
        }

        switchMap(AREA) {
            window.location.href = '?area=' + AREA;
        }

        setBars(){
            var areas = _.sampleSize(AreaList, _.random(1, AreaList.length - 1));
            var arr = [];
            areas.map(function(area){
                arr.push({
                    area:area,
                    count:_.random(0, 10000)
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
                var areas = _.sampleSize(AreaList, 2);
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
            var areas = _.sampleSize(AreaList, _.random(1, AreaList.length-1));
            var arr = [];
            areas.map(function(area){
                arr.push({
                    area:area,
                    fill:_.sample(d3.schemeCategory10)
                })
            });
            map.setColors(arr);
        }

        clearColors(){
            map.setColors([]);
        }
        
        setPoints(){
            map.setPoints(_.sampleSize(AreaList, _.random(1,AreaList.length-1)));
        }

        flyArea(){
            var areas = _.sampleSize(AreaList, 2);
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
        json.features.map((item) => {
            AreaList.push(item.properties.name)
        })

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

