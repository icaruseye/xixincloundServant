<template>
  <div class="wrapper">
    <xx-go-back></xx-go-back>
    <div class="exchange_list">
      <div class="item">
        <div class="left">
          <div class="name course">课程兑换码</div>
          <div class="date">2018-08-12 12:21:00</div>
        </div>
        <div class="right applying">等待审核</div>
      </div>
      <div class="item">
        <div class="left">
          <div class="name service">服务兑换码</div>
          <div class="date">2018-08-12 12:21:00</div>
        </div>
        <div class="right success">审核通过</div>
      </div>
      <div class="item">
        <div class="left">
          <div class="name course">课程兑换码</div>
          <div class="date">2018-08-12 12:21:00</div>
        </div>
        <div class="right applying">等待审核</div>
      </div>
      <div class="item">
        <div class="left">
          <div class="name course">课程兑换码</div>
          <div class="date">2018-08-12 12:21:00</div>
        </div>
        <div class="right fail">审核失败</div>
      </div>
    </div>
    <button type="button" class="weui-btn weui-btn_primary weui-btn-bottom" @click="toApply">申请兑换码</button>
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
    toApply () {
      this.$router.push('/app/exchange/apply')
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  background: #fcfcfc;
  min-height: 100vh;
}
.exchange_list {
  .item {
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid #eaeaeb;
    .left {
      flex: 1;
      .name {
        font-size: 15px;
        color: #3ecccc;
        &.course {
          color: #3ecccc;
        }
        &.service {
          color: #3ac7f5;
        }
      }
      .date {
        font-size: 13px;
        color: #b9b9b9;
      }
    }
    .right {
      font-size: 14px;
      color: #777;
      &.success {
        color: #67C23A;
      }
      &.applying {
        color: #E6A23C;
      }
      &.fail {
        color: #F56C6C;
      }
    }
  }
}
</style>
