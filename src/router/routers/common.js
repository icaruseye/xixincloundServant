/**
 * Created by lwj on 2018/6/8.
 */
import _import from '../_import'

export default [
  /**
   * 微信登录
   */
  {
    path: '/wxLogin',
    component: _import('/servant/wxlogin/login'),
    meta: {
      notNeedLogin: true,
      title: '登录'
    }
  },
  {
    path: '*',
    component: _import('/servant/NotFound'),
    meta: {
      title: '404',
      notNeedLogin: true
    }
  },
  {
    path: '/agreement/:id',
    component: _import('/servant/agreement'),
    meta: {
      title: '',
      notNeedLogin: true
    }
  }
]
