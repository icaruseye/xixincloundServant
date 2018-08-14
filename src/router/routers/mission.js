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
    component: _import('/servant/mission/mission'),
    meta: {
      title: '任务列表'
    }
  },
  {
    path: '/mission/receive/:id',
    component: _import('/servant/mission/mission-toreceive'),
    meta: {
      title: '预约单确认',
      goBackParam: {
        url: '/mission',
        title: '任务'
      }
    }
  },
  {
    path: '/mission/waitreceive/:id',
    component: _import('/servant/mission/mission-waitreceive'),
    meta: {
      title: '任务详情',
      goBackParam: {
        url: '/mission',
        title: '任务'
      }
    }
  }
]
