
import _import from '../_import'

export default [
  {
    path: '/app/activity',
    component: _import('/servant/activity'),
    meta: {
      title: '活动设置',
      goBackParam: {
        url: '/app',
        title: '应用'
      }
    }
  },
  {
    path: '/app/activity/edit/:id',
    component: _import('/servant/activity/edit'),
    meta: {
      title: '编辑活动',
      goBackParam: {
        url: '/app/activity',
        title: '活动设置'
      }
    }
  },
  {
    path: '/app/activity/addServiceItem',
    component: _import('/servant/activity/add-serviceItem'),
    meta: {
      title: '添加活动'
    }
  },
  {
    path: '/app/activity/detail/:id',
    component: _import('/servant/activity/detail'),
    meta: {
      title: '活动详情'
    }
  }
]
