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
import Vant from 'vant'
import 'vant/lib/index.css'
import 'animate.css/animate.min.css'
import fundebug from 'fundebug-javascript'
import VueClipboard from 'vue-clipboard2'
import VueAMap from 'vue-amap'
fundebug.apikey = 'e3fbd8baddee7e450d5bf79ee7f2887afcaa86c25553662559b3a20d65515a4c'

function formatComponentName (vm) {
  if (vm.$root === vm) return 'root'

  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
}
Vue.config.errorHandler = function (err, vm, info) {
  var componentName = formatComponentName(vm)
  var propsData = vm.$options && vm.$options.propsData
  fundebug.notifyError(err, {
    metaData:
    {
      componentName: componentName,
      propsData: propsData,
      info: info
    }
  })
}

Vue.use(Vant)
Vue.use(xxComponents)
Vue.use(registryPopup)
Vue.use(DatetimePlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(registryPopup)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(BusPlugin)
Vue.use(VueClipboard)
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '6c1e7dd17520cbff5d12dbc63018f3b0',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

Object.defineProperty(Vue.prototype, '$_', { value: _ })
FastClick.attach(document.body)
Vue.config.productionTip = false

Vue.prototype.$http = http

/**
 * 文字裁剪
 */
Vue.filter('xxTextSubFilter', function (value = '', len = 10) {
  return value.length > len ? value.substring(0, len) + '…' : value
})
/**
 * 图片地址格式化过滤器
 */
Vue.filter('transformImgUrl', function (val) {
  return util.transformImgUrl(val)
})

/**
 * 时间格式化过滤器
 */
Vue.filter('xxTimeFormatFilter', (value = '', format) => {
  return util.timeFormatFilter(value, format)
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
      return '#icon-dingdan-copy'
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
