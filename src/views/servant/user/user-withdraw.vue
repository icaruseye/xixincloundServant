<template>
  <div>
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="false">
      <tab :line-width="2">
        <tab-item selected @on-item-click="onItemClick">可提现服务单</tab-item>
        <tab-item @on-item-click="onItemClick">已提现服务单</tab-item>
      </tab>
    </sticky>
    <div v-show="tabIndex === 0" class="tabbox">
      <div class="weui-cell-title">服务对象：名好牛</div>
      <div>
        <div class="weui-cell">
          <div class="left">
            <div class="title">换药测试-换药</div>
            <div class="time">2018-05-09 15:28</div>
          </div>
          <div class="mid">
            <div>可提现</div>
            <div>￥12.00</div>
          </div>
          <div class="right">
            <a href="javascript:;" class="btn">提现</a>
          </div>
        </div>
      </div>
    </div>
    <div v-show="tabIndex === 1">
      2
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Sticky } from 'vux'
export default {
  components: {
    Tab,
    TabItem,
    Sticky
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  methods: {
    modified (id) {
      console.log(id)
      this.$router.push(`/user/withdraw/${id}`)
    },
    onItemClick (index) {
      console.log(index)
      this.tabIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.tabbox {
  padding: 0 15px;
  background: #fff;
  .weui-cell-title {
    position: relative;
    padding: 10px 0;
    font-size: 14px;
    color: #999;
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #E5E5E5;
      color: #E5E5E5;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
  .weui-cell {
    display: flex;
    align-items: center;
    .left {
      flex: 1;
      .title {
        font-size: 14px;
        color: #333;
      }
      .time {
        font-size: 13px;
        color: #9e9e9e;
      }
    }
    .mid {
      margin: 0 15px;
      font-size: 16px;
      color: #f8a519;
      text-align: center;
    }
    .right {
      .btn {
        display: block;
        padding: 5px 15px;
        font-size: 14px;
        color: #fff;
        background: #3ecccc;
        border-radius: 2px;
      }
    }
  }
}
</style>

