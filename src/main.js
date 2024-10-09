// import { createApp } from 'vue';


// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// // 创建 Vue 应用实例

// const appLayer = createApp(Layer); // 直接用 Layer 组件创建应用
// const appMapControls = createApp(MapControls);
// const appMapFunction = createApp(MapFunction);
// const appPlaceSearch = createApp(PlaceSearch);
// const appMapRoadGet = createApp(MapRoadGet);
// const appMapSchoolVisit = createApp(MapSchoolVisit);


// appPlaceSearch.use(ElementPlus)
// appMapControls.use(ElementPlus)


// // 挂载到 DOM 元素
// appLayer.mount('#layer');
// appMapControls.mount('#mapcontrols')
// appMapFunction.mount('#mapfunction')
// appPlaceSearch.mount('#mapplacesearch')
// appMapRoadGet.mount('#maproadget')
// appMapSchoolVisit.mount('#mapschoolvisit')


import { createApp } from 'vue';
import App from './App.vue'; // 引入您的 App 组件
import ElementPlus from 'element-plus'; // 如果您需要使用 ElementPlus
import 'element-plus/dist/index.css'; // ElementPlus 的样式文件
import store from '../store'; // 导入 store

// 创建 Vue 应用实例
const app = createApp(App);

// 使用 ElementPlus
app.use(ElementPlus);
app.use(store); // 使用 Vuex

// 挂载到 DOM 元素
app.mount('#app'); // 确保在 index.html 中有 <div id="app"></div>
