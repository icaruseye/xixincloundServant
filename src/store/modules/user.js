import api from '@/api/index'
const GET_USER_ACC = 'GET_USER_ACC'
const SET_TOKEN = 'SET_TOKEN'

const state = {
  token: null,
  userAccount: JSON.parse(sessionStorage.getItem('userAccount')) || {},
  userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {}
}

const mutations = {
  [GET_USER_ACC] (state, res) {
    state.userInfo = res.userInfo
    state.userAccount = res.userAccount
    sessionStorage.setItem('userInfo', JSON.stringify(res.userInfo))
    sessionStorage.setItem('userAccount', JSON.stringify(res.userAccount))
  },
  [SET_TOKEN] (state, flag) {
    state.token = flag
  }
}

const actions = {
  // 获取用户基本信息及个人资料
  getAccount: async ({commit}) => {
    const userAccount = await api.get('/Account')
    const userInfo = await api.get('/Info')
    const res = {
      userInfo: userInfo.data.Data || {},
      userAccount: userAccount.data.Data || {}
    }
    commit(GET_USER_ACC, res)
  }
}

const getters = {
  userAccount: state => state.userAccount,
  userInfo: state => state.userInfo,
  token: state => state.token,
  userState: state => {
    let userAccount = state.userAccount
    let accountState = userAccount.State
    let userInfo = state.userInfo

    if (!userInfo.Mobile) {
      return -4 // 用户没有绑定手机
    }
    if (accountState === -2) {
      return -2 // 账户锁定中
    }
    if (accountState === -1) {
      return -1 // 账户已删除
    }
    if (accountState === 0) {
      return 0 // 账户未提交身份证
    }
    if (accountState === 1) {
      return 1 // 账户提交身份证 待审核
    }
    if (accountState === 2) {
      return 2 // 账户审核未通过
    }
    if (accountState === 3) {
      return 3 // 账户审核通过
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
