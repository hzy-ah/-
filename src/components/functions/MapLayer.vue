<template>
    <div class="sub-checkbox-container">
        <!-- 子复选框 -->
        <input type="checkbox" id="subCheckbox1" v-model="isSatelliteChecked" @change="toggleSatelliteLayer">
        <label for="subCheckbox1" class="label-style">卫星图层</label><br>

        <input type="checkbox" id="subCheckbox2" v-model="isRoadNetChecked" @change="toggleRoadNetLayer">
        <label for="subCheckbox2" class="label-style">路网图层</label><br>

        <input type="checkbox" id="subCheckbox3" v-model="isTrafficChecked" @change="toggleTrafficLayer">
        <label for="subCheckbox3" class="label-style">交通图层</label>
    </div>
</template>

<script>
export default {
    props: {
        map: {
            type: Object, // 确保 map 是一个对象（实例）
            required: true // 这个 prop 是必传的
        }
    },
    data() {
        return {
            isSatelliteChecked: false,
            isRoadNetChecked: false,
            isTrafficChecked: false,
            
            satelliteLayer: null,
            roadNetLayer: null,
            trafficLayer: null,
        };
    },
    mounted() {
        // this.map = window.map; // 引用已有的 map 实例
        this.satelliteLayer = new AMap.TileLayer.Satellite();
        this.roadNetLayer = new AMap.TileLayer.RoadNet();
        this.trafficLayer = new AMap.TileLayer.Traffic();
    },
    methods: {
        toggleSatelliteLayer() {
            if (this.isSatelliteChecked) {
                this.map.add(this.satelliteLayer); // 添加卫星图层
            } else {
                this.map.remove(this.satelliteLayer); // 移除卫星图层
            }
        },
        toggleRoadNetLayer() {
            if (this.isRoadNetChecked) {
                this.map.add(this.roadNetLayer); // 添加路网图层
            } else {
                this.map.remove(this.roadNetLayer); // 移除路网图层
            }
        },
        toggleTrafficLayer() {
            if (this.isTrafficChecked) {
                this.map.add(this.trafficLayer); // 添加交通图层
            } else {
                this.map.remove(this.trafficLayer); // 移除交通图层
            }
        },
    },
};
</script>

<style scoped>

.sub-checkbox-container {
    display: none;
    padding-left: 20px;
}

/* .expanded .sub-checkbox-container {
    display: block;
} */



.label-style {
    font-size: 16px;
    margin-bottom: 10px; /* 设置按钮之间的垂直间距 */
    font-family: 'Roboto', sans-serif; /* 设置为 Roboto 字体 */
}
</style>
