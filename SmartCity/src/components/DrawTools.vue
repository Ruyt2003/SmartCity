<template>
    <el-popover
        placement="top"
        width="150"
        trigger="hover"
        popper-style="background-color: #53697670;color: #fff;backdrop-filter: blur(10px);"
    >
        <!-- popover的内容 -->
        <div class="popover-content">
            <i
                v-for="item in toolsIcon"
                :class="['iconfont', `icon-${item}`]"
                @click="query(item)"
            ></i>
        </div>
        <!-- 让外部组件通过reference具名插槽，安装触发器 -->
        <template #reference>
            <slot></slot>
        </template>
    </el-popover>
    <DisplayCard ref="displayCard" v-if="showData" :dataSource="displayData" />
</template>

<script setup>
const toolsIcon = [
    'drawPolygonTool',
    'drawRectTool',
    'drawCircleTool',
    'delete',
];
import { DrawPolygon, DrawRect, DrawCircle, DrawEvent } from '@antv/l7-draw';
import { inject, onMounted, ref } from 'vue';
import { point, polygon, booleanPointInPolygon } from '@turf/turf';
import axios from 'axios';
import DisplayCard from './DisplayCard.vue';
const { scene } = inject('$scene_map');
let dataSource = [];
const displayCard = ref(HTMLElement);
const displayData = ref([]);

// 是否显示数据
const showData = ref(false);

// 我们的绘制工具集合
const drawTools = {};

const initTools = () => {
    toolsIcon.forEach((item) => {
        switch (item) {
            case 'drawPolygonTool':
                drawTools[item] = new DrawPolygon(scene, {
                    editable: true,
                    // Draw 配置
                });
                break;
            case 'drawRectTool':
                drawTools[item] = new DrawRect(scene, {
                    editable: true,
                    // Draw 配置
                });
                break;
            case 'drawCircleTool':
                drawTools[item] = new DrawCircle(scene, {
                    editable: true,
                    // Draw 配置
                });
                break;
            default:
                break;
        }
    });
};

const initData = async () => {
    const { data } = await axios.get('http://localhost:8080/wuhan_events');
    dataSource = data;
};

onMounted(() => {
    initTools();
    initData();
});

// 停止当前的绘制
const stopDrawing = () => {
    for (let key in drawTools) {
        const tool = drawTools[key];
        tool.clear();
        tool.disable();
        tool.removeActiveFeature();
    }
};

// 点击图标，清除之前的绘制工具
const query = (type) => {
    stopDrawing();
    // 如果我们发现是删除，就直接return
    if (type === 'delete') {
        displayCard.value.removeAll();
        displayData.value = [];
        showData.value = false;
        return;
    }
    const targetTool = drawTools[type];
    if (targetTool) {
        targetTool.enable();
        // 在绘制状态过程中，获取到目前已经绘制的图形，并将之前的删除，只保留最后绘制的一个图形
        targetTool.on(DrawEvent.Change, (features) => {
            console.log(features);
            features.forEach((feature, index) => {
                // 将之前绘制的都清除
                if (index !== features.length - 1) {
                    targetTool.removeFeature(feature);
                } else {
                    // 获取到多边形的坐标
                    const {
                        geometry: { coordinates },
                    } = feature;
                    console.log(coordinates);
                    // 构造turf多边形对象
                    const polygonTurf = polygon(coordinates);
                    // 遍历我们从服务获取到的点数据进行筛选
                    const resData = dataSource.features.filter((item) => {
                        const {
                            geometry: { coordinates },
                        } = item;
                        // 构造turf point对象
                        const pointTurf = point(coordinates);
                        // 使用booleanPointInPolygon函数，判断点是否在多边形内
                        const isInArea = booleanPointInPolygon(
                            pointTurf,
                            polygonTurf
                        );
                        return isInArea;
                    });
                    console.log(resData);
                    displayData.value = resData;
                    showData.value = resData.length > 0;
                    console.log(showData.value);
                }
            });
        });
    }
};
</script>

<style scoped>
.popover-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
}

.popover-content > i {
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    transition: all 0.3s;
    user-select: none;
}

.popover-content > i:hover {
    background-color: #536976e0;
}
</style>
