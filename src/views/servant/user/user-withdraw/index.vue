<template>
  <div>
    <div class="step_container">
      <xx-step-bar step="1">
        <xx-step-items slot="items">
          发起提现
        </xx-step-items>
        <xx-step-items slot="items">
          到账成功
        </xx-step-items>
      </xx-step-bar>
    </div>
    <div class="box_warp_container">
      <div class="select_bank_card_container">
        <div class="select_bank_card_title">
          到账银行卡
        </div>
        <div class="select_bank_card_box" @click="withdrawTypeVisible = true">
          <template v-if="currentWithdrawType">
            <div class="bank_info_box clearfix">
              <i class="bank_logo">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="currentWithdrawType.icon | xxGetBankCardLogoFilter"></use>
                </svg>
              </i>
              <h3 class="bank_name">
                {{currentWithdrawType.name}}({{currentWithdrawType.code}})
              </h3>
            </div>
            <p class="bankCard_desc">2小时内到账</p>
          </template>
          <template v-else>
            <i class="bank_logo iconfont icon-yinhangqia" style="color:#3ac7f5"></i>
            <h3 class="bank_name">
              请先选择提现方式
            </h3>
            <p class="bankCard_desc">选择提现方式后才可以提现</p>
          </template>
        </div>
      </div>

      <div class="input_container">
        <h4 class="input_container_title">提现金额</h4>
        <div class="amount_input_control clearfix" @click="numberKeyboardVisible = true">
          <span class="amount_input_prefix">￥</span>
          <span :class="['amount_text_container', numberKeyboardVisible ? 'amount_text_focus_container' : '']">
            {{withdrawAmount}}
          </span>
          <span class="placeholder" v-if="withdrawAmount.length == 0">
              可提现{{canWithdrawAmount.toFixed(2)}}元
            </span>
          <span class="allin_amount" @click.stop="withdrawAmount = (canWithdrawAmount + '')">全部提现</span>
        </div>
        <p class="amount_input_balance">
          <span>
            额外扣除¥0.25服务费（费率0.1%）税费¥5.0（费率0.1%）
          </span>
        </p>
      </div>

      <div class="apply_withdraw_btn_box">
        <button @click="submitWithdrawApply" :class="['apply_withdraw_btn', canWithDraw ? '': 'disabled']">提现</button>
      </div>
    </div>

    <van-number-keyboard
      :show="numberKeyboardVisible"
      extra-key="."
      theme="custom"
      close-button-text="确定"
      @input="numberKeyboardInput"
      @delete="numberKeyboardDelete"
      @blur="numberKeyboardVisible = false"
    />

    <xx-select-Bank-card 
      v-model="withdrawTypeVisible"
      @change="bankCardChange"
      :currentWithdrawType="currentWithdrawType"
    ></xx-select-Bank-card>
  </div>
</template>
<script>
import 'vant/lib/vant-css/base.css'
import xxSelectBankCard from '@/components/common/selectBankCard/index'
export default {
  components: {
    xxSelectBankCard
  },
  data () {
    return {
      currentWithdrawType: null,
      withdrawTypeVisible: false,
      numberKeyboardVisible: false,
      withdrawAmount: '',
      canWithdrawAmount: 1.11
    }
  },
  computed: {
    amountIsOverflow () {
      return parseFloat(this.withdrawAmount) > this.canWithdrawAmount
    },
    canWithDraw () {
      return !this.amountIsOverflow && (this.currentWithdrawType !== null) && parseFloat(this.withdrawAmount) > 0
    }
  },
  methods: {
    submitWithdrawApply () {
      if (this.canWithDraw) {
        const that = this
        that.$vux.confirm.show({
          content: `确定要提现到（*${this.currentWithdrawType.code}）吗？？`,
          confirmText: '确定',
          cancelText: '放弃提现',
          onConfirm () {
            that.$router.replace(`/user/withdraw/1/detail`)
          }
        })
      }
    },
    widthDrawDescAlertShow () {
      this.$vux.alert.show({
        content: 'T+1个工作日指发起提现后的第一个工作日'
      })
    },
    /**
     * 当银行卡发生改变
     */
    bankCardChange (bankCard) {
      this.currentWithdrawType = bankCard
    },
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
  .step_container
  {
    height: 90px;
    background-color: #fff;
  }
  .box_warp_container
  {
    margin: 10px 6px 100px;
    background-color: #fff;
    border-radius: 4px;
    padding-bottom: 18px;
  }
  .select_bank_card_container
  {
    position: relative;
    height: 72px;
    background-color: #F8FCFC;
    border-radius: 4px 4px 0 0;
    text-align: center;
    .select_bank_card_title
    {
      float: left;
      width: 143px;
      text-align: right;
      font-size: 15px;
      color: #333;
      padding-top: 22px;
      height: 22px;
      line-height: 22px;

    }
    .select_bank_card_box
    {
      position: relative;
      float: left;
      margin-left: 19px;
      padding-top: 22px;
      .bank_info_box
      {
        .bank_logo
        {
          float: left;
          font-size: 14px;
          height: 22px;
          line-height: 22px;
        }
        .bank_name
        {
          float: left;
          font-size: 12px;
          height: 22px;
          line-height: 22px;
          font-weight: normal;
          color: #3AC7F5;
          margin-left: 10px;
        }
      }
      .bankCard_desc
      {
        height: 20px;
        color: #CCCCCC;
        font-size: 12px;
        text-align: left;
      }
    }
  }
  .input_container
  {
    margin-top: 20px;
    background-color: #fff;
    .input_container_title
    {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: normal;
      padding: 0 31px;
      color: #333;
    }
    .amount_input_control
    {
      position: relative;
      margin: 0 31px;
      border-bottom: 1px solid #D8F4F2;
      font-size: 24px;
      color: #333;
      padding: 5px 0 2px;
      .placeholder
      {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 15px;
        color: #ccc;
      }
      .allin_amount
      {
        position: absolute;
        right: 0;
        top: 50%;
        font-size: 12px;
        transform: translateY(-50%);
        color: rgba(58, 199, 245, 1)
      }
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
      padding: 0 31px;
      color: #999;
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
  .apply_withdraw_btn_box
  {
    margin: 9px 31px 0;
    .apply_withdraw_btn
    {
      display: block;
      height: 50px;
      background-color: rgba(58, 199, 245, 1);
      color: #fff;
      width: 100%;
      border: none;
      border-radius: 5px;
      &.disabled
      {
        background-color: rgba(58, 199, 245, .5);
        color: #f6f6f6
      }
    }
  }
</style>
