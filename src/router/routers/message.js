/**
 * Created by lwj on 2018/6/8.
 */
import _import from '../_import'
/**
 * 医护端-消息
 */
export default [
  {
    path: '/',
    component: _import('/servant/message/message'),
    meta: {
      title: '我的消息'
    }
  },
  {
    path: '/message',
    component: _import('/servant/message/message'),
    meta: {
      title: '我的消息'
    }
  },
  {
    path: '/message/chat/:id',
    component: _import('/servant/message/chat'),
    meta: {
      title: '聊天',
      goBackParam: {
        url: '/message',
        title: '聊天列表'
      }
    }
  },
  {
    path: '/systemMail',
    component: _import('/servant/message/MailTypeList'),
    meta: {
      title: '站内信'
    }
  },
  {
    path: '/systemMail/:type/list',
    component: _import('/servant/message/MailList'),
    meta: {
      title: '站内信列表'
    }
  },
  {
    path: '/mail/:id/detail',
    component: _import('/servant/message/MailDetail'),
    meta: {
      title: '站内信详情'
    }
  }
]
