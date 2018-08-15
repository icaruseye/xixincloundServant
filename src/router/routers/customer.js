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
      title: '用户管理'
    }
  }
]
