<template>
<div id="container">
    
</div>
</template>
<script>
import * as THREE from 'three'
import TWEEN from 'tween'
import Stats from 'stats.js'

// webGL
// let scene = new THREE.Scene();
// var renderer, scene, camera, stats, tween;

export default {
    name: "modelParticle",
    data() {
        return {
            particleSystem: {},
            renderer: {},
            scene: {},
            camera: {},
            stats: {},
            tween: {}
        }
    },
    created() {
        // this.init()
    },
    mounted() {
        // window.requestAnimationFrame(() => {
        //     this.init()
        // })
        this.init()
        
    },
    methods: {
        init() {
            
            // var self = this;
            let renderer, scene, camera, stats, tween;
            let WIDTH = window.innerWidth;

            let HEIGHT = window.innerHeight;
            let container = document.getElementById('container');
            camera = new THREE.PerspectiveCamera( 40, WIDTH/HEIGHT, 1, 10000 );
            camera.position.z = 150;

            scene = new THREE.Scene();
            
            // 添加灯光
            let light = new THREE.DirectionalLight( 0xffffff );
            light.position.set( 0, 200, 0 );
            scene.add( light );

            this.addObjs();

            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(WIDTH, HEIGHT);

            container.appendChild(renderer.domElement)

            stats = new Stats()
            container.appendChild(stats.dom)
            
            window.addEventListener( 'resize', (e) => {
                this.resize()
            }, false);

            this.scene = scene;
            this.camera = camera;
            this.renderer = renderer;


            TWEEN.update();
            stats.update();
            // this.update();

            // window.requestAnimationFrame(() => {
            //     console.log('111111')
            // })

        

        },



        addObjs() {
            let loader = new THREE.JSONLoader();

            let obj1, obj2, loaded;
            loader.load('../../../static/modelParticle/cpmovie4.json', (obj) => {
                // console.log(obj)
                obj.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/2));
                obj.applyMatrix(new THREE.Matrix4().makeScale(20, 20, 20));
                obj.applyMatrix(new THREE.Matrix4().makeTranslation(80, 20, 0));

                obj1 = obj;
                if(obj1 && obj2 && !loaded) {
                    loaded = true;
                    this.addPartice(obj1, obj2);
                }
                
            })

            loader.load('../../../static/modelParticle/teapot.js', (obj) => {
                obj2 = obj;
                if(obj1 && obj2 && !loaded) {
                    loaded = true;
                    this.addPartice(obj1, obj2);
                }
            });	
        },

        addPartice(obj1, obj2) {
            let moreObj, lessObj;

            if(obj1.vertices.length > obj2.vertices.length) {
                moreObj = obj1;
                lessObj = obj2;
            } else {
                moreObj = obj2;
                lessObj = obj1;
            }
            moreObj = new THREE.BufferGeometry().fromGeometry(moreObj);
            lessObj = new THREE.BufferGeometry().fromGeometry(lessObj);
            let morePos = moreObj.attributes.position.array;
            let lessPos = lessObj.attributes.position.array;
            let moreLen = morePos.length;
            let lessLen = lessPos.length;
            let position2 = new Float32Array(moreLen);
            position2.set(lessPos);
            for(let i = lessLen, j = 0; i < moreLen; i++, j++) {
                j %= lessLen;
                position2[i] = lessPos[j];
                position2[i+1] = lessPos[j+1];
                position2[i+2] = lessPos[j+2];
            }

            let sizes = new Float32Array(moreLen);
            for (let i = 0; i < moreLen; i++) {
                sizes[i] = 4;
            }
            moreObj.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
            moreObj.addAttribute('position2', new THREE.BufferAttribute(position2, 3));
            let uniforms = {
                color:{value: new THREE.Color(0xffffff)},
                texture:{value: new THREE.TextureLoader().load( "../../../static/modelParticle/dot.png")},
                val: {value: 1.0}
            };

            let shaderMaterial = new THREE.ShaderMaterial({
                uniforms:       uniforms,
                vertexShader:   document.getElementById('vertexshader').textContent,
                fragmentShader: document.getElementById('fragmentshader').textContent,
                blending:       THREE.AdditiveBlending,
                depthTest:      false,
                transparent:    true
            });
            let particleSystem = new THREE.Points(moreObj, shaderMaterial);
            particleSystem.position.y = -15;

            let pos = {val: 1};
            let tween = new TWEEN.Tween(pos).to({val: 0}, 2000).easing(TWEEN.Easing.Quadratic.InOut).delay(1000).onUpdate(callback);
            let tweenBack = new TWEEN.Tween(pos).to({val: 1}, 2000).easing(TWEEN.Easing.Quadratic.InOut).delay(1000).onUpdate(callback);
            tween.chain(tweenBack);
            tweenBack.chain(tween);
            tween.start();

            function callback(){
                particleSystem.material.uniforms.val.value = this.val;
            }

            this.scene.add(particleSystem);
            this.particleSystem = particleSystem;
            console.log(this.particleSystem)            
            // console.log(this.particleSystem)
            this.update()
            // requestAnimationFrame(() => {
            //     this.update()
            // })

        },

        resize() {
            this.camera.aspect = window.innerWidth/window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        update(time) {
            TWEEN.update();

            var time = Date.now() * 0.005;

            // console.log(this.particleSystem)
            console.log(this.particleSystem)

            if(this.particleSystem) {

                let bufferObj = this.particleSystem.geometry;
                this.particleSystem.rotation.y = 0.01 * time;

                let sizes = bufferObj.attributes.size.array;

                let len = sizes.length;

                for (let i = 0; i < len; i++) {
                    sizes[i] = 2 * (1.0 + Math.sin(0.02 * i + time));
                }

                bufferObj.attributes.size.needsUpdate = true;
            }
            this.renderer.render(this.scene, this.camera);

            requestAnimationFrame(() => {
                this.update()
            })
        }
    }
}
</script>