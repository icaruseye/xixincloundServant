/**
 * Created by lwj on 2018/6/8.
 */
import _import from '../_import'

export default [
  /**
   * 医护端-个人中心
   */
  {
    path: '/user',
    component: _import('/servant/user/user')
  },
  {
    path: '/user/info',
    component: _import('/servant/user/user-info')
  },
  {
    path: '/user/phone',
    component: _import('/servant/user/user-phone')
  },
  {
    path: '/user/withdraw',
    component: _import('/servant/user/user-withdraw/list')
  },
  {
    path: '/user/withdraw/detail',
    component: _import('/servant/user/user-withdraw/detail')
  },
  {
    path: '/user/complaint/:id',
    component: _import('/servant/user/user-complaint-detail')
  },
  {
    path: '/user/complaint',
    component: _import('/servant/user/user-complaint/list')
  },
  {
    path: '/user/date',
    component: _import('/servant/user/user-date')
  },
  {
    path: '/user/authstep1',
    component: _import('/servant/user/user-auth-step1'),
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
    component: _import('/servant/user/user-auth-step2'),
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
    component: _import('/servant/user/user-auth-step3')
  },
  {
    path: '/user/authstep3-1',
    component: _import('/servant/user/user-auth-step3-1')
  },
  {
    path: '/user/authstep4',
    component: _import('/servant/user/user-auth-step4')
  }
]
