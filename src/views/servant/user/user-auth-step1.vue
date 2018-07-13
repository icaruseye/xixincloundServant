<template>
  <div style="min-height: 100vh;padding-bottom: 100px;box-sizing: border-box">
    <xx-step-bar step="1">
      <xx-step-items slot="items">
        手机认证
      </xx-step-items>
      <xx-step-items slot="items">
        实名认证
      </xx-step-items>
      <xx-step-items slot="items">
        执业认证
      </xx-step-items>
      <xx-step-items slot="items">
        开始服务
      </xx-step-items>
    </xx-step-bar>
    <div class="bind_mobile_container">
      <label class="bind_mobile_cells">
        <input class="input_control" v-model="mobile" type="text" placeholder="请输入手机号码">
      </label>
      <div class="bind_mobile_cells">
        <input class="input_control" v-model="code" type="text" placeholder="请输入手机验证码">
        <a @click="getCode" :class="['send_mobile_code_btn', disabled_code ? 'disabled_code_btn' : '']" href="javascript:void(0)">{{codeText}}</a>
      </div>
      <div class="">
        <label class="xx-checker">
          <span class="xx-checker__input">
            <input v-model="userAgreement" type="checkbox"
                    ref="checkBoxRef"
                  aria-hidden="true"
                  class="xx-checker__original">
            <span class="xx-checker__inner"></span>
          </span>
          我已阅读并同意<a @click="showAgreementDialog" href="javascript:void(0);">《服务者使用协议》</a>
        </label>
      </div>
    </div>
    <div class="btn_bar">
      <button class="btn" :class="[submitLocked?'disabled_btn':'']"  @click="submit">下一步</button>
    </div>

    <div v-transfer-dom>
      <alert v-model="showHintAlert" title="温馨提示" content="请先完善个人资料及资格认证，方可进入主界面"></alert>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="agreementDialogVisable" :hide-on-blur="true">
        <div class="agreement_container">
          <h1 class="agreement_title">医护服务者使用协议</h1>
          <template v-if="agreementContent !== null">
            {{agreementContent}}
            <div style="margin-top:40px;" class="clearfix">
              <a style="display:inline-block; border: 1px solid #3ac7f5;padding: 15px 40px;color:#3ac7f5" href="javascript:void(0)" @click="agreementDialogVisable = false">我已阅读完毕</a>
            </div>
          </template>
          <template v-else>
            <inline-loading></inline-loading>
          </template>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import stepBar from './user-auth-stepbar'
