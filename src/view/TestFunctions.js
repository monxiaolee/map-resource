let CurrentArea = 'china';
let AreaList = [];
class TestFunctions {
    constructor() {
        this.AREA = CurrentArea;
    }

    switchMap(AREA) {
        window.location.href = '?area=' + AREA;
    }

    setBars(){
        // console.log("点击了柱状图。。。")
        var areas = _.sampleSize(AreaList, _.random(1,AreaList.length-1));
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
            var areas = _.sampleSize(AreaList,2);
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
        var areas = _.sampleSize(AreaList,_.random(1,AreaList.length-1));
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
        map.setPoints(_.sampleSize(AreaList,_.random(1,AreaList.length-1)));
    }

    flyArea(){
        var areas = _.sampleSize(AreaList,2);
        map.fly(areas[0],areas[1]);
    }
    
    flyRandom(){
        var element = document.getElementById('container');
        var [w,h] = [element.clientWidth,element.clientHeight];
        map.fly([_.random(0,w),_.random(0,h)],[_.random(0,w),_.random(0,h)]);
    }

}

export default TestFunctions;