'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = {
  NODE_ENV: '"development"',
  API_PATH: '"http://192.168.2.100/api/Servant"',
  // API_PATH: '"http://api.xixincloud.com/api/Servant"',
  DEV_PROXY_API: '"http://192.168.2.100"',
  wechatOption: {
    appId: '"wxfbe01c7777463d4f"',
    appsecret: '"appsecret"',
    redirectUrl: '"http://lwj.n.liswn.com/wxLogin?shopID=682"'
    // redirectUrl: '"http://lwj.n.liswn.com/wxLogin?shopID=684"'
  }
}
