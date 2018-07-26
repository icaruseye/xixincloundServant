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
import VueLazyload from 'vue-lazyload'

Vue.use(xxComponents)
Vue.use(registryPopup)
Vue.use(DatetimePlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(registryPopup)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(BusPlugin)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/src/assets/images/loading_img.gif',
  loading: '/src/assets/images/loading_img.gif',
  attempt: 1
})

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
 * 银行卡logo过滤器
 */
Vue.filter('xxGetBankCardLogoFilter', (BankAbbreviation = 'CMBC') => {
  const bankList = util.getSupportBankList()
  return bankList[BankAbbreviation].icon
})
Vue.filter('xxMissionTypeIconFilter', (useType = 1) => {
  switch (useType) {
    case 2:
      return '/src/assets/images/icon_consult_item.png'
    case 3:
      return '/src/assets/images/icon_hospital.png'
    default:
      return '/src/assets/images/icon_tcmr.png'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
