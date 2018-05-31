<template>
  <div>
    <step-bar :list="stepInfo"></step-bar>
    <div class="panel">
      <div class="cell vux-1px-b">
        <div class="cell-in">
          <div class="title"><span>护士</span></div>
          <button class="btn">申请</button>
        </div>
      </div>
      <div class="cell vux-1px-b">
        <div class="cell-in">
          <div class="title"><span>护士</span></div>
          <button class="btn">申请</button>
        </div>
      </div>
      <div class="cell">
        <div class="cell-in">
          <div class="title"><span>护士</span></div>
          <button class="btn">申请</button>
        </div>
      </div>
    </div>
    <div class="weui-form-title">
      *以上执业资格证书审核通过任意一项后，即可申请 相关服务项，进行服务
    </div>
    <div class="step-btn">
      <button class="weui-btn">上一步</button>
    </div>
  </div>
</template>

<script>
import stepBar from './user-auth-stepbar'
export default {
  components: {
    stepBar
  },
  data () {
    return {
      stepInfo: [{
        text: '手机认证',
        type: 1
      }, {
        text: '实名认证',
        type: 1
      }, {
        text: '执业认证',
        type: 1
      }, {
        text: '开始服务',
        type: 0
      }]
    }
  }
}
</script>

<style lang="less" scoped>
.panel {
  margin-top: 10px;
  background: #fff;
}

.cell {
  padding: 30px 15px 0;
  color: #666;
  .cell-in {
    display: flex;
    align-items: center;
    padding: 0 0 10px 9px;
    .title {
      flex: 1;
      font-size: 16px;
      color: #666;
    }
    .btn {
      width: 65px;
      height: 28px;
      color: #fff;
      border-radius: 2px;
      border: 0;
      font-size: 15px;
      background: #3BC8F6;
      &.pass {
        background: #F8A519
      }
    }
  }
  &.vux-1px-b:after {
    left: 15px;
    right: 15px;
    border-color: #ccc;
    opacity: .5;
  }
}

.weui-form-title {
  padding: 10px 24px;
  color: #D4D4D4;
  font-size: 14px;
}

.step-btn {
  position: fixed;
  bottom: 23px;
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  .weui-btn {
    padding: 0;
    background: #3BC8F6;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 16px;
  }
}
</style>
