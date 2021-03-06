/**
 * Created by lwj on 2018/6/8.
 */
import _import from '../_import'

export default [
  {
    path: '/customer',
    component: _import('/servant/customer/list'),
    meta: {
      title: '用户管理',
      goBackParam: {
        url: '/app',
        title: '应用'
      }
    }
  },
  {
    path: '/customer/:id/detail',
    component: _import('/servant/customer/detail'),
    meta: {
      title: '用户管理',
      goBackParam: {
        url: '/customer',
        title: '用户管理'
      }
    }
  },
  {
    path: '/customer/:id/serviceList',
    component: _import('/servant/customer/serviceList'),
    meta: {
      title: '服务套餐',
      goBackParam: {
        url: '/customer',
        title: '用户管理'
      }
    }
  },
  {
    path: '/customer/:id/serviceRecord',
    component: _import('/servant/customer/serviceRecord'),
    meta: {
      title: '服务记录',
      goBackParam: {
        url: '/customer',
        title: '用户管理'
      }
    }
  },
  {
    path: '/customer/:id/courseOrder/list',
    component: _import('/servant/customer/courseOrder'),
    meta: {
      title: '培训课程',
      goBackParam: {
        url: '/customer',
        title: '用户管理'
      }
    }
  },
  {
    path: '/customer/:id/studyRecord/:courseID/list',
    component: _import('/servant/customer/courseStudyRecord'),
    meta: {
      title: '学习记录',
      goBackParam: {
        title: '培训课程'
      }
    }
  }
]
