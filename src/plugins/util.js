import Vue from 'vue'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
const supportBankList = {
  'BOC': {
    name: '中国银行',
    icon: '#icon-zhongguoyinhang'
  },
  'CCB': {
    name: '中国建设银行',
    icon: '#icon-jiansheyinhang'
  },
  'ICBC': {
    name: '中国工商银行',
    icon: '#icon-gongshangyinhang'
  },
  'ABC': {
    name: '中国农业银行',
    icon: '#icon-nongyeyinhang'
  },
  'CMBC': {
    name: '中国民生银行',
    icon: '#icon-mingshengyinhang'
  }
}
export default {
  CheckIDCardNum: function (value) {
    // 验证身份证号方法 http://www.cnblogs.com/jiqing9006/p/3597549.html
    var area = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: 'xinjiang', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
    var Y, JYM
    var idcard = value
    var S, M
    var idcardArray = []
    var ereg, res
    if (value === '' || value === undefined) {
      return false
    }
    idcardArray = idcard.split('')
    if (area[parseInt(idcard.substr(0, 2))] == null) return false
    switch (idcard.length) {
      case 15:
        if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 === 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0)) {
          ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/ // 测试出生日期的合法性
        } else {
          ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/ // 测试出生日期的合法性
        }
        if (ereg.test(idcard)) res = true
        else res = false
        return res
      case 18:
        if (parseInt(idcard.substr(6, 4)) % 4 === 0 || (parseInt(idcard.substr(6, 4)) % 100 === 0 && parseInt(idcard.substr(6, 4)) % 4 === 0)) {
          ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/ // 闰年出生日期的合法性正则表达式
        } else {
          ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/ // 平年出生日期的合法性正则表达式
        }
        if (ereg.test(idcard)) {
          S = (parseInt(idcardArray[0]) + parseInt(idcardArray[10])) * 7 + (parseInt(idcardArray[1]) + parseInt(idcardArray[11])) * 9 + (parseInt(idcardArray[2]) + parseInt(idcardArray[12])) * 10 + (parseInt(idcardArray[3]) + parseInt(idcardArray[13])) * 5 + (parseInt(idcardArray[4]) + parseInt(idcardArray[14])) * 8 + (parseInt(idcardArray[5]) + parseInt(idcardArray[15])) * 4 + (parseInt(idcardArray[6]) + parseInt(idcardArray[16])) * 2 + parseInt(idcardArray[7]) * 1 + parseInt(idcardArray[8]) * 6 + parseInt(idcardArray[9]) * 3
          Y = S % 11
          M = 'F'
          JYM = '10X98765432'
          M = JYM.substr(Y, 1)
          if (M === idcardArray[17]) res = true
          else res = false
        } else res = false
        return res
      default:
        res = false
        return res
    }
  },
  getGender: function (psidno) {
    let sexno, sex
    if (psidno.length === 18) {
      sexno = psidno.substring(16, 17)
    } else if (psidno.length === 15) {
      sexno = psidno.substring(14, 15)
    } else {
      return false
    }
    let tempid = sexno % 2
    if (tempid === 0) {
      sex = 0
    } else {
      sex = 1
    }
    return sex
  },
  formatDate: function (date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  },
  /**
   * (description) 表单验证方法
   * data: 需要验证的数据
   * authText： 自定义验证规则和自定义报错文本
   * authText：{
   *  text： '',
   *  required: true
   * }
   */
  validateForm: function (data, authText) {
    const keysArr = Object.keys(authText)
    let flag = true
    for (let i = 0; i < keysArr.length; i++) {
      if (!data[keysArr[i]] && authText[keysArr[i]].required) {
        flag = false
        Vue.$vux.toast.text(`${authText[keysArr[i]].text}不能为空`)
        break
      }
      flag = true
    }
    return flag
  },
  /**
   * 图片地址格式化
   */
  transformImgUrl: function (val) {
    if (!val) return
    if (val.indexOf('http') === -1 && val.indexOf('Upload') === -1 && val.indexOf('base64') === -1) {
      return `${process.env.IMAGE_HOST}/File/GetImage/${val}`
    } else {
      // 值为完整url
      return val
    }
  },
  /**
   * 时间格式化
   */
  timeFormatFilter: function (value) {
    let lastIndexOf = value.lastIndexOf('.')
    if (lastIndexOf > 0) {
      value = value.replace('T', ' ').substring(0, lastIndexOf)
    } else {
      value = value.replace('T', ' ')
    }
    return value
  },
  // 支持的银行卡
  getSupportBankList: () => supportBankList,
  // 是否支持此银行
  bankIsSupport: (BankAbbreviation) => {
    return (supportBankList[BankAbbreviation] !== undefined)
  },
  // 压缩图片
  compressImage: ({
    Img = null,
    maxWidth = 750,
    maxHeight = 750,
    fileType = 'image/jpeg',
    orientation = null
  }, callback = () => {}) => {
    if (Img === null) return false
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    // 图片原始尺寸
    let originWidth = Img.width
    let originHeight = Img.height
    // 目标尺寸
    let targetWidth = originWidth
    let targetHeight = originHeight
    // 图片尺寸超过限制
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        // 更宽，按照宽度限定尺寸
        targetWidth = maxWidth
        targetHeight = Math.round(maxWidth * (originHeight / originWidth))
      } else {
        targetHeight = maxHeight
        targetWidth = Math.round(maxHeight * (originWidth / originHeight))
      }
    }
    // 图片压缩
    if (orientation === 6) {
      canvas.width = targetHeight
      canvas.height = targetWidth
      context.clearRect(0, 0, targetHeight, targetWidth)
      context.rotate(90 * Math.PI / 180)
      context.drawImage(Img, 0, -targetHeight, targetWidth, targetHeight)
    } else if (orientation === 3) {
      canvas.width = targetWidth
      canvas.height = targetHeight
      context.clearRect(0, 0, targetWidth, targetHeight)
      context.rotate(180 * Math.PI / 180)
      context.drawImage(Img, -targetWidth, -targetHeight, targetWidth, targetHeight)
    } else if (orientation === 8) {
      canvas.width = targetHeight
      canvas.height = targetWidth
      context.clearRect(0, 0, targetHeight, targetWidth)
      context.rotate(270 * Math.PI / 180)
      context.drawImage(Img, -targetWidth, 0, targetWidth, targetHeight)
    } else {
      canvas.width = targetWidth
      canvas.height = targetHeight
      context.clearRect(0, 0, targetWidth, targetHeight)
      context.drawImage(Img, 0, 0, targetWidth, targetHeight)
    }
    // canvas转为blob并上传
    canvas.toBlob(function (blob) {
      let base64Url = canvas.toDataURL(fileType || 'image/jpeg', 1)
      let files = new window.File([blob], `${Math.floor(Math.random() * 900000 + 100000)}.jpg`, {type: fileType})
      callback(files, base64Url)
    }, fileType || 'image/jpeg')
  }
}
