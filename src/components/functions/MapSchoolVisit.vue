<template>
    <div>
        <div id="input-card2" class="input-card input-card2-extra">
            <h4>学校景点浏览</h4>
            <div class="input-item">
                <button id="btn2" class="btn" @click="startAnimation2">开始动画</button>
            </div>
        </div>
        <br>
        <div id="my-panel3"></div>
    </div>


</template>
<script>
export default {
    props:{
        map:{
            type:Object,
            required:true,
        }
    },
    data() {
        return {
            // map: null,
            driving: null,
            startLngLat: null,
            endLngLat: null,
            buttonText: '选择终点', // 按钮文字初始值
            visits: null,
            opts: null,
            marker1: null,
            passedPolyline: null,
            icon: null,
        };
    },
    mounted() {
        // this.map = window.map;
        AMap.plugin(['AMap.GeoJSON'], () => {
            this.visits = new AMap.GeoJSON({
                GeoJSON: null,
            })
        });


        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.startLngLat = [position.coords.longitude, position.coords.latitude]; // 起始点坐标
            },
            (error) => {
                console.error('定位错误:', error);
            },
            {
                enableHighAccuracy: true,  // 尝试提升定位精度
                timeout: 10000,            // 超时设置
                maximumAge: 0              // 不使用缓存
            }
        );

        this.endLngLat = null; // 初始值为 null

        this.opts = {
            waypoints: []
        }


        // const checkbox6 = document.getElementById('subCheckbox6')

        // 添加地图点击事件
        const checkbox6 = document.getElementById('subCheckbox6')
        checkbox6.addEventListener('change', () => {
            if (checkbox6.checked) {
                console.log('状态：', checkbox6.checked)
                // 添加地图点击事件
                this.map.on('click', (event) => {
                    // this.endLngLat = [event.lnglat.lng, event.lnglat.lat]; // 设置终点坐标
                    // this.buttonText = '已选择终点'; // 更新按钮文字
                    var marker0 = new AMap.Marker({
                        position: event.lnglat,
                        content: '<div style="width: 12px; height: 18px; background-image: url(https://img.icons8.com/ios/452/marker.png); background-size: cover;"></div>', // 设置图标大小
                        offset: new AMap.Pixel(-6, -18), // 调整位置以使图标底部对齐点击点
                    });
                    this.map.add(marker0)
                    this.visits.addOverlay(marker0)
                });
            }
            else {
                if (this.driving) {
                    this.driving.clear();  // 确保 driving 实例存在才调用 clear()
                    if (this.marker1) {
                        this.marker1.stopMove();
                        setTimeout(() => {
                            if (this.marker1) { // 检查是否仍然存在
                                this.map.remove(this.marker1);
                            }
                        }, 50);
                        this.marker1 = null;
                    }
                    if (this.passedPolyline) {
                        this.passedPolyline.remove(); // 移除线段
                        this.passedPolyline = null;    // 清除 Polyline 引用
                    }
                    if (this.icon) {
                        this.icon = null; // 清除引用
                    }


                } else {
                    console.log('driving 实例尚未初始化');
                }
                console.log('状态：', checkbox6.checked)
            }
        })
    },
    methods: {
        startAnimation2() {
            if (this.visits.GeoJSON) {
                alert('请先选择浏览点'); // 如果没有选择终点，提示用户
                return;
            }

            this.visits.eachOverlay((item) => {
                this.opts.waypoints.push(item.getPosition())
            })



            AMap.plugin(["AMap.Driving", "AMap.MoveAnimation"], () => {
                this.driving = new AMap.Driving({
                    map: this.map,
                    panel: "my-panel3", // 参数值为你页面定义容器的 id 值
                });
                console.log(this.startLngLat)
                console.log(this.opts)
                this.driving.search(this.startLngLat, this.startLngLat, this.opts, (status, result) => {
                    if (status === "complete") {
                        console.log(result);
                        var lineArr = [];
                        result.routes[0].steps.forEach((item) => {
                            lineArr.push(...item.path)
                        })
                        this.icon = new AMap.Icon({
                            size: new AMap.Size(52, 26), // 设置图标大小
                            image: require('../../icon/people.png').default, // 图标路径
                            imageSize: new AMap.Size(52, 26) // 图标实际显示大小

                        });

                        this.marker1 = new AMap.Marker({
                            map: this.map,
                            position: this.startLngLat,
                            icon: this.icon,
                            offset: new AMap.Pixel(-26, -13),
                            autoRotation: true,

                        })
                        this.passedPolyline = new AMap.Polyline({
                            map: this.map,
                            strokeColor: '#AF5',
                            strokeWeight: 6,
                        });
                        this.marker1.on('moving', (e) => {
                            this.passedPolyline.setPath(e.passedPath)
                        })
                        this.map.setFitView()
                        this.marker1.moveAlong(lineArr, {
                            duration: 500,
                            autoRotation: true,
                        });

                    } else {
                        console.log("获取驾车数据失败：" + result);
                    }
                });
            })


        },
    },
    template: `
        <div>
            <button id="btn" class="btn" @click="startAnimation">{{ buttonText }}</button>
        </div>
    `
};

</script>
<style scoped>
.input-card2-extra {
    display: none;
    position: absolute;
    bottom: auto;

    top: 10px;
    left: 10px;
    width: 12rem;
}

#my-panel3 {
    position: absolute;
    top: 130px;
    left: 10px;
    height: 400px;
    overflow: auto;
}
</style>