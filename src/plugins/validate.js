import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
import util from './util'
import { DatetimePlugin } from 'vux'

// 配置中文
Validator.addLocale(zh)

const config = {
  locale: 'zh_CN',
  errorBagName: 'errorBags'
}
Vue.use(VeeValidate, config)
Vue.use(DatetimePlugin)

// 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      // email: () => '请输入正确的邮箱格式',
      digits: () => '必须为4位数字',
      required: (field) => field
    },
    attributes: {
      nickname: '请输入昵称',
      RealName: '请输入真实姓名',
      ZhiyeNum: '请输入执业证编号',
      IDCard: '请输入身份证号码',
      ZhiyeNumImg: '请上传相应图片',
      code: '请输入验证码',
      mobile: '请输入手机号'
    }
  }
}

Validator.updateDictionary(dictionary)

Validator.extend('phone', {
  messages: {
    zh_CN: field => '必须是11位手机号码'
  },
  validate: value => {
    return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
})

Validator.extend('idcard', {
  messages: {
    zh_CN: field => '身份证号不正确'
  },
  validate: value => {
    return util.CheckIDCardNum(value)
  }
})
