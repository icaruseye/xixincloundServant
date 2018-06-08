/**
 * Created by lwj on 2018/6/8.
 */
import _import from '../_import'

export default [
  /**
   * 微信登录
   */
  {
    path: '/Servant/Login',
    component: _import('/servant/wxlogin/login'),
    beforeEnter: (to, from, next) => {
      sessionStorage.setItem('to_path', from.fullPath)
      next()
    }
  },
  /**
   * 重定向
   */
  {
    path: '/',
    redirect: '/message'
  }
]
