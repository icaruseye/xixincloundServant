// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from './store/index'
import router from './router'
import Meta from 'vue-meta'
import './plugins/validate.js'
import _ from 'lodash'
import registryPopup from './components/common/popupTop/index'
import { DatetimePlugin, ToastPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
import xxComponents from './components/common'
import http from '@/api'

Vue.use(xxComponents)
Vue.use(registryPopup)
Vue.use(DatetimePlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(registryPopup)
Vue.use(LoadingPlugin)
Object.defineProperty(Vue.prototype, '$_', { value: _ })
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(Meta)

Vue.prototype.$http = http

Vue.filter('transformImgUrl', function (val) {
  if (!val) return
  if (val.indexOf('http') === -1) {
    if (val.indexOf('Upload') === -1) {
      // 值为id
      return 'http://xixincloud.com:6883/File/GetImage/' + val
    } else {
      // 第三种情况
      return val
    }
  }
  // 值为完整url
  return val
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
