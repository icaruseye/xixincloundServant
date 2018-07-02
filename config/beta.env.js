'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = {
  NODE_ENV: '"development"',
  API_PATH: '"http://beta-api.xixincloud.com/api/Servant"',
  DEV_PROXY_API: '"http://beta-api.xixincloud.com"',
  IMAGE_HOST: '"http://image.xixincloud.com"',
  wechatOption: {
    appId: '"wxfbe01c7777463d4f"',
    appsecret: '"appsecret"',
    redirectUrl: '"http://beta-service.xixincloud.com/wxLogin?shopID=1"'
  }
}
