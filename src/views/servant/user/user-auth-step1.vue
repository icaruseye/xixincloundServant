<template>
  <div>
    <step-bar :list="stepInfo"></step-bar>
    <div class="panel">
      <div class="cell vux-1px-b">
        <input v-model="mobile" type="text" placeholder="请输入手机号">
      </div>
      <div class="cell">
        <input v-model="code" type="text" placeholder="请输入手机验证码">
        <button :disabled="disabled_code" class="auth-code" @click="getCode">{{codeText}}</button>
      </div>
    </div>
    <div class="xx-readme">
      <label for="auth"><input type="checkbox" v-model="userAgreement" id="auth">我已阅读并同意<a href="javascript:;">《用户注册协议》</a></label>
    </div>
    <div class="step-btn">
      <button class="weui-btn" @click="submit">下一步</button>
    </div>
  </div>
</template>

<script>
import http from '@/api/index'
import stepBar from './user-auth-stepbar'
export default {
  components: {
    stepBar
  },
  data () {
    return {
      stepInfo: [{
        text: '手机认证',
        type: 1
      }, {
        text: '实名认证',
        type: 0
      }, {
        text: '执业认证',
        type: 0
      }, {
        text: '开始服务',
        type: 0
      }],
      mobile: '',
      code: '',
      disabled_code: false,
      time: sessionStorage.getItem('AuthCodeTime') || 60,
      userAgreement: false
    }
  },
  computed: {
    codeText: function () {
      return this.time < 60 ? this.time + 's 后重新获取' : '获取验证码'
    }
  },
  methods: {
    async getCode () {
      const mobile = this.mobile
      if (!(mobile.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(mobile))) {
        return this.$vux.toast.text('请填写正确的手机号')
      }
      const res = await http.get('/ValidateCode', { mobile: this.mobile })
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
    async submit () {
      const that = this
      if (!this.mobile) {
        return this.$vux.toast.text('请填写正确的手机号')
      }
      if (!this.code) {
        return this.$vux.toast.text('请填写验证码')
      }
      if (!this.userAgreement) {
        return this.$vux.toast.text('请填勾选同意用户协议')
      }
      const res = await http.put(`/ValidateMobile?mobile=${this.mobile}&validateCode=${this.code}`)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: '绑定成功',
          onHide () {
            that.$router.push('/user/authstep2')
          }
        })
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.panel {
  margin-top: 10px;
  background: #fff;
}

.cell {
  padding: 15px 15px 0;
  display: flex;
  color: #666;
  input {
    flex: 1;
    padding: 13px;
    font-size: 15px;
  }
  .auth-code {
    border: 0;
    background: transparent;
    color: #3AC7F5;
    font-size: 16px;
  }
  &.vux-1px-b:after {
    left: 15px;
    right: 15px;
    border-color: #ccc;
    opacity: .5;
  }
  ::-webkit-input-placeholder {
    color: #ccc
  }
}

.xx-readme {
  label {
    display: flex;
    padding: 7px 28px;
    font-size: 13px;
    color: #666;
    align-items: center;
  }
  input {
    position: relative;
    margin-right: 4px;
    top: -2px;
    width: 14px;
    height: 14px;
  }
  a {
    color: #3BC8F6
  }
}

.step-btn {
  position: fixed;
  bottom: 23px;
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  .weui-btn {
    padding: 0;
    background: #3BC8F6;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 16px;
  }
}
</style>
