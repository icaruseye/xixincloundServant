import api from '@/api/index'
const SET_MISSION_TAB_INDEX = 'SET_MISSION_TAB_INDEX'
const SET_SMALL_MISSION_TAB_INDEX = 'SET_SMALL_MISSION_TAB_INDEX'
const SET_COMPLAINT_TAB_INDEX = 'SET_COMPLAINT_TAB_INDEX'
const SET_ORDER_TAB_INDEX = 'SET_ORDER_TAB_INDEX'
const SET_ROUTER_LOADING = 'SET_ROUTER_LOADING'
const SET_WITHDRAW_TAB_INDEX = 'SET_WITHDRAW_TAB_INDEX'
const SET_SERVICE_LIST_TAB_INDEX = 'SET_SERVICE_LIST_TAB_INDEX'
const SET_API_ERROT = 'SET_API_ERROT'
const SET_HAS_NEW_CHAT = 'SET_HAS_NEW_CHAT'
const SET_MODULESWITCH = 'SET_MODULESWITCH'

const state = {
  missionTabIndex: 0, // 任务列表第一级tab
  missionSmallTabIndex: 0, // 任务列表第二级tab：0、全部；1、待确认；2、待服务；3、待评价
  orderTabIndex: 0, // 订单列表tabIndex
  withDrawTabIndex: 0, // 提现列表tabIndex
  serviceListTabIndex: 0, // 服务项列表tabIndex
  complaintTabIndex: 0,
  routerLoading: false,
  apiError: false, // 接口请求是否异常
  hasNewChat: false, // 是否有新消息
  updateChatList: 0,
  chatHasNewsTimer: null,
  moduleSwitch: {}
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
  },
  [SET_ROUTER_LOADING] (state, flag) {
    state.routerLoading = flag
  },
  [SET_ORDER_TAB_INDEX] (state, flag) {
    state.orderTabIndex = flag
  },
  [SET_WITHDRAW_TAB_INDEX] (state, flag) {
    state.withDrawTabIndex = flag
  },
  [SET_SERVICE_LIST_TAB_INDEX] (state, flag) {
    state.serviceListTabIndex = flag
  },
  [SET_API_ERROT] (state, flag) {
    state.apiError = flag
  },
  [SET_HAS_NEW_CHAT] (state, flag) {
    state.hasNewChat = flag
  },
  [SET_MODULESWITCH] (state, res) {
    state.moduleSwitch = res
  }
}
const actions = {
  chatHasNews: ({commit}) => {
    actions.clearChatHasNewsTimer()
    state.chatHasNewsTimer = setInterval(() => {
      api.get(`/ChatRecord/HasNew`).then(result => {
        state.updateChatList = result.data.Data ? (state.updateChatList + 1) : state.updateChatList
        commit(SET_HAS_NEW_CHAT, result.data.Data)
      })
    }, 10 * 1000)
  },
  getChatHasNews: ({commit}) => {
    api.get(`/ChatRecord/HasNew`).then(result => {
      commit(SET_HAS_NEW_CHAT, result.data.Data)
    })
  },
  clearChatHasNewsTimer: () => {
    clearInterval(state.chatHasNewsTimer)
  }
}

const getters = {
  missionTabIndex: state => state.missionTabIndex,
  missionSmallTabIndex: state => state.missionSmallTabIndex,
  complaintTabIndex: state => state.complaintTabIndex,
  routerLoading: state => state.routerLoading,
  orderTabIndex: state => state.orderTabIndex,
  withDrawTabIndex: state => state.withDrawTabIndex,
  serviceListTabIndex: state => state.serviceListTabIndex,
  apiError: state => state.apiError,
  hasNewChat: state => state.hasNewChat,
  updateChatList: state => state.updateChatList,
  moduleSwitch: state => state.moduleSwitch
}

export default {
  state,
  mutations,
  actions,
  getters
}
