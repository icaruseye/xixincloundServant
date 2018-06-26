import Vue from 'vue'
import Router from 'vue-router'
import routerList from './routerList'

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
    const userAccount = JSON.parse(window.sessionStorage.getItem('userAccount'))
    if (!userAccount) { // 未登录的状态去微信登录
      sessionStorage.setItem('to_path', to.fullPath)
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.wechatOption.appId}&redirect_uri=` +
      encodeURIComponent(process.env.wechatOption.redirectUrl) + '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
    } else { // 已登录的状态
      const userState = router.app.$store.getters.userState // 用户状态 -4：未绑定手机；-2：账户锁定中；-1：账户已被删除；0：账户未提交身份证；1：账户提交身份证 待审核；2：3：账户审核未通过；；3：账户已审核通过
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
router.afterEach(() => {
  router.app.$store.commit('SET_ROUTER_LOADING', false)
})

export default router
