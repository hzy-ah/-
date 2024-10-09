// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    map: null // 这里存储地图对象
  },
  mutations: {
    setMap(state, mapInstance) {
      state.map = mapInstance; // 修改 map 的状态
    }
  },
  actions: {
    initializeMap({ commit }, mapInstance) {
      // 异步操作，如在地图初始化后提交 mutation
      commit('setMap', mapInstance);
    }
  },
  getters: {
    getMap: (state) => {
      return state.map; // 获取 map 的状态
    }
  }
});

export default store;
