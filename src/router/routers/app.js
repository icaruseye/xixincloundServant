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
    component: _import('/servant/app/app')
  },
  {
    path: '/app/service',
    component: _import('/servant/app/app-service')
  },
  {
    path: '/app/packageList',
    component: _import('/servant/app/app-package-list')
  },
  {
    path: '/app/itemList',
    component: _import('/servant/app/app-item-list')
  },
  {
    path: '/app/packageEdit/:id',
    component: _import('/servant/app/app-package-edit')
  },
  {
    path: '/app/itemEdit/:id',
    component: _import('/servant/app/app-item-edit')
  },
  {
    path: '/app/contacts',
    component: _import('/servant/app/app-contacts')
  },
  {
    path: '/app/itemApply',
    component: _import('/servant/app/app-item-apply')
  }
]
