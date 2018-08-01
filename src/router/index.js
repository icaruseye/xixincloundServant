import Vue from 'vue'
import Router from 'vue-router'
import routerList from './routerList'
import apiRequest from '@/api'
import wxShare from '@/plugins/wxShare'
import util from '@/plugins/util'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (!/^\/message\/chat\//.test(to.path)) {
      return { x: 0, y: 0 }
    }
  },
  routes: routerList
})

router.beforeEach((to, from, next) => {
  router.app.$store.commit('SET_ROUTER_LOADING', true)
  if (to.meta.notNeedLogin) {
    next()
  } else {
    const token = sessionStorage.getItem('servant_token')
    const userAccount = sessionStorage.getItem('userAccount')
    if (!token || !userAccount) { // 未登录的状态去微信登录
      const websiteHost = window.location.host
      apiRequest.get(`/ShopInfo?host=${websiteHost}`).then(result => {
        if (result.status === 200 && result.data.Code === 100000) {
          sessionStorage.setItem('to_path', to.fullPath)
          sessionStorage.removeItem('servant_token')
          sessionStorage.removeItem('userAccount')
          sessionStorage.removeItem('userInfo')
          sessionStorage.setItem('shopName', result.data.Data.ShopName)
          window.location.href = result.data.Data.LoginUrl
        } else {
          alert('非法访问')
        }
      })
    } else { // 已登录的状态
      const userState = router.app.$store.getters.userState // 用户状态 -4：未绑定手机；-2：账户锁定中；-1：账户已被删除；0：账户未提交身份证；1：账户提交身份证 待审核；2：未提交审核资料3：账户审核未通过；；3：账户已审核通过
      if (userState === -4) { // 没有绑定手机
        if (to.path !== '/user/authstep1') {
          next('/user/authstep1')
        } else {
          next()
        }
        return false
      }
      if (userState !== -4 && to.path === '/user/authstep1') { // 绑定了手机号后就不能进入绑定手机的页面了
        next('/user')
        return false
      }

      if ((userState === 1 || userState === 3) && (to.path === '/user/authstep3' || to.path === '/user/authstep3-1')) { // 进入添加执业证页面
        next()
        return false
      }
      if (userState === 0 || userState === 2) { // 未提交审核资料 和 审核未通过 （可以进入实名认证页面）
        if (to.path !== '/user/authstep2') {
          next('/user/authstep2')
        } else {
          next()
        }
        return false
      } else if (userState === 1) { // 待审核 （不可进入实名认证页面，只能进入执业证列表页面）
        next('/user/authstep3')
        return false
      } else if (userState === 3) { // 审核通过 （不可进入实名认证页面）
        if (to.path === '/user/authstep2') {
          next('/user/info')
        } else {
          next()
        }
        return false
      } else { // 账号处于异常状态
        alert('账号异常，请联系客服')
        return false
      }
    }
  }
})
router.afterEach((to) => {
  const userAccount = sessionStorage.getItem('userAccount')
  const userInfo = sessionStorage.getItem('userInfo')
  if (userAccount) {
    const userAccountObject = JSON.parse(userAccount) || {}
    const userInfoObject = JSON.parse(userInfo) || {}
    wxShare({
      title: userInfoObject.RealName ? `我是${userInfoObject.RealName}` : '',
      desc: userAccountObject.Description || `${sessionStorage.getItem('shopName')}`,
      logo: util.transformImgUrl(userAccountObject.Avatar)
    }, to.fullPath, userAccountObject.ViewID || '')
  }
  if (to.meta.title !== null && to.meta.title !== '') {
    document.title = to.meta.title
  } else {
    document.title = window.sessionStorage.getItem('shopName') || ''
  }
  router.app.$store.commit('SET_ROUTER_LOADING', false)
})

export default router
