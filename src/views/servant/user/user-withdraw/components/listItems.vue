<template>
  <div class="container" @click="redirectToDetail">
    <i class="icon_box">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-mingshengyinhang"></use>
      </svg>
    </i>
    <div class="content_container">
      <p class="title">提现到尾号1125的储蓄卡</p>
      <p class="create_time">2018-08-08 14:18:44</p>
      <span class="amount">￥56454.99</span>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    redirectToDetail () {
      this.$router.push(`/user/withdraw/1/detail`)
    }
  }
}
</script>

<style lang="less" scoped>
  .container
  {
    position: relative;
    background-color: #fff;
    min-height: 80px;
    padding: 15px 15px 0 64px;
    box-sizing: border-box;
    .icon_box
    {
      position: absolute;
      top: 15px;
      left: 7px;
      width: 50px;
      height: 50px;
      font-size: 36px;
      text-align: center;
      line-height: 50px;
    }
    .content_container
    {
      position: relative;
      padding-bottom: 15px;
      border-bottom: 1px solid #f6f6f6;
      .title
      {
        font-size: 14px;
        color: #666;
      }
      .create_time
      {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
      }
      .amount
      {
        position: absolute;
        right: 0;
        top: 0;
        color: #333
      }
    }
    &:last-child {
      .content_container
      {
        border-bottom: none
      }
    }
  }
</style>

