/**
 * Created by lwj on 2018/8/10.
 */
import _import from '../_import'

export default [
  {
    path: '/recommend',
    component: _import('/servant/recommend/index'),
    meta: {
      title: '推荐',
      goBackParam: {
        url: '/user/account',
        title: '我的账户'
      }
    }
  },
  {
    path: '/recommend/inviteUser',
    component: _import('/servant/recommend/inviteUser'),
    meta: {
      title: '我愿竭尽所能为您服务',
      notNeedLogin: true,
      share: true
    }
  },
  {
    path: '/recommend/inviteServant',
    component: _import('/servant/recommend/inviteServant'),
    meta: {
      title: '创立个人服务品牌，管理自己的用户群',
      notNeedLogin: true,
      share: true
    }
  }
]
