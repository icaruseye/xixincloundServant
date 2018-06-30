<template>
  <div class="container" :class="OrderInfo.State === 0? 'no_pay' : 'has_payed'">
    <div class="head_container">
      <p class="order_no">提现单编号：{{OrderInfo.ID}}</p>
      <span class="state_box">
        <template v-if="OrderInfo.State === 0">
          可提现
        </template>
        <template v-if="OrderInfo.State === 1 || OrderInfo.State === 2">
          提现中
        </template>
        <template v-if="OrderInfo.State === 3">
          已提现
        </template>
      </span>
    </div>
    <div class="content_container">
      <div class="avatar_box">
        <img src="http://xixincloud.com:6883/File/GetImage/5b30fc12ce3fab03b81f5bfb" alt="">
      </div>
      <h3 class="title">{{OrderInfo.MissionName}}</h3>
      <p class="small_desc_text" style="margin-top: 10px">用户：{{OrderInfo.UserName}}</p>
    </div>
    <div class="bottom_container">
      {{(OrderInfo.State === 0)? '可提现' : '提现金额'}}：
      <b class="price_account">￥{{OrderInfo.LiftPrice | amountFilter}}</b>
      <router-link class="btn" :class="[OrderInfo.State === 0?'blue_btn':'']" :to="`/user/withdraw/${OrderInfo.ID}/detail`">
        {{OrderInfo.State === 0 ? '去提现' : '查看详情'}}
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    OrderInfo: {
      type: Object,
      default: () => {
        return {
          ID: null,
          MissionID: null,
          MissionName: '',
          State: 0,
          LiftPrice: 0,
          UserAvatar: '',
          UserName: ''
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
        border-radius: 50%
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
  .bottom_container
  {
    position: relative;
    height: 50px;
    padding: 0 10px;
    line-height: 50px;
    font-size: 14px;
    color: #999;
    .price_account
    {
      font-size: 16px;
      font-weight: normal;
      color: #3AC7F5
    }
    &::before
    {
      position: absolute;
      top: 0;
      height: 1px;
      left: 10px;
      right: 10px;
      display: block;
      content: '';
      background-color: #eee;
      transform: scaleY(.5)
    }
    .btn
    {
      display: block;
      float: right;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #ddd;
      margin-top: 10px;
      color: #999;
      padding: 0 20px;
      border-radius: 15px;
    }
    .blue_btn
    {
      border-color: #3AC7F5;
      color: #3AC7F5
    }
  }
}
.container.no_pay .head_container .state_box,
.container.no_pay .price_container .price_account
{
  color: #3AC7F5;
}
</style>


