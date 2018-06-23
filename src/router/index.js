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
  if (to.meta.notNeedLogin) {
    next()
  } else {
    const userAccount = JSON.parse(window.sessionStorage.getItem('userAccount'))
    if (!userAccount) {
      sessionStorage.setItem('to_path', to.fullPath)
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.wechatOption.appId}&redirect_uri=` +
      encodeURIComponent(process.env.wechatOption.redirectUrl) + '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
    } else {
      if (userAccount.State === 0 && to.path !== '/user/authstep1') {
        router.push('/user/authstep1')
        return false
      } else {
        next()
      }
    }
  }
})

export default router
