<template>
  <div style="padding-bottom: 100px">
    <xx-step-bar :step="detail.State | stepFilter">
      <xx-step-items slot="items">
        申请
      </xx-step-items>
      <xx-step-items slot="items">
        客服审核
      </xx-step-items>
      <xx-step-items slot="items">
        转账
      </xx-step-items>
      <xx-step-items slot="items">
        完成
      </xx-step-items>
    </xx-step-bar>

    <template v-if="detail.State != 0">
      <div class="fail_reason_container" v-if="detail.State == -1">
        <div class="fail_reason_box">
          <label class="fail_reason_title">驳回原因：</label>
          {{detail.FailReason}}
        </div>
      </div>
      <section class="order_idNo_container">
        结算单号：
        {{detail.ForwardID}}
        <p class="pull-right">{{detail.SettlementTime | xxTimeFormatFilter}}</p>
      </section>
      <section class="status_show_container">
        <p style="font-size: 14px;line-height:20px; color:#FABB51;width: 240px;text-align:center">
          <template v-if="detail.State == 1">
            客服审核中！
          </template>
          <template v-if="detail.State == 2">
            客服已审核通过，请注意查收！
          </template>
          <template v-if="detail.State == 3">
            结算已成功！<br/>
            <!-- 2018/06/03 16:30 -->
          </template>
        </p>
        <!-- <p style="font-size: 12px;margin-top:5px;color:#999">
          申请结算方式：
          <span style="color:#3AC7F5">{{detail.BankName}}</span>
        </p> -->
      </section>
    </template>


    <div class="cell_container">
      <div class="cell_items">
        <label class="cell_items_title">
          服务单号
        </label>
        <p class="cell_items_centent">
          {{detail.ServiceID}}
        </p>
        <span class="cell_items_right">
          <i class="iconfont icon-jiantouyou"></i>
        </span>
      </div>

      <div class="service_item_container">
        <div class="service_item_icon_box">
          <img :src="detail.UseType | xxMissionTypeIconFilter" alt="任务">
        </div>
        <div class="service_item_content_container">
          <h3 class="service_item_content_title">{{detail.MissionName}}</h3>
          <!-- <p class="service_item_content_desc text-overflow-1">工作于急诊，擅长消化道危急重症…</p> -->
          <p class="service_item_nickName">用户：{{detail.UserName}}</p>
        </div>
        <div class="service_item_right">
          ￥{{detail.TotalPrice | amountFilter}}元
        </div>
      </div>


      <!-- <div class="cell_items division_line">
        <label class="cell_items_title">
          服务费
        </label>
        <p class="cell_items_centent">
          {{detail.ServicePrice | percentFilter(detail.TotalPrice)}}
        </p>
        <span class="cell_items_right cell_items_right_amount">
          ￥{{detail.ServicePrice | amountFilter}}
        </span>
      </div> -->



      <div class="cell_items division_line">
        <label class="cell_items_title">
          税收
        </label>
        <!-- <p class="cell_items_centent">
          {{detail.TexPrice | percentFilter(detail.TotalPrice)}}
        </p> -->
        <span class="cell_items_right cell_items_right_amount">
          ￥{{detail.TexPrice | amountFilter}}
        </span>
      </div>


      <div class="cell_items division_line">
        <label class="cell_items_title">
          平台技术维护费
        </label>
        <!-- <p class="cell_items_centent">
          {{detail.PlatformPrice | percentFilter(detail.TotalPrice) }}
        </p> -->
        <span class="cell_items_right cell_items_right_amount">
          ￥{{detail.PlatformPrice | amountFilter}}
        </span>
      </div>
      <div class="cell_items division_line">
        <label class="cell_items_title">
          机构佣金
        </label>
        <!-- <p class="cell_items_centent">
          {{detail.OrganizationPrice | percentFilter(detail.TotalPrice)}}
        </p> -->
        <span class="cell_items_right cell_items_right_amount">
          ￥{{detail.OrganizationPrice | amountFilter}}
        </span>
      </div>
      <div class="withdraw_order_count clearfix">
        <div class="pull-right">
          <p class="pull-left" style="margin-right: 27px">
            用户支付金额
            <span style="font-size: 15px;color: #666">￥{{detail.TotalPrice | amountFilter}}</span>
          </p>
          <p class="pull-left">
            服务者实际收入
            <span style="font-size:18px;color:#FF5F5F">￥{{detail.LiftPrice | amountFilter}}</span>
          </p>
        </div>
      </div>
    </div>


    <template  v-if="detail.State == 0 || detail.State == -1">
      <!-- 结算方式选择 -->
      <div class="choose_withdraw_type_btn">
        <div class="cell_items">
            <label class="cell_items_title">
              结算方式
            </label>
            <span class="cell_items_right" style="line-height: 40px;color:#9F9F9F;padding:0 15px">
              钱包
            </span>
        </div>
        <router-link style="display:block;font-size:12px;color:#3AC7F5;text-align:center;margin-top: 10px" to="/agreement/17">点击查看《结算规则》</router-link>
      </div>
      <!-- 申请结算按钮 -->
      <div class="btn_bar">
        <button @click="withdrawApplyConfirm()">
          申请结算
        </button>
      </div>
    </template>
    <!-- 取消申请按钮 -->
    <!-- <div v-if="detail.State == 1" style="padding: 15px 10px" class="clearfix">
      <a href="javascript:void(0)" class="cancle_apply_btn pull-right" @click="cancelWithdrawApply">取消申请</a>
    </div> -->
  </div>
