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
  },
  {
    path: '/app/push',
    component: _import('/servant/app/push'),
    meta: {
      title: '群发列表',
      goBackParam: {
        url: '/app',
        title: '应用'
      }
    }
  },
  {
    path: '/app/push/detail/:id',
    component: _import('/servant/app/push/detail'),
    meta: {
      title: '群发详情',
      goBackParam: {
        url: '/app/push',
        title: '群发列表'
      }
    }
  },
  {
    path: '/app/push/edit/:id',
    component: _import('/servant/app/push/edit'),
    meta: {
      title: '群发推送',
      goBackParam: {
        url: '/app/push',
        title: '群发列表'
      }
    }
  },
  {
    path: '/app/push/userlist',
    component: _import('/servant/app/push/user-list'),
    meta: {
      title: '使用用户',
      goBackParam: {
        url: '/app/push/edit',
        title: '群发推送'
      }
    }
  },
  {
    path: '/app/registration',
    component: _import('/servant/registration'),
    meta: {
      title: '挂号情况',
      goBackParam: {
        url: '/app',
        title: '应用'
      }
    }
  },
  {
    path: '/app/registration/setting',
    component: _import('/servant/registration/setting'),
    meta: {
      title: '挂号设置',
      goBackParam: {
        url: '/app/registration',
        title: '挂号情况'
      }
    }
  },
  {
    path: '/app/registration/list/:id',
    component: _import('/servant/registration/list'),
    meta: {
      title: '挂号详情',
      goBackParam: {
        url: '/app/registration',
        title: '挂号情况'
      }
    }
  }
]
