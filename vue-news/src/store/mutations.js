const GET_THEME_ACTIVE_ID = 'GET_THEME_ACTIVE_ID'
const LOADING_HOME = 'LOADING_HOME'
const SET_BANNER = 'SET_BANNER'
const SET_EDITOR = 'SET_EDITOR'
const SET_TITLE = 'SET_TITLE'
const SET_HOT_THEME = 'SET_HOT_THEME'
const SET_HOT_DATE = 'SET_HOT_DATE'
export default {
  [GET_THEME_ACTIVE_ID] (state, payload) {
    state.activethemeid = payload.activethemeid
  },
  [LOADING_HOME] (state, payload) {
    state.load = payload.load
  },
  [SET_BANNER] (state, payload) {
    state.banner = payload.banner
  },
  [SET_EDITOR] (state, payload) {
    state.editor = payload.editor
  },
  [SET_TITLE] (state, payload) {
    state.title = payload.title
  },
  [SET_HOT_THEME] (state, payload) {
    state.hotthemedata = payload.hotthemedata
  },
  [SET_HOT_DATE] (state, payload) {
    state.hotdate = payload.hotdate
  }
}

