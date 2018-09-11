/**
 * Created by lwj on 2018/8/10.
 */
import _import from '../_import'

export default [
  {
    path: '/schedule',
    component: _import('/servant/schedule/index'),
    meta: {
      title: '排班设置',
      goBackParam: {
        url: '/app',
        title: '应用'
      }
    }
  }
]
