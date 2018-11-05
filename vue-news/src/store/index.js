import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activethemeid: 0,
    load: true,
    banner: [],
    editor: null,
    hotthemedata: null,
    hotdate: null,
    title: '首页'
  },
  actions,
  mutations

})
