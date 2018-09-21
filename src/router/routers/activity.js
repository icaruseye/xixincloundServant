
import _import from '../_import'

export default [
  {
    path: '/activity',
    component: _import('/servant/activity'),
    meta: {
      title: '活动设置列表',
      goBackParam: {
        url: '/app',
        title: '应用'
      }
    }
  }
]
