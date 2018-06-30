import api from '@/api/index'
const SET_USER_ACCOUNT = 'SET_USER_ACCOUNT'
const SET_USER_INFO = 'SET_USER_INFO'
const SET_TOKEN = 'SET_TOKEN'

const state = {
  token: sessionStorage.getItem('servant_token') || null,
  userAccount: JSON.parse(sessionStorage.getItem('userAccount')) || {},
  userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {}
}

const mutations = {
  [SET_USER_ACCOUNT] (state, res) {
    state.userAccount = res
    sessionStorage.setItem('userAccount', JSON.stringify(res))
  },
  [SET_USER_INFO] (state, res) {
    state.userInfo = res
    sessionStorage.setItem('userInfo', JSON.stringify(res))
  },
  [SET_TOKEN] (state, flag) {
    state.token = flag
  }
}

const actions = {
  // 获取账户信息
  getUserAccount: async ({commit}) => {
    const res = await api.get('/Account')
    if (res.data.Code === 100000) {
      await commit(SET_USER_ACCOUNT, res.data.Data)
    }
  },
  // 获取个人信息
  getUserInfo: async ({commit}) => {
    const res = await api.get('/Info')
    if (res.data.Code === 100000) {
      await commit(SET_USER_INFO, res.data.Data)
    }
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
    if (!userInfo.IDCard) {
      return 0 // 账户未提交身份证
    }
    if (accountState === 1 && userInfo.IDCard) {
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
