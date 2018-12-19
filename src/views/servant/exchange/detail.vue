<template>
  <div class="wrapper">
    <div class="exchange_list_wrap">
      <div class="item">
        <div class="index used">1</div>
        <div class="content">
          <div class="number">卡号：123123123</div>
          <div class="number">卡密：12312313213</div>
        </div>
        <div class="status">
          <i class="iconfont"></i>
        </div>
      </div>
      <div class="item">
        <div class="index">2</div>
        <div class="content">
          <div class="number">卡号：123123123</div>
          <div class="number">卡密：12312313213</div>
        </div>
        <div class="status">
          <i class="iconfont"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.exchange_list_wrap {
  padding: 12px;
  .item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    background: #fff;
    height: 60px;
    box-shadow: 0 1px 10px #f1f1f1;
    .index {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 100%;
      color: #fff;
      font-size: 30px;
      font-weight: bold;
      background: #3ac7f5;
      &.used {
        background: #e1e1e1;
      }
    }
    .content {
      flex: 1;
      padding: 10px;
      font-size: 14px;
      color: #666;
    }
    .status {}
  }
}
</style>
