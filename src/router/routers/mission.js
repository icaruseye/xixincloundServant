/**
 * Created by lwj on 2018/6/8.
 */
import _import from '../_import'

export default [
  /**
   * 医护端-任务
   */
  {
    path: '/mission',
    component: _import('/servant/mission/mission')
  },
  {
    path: '/mission/receive/:id',
    component: _import('/servant/mission/mission-toreceive')
  },
  {
    path: '/mission/waitreceive/:id',
    component: _import('/servant/mission/mission-waitreceive')
  },
  {
    path: '/mission/detail/:id',
    component: _import('/servant/mission/mission-detail')
  }
]
