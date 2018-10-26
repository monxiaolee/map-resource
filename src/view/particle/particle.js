import * as THREE from 'three'
// import FBXLoader from '../../../lib/FBXLoader'
// console.log(FBXLoader)
// import FBXLoader from 'threejs-fbxloader'
import './FBXLoader'

// import robot from '~/obj/robot.fbx'

// FBXLoader(THREE)
// console.log(robot)
console.log(THREE.FBXLoader)

class ThreeDWorld {
    constructor(canvasContainer) {
        // canvas 容器
        this.container = canvasContainer || document.body

        this.createScene()
        this.addObjs()
    }
    createScene() {
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;

        // 创建场景
        this.scene = new THREE.Scene();
        // 在场景中添加雾的效果，参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、刚好雾化至看不见的视线距离’
        this.scene.fog = new THREE.Fog(0x090918, 1, 600);
        // 创建相机
        let aspectRatio = this.WIDTH / this.HEIGHT;
        let fieldOfView = 60;
        let nearPlane = 1;
        let farPlane = 10000;
        /**
         * PerspectiveCamera 透视相机
         * @param fieldOfView 视角
         * @param aspectRatio 纵横比
         * @param nearPlane 近平面
         * @param farPlane 远平面
         */
        this.camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );

        // 设置相机的位置
        this.camera.position.x = 0;
        this.camera.position.z = 150;
        this.camera.position.y = 0;
        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({
            // 在 css 中设置背景色透明显示渐变色
            alpha: true,
            // 开启抗锯齿
            antialias: true
        });

        // 渲染背景颜色同雾化的颜色
        this.renderer.setClearColor(this.scene.fog.color);
        // 定义渲染器的尺寸；在这里它会填满整个屏幕
        this.renderer.setSize(this.WIDTH, this.HEIGHT);

        // 打开渲染器的阴影地图
        this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMapSoft = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        // 在 HTML 创建的容器中添加渲染器的 DOM 元素
        this.container.appendChild(this.renderer.domElement);
        // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
        window.addEventListener('resize', this.handleWindowResize.bind(this), false);


        // console.log(this.HEIGHT, this.WIDTH, this.scene)
    }

    handleWindowResize() {
        // 更新渲染器的高度和宽度以及相机的纵横比
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.camera.aspect = this.WIDTH / this.HEIGHT;
        this.camera.updateProjectionMatrix();
    }


    // 自定义模型加载
    loader(pathArr) {
        let jsonLoader = new THREE.JSONLoader();
        let fbxLoader = new THREE.FBXLoader();

        // let fbxLoader = FBXLoader();
        // let mtlLoader = new THREE.MTLLoader();
        // let objLoader = new THREE.OBJLoader();
        let basePath, pathName, pathFomat;
        let promiseArr = pathArr.map((path) => {
            basePath = path.substring(0, path.lastIndexOf('/') + 1);
            pathName = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
            // 后缀为js或json的文件统一当做js格式处理
            pathName = pathName === 'json' ? 'js' : pathName;
            pathFomat = path.substring(path.lastIndexOf('.') + 1).toLowerCase();
            switch (pathFomat) {
                case 'js':
                    return new Promise(function(resolve) {
                        jsonLoader.load(path, (geometry, material) => {
                            resolve({
                                geometry: geometry,
                                material: material
                            })
                        });
                    });
                    break;
                case 'fbx':
                    fbxLoader.load(path, object => {
                        debugger
                        console.log(object)
                    })

                    break;

                case 'obj':
                    return new Promise(function(resolve) {
                        objLoader.load(path, (object) => {
                            resolve(object);
                        });
                    });
                    break;
                case 'mtl':
                    return new Promise(function(resolve) {
                        mtlLoader.setBaseUrl(basePath);
                        mtlLoader.setPath(basePath);
                        mtlLoader.load(pathName + '.mtl', (mtl) => {
                            resolve(mtl);
                        });
                    });
                    break;
                case 'objmtl':
                    return new Promise(function(resolve, reject) {
                        mtlLoader.setBaseUrl(basePath);
                        mtlLoader.setPath(basePath);
                        mtlLoader.load(`${pathName}.mtl`, (mtl) => {
                            mtl.preload();
                            objLoader.setMaterials(mtl);
                            objLoader.setPath(basePath);
                            objLoader.load(pathName + '.obj', resolve, undefined, reject);
                        });
                    });
                    break;
                default:
                    return '';
            }
        });
        return Promise.all(promiseArr);
    }

    // 模型加入场景
    addObjs() {

        this.loader(['../../../data/obj/robot.fbx', '../../../data/obj/Guitar/Guitar.fbx']).then(result => {
            console.log('执行了回调。。。')
        })

        // this.loader(['../../../data/obj/robot.fbx', '../../../data/obj/Guitar/Guitar.fbx']).then((result) => {
        //     console.log('执行到这儿了。。。')
        //     console.log(result)
        //     let robot = result[0].children[1].geometry;
        //     let guitarObj = result[1].children[0].geometry;

        //     console.log(robot)
        // })
    }
}
export default ThreeDWorld;