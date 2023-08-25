<template>
    <el-popover
        placement="top"
        width="180"
        trigger="hover"
        popper-style="background-color: #53697670;color: #fff;backdrop-filter: blur(10px);"
    >
        <template #reference>
            <slot></slot>
        </template>
        <div class="popover-w">
            <i
                v-for="item in tools"
                :class="computeClass(item)"
                @click="activeTool(item)"
            ></i>
        </div>
    </el-popover>
</template>

<script setup>
import {
    ref,
    computed,
    inject,
    onMounted,
    defineEmits,
    defineExpose,
} from 'vue';
import { DrawPolygon, DrawRect, DrawCircle, DrawLine } from '@antv/l7-draw';
const { scene, map } = inject('$scene_map');
const tools = ref([
    'line',
    'drawPolygonTool',
    'drawRectTool',
    'drawCircleTool',
    'delete',
]);
const drawTools = {};

const emit = defineEmits(['startMeasure']);
const computeClass = computed(() => (item) => {
    const res = {
        iconfont: true,
        'query-item': true,
    };
    res[`icon-${item}`] = true;
    return res;
});

onMounted(() => {
    initTool();
});

// 初始化工具
const initTool = () => {
    tools.value.forEach((tool) => {
        switch (tool) {
            case 'drawPolygonTool':
                drawTools[tool] = new DrawPolygon(scene, {
                    //展示面积
                    areaOptions: {},
                });
                break;
            case 'drawRectTool':
                drawTools[tool] = new DrawRect(scene, {
                    //展示面积
                    areaOptions: {},
                });
                break;
            case 'drawCircleTool':
                drawTools[tool] = new DrawCircle(scene, {
                    //展示面积
                    areaOptions: {},
                });
                break;
            case 'line':
                drawTools[tool] = new DrawLine(scene, {
                    distanceOptions: {
                        showTotalDistance: false,
                        showDashDistance: true,
                        format: (meters) => {
                            if (meters >= 1000) {
                                return +(meters / 1000).toFixed(2) + 'km';
                            } else {
                                return +meters.toFixed(2) + 'm';
                            }
                        },
                    },
                });
                break;
            default:
                break;
        }
    });
};

const stopDrawing = () => {
    // 清除所有绘制工具
    for (let key in drawTools) {
        const tool = drawTools[key];
        tool.clear();
        tool.disable();
        tool.removeActiveFeature();
    }
};

const activeTool = (type) => {
    // 先清除
    stopDrawing();
    if (type === 'delete') {
        return;
    }
    const activeTool = drawTools[type];
    if (activeTool) {
        emit('startMeasure');
        activeTool.enable();
    }
};

const closeAll = () => {
    stopDrawing();
};

defineExpose({
    closeAll,
});
</script>

<style scoped>
.popover-w {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
}

.popover-w > i {
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    transition: all 0.3s;
    user-select: none;
}

.popover-w > i:hover {
    background-color: #536976e0;
}
</style>
