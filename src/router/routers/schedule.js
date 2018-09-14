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
  },
  {
    path: '/schedule/calendar',
    component: _import('/servant/schedule/scheduleCalendar'),
    meta: {
      title: '排班日历',
      goBackParam: {
        url: '/schedule',
        title: '排班设置'
      }
    }
  },
  {
    path: '/schedule/schemeList',
    component: _import('/servant/schedule/schemeList'),
    meta: {
      title: '排班方案列表',
      goBackParam: {
        url: '/schedule',
        title: '排班设置'
      }
    }
  },
  {
    path: '/schedule/scheme/:id/detail',
    component: _import('/servant/schedule/schemeDetail'),
    meta: {
      title: '排班方案详情',
      goBackParam: {
        url: '/schedule/schemeList',
        title: '排班方案列表'
      }
    }
  },
  {
    path: '/schedule/schemeEdit',
    component: _import('/servant/schedule/schemeEdit'),
    meta: {
      title: '编辑排班方案',
      goBackParam: {
        url: '/schedule/schemeList',
        title: '排班方案列表'
      }
    }
  }
]
