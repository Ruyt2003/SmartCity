<template>
    <header class="header">
        <div class="timer">
            <!-- 填充当前真实的日期和时间 -->
            <p id="date">{{ currentDate }}</p>
            <p id="time">{{ currentTime }}</p>
        </div>
        <span class="title">武汉市综合交通管理系统</span>
        <article>
            <div class="text">
                <p v-for="(item, index) in news" :key="index">{{ item }}</p>
            </div>
        </article>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const news = ref([
    '武汉长江二桥拥堵，车辆排行数十公里。',
    '武汉市区道路施工，交通管制措施加强。',
    '武汉地铁线路调整，部分站点临时关闭。',
    '东湖高新区交通事故频发，需注意交通安全。',
    '武汉市公交班次减少，市民出行不便。',
    '武汉火车站附近道路改造，交通流量大。',
    '武汉市区停车位紧张，停车费上涨。',
    '武汉长途汽车站旅客滞留，交通拥堵严重。',
    '武汉市区道路积水，交通受阻。',
]);
const text = ref(null);
const pHeight = ref(0);
const index = ref(0);

const currentDate = ref('');
const currentTime = ref('');

const updateTime = () => {
    const date = new Date();
    currentDate.value = date.toLocaleDateString();
    // 时间只显示到分
    currentTime.value = date.toLocaleTimeString().slice(0, -3);
};

onMounted(() => {
    // 获取当前日期和时间
    updateTime();
    // 每秒更新一次时间
    setInterval(updateTime, 1000);

    text.value = document.querySelector('.text');
      pHeight.value = text.value.querySelector('p').offsetHeight;

      setInterval(() => {
        index.value++;
        if (index.value >= news.value.length) {
          index.value = 0;
        }
        text.value.style.transition = 'all 1s';
        text.value.style.top = -index.value * pHeight.value + 'px';
      }, 6000);
});
</script>

<style>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 10vh;
    background-image: url('../assets/header.png');
    background-size: cover;
    background-position: center center;
    z-index: 2;
    text-align: center;
    line-height: 82px;
    font-size: 30px;
    color: #fff;
    font-family: clockicons, sans-serif, Georgia, Times, 'Times New Roman',
        serif;
    user-select: none;
}

.title {
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
}

.timer {
    font-size: 20px;
    position: absolute;
    left: 90px;
    top: 37px;
    display: flex;
    flex-direction: column;
    line-height: 0;
    user-select: none;
}

.timer p:last-child {
    margin-top: 30px;
}

article {
    width: 200px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0) 000;
    font-size: 16px;
    overflow: hidden;
    position: relative;
    top: 28px;
    left: 1455px;
}
.text {
    position: absolute;
    top: 0;
}
article p {
    line-height: 25px;
    color: #ffffff;
    text-align: left;
}
</style>
