<template>
    <Header></Header>
    <div id="map"></div>
    <div id="components">
        <router-view></router-view>
    </div>

    <button
        @click="removeModel"
        class="deleteBtn"
    >
        删除模型
    </button>
    <button
        @click="addModel"
        class="addBtn"
    >
        添加模型
    </button>
</template>

<script setup>
import { onMounted, inject } from 'vue';
import { app } from './main';
import Header from './components/Header.vue';

// 引入mapboxgl
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// 引入L7
import { Scene } from '@antv/l7';
// 引入L7-mapboxgl
import { Mapbox } from '@antv/l7-maps';

// 引入加载三维建筑的类
import modelLoadHelper from './loadObjModels';

let loader, layer;

// 在组件加载的时候初始化地图
onMounted(() => {
    // 注册token
    const token = import.meta.env.VITE_TOKEN;
    mapboxgl.accessToken = token;

    // 创建mapbox地图
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [114.3, 30.5],
        zoom: 9,
        pitch: 45,
        projection: 'globe',
    });

    // 加载三维建筑模型
    const modelLoadOpt = {
        // 添加模型的坐标点
        center: [114.298, 30.502],
        // 模型朝向的角度
        angle: 0,
        // x,y,z三轴上的缩放比例
        scale: {
            x: 6,
            y: 6,
            z: 20,
        },
        // obj模型的路径
        objUrl: '/src/assets/models/model3/LeosVillage.obj',
        // obj模型的材质贴图
        mtlUrl: '/src/assets/models/model3/LeosVillage.mtl',
    };
    loader = new modelLoadHelper(map, modelLoadOpt);

    // 创建L7实例
    const scene = new Scene({
        id: 'map',
        map: new Mapbox({
            mapInstance: map,
        }),
        logoVisible: false,
    });

    // 设置雾效
    map.on('style.load', () => {
        map.setFog({});
    });

    // 使用provide 将地图实例化对象全局共享
    app.provide('$scene_map', { scene, map });
});

const removeModel = () => {
    console.log(layer);
    layer && loader && loader.removeModel(layer.id);
};

const addModel = () => {
    if (loader) {
        console.log(layer);
        layer = loader.addModel();
    }
};
</script>

<style scoped>
#map {
    width: 100vw;
    height: 100vh;
}

Header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
}

#components {
    background-color: rgba(0, 0, 0, 0.331);
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}

.addBtn {
    width: 100px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    position: absolute; 
    right: 100px; 
    bottom: 0;
    z-index: 1999;
    background-color: #586dcb;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
}

.deleteBtn {
    width: 100px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    position: absolute; 
    right: 0; 
    bottom: 0; 
    z-index: 1999;
    background-color: #c75454;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
}
</style>
