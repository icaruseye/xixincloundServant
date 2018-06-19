<template>
  <div>
    <xx-step-bar :step="step">
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

    <template v-if="step != 1">
      <section class="order_idNo_container">
        提现单号：12015410
        <p class="pull-right">2018/06/03 15:30</p>
      </section>
      <section class="status_show_container">
        <p style="font-size: 14px;line-height:20px; color:#FABB51;width: 240px;text-align:center">
          <template v-if="step == 2">
            客服审核中！
          </template>
          <template v-if="step == 3">
            客服已审核通过，2小时之内转账到申请提现银行卡，请注意查收！
          </template>
          <template v-if="step == 4">
            提现已成功！<br/>
            2018/06/03 16:30
          </template>
        </p>
        <p style="font-size: 12px;margin-top:5px;color:#999">
          申请提现方式：
          <span style="color:#3AC7F5">民生银行</span>
        </p>
      </section>
    </template>
    

    <div class="cell_container">
      <div class="cell_items">
        <label class="cell_items_title">
          服务单号
        </label>
        <p class="cell_items_centent">
          201806031203
        </p>
        <span class="cell_items_right">
          <i class="iconfont icon-jiantouyou"></i>
        </span>
      </div>

      <div class="service_item_container">
        <div class="service_item_icon_box">
          <img src="@/assets/images/icon_tcmr.png" alt="">
        </div>
        <div class="service_item_content_container">
          <h3 class="service_item_content_title">院内陪诊</h3>
          <p class="service_item_content_desc text-overflow-1">工作于急诊，擅长消化道危急重症…</p>
          <p class="service_item_nickName">用户：张梦霞</p>
        </div>
        <div class="service_item_right">
          ￥169元
        </div>
      </div>

      
      <div class="cell_items division_line">
        <label class="cell_items_title">
          服务费
        </label>
        <p class="cell_items_centent">
          60%
        </p>
        <span class="cell_items_right cell_items_right_amount">
          ￥100
        </span>
      </div>

      
      
      <div class="cell_items division_line">
        <label class="cell_items_title">
          税收
        </label>
        <p class="cell_items_centent">
          20%
        </p>
        <span class="cell_items_right cell_items_right_amount">
          ￥2
        </span>
      </div>

      
      <div class="cell_items division_line">
        <label class="cell_items_title">
          平台佣金
        </label>
        <p class="cell_items_centent">
          10%
        </p>
        <span class="cell_items_right cell_items_right_amount">
          ￥10
        </span>
      </div>


      
      <div class="cell_items division_line">
        <label class="cell_items_title">
          机构佣金
        </label>
        <p class="cell_items_centent">
          10%
        </p>
        <span class="cell_items_right cell_items_right_amount">
          ￥59
        </span>
      </div>
      <div class="withdraw_order_count clearfix">
        <div class="pull-right">  
          <p class="pull-left" style="margin-right: 27px">
            用户支付金额 
            <span style="font-size: 15px;color: #666">￥169</span> 
          </p>
          <p class="pull-left">
            服务者实际收入
            <span style="font-size:18px;color:#FF5F5F">￥109</span>   
          </p>
        </div>
      </div>
    </div>


    <template  v-if="step == 1">
      <!-- 提现方式选择 -->
      <div class="choose_withdraw_type_btn" @click="withdrawTypeVisible= !withdrawTypeVisible">
        <div class="cell_items">
            <label class="cell_items_title">
              提现方式
            </label>
            <span class="cell_items_right" style="line-height: 40px;color:#9F9F9F">
              请选择提现方式
              <i class="iconfont icon-jiantouyou pull-right"></i>
            </span>
        </div>
      </div>
      <!-- 申请提现按钮 -->
      <div class="btn_bar">
        <button @click="reload('2')">
          申请提现
        </button>
      </div>
    </template>
    <!-- 取消申请按钮 -->
    <div v-if="step == 2" style="padding: 15px 10px" class="clearfix">
      <a href="javascript:void(0)" class="cancle_apply_btn pull-right">取消申请</a>
    </div>

    
    <div v-transfer-dom>
      <popup v-model="withdrawTypeVisible" position="bottom" max-height="50%">
        <div class="withdrawTypeVisible_container">
          <div class="head_box">
            <i class="iconfont icon-fanhui" @click="withdrawTypeVisible= !withdrawTypeVisible"></i>
            选择提现方式
          </div>
          <ul class="withdrawType_list">
            <li class="withdrawType_item">
              民生银行
            </li>
            <li class="withdrawType_item">
              微信提现
            </li>
            <li class="withdrawType_item">
              添加银行卡
            </li>
          </ul>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { TransferDom, Popup, InlineLoading } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    InlineLoading
  },
  data () {
    return {
      step: '1',
      withdrawTypeVisible: false
    }
  },
  methods: {
    reload (val) {
      this.step = '2'
    }
  }
}
</script>
<style lang="less">
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
      height: 50px;
      line-height: 50px;
      padding-left: 54px;
    }::before
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

