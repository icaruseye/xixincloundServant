import axios from 'axios'
import config from '@/config'
import Vue from 'vue'
axios.interceptors.response.use(response => {
  return response
}, error => {
  Vue.$vux.loading.hide()
  if (error.response.status === 401) {
    // token无效，重新登录
    if (error.response.data.Code === 100010) {
      sessionStorage.removeItem('servant_token')
      sessionStorage.removeItem('userAccount')
      sessionStorage.removeItem('userInfo')
      Vue.$vux.alert.show({
        content: '登录已超时！',
        buttonText: '点击重试',
        onHide () {
          window.location.reload()
        }
      })
    }
  }
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
    var token = sessionStorage.getItem('servant_token')
    var headers = {
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
      url: process.env.API_PATH + url,
      data: data,
      timeout: config._TIMEOUT_,
      headers: _headers || headers
    }
    return axios(options).then(checkStatus).then(checkCode)
  },
  put (url, data, header) {
    var token = sessionStorage.getItem('servant_token')
    var headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    if (header) {
      var _headers = Object.assign(headers, header)
    }
    if (token) {
      headers.token = token
    }
    var options = {
      method: 'put',
      url: process.env.API_PATH + url,
      data: data,
      timeout: config._TIMEOUT_,
      headers: _headers || headers
    }
    return axios(options).then(checkStatus).then(checkCode)
  },
  get (url, params) {
    var token = sessionStorage.getItem('servant_token')
    var headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    if (token) {
      headers.token = token
    }
    return axios({
      method: 'get',
      url: process.env.API_PATH + url,
      params,
      timeout: config._TIMEOUT_,
      headers: headers
    }).then(checkStatus).then(checkCode)
  },
  delete (url, params) {
    var token = sessionStorage.getItem('servant_token')
    var headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    if (token) {
      headers.token = token
    }
    return axios({
      method: 'delete',
      url: process.env.API_PATH + url,
      params,
      timeout: config._TIMEOUT_,
      headers: headers
    }).then(checkStatus).then(checkCode)
  },
  send (url, method, data, header) {
    var token = sessionStorage.getItem('servant_token')
    var headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    if (header) {
      var _headers = Object.assign(headers, header)
    }
    if (token) {
      headers.token = token
    }
    var options = {
      method: method,
      url: process.env.API_PATH + url,
      data: data,
      timeout: config._TIMEOUT_,
      headers: _headers || headers
    }
    return axios(options)
  }
}
