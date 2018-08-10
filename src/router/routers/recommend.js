/**
 * Created by lwj on 2018/8/10.
 */
import _import from '../_import'

export default [
  {
    path: '/recommend/inviteUser',
    component: _import('/servant/recommend/inviteUser'),
    meta: {
      title: '邀请新用户',
      notNeedLogin: true
    }
  },
  {
    path: '/recommend/inviteServant',
    component: _import('/servant/recommend/inviteServant'),
    meta: {
      title: '邀请新服务者',
      notNeedLogin: true
    }
  }
]
