<template>
  <div>
    <div class="select_bank_card_container">
      <i class="bank_logo">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="'CMBC' | xxGetBankCardLogoFilter"></use>
        </svg>
      </i>
      <h3 class="bank_name">
        中国民生银行
      </h3>
      <p class="bankCard_desc">尾号5112储蓄卡</p>
      <i class="iconfont icon-jiantouyou"></i>
    </div>

    <div class="input_container">
      <h4 class="input_container_title">提现金额</h4>
      <div class="amount_input_control clearfix" @click="numberKeyboardVisible = true">
         <span class="amount_input_prefix">￥</span>
         <span :class="['amount_text_container', numberKeyboardVisible ? 'amount_text_focus_container' : '']">
           {{withdrawAmount}}
         </span>
         <i v-if="withdrawAmount.length > 0" class="clear_amout_btn iconfont icon-shanchuguanbicha2" @click.stop="clearAmount"></i>
      </div>
      <p class="amount_input_balance">
        <span>
          可提现金额{{canWithdrawAmount.toFixed(2)}}元
          <span class="allin_amount" @click="withdrawAmount = (canWithdrawAmount + '')">全部提现</span>
        </span>
      </p>
    </div>

    <van-number-keyboard
      :show="numberKeyboardVisible"
      extra-key="."
      theme="custom"
      close-button-text="完成"
      @input="numberKeyboardInput"
      @delete="numberKeyboardDelete"
      @blur="numberKeyboardVisible = false"
    />
  </div>
</template>
<script>
import 'vant/lib/vant-css/base.css'
export default {
  data () {
    return {
      numberKeyboardVisible: false,
      withdrawAmount: '',
      canWithdrawAmount: 1.11
    }
  },
  computed: {
    amountoverIsflow () {
      
    }
  },
  methods: {
    clearAmount () {
      this.withdrawAmount = ''
    },
    numberKeyboardInput (key) {
      this.setWithdrawAmount(this.withdrawAmount + '' + key)
    },
    numberKeyboardDelete () {
      let len = this.withdrawAmount.length
      this.setWithdrawAmount(this.withdrawAmount.substring(0, len - 1))
    },
    setWithdrawAmount (amount) {
      const reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/
      if (amount.length <= 0) {
        this.withdrawAmount = ''
        return false
      } else if (amount.indexOf('.') === -1) {
        this.withdrawAmount = (parseInt(amount) + '')
        return false
      } else if (!reg.test(amount)) {
        return false
      } else {
        this.withdrawAmount = amount
        return false
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .select_bank_card_container
  {
    position: relative;
    padding: 10px 0 0 80px;
    box-sizing: border-box;
    height: 60px;
    background-color: #fff;
    margin-top: 40px;
    border-style: solid;
    border-width: 1px 0 1px 0;
    border-color: #ddd;
    .bank_logo
    {
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      height: 60px;
      width: 80px;
      text-align: center;
      line-height: 60px;
      font-size: 40px;
    }
    .bank_name
    {
      height: 20px;
      font-size: 16px;
      line-height: 20px;
      font-weight: normal;
    }
    .bankCard_desc
    {
      height: 20px;
      color: #999;
      font-size: 14px;
    }
    .icon-jiantouyou
    {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #999
    }
  }
  .input_container
  {
    border-style: solid;
    border-width: 1px 0 1px 0;
    border-color: #ddd;
    margin-top: 20px;
    background-color: #fff;
    .input_container_title
    {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: normal;
      padding: 0 20px
    }
    .amount_input_control
    {
      position: relative;
      margin: 0 20px;
      border-bottom: 1px solid #D8F4F2;
      font-size: 24px;
      color: #333;
      padding: 5px 0 2px;
      .amount_input_prefix
      {
        display: block;
        float: left;
        height: 30px;
        line-height: 30px;
        color: #333;
        margin-right: 10px;
      }
      .clear_amout_btn
      {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #999
      }
      .amount_text_container
      {
        display: block;
        float: left;
        padding-right: 5px;
        height: 30px;
        line-height: 30px;
      }
      .amount_text_focus_container
      {
        position: relative;
        &::after
        {
          position: absolute;
          right: 0;
          top: 2px;
          bottom: 2px;
          width: 2px;
          display: block;
          content: '';
          animation: blinkAnimation 1s linear infinite;
        }
      }
    }
    .amount_input_balance
    {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      padding: 0 20px;
      color: #999;
      .allin_amount
      {
        float: right;
        color: rgba(58, 199, 245, 1)
      }
    }
  }
  @keyframes blinkAnimation {
    0% {
      background-color: rgba(58, 199, 245, 0)
    }
    50% {
      background-color: rgba(58, 199, 245, 1)
    }
    100% {
      background-color: rgba(58, 199, 245, 0)
    }
  }
</style>
