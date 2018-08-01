// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from './store/index'
import router from './router'
import './plugins/validate.js'
import _ from 'lodash'
import registryPopup from './components/common/popupTop/index'
import { DatetimePlugin, ToastPlugin, ConfirmPlugin, LoadingPlugin, AlertPlugin, BusPlugin } from 'vux'
import xxComponents from './components/common'
import http from '@/api'
import util from '@/plugins/util'

Vue.use(xxComponents)
Vue.use(registryPopup)
Vue.use(DatetimePlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(registryPopup)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(BusPlugin)

Object.defineProperty(Vue.prototype, '$_', { value: _ })
FastClick.attach(document.body)
Vue.config.productionTip = false

Vue.prototype.$http = http

/**
 * 图片地址格式化过滤器
 */
Vue.filter('transformImgUrl', function (val) {
  return util.transformImgUrl(val)
})

/**
 * 时间格式化过滤器
 */
Vue.filter('xxTimeFormatFilter', (value = '') => {
  return util.timeFormatFilter(value)
})
/**
 * 文字加省略号
 */
Vue.filter('xxTextTruncateFilter', (value = '', len = 10) => {
  return value.length > len ? value.substring(0, len) + '…' : value
})
/**
 * 银行卡logo过滤器
 */
Vue.filter('xxGetBankCardLogoFilter', (BankAbbreviation = 'CMBC') => {
  const bankList = util.getSupportBankList()
  return bankList[BankAbbreviation].icon
})
/**
 * 任务图标
 */
Vue.filter('xxMissionTypeIconFilter', (useType = 1) => {
  switch (useType) {
    case 2:
      return require('@/assets/images/icon_consult_item.png')
    case 3:
      return require('@/assets/images/icon_hospital.png')
    default:
      return require('@/assets/images/icon_tcmr.png')
  }
})
/**
 * 站内信分类图标
 */
Vue.filter('xxSiteNoticeIconFilter', (type = 1) => {
  switch (type) {
    case 2:
      return '#icon-dingdan1'
    case 4:
      return '#icon-icon_xitonggonggao'
    default:
      return '#icon-xiaoxi-xitongxiaoxi'
  }
})
/**
 * 站内信分类标题
 */
Vue.filter('xxSiteNoticeTypeTitleFilter', (type = 1) => {
  switch (type) {
    case 2:
      return '订单消息'
    case 4:
      return '系统公告'
    default:
      return '系统消息'
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
