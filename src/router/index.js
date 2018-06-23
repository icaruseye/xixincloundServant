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
  console.log(to.path)
  if (to.meta.notNeedLogin) {
    next()
  } else {
    const userAccount = JSON.parse(window.sessionStorage.getItem('userAccount'))
    if (!userAccount) { // 未登录的状态去微信登录
      sessionStorage.setItem('to_path', to.fullPath)
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.wechatOption.appId}&redirect_uri=` +
      encodeURIComponent(process.env.wechatOption.redirectUrl) + '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
    } else { // 已登录的状态
      const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))

      if (!userInfo.Mobile && to.path !== '/user/authstep1') { // 没有绑定手机
        next('/user/authstep1')
        return false
      }

      if ((userAccount.State === 0 || userAccount.State === 2) && to.path !== '/user/authstep2') { // 没有实名认证
        if (to.path === '/user/authstep3' || to.path === '/user/authstep3-1') {
          next()
        } else {
          next('/user/authstep2')
        }
        return false
      } else if (userAccount.State === 3 && to.path !== '/user/authstep2') { // 实名认证通过
        next()
      } else if (userAccount.State === 3 && to.path === '/user/authstep2') {
        next('/user/info')
      } else { // 账号处于异常状态
        alert('账号异常，请联系客服')
      }
    }
  }
})

export default router
