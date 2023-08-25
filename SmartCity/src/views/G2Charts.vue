<template>
    <div class="g2-left" style="margin-top: 10px">
        <Panel style="margin-bottom: 40px">
            <template v-slot:header> 武汉各区今日出行人口统计 </template>
            <ColumnChart v-bind="odpConfig" :data="odpData"></ColumnChart>
        </Panel>
        <Panel>
            <template v-slot:header> 武汉逐月平均拥堵指数 </template>
            <LineChart v-bind="peoConfig" :data="peoData"></LineChart>
        </Panel>
    </div>
    <div class="g2-right" style="margin-top: 10px">
        <Panel style="margin-bottom: 20px">
            <template v-slot:header> 武汉市民出行方式统计 </template>
            <PieChart v-bind="popConfig" :data="popData"></PieChart>
        </Panel>
        <Panel style="margin-bottom: 20px">
            <template v-slot:header> 武汉交通便捷程度 </template>
            <div class="bullet-chart-container">
                <div ref="chartContainer"></div>
            </div>
        </Panel>
        <Panel>
            <template v-slot:header> 武汉公共交通设施 </template>
            <div class="transmit">
                <div class="transmit-item" v-for="item in transmit">
                    <p>
                        <strong>{{ item.title }}</strong>
                        <span>{{ item.amount }}{{ item.unit }}</span>
                    </p>
                    <img :src="item.imgSrc" alt="" />
                </div>
            </div>
        </Panel>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Panel from '../components/Panel.vue';
// 引入图表
import { ColumnChart, LineChart, PieChart } from '@opd/g2plot-vue';
import { Bullet } from '@antv/g2plot';
// 引入图表配置和数据
import { useOutdoorPop } from '../Hooks/outdoorPop';
const { config: odpConfig, data: odpData } = useOutdoorPop();
import { usePeople } from '../Hooks/people';
const { config: peoConfig, data: peoData } = usePeople();
import { usePopulation } from '../Hooks/population';
const { config: popConfig, data: popData } = usePopulation();

// 构造公共交通数据
const transmit = [
    {
        title: '地铁',
        unit: '公里',
        amount: 435,
        imgSrc: '/src/assets/icon/地铁.png',
    },
    {
        title: '公交车',
        unit: '辆',
        amount: 9588,
        imgSrc: '/src/assets/icon/公交车.png',
    },
    {
        title: '出租车',
        unit: '万辆',
        amount: 3.5,
        imgSrc: '/src/assets/icon/出租车.png',
    },
];


//构建子弹图
const chartContainer = ref(null);
onMounted(() => {
    renderBulletChart(chartContainer.value);
});
const renderBulletChart = (container) => {
    const data = [
        {
            title: '道路网密度',
            ranges: [5.5, 8, 10],
            measures: [6.5],
            target: 9,
        },
    ];
    const bulletChart = new Bullet(container, {
        data,
        height: 98,
        measureField: 'measures',
        rangeField: 'ranges',
        targetField: 'target',
        xField: 'title',
        color: {
            range: ['#FFbcb8', '#FFe0b0', '#bfeec8'],
            measure: '#5B8FF9',
            target: '#39a3f4',
        },
        bulletStyle: {
            range: {
                fillOpacity: 0.85,
            },
        },
        label: {
            measure: {
                position: 'middle',
                style: {
                    fill: '#fff',
                },
            },
        },
        xAxis: {
            line: null,
            label: {
                style: {
                    fill: '#FFFFFF',
                },
            },
        },
        yAxis: false,
        // 自定义 legend
        legend: {
            custom: true,
            position: 'bottom',
            items: [
                {
                    value: '较低水平',
                    name: '较低水平',
                    marker: {
                        symbol: 'square',
                        style: { fill: '#FFbcb8', r: 5 },
                    },
                },
                {
                    value: '中等水平',
                    name: '中等水平',
                    marker: {
                        symbol: 'square',
                        style: { fill: '#FFe0b0', r: 5 },
                    },
                },
                {
                    value: '较高水平',
                    name: '较高水平',
                    marker: {
                        symbol: 'square',
                        style: { fill: '#bfeec8', r: 5 },
                    },
                },
                {
                    value: '实际值',
                    name: '实际值',
                    marker: {
                        symbol: 'square',
                        style: { fill: '#5B8FF9', r: 5 },
                    },
                },
                {
                    value: '目标值',
                    name: '目标值',
                    marker: {
                        symbol: 'line',
                        style: { stroke: '#39a3f4', r: 5 },
                    },
                },
            ],
            itemName: {
                style: {
                    fill: '#fff',
                },
            },
        },
    });

    bulletChart.render();
    return {
        chartContainer,
    };
};
</script>
<style scoped>
.g2-left {
    position: absolute;
    left: 1vw;
    top: 100px;
    width: 25vw;
}

.g2-right {
    width: 25vw;
    position: absolute;
    left: 74vw;
    top: 100px;
}

.transmit {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.transmit-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
    height: 70px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.transmit-item > p > span {
    margin-left: 3px;
}
.transmit-item > img {
    width: 35px;
    height: 35px;
}

</style>
