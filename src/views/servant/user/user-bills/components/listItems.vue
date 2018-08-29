<template>
  <div class="container">
    <div class="content_container">
      <p class="title">{{Type}}</p>
      <p class="create_time">{{CreateTime | xxTimeFormatFilter}}</p>
      <span class="amount">￥{{Amount | amountCompute}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Amount: {
      type: Number,
      default: 0
    },
    Type: {
      type: Number,
      default: 0
    },
    CreateTime: {
      type: String,
      default: ''
    }
  },
  filters: {
    amountCompute (amount = null) {
      return amount === null ? 0 : (amount / 100).toFixed(2)
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
    padding: 15px 15px 0 15px;
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