import {mapActions} from 'vuex'
import {Alert, XDialog, InlineLoading, TransferDomDirective as TransferDom} from 'vux'
import { clearInterval, setInterval } from 'timers'
export default {
  directives: {
    TransferDom
  },
  components: {
    stepBar,
    Alert,
    XDialog,
    InlineLoading
  },
  data () {
    return {
      agreementContent: null,
      agreementDialogVisable: false,
      showHintAlert: true,
      mobile: '',
      code: '',
      userAgreement: false,
      disabled_code: false,
      time: sessionStorage.getItem('AuthCodeTime') || 60,
      countDownTime: 60,
      getCodeIntervalTimer: null,
      codeText: '获取验证码',
      submitLocked: false
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions([
      'getUserAccount',
      'getUserInfo'
    ]),
    showAgreementDialog () {
      this.agreementDialogVisable = true
      if (this.agreementContent === null) {
        this.getAgreement().then(value => {
          this.agreementContent = value.Data || null
        })
      }
    },
    /**
     *  获取协议内容
     */
    async getAgreement () {
      const res = await this.$http.get('/ShopAgreement?ProtocalType=3&ShopCertificateID=0')
      return res.data
    },
    /**
     * 更新用户信息
     */
    async updateUserAccountAndUserInfo () {
      await this.getUserAccount()
      await this.getUserInfo()
      return true
    },
    /**
     * 获取验证码
     */
    async getCode () {
      if (!this.disabled_code) {
        const mobile = this.mobile
        if (!(mobile.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(mobile))) {
          return this.$vux.toast.text('请填写正确的手机号')
        }
        let sendTime = sessionStorage.getItem(`${this.mobile}GetMobileCode`)
        if (sendTime) {
          let remainingTime = (new Date().getTime() - sendTime) / 1000
          if (remainingTime < 60) {
            this.$vux.toast.text('重发时间未到')
            this.countDownTime = Math.ceil(60 - remainingTime)
            this.setTimeIntervalTimer()
            return false
          }
        }
        this.disabled_code = true
        this.codeText = '发送中'
        await this.sendMobileCode().then(value => {
          if (value.Code === 100000) {
            sessionStorage.setItem(`${this.mobile}GetMobileCode`, new Date().getTime())
            this.setTimeIntervalTimer()
          } else {
            this.disabled_code = false
            this.codeText = '重新发送'
            this.$vux.toast.text('验证码发送失败')
          }
        })
      }
    },
    /**
     * 设置定时器
     */
    setTimeIntervalTimer () {
      this.disabled_code = true
      this.getCodeIntervalTimer = setInterval(() => {
        if (this.countDownTime > 0) {
          this.countDownTime -= 1
          this.codeText = `${this.countDownTime}s`
        } else {
          this.codeText = '重新发送'
          this.disabled_code = false
          clearInterval(this.getCodeIntervalTimer)
        }
      }, 1000)
    },
    /**
     * 发送验证码
     */
    async sendMobileCode () {
      const res = await this.$http.get('/ValidateCode', { mobile: this.mobile })
      return res.data
    },
    async submit () {
      const that = this
      if (that.submitLocked) {
        return false
      }
      if (!(this.mobile.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(this.mobile))) {
        return this.$vux.toast.text('请填写正确的手机号')
      }
      if (!this.code) {
        return this.$vux.toast.text('请填写验证码')
      }
      if (!this.userAgreement) {
        return this.$vux.toast.text('请仔细阅读《用户注册协议》并勾选后，才可点击下一步')
      }
      this.submitLocked = true
      const res = await this.$http.put(`/ValidateMobile?mobile=${this.mobile}&validateCode=${this.code}`)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: '绑定成功',
          onHide () {
            that.updateUserAccountAndUserInfo().then(() => {
              that.$router.push('/user/authstep2')
            })
          }
        })
      } else {
        this.submitLocked = false
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
///
.bind_mobile_container
{
  background-color: #fff;
  margin: 20px 10px;
  padding: 20px;
  border-radius: 5px;
}
.bind_mobile_cells
{
  display: block;
  position: relative;
  height: 40px;
  margin-bottom: 20px;
  &::after
  {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    height: 1px;
    content: '';
    background-color: rgba(204, 204, 204, .3)
  }
  .input_control
  {
    height: 40px;
    font-size: 14px;
  }
  .send_mobile_code_btn
  {
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    height: 40px;
    font-size: 12px;
    color: rgb(58, 199, 245);
    line-height: 40px;
    padding: 0 5px;
  }
  .disabled_code_btn
  {
    color: #999;
  }
}
.btn_bar
{
  position: fixed;
  bottom: 20px;
  left: 10px;
  right: 10px;
  height: 45px;
  display: flex;
  flex-flow: nowrap;
  .btn
  {
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    border-radius: 5px;
    background-color: #3AC7F5;
    color: #fff;
  }
  .disabled_btn
  {
    background-color: #ccc
  }
}

  .xx-checker {
    padding-left: 25px;
    min-height: 20px;
    line-height: 20px;
    color: #999999;
    font-weight: 400;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    a
    {
      color:#3AC7F5;
    }
  }
  .xx-checker__input {
    position: absolute;
    left: 0;
    top: 0;
    height: 20px;
    width: 20px;
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
  }
  .xx-checker__inner
  {
    border: 1px solid #999999;
    border-radius: 100%;
    width: 16px;
    height: 16px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
  }
  .xx-checker__inner::after {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: #fff;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%) scale(0);
    transition: transform .15s ease-in;
  }
  .xx-checker__original
  {
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
  }
  .xx-checker__original:checked + .xx-checker__inner {
    border-color: #3AC7F5;
  }
  .xx-checker__original:checked + .xx-checker__inner::after {
    background-color: #3AC7F5;
    transform: translate(-50%,-50%) scale(1);
  }
  // 协议
  .agreement_container
  {
    padding: 20px 20px 60px 20px;
    max-height: 90vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch
  }
  .agreement_title
  {
    font-size: 18px;
    font-weight: normal;
    padding-bottom: 10px;
    color: #333;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee
  }
  .agreement_text
  {
    text-align: justify;
    text-indent: 28px;
    font-size: 14px;
    color: #999;
  }
  .agreement_small_title
  {
    font-size: 14px;
    text-align: justify;
    color: #666;
  }
  .pl28px
  {
    padding-left: 28px;
  }
</style>