</template>
<script>
export default {
  computed: {
    ID () {
      return this.$route.params.id
    }
  },
  data () {
    return {
      detail: {
        ServicePrice: 0,
        PlatformPrice: 0,
        TotalPrice: 0,
        LiftPrice: 0
      }
    }
  },
  watch: {
    step () {
      this.withdrawTypeChangeEvent = () => {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      await this.getData().then(result => {
        if (result.Code === 100000) {
          this.detail = result.Data
        } else {
          this.$vux.toast.show(result.Msg)
        }
      })
    },
    async getData () {
      const res = await this.$http.get(`/ServantWithDrawRecord/${this.ID}`)
      return res.data
    },
    withdrawApplyConfirm () {
      const that = this
      that.$vux.confirm.show({
        content: `确定要结算到钱包吗？`,
        confirmText: '确定',
        cancelText: '放弃结算',
        onConfirm () {
          that.submitWithdrawApply()
        }
      })
    },
    async submitWithdrawApply () {
      const res = await this.$http.put(`/ServantWithDrawRecordApply/${this.ID}?bankInfoID=1`)
      if (res.data.Code === 100000) {
        this.init()
      } else {
        this.$vux.toast.show(res.data.Msg)
      }
    },
    /**
     * 取消结算申请
     */
    cancelWithdrawApply () {
      const that = this
      that.$vux.confirm.show({
        content: '确定取消结算申请？',
        confirmText: '确定',
        cancelText: '不',
        async onConfirm () {
          const res = await that.$http.put(`/ServantWithReawRecordRemove/${that.ID}`)
          if (res.data.Code === 100000) {
            that.$vux.toast.show({
              text: '取消成功',
              onHide () {
                that.init()
              }
            })
          } else {
            that.$vux.toast.show(res.data.Msg)
          }
        }
      })
    }
  },
  filters: {
    percentFilter (numerator, denominator) {
      if (denominator === 0) {
        return (numerator * 100) + '%'
      } else {
        return (numerator / denominator * 100) + '%'
      }
    },
    amountFilter (value) {
      if (value === 0 || isNaN(value)) {
        return '0.00'
      } else {
        return (value / 100).toFixed(2)
      }
    },
    stepFilter (value = 0) {
      switch (value) {
        case 0:
          return '1'
        case 1:
          return '2'
        case 2:
          return '3'
        case 3:
          return '4'
      }
    }
  }
}
</script>
<style lang="less">
.fail_reason_container{
  background-color: #fff;
  padding: 10px 20px;
  .fail_reason_box
  {
    position: relative;
    padding: 10px 15px 10px 90px;
    font-size: 14px;
    border: 1px solid #ebccd1;
    background-color: #f2dede;
    color: #a94442;
    text-align: justify;
    border-radius: 5px;
    line-height: 20px;
    min-height: 20px;
    .fail_reason_title
    {
      position: absolute;
      display: block;
      height: 20px;
      width: 80px;
      text-align: left;
      line-height: 20px;
      left: 15px;
      top: 10px;
    }
  }
}
// 申请中
.choose_withdraw_type_btn
  {
    height: 40px;
    margin-top: 9px;
    background-color: #fff;
  }
  .btn_bar
  {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 52px;
    display: flex;
    flex-flow: nowrap;
    button
    {
      flex: 1;
       background-color: #3AC7F5;
       height: 100%;
       border: none;
       color: #ffffff;
       font-size: 18px;
       outline: none
    }
  }
  .withdrawTypeVisible_container
  {
    background-color: #fff;
    .head_box
    {
      position: relative;
      height: 52px;
      line-height: 52px;
      font-size: 18px;
      color: #333333;
      text-align: center;
      .icon-fanhui
      {
        position: absolute;
        left: 0;
        display: block;
        width: 40px;
        height: 52px;
        text-align: center;
        color: #CCCCCC;
        font-weight: 600;
      }
    }
    .withdrawType_item
    {
      position: relative;
      display: block;
      height: 50px;
      line-height: 50px;
      padding-left: 54px;
      color: #666;
      &::before
      {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        content: "";
        display: block;
        height: 1px;
        background-color: #E8F9FE
      }
      .code_box
      {
        font-size: 14px;
        color: #999;
      }
      .select_gougou_box
      {
        position: absolute;
        right: 15px;
        top: 0;
        display: block;
        color: #3AC7F5;
      }
    }
      .icon_box
      {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        width: 50px;
        height: 50px;
        text-align: center;
        font-size: 26px;
      }
  }
// 客服审核

  .order_idNo_container
  {
    height: 35px;
    line-height: 35px;
    font-size: 12px;
    padding: 0 12px;
    color: #999999;
  }
  .status_show_container
  {
    display: flex;
    flex-flow: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    height: 90px;
    background: #fff
  }
  .cancle_apply_btn
  {
    display: block;
    height: 30px;
    border: 1px solid #999;
    padding: 0 15px;
    border-radius: 20px;
    font-size: 16px;
    color: #999999;
    line-height: 30px;
  }
// 公共
.cell_container
  {
    margin-top: 10px;
    background-color: #fff
  }
  .cell_items
  {
    position: relative;
    height: 40px;
  }
  .cell_items_title
  {
    font-size: 15px;
    color: #666;
    padding: 0 12px;
    line-height: 40px;
    display: inline-block;
  }
  .cell_items_centent
  {
    display: inline-block;
    font-size: 13px;
    line-height: 40px;
    line-height: 19px;
    color: #999999;
    padding: 0 12px
  }
  .cell_items_right
  {
    position: absolute;
    right: 0;
    top: 0;
  }
  .cell_items_right .iconfont
  {
    display: block;
    line-height: 40px;
    width: 30px;
    color: #CCCCCC;
    text-align: center;
  }
  .service_item_container
  {
    display: flex;
    flex-flow: nowrap;
    height: 80px;
    background-color: #f6f6f6;
  }
  .service_item_icon_box
  {
    display: flex;
    flex: 0 0 57px;
    justify-content: center;
    align-items: center;
    align-content: center;

  }
  .service_item_icon_box img
  {
    width: 27px;
    height: 27px;
  }
  .service_item_content_container
  {
    display: flex;
    flex-flow: column;
    align-items: left;
    justify-content: center;
    flex: 1
  }
  .service_item_content_title
  {
    color: #333333;
    font-size: 15px;
    font-weight: 600;
  }
  .service_item_content_desc
  {
    font-size: 13px;
    color:#676767;
    width: 100%;
  }
  .service_item_nickName
  {
    font-size: 12px;
    color: #999999;
  }
  .service_item_right
  {
    flex: 0 0 110px;
    padding: 0 10px;
    text-align: right;
    padding-top: 10px;
    font-size: 15px;
    color: #666666;
  }
  .cell_items_right_amount
  {
    line-height: 40px;
    color: #FF5F5F;
    padding-right: 13px;
  }
  .division_line
  {
    position: relative;
  }
  .division_line::after
  {
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    border-bottom: 1px dotted #e1e1e1;
    content: "";
    transform: scaleY(.5)
  }
  .withdraw_order_count
  {
    height: 47px;
    line-height: 47px;
    padding: 0 12px;
    font-size: 13px;
    color: #999999;
  }
</style>

