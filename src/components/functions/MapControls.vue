<template>
    <div class="sub-button-container">
        <!-- 子按钮 -->
        <el-checkbox v-model="isEnabled" @change="handleCheckboxChange" class="label-style">启用打卡</el-checkbox><br>
        <el-button plain id="subButton1" class="label-style" @click="handleSubOption1">清理打卡点</el-button><br>
        <el-button plain id="subButton2" class="label-style" @click="handleSubOption2">清理localStorage</el-button><br>
        <!-- <button id="subButton1" class="label-style" @click="handleSubOption1">清理Marker图层</button><br> -->
        <!-- <button id="subButton2" class="label-style" @click="handleSubOption2">清理localStorage</button><br> -->
        <!-- <button id="subButton3" class="label-style" @click="handleSubOption3">3</button> -->
    </div>
</template>

<script>
export default {
    props:{
        map:{
            type:Object,
            required: true,
        }
    },
    data() {
        return {
            isEnabled: false, // 控制复选框状态
            // map: null,
            geojson: null,
            markersAdded: false, // 新增状态

        };
    },
    mounted() {
        // this.map = window.map; // 引用已有的 map 实例
        // this.geojson = window.geojson


    },
    methods: {
        addOldMarker() {
            AMap.plugin(['AMap.GeoJSON'], () => {
                this.geojson = new AMap.GeoJSON({
                    GeoJSON: null,
                })
            });

            if (JSON.stringify(getData()) != '[]') {
                console.log(getData())
                this.geojson.importData(getData())
                this.geojson.eachOverlay((item) => {
                    item.on('click', (e) => {
                        console.log(e.lnglat, "旧的事件点击")
                        const ext = item.getExtData()
                        const click = ++ext._geoJsonProperties.click
                        ext._geoJsonProperties.click = click
                        saveData(this.geojson.toGeoJSON());
                        console.log("点击次数", click)

                        var infowindow = new AMap.InfoWindow({
                            anchor: 'top-center',
                            content: `<div>打卡了${click}</div>`
                        })
                        infowindow.open(this.map, item.getPosition())
                    })
                })
            }

            this.map.add(this.geojson)
        },

        addNewMarker() {
            this.map.on('click', (e) => {

                console.log('返回', this.isEnabled)
                if (!this.isEnabled) return;
                var marker0 = new AMap.Marker({
                    position: e.lnglat,
                    extData: {
                        _geoJsonProperties: {
                            gid: this.geojson.getOverlays().length + 1,
                            click: 0,
                        }
                    }

                });

                this.geojson.addOverlay(marker0);
                saveData(this.geojson.toGeoJSON());
                marker0.on('click', (e) => {
                    console.log(e.lnglat, "新的事件点击了");
                    const ext = marker0.getExtData()
                    const click = ++ext._geoJsonProperties.click
                    ext._geoJsonProperties.click = click
                    console.log("点击次数", click)
                    saveData(this.geojson.toGeoJSON());


                    var infowindow = new AMap.InfoWindow({
                        anchor: 'top-center',
                        content: `<div>打卡了${click}</div>`
                    })
                    infowindow.open(this.map, marker0.getPosition())

                })
            })
        },


        handleSubOption1() {
            if (this.isEnabled) {
                console.log('1', this.isEnabled)
                this.geojson.clearOverlays();
            }


        },

        handleSubOption2() {
            console.log('2', this.isEnabled)
            if (this.isEnabled) {
                localStorage.setItem('markerGeojson', JSON.stringify([]));
                this.geojson.clearOverlays();
            }


        },
        handleCheckboxChange() {
            // this.isEnabled = !this.isEnabled;
            console.log('Checkbox is now', this.isEnabled);

            if (this.isEnabled) {
                if (!this.markersAdded) {
                    this.addOldMarker();
                    this.addNewMarker();
                    this.markersAdded = true; // 标记已添加
                }
            } else {
                this.clearMarkers(); // 清除标记
                this.markersAdded = false; // 重置标记状态
            }
        },

        clearMarkers() {
            // 清除标记的逻辑
            this.geojson.clearOverlays();
        },

    },
};
</script>

<style scoped>
/* 隐藏子复选框的容器 */
.sub-button-container {
    display: none;
    padding-left: 20px;
    /* 子复选框缩进 */
}

/* 控制显示子复选框 */
.expanded .sub-button-container {
    display: block;
}



.label-style {
    font-size: 16px;
    margin-bottom: 10px;
    /* 设置按钮之间的垂直间距 */
    font-family: 'Roboto', sans-serif;
    /* 设置为 Roboto 字体 */
    /* 设置字体大小为 18px */
    width: 160px;
}
</style>
