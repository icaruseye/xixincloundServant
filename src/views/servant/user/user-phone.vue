<template>
<div v-show="isShow">
  <div class="weui-form">
    <div class="weui-cell">
      <div class="weui-cell-top">
          <label class="label" for="">手机号</label>
          <input v-model="mobile" name="mobile" type="number" placeholder="请输入手机号">
      </div>
    </div>
    <div class="weui-cell weui-cell_vcode">
      <div class="weui-cell-top">
          <label class="label" for="">验证码</label>
          <input v-model="code" name="code" type="number" placeholder="请输入验证码">
          <button type="button" class="weui-vcode-btn" @click="getCode" :disabled="disabled_code">{{codeText}}</button>
      </div>
    </div>
  </div>
  <button type="button" class="weui-btn weui-btn-all weui-btn_primary" @click="submit">提交</button>
</div>
</template>

<script>
import http from '@/api/index'
import { AlertModule } from 'vux'
export default {
  data () {
    return {
      isShow: true,
      mobile: '',
      code: '',
      disabled_code: false,
      time: sessionStorage.getItem('AuthCodeTime') || 60
    }
  },
  created () {
    const userInfo = this.$store.getters.userInfo
    if (userInfo.Mobile) {
      history.back()
      AlertModule.show({
        title: '提示',
        content: '已绑定过手机号'
      })
    }
    if (this.time < 60) {
      this.setTimer()
      this.disabled_code = true
    }
  },
  computed: {
    codeText: function () {
      return this.time < 60 ? this.time + 's 后重新获取' : '获取验证码'
    }
  },
  methods: {
    isBindmobile () {
      return true
    },
    async getCode () {
      const mobile = this.mobile
      if (!(mobile.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(mobile))) {
        return this.$vux.toast.text('请填写正确的手机号')
      }
      const res = await http.get('/ValidateMobile', { mobile: this.mobile })
      if (res.data.Code === 100000) {
        this.setTimer()
      }
    },
    setTimer: function () {
      if (!this.timer) {
        this.disabled_code = true
        this.timer = setInterval(() => {
          if (this.time > 0 && this.time <= 60) {
            this.time--
            sessionStorage.setItem('AuthCodeTime', this.time)
          } else {
            this.disabled_code = false
            sessionStorage.setItem('AuthCodeTime', 60)
            this.time = 60
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    submit () {
    }
  }
}
</script>

<style lang="less" scoped>
.weui-cell.weui-cell_vcode {
  padding: 0 15px;
  .weui-cell-top {
    align-items: center;
    height: 50px;
    .weui-vcode-btn {
      border: 0;
      color: #fff;
      font-size: 12px;
      background: #3ecccc;
      height: 30px;
      line-height: 30px;
      width: 100px;
      border-radius: 4px;
      text-align: center;
      &:disabled {
        background: #cacaca;
      }
    }
  }
}

.weui-btn {
  position: fixed;
  bottom: 0;
}
</style>

