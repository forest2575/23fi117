/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
//23FI117 森友香


class ThreeJSContainer {
    scene;
    light;
    currentFirework = null;
    clock = new three__WEBPACK_IMPORTED_MODULE_1__.Clock();
    constructor() {
    }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        let renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x000000));
        //カメラの設定
        let camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0));
        let orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        let render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
        //地面の作成
        const phongMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0x3f4f5f }); // ←暗いグレーに指定
        const planeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(80, 80);
        const planeMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(planeGeometry, phongMaterial);
        planeMesh.material.side = three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide; // 両面
        planeMesh.rotateX(-Math.PI / 2);
        //シーンへ追加
        this.scene.add(planeMesh);
        //東京タワーの追加
        let addTokyoTower = () => {
            // 東京タワーのベース部分（太い鉄骨の支柱）
            let baseGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(3, 3, 15, 8); // 太めの円柱でベース
            let baseMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xd32f2f }); // 赤色
            let base = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(baseGeometry, baseMaterial);
            base.position.set(0, 7.5, 0);
            this.scene.add(base);
            // 中間部分（細くなる）
            let middleGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(2, 2, 20, 8); // 少し細めの円柱
            let middleMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xd32f2f }); // 赤色
            let middle = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(middleGeometry, middleMaterial);
            middle.position.set(0, 20, 0);
            this.scene.add(middle);
            // 上部部分（さらに細くなる）
            let topGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(0.5, 1.5, 10, 8); // 上部は細い円柱
            let topMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xffffff }); // 白色
            let top = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(topGeometry, topMaterial);
            top.position.set(0, 30, 0);
            this.scene.add(top);
            // タワーの上のアンテナ部分
            let antennaGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(0.1, 0.1, 10, 8);
            let antennaMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xd32f2f });
            let antenna = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(antennaGeometry, antennaMaterial);
            antenna.position.set(0, 40, 0);
            this.scene.add(antenna);
            // 東京タワーの鉄骨模様（ワイヤーフレーム風）
            let wireframeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(3, 3, 15, 8, 8, true);
            let wireframeMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({
                color: 0x000000,
                wireframe: true,
                opacity: 0.3,
                transparent: true
            });
            let wireframe = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(wireframeGeometry, wireframeMaterial);
            wireframe.position.set(0, 7.5, 0);
            this.scene.add(wireframe);
        };
        // 東京タワーの追加
        addTokyoTower();
        // ランダムな建物の追加
        let addBuildings = () => {
            const baseSize = 60; // 街の範囲
            const space = 10; // 建物間の距離
            const buildingColors = [0x555555, 0x999999, 0xcccccc, 0x444444, 0x777777, 0xaaaaaa];
            for (let x = -baseSize / 2; x < baseSize / 2; x += space) {
                for (let z = -baseSize / 2; z < baseSize / 2; z += space) {
                    // 10%くらいの確率で空き地を作る
                    if (Math.random() < 0.1)
                        continue;
                    let height = Math.random() * 10 + 10;
                    let width = Math.random() * 3 + 2;
                    let depth = Math.random() * 3 + 2;
                    let color = buildingColors[Math.floor(Math.random() * buildingColors.length)];
                    let buildingGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(width, height, depth);
                    let buildingMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: color });
                    let building = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(buildingGeometry, buildingMaterial);
                    // ランダムな位置ずれを加える（±3以内）
                    let offsetX = (Math.random() - 0.5) * 6;
                    let offsetZ = (Math.random() - 0.5) * 6;
                    building.position.set(x + offsetX, height / 2, z + offsetZ);
                    this.scene.add(building);
                }
            }
        };
        addBuildings();
        // 街路樹の追加
        let addTrees = () => {
            const treePositions = [
                { x: -20, z: 10 },
                { x: 20, z: -10 },
                { x: 10, z: 30 },
                { x: -30, z: -20 },
            ];
            treePositions.forEach(pos => {
                let trunkGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(0.5, 0.5, 5, 16);
                let trunkMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0x8B4513 });
                let trunk = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(trunkGeometry, trunkMaterial);
                trunk.position.set(pos.x, 2.5, pos.z);
                let leavesGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(3, 16, 16);
                let leavesMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0x228B22 });
                let leaves = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(leavesGeometry, leavesMaterial);
                leaves.position.set(pos.x, 6, pos.z);
                this.scene.add(trunk);
                this.scene.add(leaves);
            });
        };
        addTrees();
        // 道路の作成
        let addRoads = () => {
            const roadMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0x333333 });
            const roadGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(80, 5);
            const road = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(roadGeometry, roadMaterial);
            road.rotation.x = -Math.PI / 2;
            road.position.y = 0.1; // 少し上に配置
            this.scene.add(road);
        };
        addRoads();
        // カラフルな家を数軒追加する（建物と被らない範囲に）
        let addHouse = () => {
            const housePositions = [
                { x: -30, z: -30 },
                { x: 30, z: -25 },
                { x: -25, z: 30 },
                { x: 25, z: 25 },
            ];
            housePositions.forEach((pos) => {
                const width = Math.random() * 1.5 + 5; // 
                const height = Math.random() * 4 + 6; // 高さ6〜10
                const houseColors = [0x8ecae6, 0xffb703, 0xe07a5f, 0xadb5bd, 0x90be6d, 0x6a4c93];
                // 家の本体
                let cubeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(width, height, width);
                let cubeMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: houseColors[Math.floor(Math.random() * houseColors.length)], });
                let cubeAdd = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(cubeGeometry, cubeMaterial);
                cubeAdd.position.set(pos.x, height / 2, pos.z);
                this.scene.add(cubeAdd);
                // 屋根（三角錐）
                const roofColors = [0x4a4e69, 0x6d6875, 0x3d405b, 0x22223b];
                let roofHeight = height * (Math.random() * 0.2 + 0.5); // 高さの50〜70%
                let roofRadius = Math.max(width, width) * 0.8;
                let roofGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.ConeGeometry(roofRadius, roofHeight, 4);
                let roofMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: roofColors[Math.floor(Math.random() * roofColors.length)], });
                let roofAdd = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(roofGeometry, roofMaterial);
                roofAdd.position.set(pos.x, height + roofHeight / 2, pos.z);
                roofAdd.rotation.y = three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.degToRad(45);
                this.scene.add(roofAdd);
            });
        };
        addHouse();
        // 地球（背景に置いておく）
        const textureLoader = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader();
        const earthTexture = textureLoader.load("earth.jpg"); // 地球のテクスチャ画像のパス
        const earthGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(40, 32, 32);
        earthGeometry.computeVertexNormals();
        const earthMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ map: earthTexture });
        const earth = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(earthGeometry, earthMaterial);
        earth.position.set(-150, 140, 150); // 位置調整
        earth.rotation.y = -Math.PI / 2; // 90度回転
        earth.rotation.x = -Math.PI / 3; // 90度回転
        this.scene.add(earth);
        const ambientLight = new three__WEBPACK_IMPORTED_MODULE_1__.AmbientLight(0x404040, 2); // 強さを調整
        this.scene.add(ambientLight);
        // 月の追加 
        const moonMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0x888888 }); // 灰色
        const moonGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(10, 32, 32);
        const moon = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(moonGeometry, moonMaterial);
        moon.position.set(-250, 130, 100); // 月の位置（地球に近い位置に配置）
        this.scene.add(moon);
        // 火星の追加 
        const marsMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0xd15b1d }); // 火星色（赤み）
        const marsGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(20, 32, 32);
        const mars = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(marsGeometry, marsMaterial);
        mars.position.set(0, 150, 200); // 火星の位置（適切に調整）
        this.scene.add(mars);
        // 星の粒子（宇宙）
        const starGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();
        const starCount = 5000;
        const starMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({ color: 0xffffff, size: 1, transparent: true, opacity: 1.0 });
        const positions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 3000;
        }
        starGeometry.setAttribute("position", new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(positions, 3));
        const stars = new three__WEBPACK_IMPORTED_MODULE_1__.Points(starGeometry, starMaterial);
        this.scene.add(stars);
        // 回転アニメーションの追加
        let updateStars = () => {
            stars.rotation.x += 0.0001; // X軸方向に回転
            stars.rotation.y += 0.0001; // Y軸方向に回転
            starMaterial.opacity = Math.random() * 0.5 + 0.5; // ランダムに透明度を変更（明滅効果）
            requestAnimationFrame(updateStars); // 次のフレームで再度呼び出す
        };
        requestAnimationFrame(updateStars);
        //ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff);
        let lvec = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(2, 5, 2).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        // 毎フレームのupdateを呼んで，更新
        // reqestAnimationFrame により次フレームを呼ぶ
        let update = (time) => {
            const deltaTime = this.clock.getDelta();
            const elapsedTime = this.clock.getElapsedTime();
            this.updateAnimation();
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
    updateAnimation = () => {
        const delta = this.clock.getDelta();
        if (Math.random() < 0.03) {
            this.createFirework();
        }
        if (this.currentFirework !== null) {
            const material = this.currentFirework.material;
            material.opacity -= delta * 0.5;
            if (material.opacity <= 0) {
                this.scene.remove(this.currentFirework);
                this.currentFirework = null;
            }
        }
    };
    //花火の打ち上げ(拡散前の花火の作成)
    createFirework = () => {
        const fireGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(0.2, 8, 8);
        const fireMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0xffff });
        const firework = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(fireGeometry, fireMaterial);
        firework.position.set(Math.random() * 60 - 30, 0, Math.random() * 60 - 30);
        this.scene.add(firework);
        //打ち上げ花火のアニメーション
        let animateFire = () => {
            const fireSpeed = 0.5 + Math.random() * 0.3;
            const maxHeight = 20 + Math.random() * 13;
            const color = new three__WEBPACK_IMPORTED_MODULE_1__.Color(Math.random(), Math.random(), Math.random());
            firework.position.y += fireSpeed;
            if (firework.position.y >= maxHeight) { //一定の高さまで行ったら消す
                this.scene.remove(firework);
                this.explosion(firework.position.clone(), color);
                return;
            }
            requestAnimationFrame(animateFire);
        };
        animateFire();
    };
    //爆発後の花火
    explosion = (center, color) => {
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();
        const particleNum = 150;
        const positions = new Float32Array(particleNum * 3);
        const velocities = [];
        for (let i = 0; i < particleNum; i++) {
            positions[i * 3 + 0] = center.x;
            positions[i * 3 + 1] = center.y;
            positions[i * 3 + 2] = center.z;
            // ゆるやかに広がるように初速を小さくする（0.1〜0.3）
            const dir = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).clone().normalize().clone().multiplyScalar(Math.random() * 0.2);
            velocities.push(dir);
        }
        geometry.setAttribute("position", new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(positions, 3));
        const material = new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({
            color: color,
            size: 0.7,
            transparent: true,
            opacity: 1,
            blending: three__WEBPACK_IMPORTED_MODULE_1__.AdditiveBlending,
            depthWrite: false,
        });
        const cloud = new three__WEBPACK_IMPORTED_MODULE_1__.Points(geometry, material);
        this.scene.add(cloud);
        this.currentFirework = cloud;
        const start = this.clock.getElapsedTime();
        let animateExplosion = () => {
            const elapsed = this.clock.getElapsedTime() - start;
            const positions = geometry.getAttribute("position");
            const posArray = positions.array;
            for (let i = 0; i < particleNum; i++) {
                posArray[i * 3 + 0] += velocities[i].x;
                posArray[i * 3 + 1] += velocities[i].y;
                posArray[i * 3 + 2] += velocities[i].z;
            }
            positions.needsUpdate = true;
            // ゆっくり透明にして長持ちさせる（以前より減少を小さく）
            material.opacity = Math.max(0, 1 - elapsed * 0.5); // 1.5 → 0.5 に変更
            if (material.opacity > 0) {
                requestAnimationFrame(animateExplosion);
            }
            else {
                this.scene.remove(cloud);
                this.currentFirework = null;
            }
        };
        animateExplosion();
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-50, 50, 50));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_examples_jsm_controls_OrbitControls_js"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NncHJlbmRlcmluZy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLzIzRkkxMTcg5qOu5Y+L6aaZXHJcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzXCI7XHJcblxyXG5jbGFzcyBUaHJlZUpTQ29udGFpbmVyIHtcclxuICAgIHByaXZhdGUgc2NlbmU6IFRIUkVFLlNjZW5lO1xyXG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRGaXJld29yazogVEhSRUUuUG9pbnRzIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIGNsb2NrOiBUSFJFRS5DbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyDnlLvpnaLpg6jliIbjga7kvZzmiJAo6KGo56S644GZ44KL5p6g44GU44Go44GrKSpcclxuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlckRPTSA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY2FtZXJhUG9zOiBUSFJFRS5WZWN0b3IzKSA9PiB7XHJcbiAgICAgICAgbGV0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcclxuICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKSk7XHJcblxyXG4gICAgICAgIC8v44Kr44Oh44Op44Gu6Kit5a6aXHJcbiAgICAgICAgbGV0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwMCk7XHJcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLmNvcHkoY2FtZXJhUG9zKTtcclxuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcclxuXHJcbiAgICAgICAgbGV0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcclxuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIxyZW5kZXJcclxuICAgICAgICAvLyByZXFlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcclxuICAgICAgICBsZXQgcmVuZGVyOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XHJcbiAgICAgICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xyXG5cclxuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJsZWZ0XCI7XHJcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcclxuICAgICAgICByZXR1cm4gcmVuZGVyZXIuZG9tRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDjgrfjg7zjg7Pjga7kvZzmiJAo5YWo5L2T44GnMeWbnilcclxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xyXG5cclxuICAgICAgICAvL+WcsOmdouOBruS9nOaIkFxyXG4gICAgICAgIGNvbnN0IHBob25nTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjoweDNmNGY1Zn0pOyAvLyDihpDmmpfjgYTjgrDjg6zjg7zjgavmjIflrppcclxuICAgICAgICBjb25zdCBwbGFuZUdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoODAsIDgwKTtcclxuICAgICAgICBjb25zdCBwbGFuZU1lc2ggPSBuZXcgVEhSRUUuTWVzaChwbGFuZUdlb21ldHJ5LCBwaG9uZ01hdGVyaWFsKTtcclxuICAgICAgICBwbGFuZU1lc2gubWF0ZXJpYWwuc2lkZSA9IFRIUkVFLkRvdWJsZVNpZGU7IC8vIOS4oemdolxyXG4gICAgICAgIHBsYW5lTWVzaC5yb3RhdGVYKC1NYXRoLlBJIC8gMik7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgIC8v44K344O844Oz44G46L+95YqgXHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQocGxhbmVNZXNoKTtcclxuXHJcbiAgICAgICAgLy/mnbHkuqzjgr/jg6/jg7zjga7ov73liqBcclxuICAgICAgICBsZXQgYWRkVG9reW9Ub3dlciA9ICgpID0+IHtcclxuICAgICAgICAgICAgLy8g5p2x5Lqs44K/44Ov44O844Gu44OZ44O844K56YOo5YiG77yI5aSq44GE6YmE6aqo44Gu5pSv5p+x77yJXHJcbiAgICAgICAgICAgIGxldCBiYXNlR2VvbWV0cnkgPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgzLCAzLCAxNSwgOCk7ICAvLyDlpKrjgoHjga7lhobmn7Hjgafjg5njg7zjgrlcclxuICAgICAgICAgICAgbGV0IGJhc2VNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ZDMyZjJmIH0pOyAvLyDotaToibJcclxuICAgICAgICAgICAgbGV0IGJhc2UgPSBuZXcgVEhSRUUuTWVzaChiYXNlR2VvbWV0cnksIGJhc2VNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIGJhc2UucG9zaXRpb24uc2V0KDAsIDcuNSwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKGJhc2UpO1xyXG5cclxuICAgICAgICAgICAgLy8g5Lit6ZaT6YOo5YiG77yI57Sw44GP44Gq44KL77yJXHJcbiAgICAgICAgICAgIGxldCBtaWRkbGVHZW9tZXRyeSA9IG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDIsIDIsIDIwLCA4KTsgIC8vIOWwkeOBl+e0sOOCgeOBruWGhuafsVxyXG4gICAgICAgICAgICBsZXQgbWlkZGxlTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGQzMmYyZiB9KTsgLy8g6LWk6ImyXHJcbiAgICAgICAgICAgIGxldCBtaWRkbGUgPSBuZXcgVEhSRUUuTWVzaChtaWRkbGVHZW9tZXRyeSwgbWlkZGxlTWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICBtaWRkbGUucG9zaXRpb24uc2V0KDAsIDIwLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQobWlkZGxlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOS4iumDqOmDqOWIhu+8iOOBleOCieOBq+e0sOOBj+OBquOCi++8iVxyXG4gICAgICAgICAgICBsZXQgdG9wR2VvbWV0cnkgPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjUsIDEuNSwgMTAsIDgpOyAvLyDkuIrpg6jjga/ntLDjgYTlhobmn7FcclxuICAgICAgICAgICAgbGV0IHRvcE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYgfSk7IC8vIOeZveiJslxyXG4gICAgICAgICAgICBsZXQgdG9wID0gbmV3IFRIUkVFLk1lc2godG9wR2VvbWV0cnksIHRvcE1hdGVyaWFsKTtcclxuICAgICAgICAgICAgdG9wLnBvc2l0aW9uLnNldCgwLCAzMCwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRvcCk7XHJcblxyXG4gICAgICAgICAgICAvLyDjgr/jg6/jg7zjga7kuIrjga7jgqLjg7Pjg4bjg4rpg6jliIZcclxuICAgICAgICAgICAgbGV0IGFudGVubmFHZW9tZXRyeSA9IG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMSwgMC4xLCAxMCwgOCk7XHJcbiAgICAgICAgICAgIGxldCBhbnRlbm5hTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGQzMmYyZiB9KTtcclxuICAgICAgICAgICAgbGV0IGFudGVubmEgPSBuZXcgVEhSRUUuTWVzaChhbnRlbm5hR2VvbWV0cnksIGFudGVubmFNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIGFudGVubmEucG9zaXRpb24uc2V0KDAsIDQwLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQoYW50ZW5uYSk7XHJcblxyXG4gICAgICAgICAgICAvLyDmnbHkuqzjgr/jg6/jg7zjga7piYTpqqjmqKHmp5jvvIjjg6/jgqTjg6Tjg7zjg5Xjg6zjg7zjg6DpoqjvvIlcclxuICAgICAgICAgICAgbGV0IHdpcmVmcmFtZUdlb21ldHJ5ID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMywgMywgMTUsIDgsIDgsIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgd2lyZWZyYW1lTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IDB4MDAwMDAwLFxyXG4gICAgICAgICAgICAgICAgd2lyZWZyYW1lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMC4zLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCB3aXJlZnJhbWUgPSBuZXcgVEhSRUUuTWVzaCh3aXJlZnJhbWVHZW9tZXRyeSwgd2lyZWZyYW1lTWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICB3aXJlZnJhbWUucG9zaXRpb24uc2V0KDAsIDcuNSwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHdpcmVmcmFtZSk7XHJcblxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8g5p2x5Lqs44K/44Ov44O844Gu6L+95YqgXHJcbiAgICAgICAgYWRkVG9reW9Ub3dlcigpO1xyXG4gICAgICAgICAvLyDjg6njg7Pjg4Djg6Djgarlu7rnianjga7ov73liqBcclxuICAgICAgICBsZXQgYWRkQnVpbGRpbmdzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBiYXNlU2l6ZSA9IDYwOyAvLyDooZfjga7nr4Tlm7JcclxuICAgICAgICAgICAgY29uc3Qgc3BhY2UgPSAxMDsgLy8g5bu654mp6ZaT44Gu6Led6ZuiXHJcbiAgICAgICAgICAgIGNvbnN0IGJ1aWxkaW5nQ29sb3JzID0gWzB4NTU1NTU1LCAweDk5OTk5OSwgMHhjY2NjY2MsIDB4NDQ0NDQ0LCAweDc3Nzc3NywgMHhhYWFhYWFdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IC1iYXNlU2l6ZSAvIDI7IHggPCBiYXNlU2l6ZSAvIDI7IHggKz0gc3BhY2UpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHogPSAtYmFzZVNpemUgLyAyOyB6IDwgYmFzZVNpemUgLyAyOyB6ICs9IHNwYWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIC8vIDEwJeOBj+OCieOBhOOBrueiuueOh+OBp+epuuOBjeWcsOOCkuS9nOOCi1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4xKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5yYW5kb20oKSAqIDEwKyAxMDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2lkdGggPSBNYXRoLnJhbmRvbSgpICogMyArIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlcHRoID0gTWF0aC5yYW5kb20oKSAqIDMgKyAyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gYnVpbGRpbmdDb2xvcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYnVpbGRpbmdDb2xvcnMubGVuZ3RoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1aWxkaW5nR2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkod2lkdGgsIGhlaWdodCwgZGVwdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWlsZGluZ01hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogY29sb3J9KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVpbGRpbmcgPSBuZXcgVEhSRUUuTWVzaChidWlsZGluZ0dlb21ldHJ5LCBidWlsZGluZ01hdGVyaWFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g44Op44Oz44OA44Og44Gq5L2N572u44Ga44KM44KS5Yqg44GI44KL77yIwrEz5Lul5YaF77yJXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9mZnNldFggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA2O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRaID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogNjtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZGluZy5wb3NpdGlvbi5zZXQoeCArIG9mZnNldFgsIGhlaWdodCAvIDIsIHogKyBvZmZzZXRaKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQoYnVpbGRpbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBhZGRCdWlsZGluZ3MoKTtcclxuICAgXHJcblxyXG4gICBcclxuICAgICAgICAgLy8g6KGX6Lev5qi544Gu6L+95YqgXHJcbiAgICAgICAgbGV0IGFkZFRyZWVzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0cmVlUG9zaXRpb25zID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiAtMjAsIHo6IDEwIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IDIwLCB6OiAtMTAgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogMTAsIHo6IDMwIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IC0zMCwgejogLTIwIH0sXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICB0cmVlUG9zaXRpb25zLmZvckVhY2gocG9zID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB0cnVua0dlb21ldHJ5ID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC41LCAwLjUsIDUsIDE2KTtcclxuICAgICAgICAgICAgICAgIGxldCB0cnVua01hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHg4QjQ1MTMgfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHJ1bmsgPSBuZXcgVEhSRUUuTWVzaCh0cnVua0dlb21ldHJ5LCB0cnVua01hdGVyaWFsKTtcclxuICAgICAgICAgICAgICAgIHRydW5rLnBvc2l0aW9uLnNldChwb3MueCwgMi41LCBwb3Mueik7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxlYXZlc0dlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDMsIDE2LCAxNik7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVhdmVzTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDIyOEIyMiB9KTtcclxuICAgICAgICAgICAgICAgIGxldCBsZWF2ZXMgPSBuZXcgVEhSRUUuTWVzaChsZWF2ZXNHZW9tZXRyeSwgbGVhdmVzTWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICAgICAgbGVhdmVzLnBvc2l0aW9uLnNldChwb3MueCwgNiwgcG9zLnopO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRydW5rKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKGxlYXZlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgYWRkVHJlZXMoKTtcclxuXHJcbiAgICAgICAgIFxyXG4gICAgICAgICAvLyDpgZPot6/jga7kvZzmiJBcclxuICAgICAgICBsZXQgYWRkUm9hZHMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvYWRNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweDMzMzMzMyB9KTtcclxuICAgICAgICAgICAgY29uc3Qgcm9hZEdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoODAsIDUpO1xyXG4gICAgICAgICAgICBjb25zdCByb2FkID0gbmV3IFRIUkVFLk1lc2gocm9hZEdlb21ldHJ5LCByb2FkTWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICByb2FkLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XHJcbiAgICAgICAgICAgIHJvYWQucG9zaXRpb24ueSA9IDAuMTsgLy8g5bCR44GX5LiK44Gr6YWN572uXHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHJvYWQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgYWRkUm9hZHMoKTtcclxuXHJcbiAgICAgICAgLy8g44Kr44Op44OV44Or44Gq5a6244KS5pWw6LuS6L+95Yqg44GZ44KL77yI5bu654mp44Go6KKr44KJ44Gq44GE56+E5Zuy44Gr77yJXHJcbiAgICAgICAgbGV0IGFkZEhvdXNlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBob3VzZVBvc2l0aW9ucyA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogLTMwLCB6OiAtMzAgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogMzAsIHo6IC0yNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiAtMjUsIHo6IDMwIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IDI1LCB6OiAyNSB9LFxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgaG91c2VQb3NpdGlvbnMuZm9yRWFjaCgocG9zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IE1hdGgucmFuZG9tKCkgKiAxLjUgKyA1OyAgLy8gXHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBNYXRoLnJhbmRvbSgpICogNCArIDY7ICAgICAvLyDpq5jjgZU244CcMTBcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBob3VzZUNvbG9ycyA9IFsgMHg4ZWNhZTYsICAweGZmYjcwMywgICAweGUwN2E1ZiwgICAweGFkYjViZCwgIDB4OTBiZTZkLCAgIDB4NmE0YzkzIF07XHJcbiAgICAgICAgICAgICAgICAvLyDlrrbjga7mnKzkvZNcclxuICAgICAgICAgICAgICAgIGxldCBjdWJlR2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkod2lkdGgsIGhlaWdodCwgd2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1YmVNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgIGNvbG9yOiBob3VzZUNvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBob3VzZUNvbG9ycy5sZW5ndGgpXSx9KTtcclxuICAgICAgICAgICAgICAgIGxldCBjdWJlQWRkID0gbmV3IFRIUkVFLk1lc2goY3ViZUdlb21ldHJ5LCBjdWJlTWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICAgICAgY3ViZUFkZC5wb3NpdGlvbi5zZXQocG9zLngsIGhlaWdodCAvIDIsIHBvcy56KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKGN1YmVBZGQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOWxi+ague+8iOS4ieinkumMkO+8iVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm9vZkNvbG9ycyA9IFsweDRhNGU2OSwgICAweDZkNjg3NSwgICAweDNkNDA1YiwgICAweDIyMjIzYiBdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvb2ZIZWlnaHQgPSBoZWlnaHQgKiAoTWF0aC5yYW5kb20oKSAqIDAuMiArIDAuNSk7ICAvLyDpq5jjgZXjga41MOOAnDcwJVxyXG4gICAgICAgICAgICAgICAgbGV0IHJvb2ZSYWRpdXMgPSBNYXRoLm1heCh3aWR0aCwgd2lkdGgpKjAuOCA7XHJcbiAgICAgICAgICAgICAgICBsZXQgcm9vZkdlb21ldHJ5ID0gbmV3IFRIUkVFLkNvbmVHZW9tZXRyeShyb29mUmFkaXVzLCByb29mSGVpZ2h0LCA0KTtcclxuICAgICAgICAgICAgICAgIGxldCByb29mTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7ICBjb2xvcjogcm9vZkNvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByb29mQ29sb3JzLmxlbmd0aCldLH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvb2ZBZGQgPSBuZXcgVEhSRUUuTWVzaChyb29mR2VvbWV0cnksIHJvb2ZNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgICAgICByb29mQWRkLnBvc2l0aW9uLnNldChwb3MueCwgaGVpZ2h0ICsgcm9vZkhlaWdodCAvIDIsIHBvcy56KTtcclxuICAgICAgICAgICAgICAgIHJvb2ZBZGQucm90YXRpb24ueSA9IFRIUkVFLk1hdGhVdGlscy5kZWdUb1JhZCg0NSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChyb29mQWRkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBhZGRIb3VzZSgpO1xyXG5cclxuICAgICAgLy8g5Zyw55CD77yI6IOM5pmv44Gr572u44GE44Gm44GK44GP77yJXHJcbiAgICAgICAgIGNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xyXG4gICAgICAgIGNvbnN0IGVhcnRoVGV4dHVyZSA9IHRleHR1cmVMb2FkZXIubG9hZChcImVhcnRoLmpwZ1wiKTsgLy8g5Zyw55CD44Gu44OG44Kv44K544OB44Oj55S75YOP44Gu44OR44K5XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZWFydGhHZW9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSg0MCwgMzIsIDMyKTtcclxuICAgICAgICBlYXJ0aEdlb21ldHJ5LmNvbXB1dGVWZXJ0ZXhOb3JtYWxzKCk7XHJcbiAgICAgICBjb25zdCBlYXJ0aE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgbWFwOiBlYXJ0aFRleHR1cmUgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVhcnRoID0gbmV3IFRIUkVFLk1lc2goZWFydGhHZW9tZXRyeSwgZWFydGhNYXRlcmlhbCk7XHJcbiAgICAgICAgZWFydGgucG9zaXRpb24uc2V0KC0xNTAsIDE0MCwgMTUwKTsgIC8vIOS9jee9ruiqv+aVtFxyXG4gICAgICAgIGVhcnRoLnJvdGF0aW9uLnkgPSAtTWF0aC5QSSAvIDI7ICAvLyA5MOW6puWbnui7olxyXG4gICAgICAgIGVhcnRoLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDM7ICAvLyA5MOW6puWbnui7olxyXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGVhcnRoKTtcclxuICAgICAgICBjb25zdCBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4NDA0MDQwLCAyKTsgLy8g5by344GV44KS6Kq/5pW0XHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoYW1iaWVudExpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8g5pyI44Gu6L+95YqgIFxyXG4gICAgICAgIGNvbnN0IG1vb25NYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweDg4ODg4OCB9KTsgLy8g54Gw6ImyXHJcbiAgICAgICAgY29uc3QgbW9vbkdlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDEwLCAzMiwgMzIpO1xyXG4gICAgICAgIGNvbnN0IG1vb24gPSBuZXcgVEhSRUUuTWVzaChtb29uR2VvbWV0cnksIG1vb25NYXRlcmlhbCk7XHJcbiAgICAgICAgbW9vbi5wb3NpdGlvbi5zZXQoLTI1MCwgMTMwLCAxMDApOyAgLy8g5pyI44Gu5L2N572u77yI5Zyw55CD44Gr6L+R44GE5L2N572u44Gr6YWN572u77yJXHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQobW9vbik7XHJcblxyXG4gICAgICAgICAvLyDngavmmJ/jga7ov73liqAgXHJcbiAgICAgICAgY29uc3QgbWFyc01hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4ZDE1YjFkIH0pOyAvLyDngavmmJ/oibLvvIjotaTjgb/vvIlcclxuICAgICAgICBjb25zdCBtYXJzR2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMjAsIDMyLCAzMik7XHJcbiAgICAgICAgY29uc3QgbWFycyA9IG5ldyBUSFJFRS5NZXNoKG1hcnNHZW9tZXRyeSwgbWFyc01hdGVyaWFsKTtcclxuICAgICAgICBtYXJzLnBvc2l0aW9uLnNldCgwLCAxNTAsIDIwMCk7ICAvLyDngavmmJ/jga7kvY3nva7vvIjpganliIfjgavoqr/mlbTvvIlcclxuICAgICAgICB0aGlzLnNjZW5lLmFkZChtYXJzKTtcclxuXHJcbiAgICAgICAgLy8g5pif44Gu57KS5a2Q77yI5a6H5a6Z77yJXHJcbiAgICAgICAgY29uc3Qgc3Rhckdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XHJcbiAgICAgICAgY29uc3Qgc3RhckNvdW50ID0gNTAwMDtcclxuICAgICAgICBjb25zdCBzdGFyTWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYsIHNpemU6IDEsdHJhbnNwYXJlbnQ6IHRydWUsIG9wYWNpdHk6IDEuMCB9KTtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHN0YXJDb3VudCAqIDMpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhckNvdW50ICogMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uc1tpXSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDMwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXJHZW9tZXRyeS5zZXRBdHRyaWJ1dGUoXCJwb3NpdGlvblwiLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywgMykpO1xyXG4gICAgICAgIGNvbnN0IHN0YXJzID0gbmV3IFRIUkVFLlBvaW50cyhzdGFyR2VvbWV0cnksIHN0YXJNYXRlcmlhbCk7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoc3RhcnMpO1xyXG4gICAgICAgIC8vIOWbnui7ouOCouODi+ODoeODvOOCt+ODp+ODs+OBrui/veWKoFxyXG4gICAgICAgIGxldCB1cGRhdGVTdGFycyA9ICgpID0+IHtcclxuICAgICAgICAgICAgc3RhcnMucm90YXRpb24ueCArPSAwLjAwMDE7IC8vIFjou7jmlrnlkJHjgavlm57ou6JcclxuICAgICAgICAgICAgc3RhcnMucm90YXRpb24ueSArPSAwLjAwMDE7IC8vIFnou7jmlrnlkJHjgavlm57ou6JcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN0YXJNYXRlcmlhbC5vcGFjaXR5ID0gTWF0aC5yYW5kb20oKSAqIDAuNSArIDAuNTsgLy8g44Op44Oz44OA44Og44Gr6YCP5piO5bqm44KS5aSJ5pu077yI5piO5ruF5Yq55p6c77yJXHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlU3RhcnMpOyAvLyDmrKHjga7jg5Xjg6zjg7zjg6Djgaflho3luqblkbzjgbPlh7rjgZlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVTdGFycyk7XHJcblxyXG4gICAgICAgIC8v44Op44Kk44OI44Gu6Kit5a6aXHJcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmKTtcclxuICAgICAgICBsZXQgbHZlYyA9IG5ldyBUSFJFRS5WZWN0b3IzKDIsNSwyKS5ub3JtYWxpemUoKTtcclxuICAgICAgICB0aGlzLmxpZ2h0LnBvc2l0aW9uLnNldChsdmVjLngsIGx2ZWMueSwgbHZlYy56KTtcclxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yM5pu05pawXHJcbiAgICAgICAgLy8gcmVxZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XHJcbiAgICAgICAgbGV0IHVwZGF0ZTogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkZWx0YVRpbWUgPSB0aGlzLmNsb2NrLmdldERlbHRhKClcclxuICAgICAgICAgICAgY29uc3QgZWxhcHNlZFRpbWU9dGhpcy5jbG9jay5nZXRFbGFwc2VkVGltZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlQW5pbWF0aW9uPSgpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhPXRoaXMuY2xvY2suZ2V0RGVsdGEoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpPDAuMDMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVGaXJld29yaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRGaXJld29yayE9PW51bGwpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWw9dGhpcy5jdXJyZW50RmlyZXdvcmsubWF0ZXJpYWwgYXMgVEhSRUUuUG9pbnRzTWF0ZXJpYWw7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5vcGFjaXR5LT1kZWx0YSowLjU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobWF0ZXJpYWwub3BhY2l0eTw9MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmUodGhpcy5jdXJyZW50RmlyZXdvcmspO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEZpcmV3b3JrPW51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG5cclxuICAgIC8v6Iqx54Gr44Gu5omT44Gh5LiK44GSKOaLoeaVo+WJjeOBruiKseeBq+OBruS9nOaIkClcclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpcmV3b3JrPSgpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IGZpcmVHZW9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjIsIDgsIDgpO1xyXG4gICAgICAgICAgICBjb25zdCBmaXJlTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpcmV3b3JrID0gbmV3IFRIUkVFLk1lc2goZmlyZUdlb21ldHJ5LCBmaXJlTWF0ZXJpYWwpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBmaXJld29yay5wb3NpdGlvbi5zZXQoTWF0aC5yYW5kb20oKSAqIDYwIC0gMzAsIDAsIE1hdGgucmFuZG9tKCkgKiA2MCAtIDMwKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQoZmlyZXdvcmspO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvL+aJk+OBoeS4iuOBkuiKseeBq+OBruOCouODi+ODoeODvOOCt+ODp+ODs1xyXG4gICAgICAgICAgICAgbGV0IGFuaW1hdGVGaXJlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgIGNvbnN0IGZpcmVTcGVlZCA9IDAuNSArIE1hdGgucmFuZG9tKCkgKiAwLjM7XHJcbiAgICAgICAgICAgICAgICAgY29uc3QgbWF4SGVpZ2h0ID0gMjArTWF0aC5yYW5kb20oKSAqIDEzO1xyXG4gICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yPSBuZXcgVEhSRUUuQ29sb3IoTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmaXJld29yay5wb3NpdGlvbi55Kz1maXJlU3BlZWQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoZmlyZXdvcmsucG9zaXRpb24ueT49bWF4SGVpZ2h0KXsgLy/kuIDlrprjga7pq5jjgZXjgb7jgafooYzjgaPjgZ/jgonmtojjgZlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZShmaXJld29yayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBsb3Npb24oZmlyZXdvcmsucG9zaXRpb24uY2xvbmUoKSwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlRmlyZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGFuaW1hdGVGaXJlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/niIbnmbrlvozjga7oirHngatcclxuICAgICAgICBwcml2YXRlIGV4cGxvc2lvbiA9IChjZW50ZXI6IFRIUkVFLlZlY3RvcjMsIGNvbG9yOiBUSFJFRS5Db2xvcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XHJcbiAgICAgICAgY29uc3QgcGFydGljbGVOdW0gPSAxNTA7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwYXJ0aWNsZU51bSAqIDMpO1xyXG4gICAgICAgIGNvbnN0IHZlbG9jaXRpZXM6IFRIUkVFLlZlY3RvcjNbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlTnVtOyBpKyspIHtcclxuICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMF0gPSBjZW50ZXIueDtcclxuICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMV0gPSBjZW50ZXIueTtcclxuICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMl0gPSBjZW50ZXIuejtcclxuXHJcbiAgICAgICAgICAgIC8vIOOChuOCi+OChOOBi+OBq+W6g+OBjOOCi+OCiOOBhuOBq+WInemAn+OCkuWwj+OBleOBj+OBmeOCi++8iDAuMeOAnDAuM++8iVxyXG4gICAgICAgICAgICBjb25zdCBkaXIgPSBuZXcgVEhSRUUuVmVjdG9yMyhcclxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiAyIC0gMSxcclxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiAyIC0gMSxcclxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiAyIC0gMVxyXG4gICAgICAgICAgICApLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKE1hdGgucmFuZG9tKCkgKiAwLjIpO1xyXG5cclxuICAgICAgICAgICAgdmVsb2NpdGllcy5wdXNoKGRpcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoXCJwb3NpdGlvblwiLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywgMykpO1xyXG5cclxuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XHJcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcclxuICAgICAgICAgICAgc2l6ZTogMC43LFxyXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXHJcbiAgICAgICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBjbG91ZCA9IG5ldyBUSFJFRS5Qb2ludHMoZ2VvbWV0cnksIG1hdGVyaWFsKTtcclxuICAgICAgICB0aGlzLnNjZW5lLmFkZChjbG91ZCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RmlyZXdvcmsgPSBjbG91ZDtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmNsb2NrLmdldEVsYXBzZWRUaW1lKCk7XHJcblxyXG4gICAgICAgIGxldCBhbmltYXRlRXhwbG9zaW9uID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gdGhpcy5jbG9jay5nZXRFbGFwc2VkVGltZSgpIC0gc3RhcnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZShcInBvc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3NBcnJheSA9IHBvc2l0aW9ucy5hcnJheSBhcyBGbG9hdDMyQXJyYXk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlTnVtOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHBvc0FycmF5W2kgKiAzICsgMF0gKz0gdmVsb2NpdGllc1tpXS54O1xyXG4gICAgICAgICAgICAgICAgcG9zQXJyYXlbaSAqIDMgKyAxXSArPSB2ZWxvY2l0aWVzW2ldLnk7XHJcbiAgICAgICAgICAgICAgICBwb3NBcnJheVtpICogMyArIDJdICs9IHZlbG9jaXRpZXNbaV0uejtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcG9zaXRpb25zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIOOChuOBo+OBj+OCiumAj+aYjuOBq+OBl+OBpumVt+aMgeOBoeOBleOBm+OCi++8iOS7peWJjeOCiOOCiua4m+WwkeOCkuWwj+OBleOBj++8iVxyXG4gICAgICAgICAgICBtYXRlcmlhbC5vcGFjaXR5ID0gTWF0aC5tYXgoMCwgMSAtIGVsYXBzZWQgKiAwLjUpOyAvLyAxLjUg4oaSIDAuNSDjgavlpInmm7RcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbC5vcGFjaXR5ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVFeHBsb3Npb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmUoY2xvdWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RmlyZXdvcmsgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYW5pbWF0ZUV4cGxvc2lvbigpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgfVxyXG4gICAgICAgIFxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIGxldCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xyXG5cclxuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTSg2NDAsIDQ4MCwgbmV3IFRIUkVFLlZlY3RvcjMoLTUwLCA1MCwgNTApKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==