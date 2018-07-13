/**
 * Created by lwj on 2018/6/8.
 */
import _import from '../_import'

export default [
  {
    path: '/consult/:id/detail',
    component: _import('/servant/consult/detail'),
    meta: {
      title: '服务中'
    }
  },
  {
    path: '/consult/finishService/:id',
    component: _import('/servant/consult/finishService'),
    meta: {
      title: '完成咨询'
    }
  }
]
