<template>
  <div class="container">
    <div class="avatar_box">
      <img src="http://xixincloud.com:6883/File/GetImage/5b30fc12ce3fab03b81f5bfb" alt="">
    </div>
    <div class="content_container">
      <h3 class="title">{{'给智障儿童服药' | titleFilter}}</h3>
      <p class="username">用户：假病人</p>
      <p class="time">{{PayTime | timeFormat}}</p>
    </div>
    <div class="price_container">
      <p class="order_price_box">
         价格：<span class="red_font"><span class="big_font">169</span>元</span>
      </p>
      <p class="order_no">订单编号201806031508</p>
    </div>
    <div class="state_container orange_font">
      待付款
    </div>
  </div>
</template>
<script>
export default {
  props: {
    PayTime: ''
  },
  filters: {
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
  display: flex;
  flex-flow: nowrap;
  align-items: center;
  height: 90px;
  background-color: #fff;
  &::after
  {
    position: absolute;
    display: block;
    bottom: 0;
    left: 10px;
    right: 10px;
    content: '';
    height: 1px;
    background-color: RGBA(58, 199, 245, .2); 
    transform: scaleY(.5)
  }
  .avatar_box
  {
    display: flex;
    flex: 0 0 60px;
    justify-content: center;
    align-items: center;
    align-content: center;
    img
    {
      display: block;
      width: 37px;
      border-radius: 50%
    }
  }
  .content_container
  {
    flex: 1;
    .title
    {
      color: #333333;
      font-size: 18px;
      font-weight: 400;
      height: 25px;
    }
    .username
    {
      font-size: 14px;
      color: #666;
      height: 21px;
    }
    .time
    {
      font-size: 12px;
      color: #999;
      height: 14px;
    }
  }
  .price_container
  {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    .order_price_box
    {
      height: 25px;
      font-size: 13px;
      color: #666;
      letter-spacing: 0;
      .red_font
      {
        color: #FF5F5F;
      }
      .big_font
      {
        font-size: 18px;
      }
    }
    .order_no
    {
      display: block;
      height: 14px;
      font-size: 12px;
      color: #999999;
      margin-top: 21px;
    }
  }
  .state_container
  {
    flex: 0 0 60px;
    height: 60px;
    justify-content: flex-start;
    color: #999999;
    font-size: 15px;
    &.orange_font
    {
      color: #F8A519;
    }
  }
}
</style>


