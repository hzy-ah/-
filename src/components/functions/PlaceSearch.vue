<template>
    <div id='place_search' class="placesearch">
        <div class="frosted_right_one">
            <el-input type="text" placeholder="Please input" v-model="inputText" id="input-box" class="placesearch_input"></el-input>
            <el-button size="medium" id="submit-button" class="placesearch_button" @click="searchPlace">Search</el-button>
        </div>
        <div id='my-panel' class="my-panel-class">
        </div>
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
            inputText: '', // 绑定输入框的值
            placeSearch: null, 
            // map: null,
        };
    },
    mounted() {
        // this.map = window.map;
        this.initializePlaceSearch(); 
    },
    methods: {
        initializePlaceSearch() {
            console.log('地图实例map:', this.map); // 检查 map 是否有效
            AMap.plugin(["AMap.PlaceSearch"], () => {
                this.placeSearch = new AMap.PlaceSearch({
                    pageSize: 5,
                    city: "兰州",
                    citylimit: true,
                    map: this.map, 
                    panel: "my-panel",
                    autoFitView: true,
                });
            });
            console.log('地图实例placeSearch:', this.placeSearch);
        },
        searchPlace() {
            console.log('有响应');
            const input_text = document.getElementById('input-box').value;
            if (this.placeSearch) {
                this.placeSearch.search(input_text); 
            } else {
                console.error("placeSearch is not initialized.");
            }
        },
    },
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.15.14/lib/theme-chalk/index.css");

.placesearch {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: auto;
    background-color: #ffffff;
    display: none;
    grid-template-areas: "input" "box";
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 10fr;

}

.frosted_right_one {
    position: relative;
    grid-area: input;
    width: 100%;
    display: grid;
    grid-template-areas: "placesearch_input placesearch_button";
    grid-template-columns: 5fr 1fr;
    grid-template-rows: 1fr;

}

.frosted_right_one .placesearch_input {
    grid-area: placesearch_input;
    height: 100%;
    width: 100%;

}

.frosted_right_one .placesearch_button {
    grid-area: placesearch_button;
    position: relative;
    top:23%;
    padding:3px;
   

}


.my-panel-class {

    /* position:absolute; */
    grid-area: box;
    height: 100%;
    width: 100%;
    overflow: auto;

}

</style>