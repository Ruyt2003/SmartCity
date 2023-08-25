<template>
    <el-popover
        placement="top"
        width="150"
        trigger="hover"
        popper-style="background-color: #53697670;color: #fff;backdrop-filter: blur(10px);"
    >
        <!-- popover的内容 -->
        <div class="popover-content">
            <div class="item" @click="showBusLine" style="margin-bottom: 3px;">公交线路查询</div>
            <div class="item" @click="showParking" style="margin-bottom: 3px;">停车场信息</div>
            <div class="item" @click="dialogVisible = true">政府机关信息</div>
        </div>
        <!-- 让外部组件通过reference具名插槽，安装触发器 -->
        <template #reference>
            <slot></slot>
        </template>
    </el-popover>
    <!-- 相关政府机关信息窗口 -->
    <el-dialog
        title="政府机关信息"
        v-model="dialogVisible"
        width="55%"
        :append-to-body="true"
    >
        <span>相关政府机关信息</span>
        <pre>  </pre>
        <test/>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false"
                    >我已知晓</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import test from './cards/test.vue'


const dialogVisible = ref(false);

const showBusLine = () => {
    // 打开子窗口
    window.open('https://ruyt2003.github.io/SmartCity/busLine.html', 'newwindow', 'height=500px, width=800px, top=190px, left=443px, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
};

const showParking = () => {
    // 打开子窗口
    window.open('https://ruyt2003.github.io/SmartCity/parkingPoint.html', 'newwindow', 'height=500px, width=800px, top=190px, left=443px, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
};
</script>

<style scoped>
.popover-content {
    width: 125px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.item {
    cursor: pointer;
    border-radius: 5px;
    width: 120px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    transition: all 0.3s;
    user-select: none;
}

.item:hover {
    background-color: #536976e0;
}


</style>
