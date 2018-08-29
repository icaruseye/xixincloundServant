/**
 * Created by lwj on 2018/6/8.
 */
import _import from '../_import'

export default [
  /**
   * 医护端-个人中心
   */
  {
    path: '/user',
    component: _import('/servant/user/user'),
    meta: {
      title: '我的'
    }
  },
  {
    path: '/user/account',
    component: _import('/servant/user/user-account'),
    meta: {
      title: '我的账户'
    }
  },
  {
    path: '/user/bills',
    component: _import('/servant/user/user-bills/list'),
    meta: {
      title: '我的账单'
    }
  },
  {
    path: '/user/bills/:id/detail',
    component: _import('/servant/user/user-bills/detail'),
    meta: {
      title: '账单详情'
    }
  },
  {
    path: '/user/withdraw',
    component: _import('/servant/user/user-withdraw/index'),
    meta: {
      title: '提现'
    }
  },
  {
    path: '/user/orderClearing/list',
    component: _import('/servant/user/user-orderClearing/list'),
    meta: {
      title: '结算单列表'
    }
  },
  {
    path: '/user/orderClearing/:id/detail',
    component: _import('/servant/user/user-orderClearing/detail'),
    meta: {
      title: '申请结算'
    }
  },
  {
    path: '/user/info',
    component: _import('/servant/user/user-info'),
    meta: {
      title: '个人资料',
      goBackParam: {
        url: '/user',
        title: '我的'
      }
    }
  },
  {
    path: '/user/phone',
    component: _import('/servant/user/user-phone'),
    meta: {
      title: '我的手机'
    }
  },
  {
    path: '/user/address',
    component: _import('/servant/user/user-address/list'),
    meta: {
      title: '服务地址管理',
      goBackParam: {
        url: '/user',
        title: '我的'
      }
    }
  },
  {
    path: '/user/complaint',
    component: _import('/servant/user/user-complaint/list'),
    meta: {
      title: '投诉列表',
      goBackParam: {
        url: '/user',
        title: '我的'
      }
    }
  },
  {
    path: '/user/complaint/:id/detail',
    component: _import('/servant/user/user-complaint/detail'),
    meta: {
      title: '投诉详情',
      goBackParam: {
        url: '/user/complaint',
        title: '投诉列表'
      }
    }
  },
  {
    path: '/user/date',
    component: _import('/servant/user/user-date'),
    meta: {
      title: '我的日程'
    }
  },
  {
    path: '/user/authstep1',
    component: _import('/servant/user/user-auth-step1'),
    meta: {
      title: '手机认证'
    }
  },
  {
    path: '/user/authstep2',
    component: _import('/servant/user/user-auth-step2'),
    meta: {
      title: '实名认证'
    }
  },
  {
    path: '/user/authstep3',
    component: _import('/servant/user/user-auth-step3'),
    meta: {
      title: '执业认证'
    }
  },
  {
    path: '/user/authstep3-1',
    component: _import('/servant/user/user-auth-step3-1'),
    meta: {
      title: '',
      goBackParam: {
        url: '/user/authstep3',
        title: '执业认证'
      }
    }
  },
  {
    path: '/user/authstep4',
    component: _import('/servant/user/user-auth-step4'),
    meta: {
      title: ''
    }
  },
  {
    name: 'bankCard',
    path: '/user/bankCard',
    component: _import('/servant/user/user-bankCard/list'),
    meta: {
      title: '我的银行卡',
      goBackParam: {
        url: '/user',
        title: '我的'
      }
    }
  },
  {
    name: 'addBankCard',
    path: '/user/bankCard/add',
    component: _import('/servant/user/user-bankCard/addBankCard'),
    meta: {
      title: '添加银行卡',
      goBackParam: {
        url: '/user/bankCard',
        title: '银行卡列表'
      }
    }
  },
  { // 我的订单
    name: 'order',
    path: '/user/order',
    component: _import('/servant/user/user-order/list'),
    meta: {
      title: '我的订单',
      goBackParam: {
        url: '/user',
        title: '我的'
      }
    }
  }
]
