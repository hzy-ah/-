<template>
    <div>
        <div id="input-card" class="input-card input-card-extra">
            <h4>推荐路线</h4>
            <div class="input-item">
                <button id="btn" class="btn" @click="startAnimation">开始路线</button>
            </div>
        </div>
        <br>
        <div id="my-panel2"></div>
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
        };
    },
    mounted() {
        // this.map = window.map;


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


        const checkbox5 = document.getElementById('subCheckbox5')
        checkbox5.addEventListener('change', () => {
            if (checkbox5.checked) {
                console.log('状态：', checkbox5.checked)
                // 添加地图点击事件
                this.map.on('click', (event) => {
                    this.endLngLat = [event.lnglat.lng, event.lnglat.lat]; // 设置终点坐标
                    this.buttonText = '已选择终点'; // 更新按钮文字
                    var marker0 = new AMap.Marker({
                        position: event.lnglat,
                        content: '<div style="width: 12px; height: 18px; background-image: url(https://img.icons8.com/ios/452/marker.png); background-size: cover;"></div>', // 设置图标大小
                        offset: new AMap.Pixel(-6, -18), // 调整位置以使图标底部对齐点击点
                    });
                    this.map.add(marker0)
                });
            }
            else {
                if (this.driving) {
                    this.driving.clear();  // 确保 driving 实例存在才调用 clear()
                    
                } else {
                    console.log('driving 实例尚未初始化');
                }
                console.log('状态：', checkbox5.checked)
            }
        })




    },
    methods: {
        startAnimation() {
            if (!this.endLngLat) {
                alert('请先选择终点'); // 如果没有选择终点，提示用户
                return;
            }

            AMap.plugin(["AMap.Walking"], () => {
                this.driving = new AMap.Walking({
                    map: this.map,
                    panel: "my-panel2", // 参数值为你页面定义容器的 id 值
                });
                this.driving.search(this.startLngLat, this.endLngLat, (status, result) => {
                    // console.log(result)
                    if (status === "complete") {
                        console.log(result);
                    } else {
                        console.log("获取驾车数据失败：" + result);
                    }
                });
            })

            console.log('开始动画');
        },
    },
    template:
        `
            <button id="btn" class="btn" @click="startAnimation">{{ buttonText }}</button>
    `
};

</script>
<style scoped>
.input-card-extra {
    display: none;
    position: absolute;
    bottom: auto;

    top: 10px;
    left: 10px;
    width: 12rem;

}

#my-panel2 {
    position: absolute;
    top: 130px;
    left: 10px;
}
</style>