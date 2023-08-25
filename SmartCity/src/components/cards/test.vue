<template>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        @row-dblclick="clickRow"
    >
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="Lat" label="纬度" width="120" />
        <el-table-column prop="Lng" label="经度" width="120" />
        <el-table-column prop="tel" label="电话" width="180" />
    </el-table>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref, inject } from 'vue';
const { scene, map } = inject('$scene_map');
import { Marker, Popup } from '@antv/l7';

const tableData = [
    {
        name: '武汉市财政局',
        address: '湖北省武汉市江岸区解放大道1499号',
        Lat: '30.599059',
        Lng: '114.297577',
        tel: '（027）85736965',
    },
    {
        name: '武汉市公安局',
        address: '湖北省武汉市江汉区发展大道188号',
        Lat: '30.620543',
        Lng: '114.264848',
        tel: '（027）85874400',
    },
    {
        name: '武汉市民政局',
        address: '湖北省武汉市江汉岸区高雄路105号',
        Lat: '30.605546',
        Lng: '114.292847',
        tel: '（027）85736086',
    },
    {
        name: '武汉工商局',
        address: '湖北省武汉市江汉区香港路259号',
        Lat: '30.614953',
        Lng: '114.284306',
        tel: '（027）12315',
    },
    {
        name: '武汉市教育局',
        address: '湖北省武汉市东西湖区金银潭大道5号',
        Lat: '30.660135',
        Lng: '114.250916',
        tel: '（027）65608407',
    },
    {
        name: '武汉市劳动就业管理局',
        address: '湖北省武汉市江汉区新华路25号伟业大厦3楼',
        Lat: '30.596096',
        Lng: '114.28054',
        tel: '（027）85797494',
    },
    {
        name: '武汉市人力资源和社会保障局',
        address: '湖北省武汉市江岸区金桥大道111号',
        Lat: '30.661568',
        Lng: '114.301399',
        tel: '（027）12333',
    },
    {
        name: '武汉市税务局',
        address: '湖北省湖北省武汉市江岸区高雄路180号',
        Lat: '30.609788',
        Lng: '114.266777',
        tel: '（027）12366',
    },
];

// 点击行跳转至行中的经纬度
const clickRow = (row) => {
    console.log(row);
    const { Lat, Lng, name } = row;
    map.flyTo({
        center: [Lng, Lat],
        zoom: 15,
        speed: 0.8,
        curve: 1,
    });

    // 添加popup
    const popup = new Popup({
        offsets: [0, 40],
        closeButton: false,
    })
        .setLnglat([Lng, Lat])
        .setHTML(
            `<div style="color: #000; font-size: 14px; font-weight: bold;">${name}</div>`
        );

    // 添加标记
    const marker = new Marker({
        color: '#f47784',
    })
        .setLnglat([Lng, Lat])
        .setPopup(popup);
    scene.addMarker(marker);

    // 右键marker移除marker
    marker.on('contextmenu', () => {
        marker.remove(marker);
    });
};
</script>
<style scoped></style>
