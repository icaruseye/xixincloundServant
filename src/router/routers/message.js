/**
 * Created by lwj on 2018/6/8.
 */
import _import from '../_import'
/**
 * 医护端-消息
 */
export default [
  {
    path: '/message',
    component: _import('/servant/message/message')
  },
  {
    path: '/message/chat/:id',
    component: _import('/servant/message/chat')
  },
  {
    path: '/systemMail',
    component: _import('/servant/message/MailList')
  }
]
