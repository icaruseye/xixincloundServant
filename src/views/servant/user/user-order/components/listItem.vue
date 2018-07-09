<template>
  <div class="container" :class="UserOrder.State == 2? 'has_payed' : 'no_pay'">
    <div class="head_container">
      <p class="order_no">{{UserOrder.OrderID}}</p>
      <span class="state_box">{{UserOrder.State == 2 ? '已付款' : '待付款'}}</span>
    </div>
    <div class="content_container">
      <div class="avatar_box">
        <img :src="Avatar | transformImgUrl" alt="">
      </div>
      <h3 class="title">{{PackageName}}</h3>
      <p class="small_desc_text" style="margin-top: 10px">购买用户：{{UserName}}</p>
      <p class="small_desc_text">
        创建时间：{{UserOrder.CreateTime | xxTimeFormatFilter}}
      </p>
      <p class="small_desc_text" v-if="UserOrder.State == 2">
        付款时间：{{UserOrder.PayTime | xxTimeFormatFilter}}
      </p>
    </div>
    <div class="price_container">
      <template v-if="UserOrder.State === 2">
        已付款：
        <b class="price_account">￥{{UserOrder.RealPayPrice | amountFilter}}</b>
      </template>
      <template v-else>
        应付款：
        <b class="price_account">￥{{UserOrder.ShouldPayPrice | amountFilter}}</b>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Avatar: {
      type: String,
      default: ''
    },
    PackageName: {
      type: String,
      default: ''
    },
    UserName: {
      type: String,
      default: ''
    },
    UserOrder: {
      type: Object,
      default: () => {
        return {
          OrderID: '',
          PayTime: '',
          RealPayPrice: 0,
          State: 0
        }
      }
    }
  },
  filters: {
    amountFilter (value = 0) {
      return (value / 100).toFixed(2)
    },
    titleFilter (value = '') {
      return value.length > 5 ? value.substring(0, 5) + '…' : value
    },
    timeFormat (value = '') {
      value = value.replace('T', ' ')
      return value
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.container
{
  position: relative;
  background-color: #fff;
  margin-bottom: 10px;
  .head_container
  {
    position: relative;
    height: 40px;
    padding: 0 10px;
    .order_no
    {
      font-size: 12px;
      color: #999;
      height: 40px;
      line-height: 40px;
    }
    .state_box
    {
      position: absolute;
      right: 10px;
      top: 0;
      font-size: 12px;
      display: block;
      height: 40px;
      line-height: 40px;
      color: #999;
    }
  }
  .content_container
  {
    position: relative;
    padding: 15px 10px 15px 60px;
    min-height: 50px;
    background-color: RGBA(246, 246, 246, .8);
    .avatar_box
    {
      position: absolute;
      left: 10px;
      top: 15px;
      width: 40px;
      height: 40px;
      img{
        display: block;
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .title
    {
      font-size: 14px;
      color: #333;
      line-height: 18px;
      text-align: justify;
      word-break: break-all;
      font-weight: normal;
    }
    .small_desc_text
    {
      font-size: 12px;
      line-height: 18px;
      color: #999;
    }
  }
  .price_container
  {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    text-align: right;
    font-size: 14px;
    color: #999;
    .price_account
    {
      font-size: 16px;
      font-weight: normal;
    }
  }
}
.container.no_pay .head_container .state_box,
.container.no_pay .price_container .price_account
{
  color: #3AC7F5;
}
</style>


