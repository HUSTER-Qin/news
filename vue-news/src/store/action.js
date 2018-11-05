
export default {
  activetheme ({ commit, state }, activethemeid) {
    commit('GET_THEME_ACTIVE_ID', {activethemeid})
  },
  setLoad ({ commit, state }, load) {
    commit('LOADING_HOME', {load})
  },
  setbanner ({ commit, state }, banner) {
    commit('SET_BANNER', {banner})
  },
  seteditor ({ commit, state }, editor) {
    commit('SET_EDITOR', {editor})
  },
  settitle ({ commit, state }, title) {
    commit('SET_TITLE', {title})
  },
  sethotthemedata ({ commit, state }, hotthemedata) {
    commit('SET_HOT_THEME', {hotthemedata})
  },
  sethottdate ({ commit, state }, hotdate) {
    commit('SET_HOT_DATE', {hotdate})
  }

}
