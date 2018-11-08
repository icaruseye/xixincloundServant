
import _import from '../_import'

export default [
  {
    path: '/app/course',
    component: _import('/servant/course'),
    meta: {
      title: '课程设置',
      goBackParam: {
        url: '/app',
        title: '应用'
      }
    }
  },
  {
    path: '/app/course/:id/userlist',
    component: _import('/servant/course/user-list'),
    meta: {
      title: '报名管理'
    }
  }
]
