<template>
    <div class="grid_container">
        <div class="frosted_left">
            <div class="checkbox-group">
                <!-- <input type="checkbox" id="mainCheckbox" onclick="toggleSubCheckboxes(this)"> -->
                <input type="checkbox" id="mapLayerCheckbox" v-model="isMapLayerChecked">
                <label for="mapLayerCheckbox" class="label-parent-style">图层添加</label>
                <Layer v-if="map" :map="map"></Layer>
            </div>

            <div class="checkbox-group">
                <input type="checkbox" id="mapControlCheckbox" v-model="isMapControlChecked">
                <label for="mapControlCheckbox" class="label-parent-style">图层控制</label>

                <MapControls v-if="map" :map="map"></MapControls>
            </div>

            <div class="checkbox-group">
                <input type="checkbox" id="mapFunctionCheckbox" v-model="isMapFunctionChecked">
                <label for="mapFunctionCheckbox" class="label-parent-style">功能</label>

                <MapFunction v-if="map" :map="map"></MapFunction>
            </div>
        </div>


        <div class="frosted_middle">
            <div id="container"></div>
        </div>


        <div class="frosted_right">
            <PlaceSearch v-if="map" :map="map"></PlaceSearch>
            <MapRoadGet v-if="map" :map="map"></MapRoadGet>
            <MapSchoolVisit v-if="map" :map="map"></MapSchoolVisit>
        </div>

    </div>
</template>
<script>
import Layer from './functions/MapLayer.vue';// 引入你的 Layer 组件
import MapControls from './functions/MapControls.vue';
import MapFunction from './functions/MapFunction.vue';
import PlaceSearch from './functions/PlaceSearch.vue';
import MapRoadGet from './functions/MapRoadGet.vue';
import MapSchoolVisit from './functions/MapSchoolVisit.vue'

export default {
    name: 'FrostedContainerIndex.vue',
    data() {
        return {
            center_point: null,
            map: null,
            isMapLayerChecked: false,
            isMapControlChecked: false,
            isMapFunctionChecked: false,
        }
    },
    provide() {
        return {
            getMapLayerChecked: () => this.isMapLayerChecked,
            getMapControlChecked: () => this.isMapControlChecked,
            getMapFunctionChecked: () => this.isMapFunctionChecked,
        };
    },
    components: {
        Layer,
        MapControls,
        MapFunction,
        PlaceSearch,
        MapRoadGet,
        MapSchoolVisit,
    },
    mounted() {
        window.toggleSubCheckboxes = this.toggleSubCheckboxes;
        console.log('地图实例父:', this.map); // 检查 map 是否有效
        // 初始化地图
        this.center_point = [103.863, 36.0455];

        this.map = new AMap.Map("container", {
            viewMode: '3D', //默认使用 2D 模式
            zoom: 15.9, //地图级别
            rotateEnable: true,  // 启用旋转
            center: this.center_point, //地图中心点
            pitch: 30,
            mapStyle: "amap://styles/normal",
        });
        this.map.setRotation(-16);

        // 添加基本控件
        this.addBasicPlugins();
    },
    watch: {
        isMapLayerChecked(newVal, oldVal) {
            const element = document.querySelector('.sub-checkbox-container');
            if (newVal) {
                element.style.display = 'block';
                console.log('block')
            }
            else{
                element.style.display = 'none';
                console.log('none')
            }
        },
        isMapControlChecked(newVal, oldVal) {
            const element = document.querySelector('.sub-button-container');
            if (newVal) {
                element.style.display = 'block';
                console.log('block')
            }
            else{
                element.style.display = 'none';
                console.log('none')
            }
        },
        isMapFunctionChecked(newVal, oldVal) {
            const element = document.querySelector('.sub-checkbox2-container');
            if (newVal) {
                element.style.display = 'block';
                console.log('block')
            }
            else{
                element.style.display = 'none';
                console.log('none')
            }
        }
    },
    methods: {
        addBasicPlugins() {
            AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation',
                'AMap.MapType', 'AMap.LineSearch', 'AMap.Weather', 'AMap.GeoJSON'], () => {
                    var toolbar = new AMap.ToolBar(); //缩放工具条实例化
                    var scale = new AMap.Scale();
                    // var geolocation = new AMap.Geolocation();
                    var maptype = new AMap.MapType();
                    // var linesearch = new AMap.LineSearch();

                    this.map.addControl(toolbar); //添加控件
                    this.map.addControl(scale);
                    // map.addControl(geolocation);
                    this.map.addControl(maptype)

                });
        },
        // toggleSubCheckboxes(mainCheckbox) {
        //     const checkboxGroup = mainCheckbox.parentElement;
        //     checkboxGroup.classList.toggle('expanded');
        //     console.log(checkboxGroup)
        // }


    }
}
</script>
<style scoped>
.grid_container {
    display: grid;
    grid-template-areas:
        "frosted_left frosted_middle frosted_right";
    grid-template-columns: 1fr 4fr 2fr;
    grid-template-rows: 1fr;
    width: 100%;
    height: 600px;
    background-color: #f7f7f7;
    color: black;
}


.frosted_left {
    height: 100%;
    width: calc(100% - 10px);
    grid-area: frosted_left;
    background-color: white;
    color: black;
    margin: 5px;
    padding: 8px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.frosted_middle {
    height: 100%;
    width: calc(100% - 10px);
    grid-area: frosted_middle;
    background-color: white;
    color: black;
    margin: 5px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#container {
    border-radius: 5px;
}

.frosted_right {
    position: relative;
    height: 100%;
    width: calc(100% - 10px);
    /* 减去外边距 */
    grid-area: frosted_right;
    background-color: white;
    color: black;
    /* 字体颜色 */
    margin: 5px;
    /* 设置所有方向的外边距为 10px */


    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#container {
    width: 100%;
    /* 确保地图容器宽度占满父容器 */
    height: 100%;
    /* 确保地图容器高度占满父容器 */
}

.checkbox-group {
    margin-bottom: 10px;
}

.label-parent-style {
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
}
</style>