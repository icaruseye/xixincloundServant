import axios from 'axios'
import config from '@/config'
import Vue from 'vue'

axios.interceptors.response.use(response => {
  return response
}, error => {
  // if (error.response.status === 401) {
  //   console.log(100010)
  //   window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef2a7d894732658e&redirect_uri=' +
  //   encodeURIComponent('http://xxx.xixincloud.com/Servant/Login?shopID=666') + '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
  // }
  Vue.prototype.$popupTop('出错了，请重试')
  return Promise.reject(error)
})

function checkStatus (response) {
  if (response.status === 200 || response.status === 304) {
    return response
  }
  return {
    data: {
      code: -400,
      message: response.statusText
    }
  }
}

function checkCode (res) {
  if (res.status === 200) {
  } else {
    console.log('进入请求错误处理')
  }
  return res
}

export default {
  post (url, data, header) {
    var token = localStorage.getItem('token')
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=UTF-8'
    }
    if (header) {
      var _headers = Object.assign(headers, header)
    }
    if (token) {
      headers.token = token
    }
    var options = {
      method: 'post',
      url: config._PATH_ + url,
      data: data,
      timeout: config._TIMEOUT_,
      headers: _headers || headers
    }
    return axios(options)
    .then(checkStatus).then(checkCode)
  },
  get (url, params) {
    var token = localStorage.getItem('token')
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=UTF-8',
      'deviceType': 'WAP'
    }
    if (token) {
      headers.token = token
    }
    return axios({
      method: 'get',
      url: config._PATH_ + url,
      withCredentials: true,
      params,
      timeout: 15000,
      headers: headers
    }).then(checkStatus).then(checkCode)
  }
}
