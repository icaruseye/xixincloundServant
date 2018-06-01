import Vue from 'vue'
import Router from 'vue-router'

// 医护端-消息
const servantMessage = () => import('@/views/servant/message/message')
const servantMessageChat = () => import('@/views/servant/message/chat')
// 医护端-任务
const servantMission = () => import('@/views/servant/mission/mission')
const servantMissionDetail = () => import('@/views/servant/mission/mission-detail')
const servantMissionToreceive = () => import('@/views/servant/mission/mission-toreceive')
const servantMissionWaitreceive = () => import('@/views/servant/mission/mission-waitreceive')
// 医护端-应用
const servantApp = () => import('@/views/servant/app/app')
const servantAppPackageList = () => import('@/views/servant/app/app-package-list')
const servantAppPackageEdit = () => import('@/views/servant/app/app-package-edit')
const servantAppItemList = () => import('@/views/servant/app/app-item-list')
const servantAppItemEdit = () => import('@/views/servant/app/app-item-edit')
const servantAppContacts = () => import('@/views/servant/app/app-contacts')
// 医护端-我的
const servantUser = () => import('@/views/servant/user/user')
const servantUserInfo = () => import('@/views/servant/user/user-info')
const servantUserPhone = () => import('@/views/servant/user/user-phone')
const servantUserWithdraw = () => import('@/views/servant/user/user-withdraw')
const servantUserComplaint = () => import('@/views/servant/user/user-complaint')
const servantUserComplaintDetail = () => import('@/views/servant/user/user-complaint-detail')
const servantUserDate = () => import('@/views/servant/user/user-date')
const servantAuthStep1 = () => import('@/views/servant/user/user-auth-step1')
const servantAuthStep2 = () => import('@/views/servant/user/user-auth-step2')
const servantAuthStep3 = () => import('@/views/servant/user/user-auth-step3')
const servantAuthStep3a1 = () => import('@/views/servant/user/user-auth-step3-1')
const servantAuthStep4 = () => import('@/views/servant/user/user-auth-step4')

const wxLogin = () => import('@/views/servant/wxlogin/login')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (!/^\/message\/chat\//.test(to.path)) {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/Servant/Login',
      component: wxLogin
    },
    {
      path: '/',
      redirect: '/message'
    },
    {
      path: '/message',
      component: servantMessage
    },
    {
      path: '/message/chat/:id',
      component: servantMessageChat
    },
    {
      path: '/mission',
      component: servantMission
    },
    {
      path: '/mission/receive/:id',
      component: servantMissionToreceive
    },
    {
      path: '/mission/waitreceive/:id',
      component: servantMissionWaitreceive
    },
    {
      path: '/mission/detail/:id',
      component: servantMissionDetail
    },
    {
      path: '/app',
      component: servantApp
    },
    {
      path: '/app/packageList',
      component: servantAppPackageList
    },
    {
      path: '/app/itemList',
      component: servantAppItemList
    },
    {
      path: '/app/packageEdit/:id',
      component: servantAppPackageEdit
    },
    {
      path: '/app/itemEdit/:id',
      component: servantAppItemEdit
    },
    {
      path: '/app/contacts',
      component: servantAppContacts
    },
    {
      path: '/user',
      component: servantUser
    },
    {
      path: '/user/info',
      component: servantUserInfo
    },
    {
      path: '/user/phone',
      component: servantUserPhone
    },
    {
      path: '/user/withdraw',
      component: servantUserWithdraw
    },
    {
      path: '/user/complaint/:id',
      component: servantUserComplaintDetail
    },
    {
      path: '/user/complaint',
      component: servantUserComplaint
    },
    {
      path: '/user/date',
      component: servantUserDate
    },
    {
      path: '/user/authstep1',
      component: servantAuthStep1,
      beforeEnter: (to, from, next) => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {}
        if (userInfo.Mobile && to.path !== '/user/authstep2') {
          next('/user/authstep2')
        } else {
          next()
        }
      }
    },
    {
      path: '/user/authstep2',
      component: servantAuthStep2,
      beforeEnter: (to, from, next) => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {}
        if (userInfo.IDCard && to.path !== '/user/authstep3') {
          next('/user/authstep3')
        } else {
          next()
        }
      }
    },
    {
      path: '/user/authstep3',
      component: servantAuthStep3
    },
    {
      path: '/user/authstep3-1',
      component: servantAuthStep3a1
    },
    {
      path: '/user/authstep4',
      component: servantAuthStep4
    }
  ]
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
  } else if (userInfo.State === 2 && to.path !== '/user/authstep1') {
    next('/user/authstep1')
  } else {
    next()
  }
})

export default router
