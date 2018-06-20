const SET_MISSION_TAB_INDEX = 'SET_MISSION_TAB_INDEX'
const SET_SMALL_MISSION_TAB_INDEX = 'SET_SMALL_MISSION_TAB_INDEX'

const state = {
  missionTabIndex: 0,
  missionSmallTabIndex: 0 // 0、全部；1、待确认；2、待服务；3、待评价
}

const mutations = {
  [SET_MISSION_TAB_INDEX] (state, flag) {
    state.missionTabIndex = flag
  },
  [SET_SMALL_MISSION_TAB_INDEX] (state, flag) {
    state.missionSmallTabIndex = flag
  }
}

const actions = {
}

const getters = {
  missionTabIndex: state => state.missionTabIndex,
  missionSmallTabIndex: state => state.missionSmallTabIndex
}

export default {
  state,
  mutations,
  actions,
  getters
}
