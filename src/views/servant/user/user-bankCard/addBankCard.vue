<template>
  <div>
    <p style="height: 45px;line-height:45px;color:#999;padding-left:12px;font-size:12px">请绑定持卡人本人的银行卡</p>
    <div class="form_container">
      <div class="form_items" @click="hintDialogVisible = true">
        <label class="form_label">
          持卡人
        </label>
        <div class="form_content">
          <p class="form_content_p">{{userInfo.RealName}}</p>
        </div>
        
        <i class="exclamation_mark_icon"></i>
      </div>
      <div class="form_items">
        <label class="form_label" id="bankCard">
          卡号
        </label>
        <div class="form_content">
          <input type="text" id="bankCard" placeholder="请输入银行卡号" v-model="bankCard">
        </div>
      </div>
      <div style="margin: 20px 10px;">
        <button class="weui-btn weui-btn_primary" style="border-radius:4px;box-sizing: border-box" @click="submitEvent">确认绑定</button>
      </div>
    </div>
    <x-dialog v-model="hintDialogVisible">
      <div class="hint_dialog_container">
        <h1 class="hint_title">持卡人说明</h1>
        <p class="hint_text">为了保证账户资金安全，<br/>只能绑定认证账户本人的银行卡。</p>
        <a class="hint_dialog_close_btn" href="javascript:void(0)" @click="hintDialogVisible = false">知道了</a>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {XDialog} from 'vux'
export default {
  components: {
    XDialog
  },
  data () {
    return {
      hintDialogVisible: true,
      submitLocked: false,
      bankCard: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    async submitEvent () {
      const that = this
      if (that.bankCard === null || that.bankCard === '') {
        this.$vux.toast.show({
          width: '60%',
          type: 'text',
          position: 'middle',
          text: '请填写银行卡号'
        })
        return false
      }
      const reg = /^([1-9]{1})(\d{15}|\d{18})$/
      if (!reg.test(that.bankCard)) {
        that.$vux.toast.show({
          width: '60%',
          type: 'text',
          position: 'middle',
          text: '请填写正确的银行卡号'
        })
        return false
      }
      that.$vux.loading.show('正在提交')
      that.submit().then(value => {
        that.$vux.loading.hide()
        if (value.Code === 100000) {
          that.$vux.toast.show({
            text: '添加成功',
            onHide () {
              that.$router.go(-1)
            }
          })
        } else {
          that.$vux.toast.show({
            width: '60%',
            type: 'text',
            position: 'middle',
            text: value.Msg
          })
        }
      })
    },
    async submit () {
      const res = await this.$http.post('/ServantBankInfo', {
        BankCard: this.bankCard,
        BankName: '中国民生银行'
      })
      return res.data
    }
  }
}
</script>

<style lang="less" scoped>
.form_items
{
  position: relative;
  display: flex;
  flex-flow: nowrap;
  height: 60px;
  position: relative;
  background-color: #fff;
  .form_label
  {
    display: flex;
    align-items: center;
    padding-left: 15px;
    color: #666;
    font-size: 18px;
    flex: 0 0 70px;
  }
  .form_content
  {
    display: flex;
    align-items: center;
    flex: 0 0 260px;
    .form_content_p,
    input[type=text] {
      height: 35px;
      width: 100%;
      color: #999;
      padding: 0 10px;
      font-size: 14px;
      line-height: 35px;
      background-color: #f6f6f6;
      outline: none;
      -webkit-tap-highlight-color: rgba(0,0,0,0)
    }
    input::-webkit-input-placeholder{
      color:#ccc;
    }
  }
}

.form_items::after
{
  position: absolute;
  content: '';
  display: block;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E7E7E7;
  transform: scaleY(.5);
  height: 1px;
}
.form_items:last-child:after
{
  display: none;
}
.hint_dialog_container
{
  background-color: #fff;
  border-radius: 4px;
  padding: 20px 45px;
  .hint_title
  {
    font-size: 18px;
    color: #333;
    font-weight: normal;
    text-align: center;
  }
  .hint_text
  {
    margin-top: 14px;
    color: #666;
    font-size: 14px;
    text-align: center;
  }
  .hint_dialog_close_btn
  {
    display: inline-block;
    height: 30px;
    margin-top: 25px;
    line-height: 30px;
    padding: 0 24px;
    color: #fff;
    font-size: 14px;
    background-color: #3AC7F5;
    border-radius: 15px;
  }
}

  .exclamation_mark_icon
  {
    position: relative;
    width: 15px;
    height: 15px;
    display: flex;
    flex-flow: column;
    background-color: #3AC7F5;
    font-size: 4px;
    text-align: center;
    line-height: 1;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
    align-content: center;
    align-items: center;
  }
  .exclamation_mark_icon::before,
  .exclamation_mark_icon::after
  {
    content: "";
    display: block;
    width: 1px;
    background-color: #fff;
  }
  .exclamation_mark_icon::before
  {
    height: 1px;
    margin-top: 4px;
  }
  .exclamation_mark_icon::after
  {
    margin-top: 2px;
    content: "";
    display: block;
    height: 4px;
  }
</style>

