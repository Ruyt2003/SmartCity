<template>
    <div class="guide-control" @click="toggleGuide">{{ icon }}</div>
    <div id="geocoder" class="geocoder" v-show="searchVisible"></div>
    <button
        id="search-control"
        @click="toggleSearch"
        :class="['iconfont', 'icon-search']"
    ></button>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
const { scene, map } = inject('$scene_map');
import {
    Logo,
    Zoom,
    Fullscreen,
    MouseLocation,
    MapTheme,
    Scale,
} from '@antv/l7';

let guide;
let geocoder;
const icon = ref('>');
const guideVisible = ref(true);
const searchVisible = ref(false);
const toggleGuide = () => {
    guideVisible.value = !guideVisible.value;
    if (guide) {
        if (guideVisible.value) {
            // addControl的第二个参数,控制控件显示的位置
            // 地图导航控件
            map.addControl(guide, 'top-left');
            icon.value = '<';
        } else {
            map.removeControl(guide);
            icon.value = '>';
        }
    }
};
const toggleSearch = () => {
    searchVisible.value = !searchVisible.value;
};

scene.on('load', () => {
    // 添加logo
    const logo = new Logo({
        img: 'https://img.gejiba.com/images/dfdb6db1623eb881e724f58d9a366af8.png',
        href: 'https://l7.antv.vision/zh',
    });
    scene.addControl(logo);

    // 添加mapbox搜索控件
    geocoder = new MapboxGeocoder({
        accessToken: import.meta.env.VITE_TOKEN,
        mapboxgl: mapboxgl,
    });
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    // 添加Zoom控件
    const zoom = new Zoom({
        position: 'topright',
    });
    scene.addControl(zoom);

    // 添加全屏控件
    const fullscreen = new Fullscreen({});
    scene.addControl(fullscreen);

    // 添加鼠标位置控件
    const mouseLocation = new MouseLocation({
        transform: (position) => {
            return position.map((item) => item.toFixed(4));
        },
    });
    scene.addControl(mouseLocation);

    // 添加地图主题控件
    const mapTheme = new MapTheme({
        options: [
            {
                text: 'streets',
                value: 'mapbox://styles/mapbox/streets-v12',
                img: '/src/assets/themes/streets-v12.png',
            },
            {
                text: 'outdoors',
                value: 'mapbox://styles/mapbox/outdoors-v12',
                img: '/src/assets/themes/outdoors.png',
            },
            {
                text: 'light',
                value: 'mapbox://styles/mapbox/light-v11',
                img: '/src/assets/themes/light.png',
            },
            {
                text: 'dark',
                value: 'mapbox://styles/mapbox/dark-v11',
                img: '/src/assets/themes/dark.png',
            },
            {
                text: 'satellite',
                value: 'mapbox://styles/mapbox/satellite-v9',
                img: '/src/assets/themes/satellite.png',
            },
            {
                text: 'satellite-streets',
                value: 'mapbox://styles/mapbox/satellite-streets-v12',
                img: '/src/assets/themes/satellite-streets.png',
            },
        ],
    });
    scene.addControl(mapTheme);

    // 添加比例尺控件
    const scale = new Scale({
        position: 'bottomright',
        unit: 'metric',
    });
    // 根据zoom大小显示比例尺
    let hasScaleControl = false;
    map.on('zoom', () => {
        let mapZoom = map.getZoom();

        if (mapZoom > 5 && !hasScaleControl) {
            scene.addControl(scale);
            hasScaleControl = true;
        } else if (mapZoom <= 5 && hasScaleControl) {
            scene.removeControl(scale);
            hasScaleControl = false;
        }
    });

    // mapbox导航控件
    guide = new MapboxDirections({
        accessToken: import.meta.env.VITE_TOKEN,
        unit: 'metric', // metric | imperial
        interactive: true,
        profile: 'mapbox/driving',
        controls: {
            inputs: true,
            instructions: true,
            profileSwitcher: true,
        },
    });

    // mapbox汉化控件
    map.addControl(
        new MapboxLanguage({
            defaultLanguage: 'zh-Hans',
        })
    );
});
</script>
<style>
.l7-control-mouse-location {
    transform: translateX(100px) !important;
    text-align: center;
    position: fixed;
    bottom: -33px;
    background: #0000002b;
    color: #fff !important;
    backdrop-filter: blur(5px);
}

.l7-control-logo {
    margin-bottom: 20px !important;
}

.l7-control-container .l7-control {
    max-width: 120px;
}

.l7-control-scale-line {
    margin-bottom: 15px !important;
    max-width: 120px;
}

.l7-control-scale .l7-control-scale-line {
    color: #ffffff;
    background: #0000002b;
    backdrop-filter: blur(5px);
    border: 2px solid #8d8d8d;
    border-top: 0;
    border-radius: 2px;
}

.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right,
.mapboxgl-ctrl-top-left,
.mapboxgl-ctrl-top-right {
    position: absolute;
    pointer-events: none;
    z-index: 999;
}

.mapboxgl-ctrl-geocoder--input {
    padding-left: 30px !important;
}

.guide-control {
    position: absolute;
    left: 0px;
    top: 140px;
    cursor: pointer;
    color: #fff;
    width: 18px;
    height: 24px;
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    background-color: #00000058;
    backdrop-filter: blur(10px);
    border-top-left-radius: 0;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 12px;
    user-select: none;
    transition: all 0.8s ease-in-out;
    z-index: 999;
}
.guide-control:hover {
    width: 25px;
    text-align: center;
}

.l7-button-control {
    background-color: #5e82c150;
    backdrop-filter: blur(10px);
    transition: background-color 0.3s;
}

.l7-button-control:hover {
    background-color: #3c558180 !important;
}

.l7-button-control .l7-iconfont {
    fill: #ffffff;
    color: #fffdfd;
}

.mapboxgl-ctrl-geocoder {
    width: 260px;
}

.geocoder {
    width: 380px;
    margin: 0;
    font-size: 15px;
    line-height: 20px;
    max-width: 360px;
    position: fixed;
    top: 93px;
    left: 50%;
    transform: translateX(calc(-50% + 10px));
}

#search-control {
    width: 28px;
    height: 28px;
    font-size: 15px;
    position: fixed;
    top: 93px;
    right: 8px;
    fill: #ffffff;
    background-color: #5e82c150;
    color: #fffdfd;
    cursor: pointer;
    z-index: 999;
    border-radius: 2px;
    /* 去除边框边线 */
    border: none;
    outline: none;
    transition: background-color 0.3s;
}

#search-control:hover {
    background-color: #3c558180;
}

.l7-control-container .l7-top {
    top: 121px;
}
</style>
