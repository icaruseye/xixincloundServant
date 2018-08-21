/**
 * Created by lwj on 2018/6/8.
 */
import _import from '../_import'

export default [
  /**
   * 医护端-应用
   */
  {
    path: '/app',
    component: _import('/servant/app/app'),
    meta: {
      title: '应用'
    }
  },
  {
    path: '/app/service',
    component: _import('/servant/app/app-service'),
    meta: {
      title: '服务设置',
      goBackParam: {
        url: '/app',
        title: '应用'
      }
    }
  },
  {
    path: '/app/packageList',
    component: _import('/servant/app/app-package-list'),
    meta: {
      title: ''
    }
  },
  {
    path: '/app/itemList',
    component: _import('/servant/app/app-item-list'),
    meta: {
      title: ''
    }
  },
  {
    path: '/app/packageEdit/:id',
    component: _import('/servant/app/app-package-edit'),
    meta: {
      title: '编辑服务套餐',
      goBackParam: {
        title: '服务设置'
      }
    }
  },
  {
    path: '/app/itemEdit/:id',
    component: _import('/servant/app/app-item-edit'),
    meta: {
      title: '',
      goBackParam: {
        url: '/app/itemApply',
        title: '申请服务项'
      }
    }
  },
  {
    path: '/app/contacts',
    component: _import('/servant/app/app-contacts'),
    meta: {
      title: '通讯录'
    }
  },
  {
    path: '/app/itemApply',
    component: _import('/servant/app/app-item-apply'),
    meta: {
      title: '申请服务项',
      goBackParam: {
        url: '/app/service',
        title: '服务设置'
      }
    }
  }
]
