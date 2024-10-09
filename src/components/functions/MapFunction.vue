<template>
    <div class="sub-checkbox2-container">
        <!-- 子复选框 -->
        <input type="checkbox" id="subCheckbox4" v-model="isChecked" @change="togglePlacesearch">
        <label for="subCheckbox4" class="label-style">地点搜索</label><br>
        <input type="checkbox" id="subCheckbox5" v-model="isChecked2" @change="togglePlacesearch2">
        <label for="subCheckbox5" class="label-style">目标路线</label><br>
        <input type="checkbox" id="subCheckbox6" v-model="isChecked3" @change="togglePlacesearch3">
        <label for="subCheckbox6" class="label-style">学校游览</label><br>

    </div>
</template>

<script>
export default {
    props:{

    },
    data() {
        return {
            isChecked: false, // 控制复选框状态
            isChecked2: false,
            isChecked3: false,
        };
    },
    methods: {
        togglePlacesearch() {
            const placesearch = document.getElementById('place_search'); // 使用 id 选择器
            if (this.isChecked) {
                placesearch.style.display = 'grid'; // 显示
            } else {
                placesearch.style.display = 'none'; // 隐藏
            }
        },

        togglePlacesearch2() {
            const placesearch = document.getElementById('input-card'); // 使用 id 选择器
            if (this.isChecked2) {
                placesearch.style.display = 'block'; // 显示
            } else {
                placesearch.style.display = 'none'; // 隐藏
            }
        },

        togglePlacesearch3() {
            console.log('ssssssssssssss')
            const placesearch = document.getElementById('input-card2'); // 使用 id 选择器
            if (this.isChecked3) {
                placesearch.style.display = 'block'; // 显示
            } else {
                placesearch.style.display = 'none'; // 隐藏
            }
        },
    },
};
</script>

<style scoped>
.sub-checkbox2-container {
    display: none;
    padding-left: 20px;
    /* 子复选框缩进 */
}

/* .expanded .sub-checkbox2-container {
    display: block;
} */

.label-style {
    font-size: 16px;
    margin-bottom: 10px;
    /* 设置按钮之间的垂直间距 */
    font-family: 'Roboto', sans-serif;
    /* 设置为 Roboto 字体 */
}
</style>
