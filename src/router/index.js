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
  // 微信授权登录
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {}
  if (!userInfo.ID && to.path !== '/Servant/Login') {
    // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef2a7d894732658e&redirect_uri=' +
    // encodeURIComponent('http://xxx.xixincloud.com/Servant/Login?shopID=666') + '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
    // window.location.href = '/Servant/Login'
    sessionStorage.setItem('to_path', to.fullPath)
    next('/Servant/Login?id=2')
    return false
  }
  if (userInfo.State === 0 && to.path !== '/user/authstep1') {
    next('/user/authstep1')
    return false
  }
  next()
})

export default router
