const SET_MISSION_TAB_INDEX = 'SET_MISSION_TAB_INDEX'
const SET_SMALL_MISSION_TAB_INDEX = 'SET_SMALL_MISSION_TAB_INDEX'
const SET_COMPLAINT_TAB_INDEX = 'SET_COMPLAINT_TAB_INDEX'

const state = {
  missionTabIndex: 0, // 任务列表第一级tab
  missionSmallTabIndex: 0, // 任务列表第二级tab：0、全部；1、待确认；2、待服务；3、待评价
  complaintTabIndex: 0
}

const mutations = {
  [SET_MISSION_TAB_INDEX] (state, flag) {
    state.missionTabIndex = flag
  },
  [SET_SMALL_MISSION_TAB_INDEX] (state, flag) {
    state.missionSmallTabIndex = flag
  },
  [SET_COMPLAINT_TAB_INDEX] (state, flag) {
    state.complaintTabIndex = flag
  }
}

const actions = {
}

const getters = {
  missionTabIndex: state => state.missionTabIndex,
  missionSmallTabIndex: state => state.missionSmallTabIndex,
  complaintTabIndex: state => state.complaintTabIndex
}

export default {
  state,
  mutations,
  actions,
  getters
}
