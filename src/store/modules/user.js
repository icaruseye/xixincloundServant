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
    commit(SET_TOKEN, res)
    commit(GET_USER_ACC, res)
  }
}

const getters = {
  userAccount: state => state.userAccount,
  userInfo: state => state.userInfo,
  token: state => state.token
}

export default {
  state,
  mutations,
  actions,
  getters
}
