<template>
    <div class="footer">
        <div class="item" v-for="item in funcItems">
            <DrawTools v-if="item.isPopover">
                <button class="item-btn" @click="item.trigger">
                    <i :class="['iconfont', item.icon]"></i>
                </button>
            </DrawTools>
            <!-- 加载MeasureTool -->
            <MeasureTool v-else-if="item.isPopover2">
                <button class="item-btn" @click="item.trigger">
                    <i :class="['iconfont', item.icon]"></i>
                </button>
            </MeasureTool>
            <MoreTools v-else-if="item.isPopover3">
                <button class="item-btn" @click="item.trigger">
                    <i :class="['iconfont', item.icon]"></i>
                </button>
            </MoreTools>
            <button class="item-btn" @click="item.trigger" v-else>
                <i :class="['iconfont', item.icon]"></i>
            </button>
            <p>{{ item.title }}</p>
        </div>
    </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';
const { scene, map } = inject('$scene_map');
import DrawTools from './DrawTools.vue';
import MeasureTool from './MeasureTool.vue';
import MoreTools from './MoreTools.vue';

// 定义地球自转状态
let isRotate = true;
const mark = ref('停止自转');
// 定义数据面板状态
let G2Visible = ref(true);
// 定义飞行武汉状态
const isInWuhan = ref(true);

// 控制地球自转
const rotate = () => {
    let zoom = map.getZoom();

    if (zoom < 5) {
        let center = map.getCenter();
        center.lng += 10;
        map.easeTo({
            center: center,
            duration: 1000,
            easing: (t) => {
                return t;
            },
        });
    }
};

// 挂载的时候默认自转
onMounted(() => {
    rotate();
    map.on('moveend', () => isRotate && rotate());
});

// 控制地球自转
const toggleRotate = () => {
    isRotate = !isRotate;
    if (isRotate) {
        rotate();
        mark.value = '停止自转';
    } else {
        map.stop();
        mark.value = '开始自转';
    }
};

//
const emit = defineEmits(['controlCenter']);
const controlCenter = () => {
    G2Visible.value = !G2Visible.value;
    emit('controlCenter', G2Visible.value);
};

const flyTowh = () => {
    if (!isInWuhan.value) {
        map.flyTo({
            center: [114.3, 30.5],
            zoom: 9,
            speed: 0.8,
            curve: 1,
            pitch: 45,
            easing: (t) => {
                return t;
            },
        });
    } else {
        map.flyTo({
            center: [114.3, 30.5],
            zoom: 2,
            speed: 0.8,
            curve: 1,
            pitch: 0,
            easing: (t) => {
                return t;
            },
        });
    }
    isInWuhan.value = !isInWuhan.value;
};

const funcItems = [
    {
        title: '自转控制',
        icon: 'icon-fuwudiqiu',
        trigger: toggleRotate,
    },
    {
        title: '控制中心',
        icon: 'icon-supervision-full',
        trigger: controlCenter,
    },
    {
        title: '视角切换',
        icon: 'icon-icon-test',
        trigger: flyTowh,
    },
    {
        title: '事故查询',
        icon: 'icon-paint',
        trigger: rotate,
        isPopover: true,
    },
    {
        title: '地图测量',
        icon: 'icon-ruler',
        trigger: rotate,
        isPopover2: true,
    },
    {
        title: '更多功能',
        icon: 'icon-kongzhi',
        trigger: rotate,
        isPopover3: true,
    },
];
</script>

<style scoped>
.footer {
    position: fixed;
    left: 0;
    bottom: 20px;
    width: 100%;
    height: 8vh;
    z-index: 5;
    display: flex;
    background: url('../assets/xzd-footer.png') no-repeat;
    background-size: cover;
    justify-content: center;
    align-items: center;
    /* backdrop-filter: blur(10px); */
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin: 0 15px 5px 15px;
    font-size: 14px;
}

.item-btn {
    border-radius: 50%;
    background-color: #53697670;
    background: linear-gradient(
        to bottom,
        rgba(0, 128, 255, 0.377),
        rgba(0, 128, 255, 0.281)
    );
    padding: 15px;
    outline: none;
    border: none;
    box-shadow: 0 0 5px 3px #1e283ed4;
    cursor: pointer;
    color: #fff;
    margin-bottom: 4px;
    backdrop-filter: blur(5px);
}

.item-btn:hover {
    background-color: #536976c4;
    background: linear-gradient(
        to bottom,
        rgba(0, 128, 255, 0.577),
        rgba(0, 128, 255, 0.581)
    );
}
</style>
