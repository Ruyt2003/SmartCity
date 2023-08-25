<template>
    <div class="panel">
        <div class="panel-header">
            <slot name="header"></slot>
        </div>
        <div class="panel-content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup></script>
<style scoped>
.panel{
    max-width: 600px;
    max-height: 700px;
    min-width: 200px;
    min-height: 70px;
    color: #fff;
}

.panel-header{
    width: 100%;
    height: 40px;
    background: url('../assets/chart-item.png');
    background-size: 88% 100%;
    background-repeat:no-repeat;
    background-position: 24%;
    text-align: center;
    margin-bottom: 15px;
    line-height: 40px;
}

.panel-content{
    position: relative;
    min-height: 70px;
    background: #33435367;
    border-radius: 10px;
    padding: 20px;
    backdrop-filter: blur(10px);
}

.panel-content::after{
    content:'';
    position: absolute;
    left: 0;
    top: -6px;
    width: 110px;
    height: 35px;
    background-image: url('../assets/border.png');
    transform: rotate(180deg);
}

.panel-content::before{
    content:'';
    position: absolute;
    right: 0;
    bottom: -6px;
    width: 110px;
    height: 35px;
    background-image: url('../assets/border.png');
}
</style>
