import Vue from 'vue'
import { WechatPlugin } from 'vux'

Vue.use(WechatPlugin)

let getSignature = (jsapiTicket, noncestr, timestamp) => {
  let a = `jsapi_ticket=${jsapiTicket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${location.href}`
  return a
}

export default function wxShare ({title, desc, timelineTitle, link, logo} = {}) {
  let timestamp = new Date().getTime()
  let nonceStr = Math.floor(Math.random() * 100000 + 10000000) + ''
  Vue.wechat.config({
    debug: false,
    appId: 'wxfbe01c7777463d4f',
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: getSignature(),
    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
  })
  Vue.wechat.ready(() => {
    Vue.wechat.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc || '默认分享文案', // 分享描述
      link: link || window.location.href, // 分享链接
      imgUrl: logo || '图标地址（必须是有效的Link）' // 分享图标
    })
    Vue.wechat.onMenuShareTimeline({
      title: timelineTitle || desc || '内容分享', // 分享标题，由于分享到朋友圈没有desc，所以这里采用的策略是，指定的朋友圈分享标题优先，其次采用发送给朋友的描述，最后采用默认文案。
      link: link || window.location.href, // 分享链接
      imgUrl: logo || '图标地址（必须是有效的Link）' // 分享图标
    })
  })
  Vue.wechat.error((res) => {
  })
}

// 为Vue的原型对象添加该方法，则所有vue实例都能继承该方法
Vue.prototype.$wxShare = wxShare
