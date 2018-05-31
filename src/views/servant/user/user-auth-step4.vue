<template>
  <div>
    <step-bar :list="stepInfo"></step-bar>
    <div class="panel">
      <div class="cell vux-1px-b">
        <input type="text" placeholder="请输入手机号">
      </div>
      <div class="cell">
        <input type="text" placeholder="请输入手机验证码">
        <button disabled="" class="auth-code">获取验证码</button>
      </div>
    </div>
    <div class="xx-readme">
      <label for="auth"><input type="checkbox" id="auth">我已阅读并同意<a href="javascript:;">《用户注册协议》</a></label>
    </div>
    <div class="step-btn">
      <button class="weui-btn">确定</button>
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
        type: 0
      }, {
        text: '执业认证',
        type: 0
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
  padding: 15px 15px 0;
  display: flex;
  color: #666;
  input {
    flex: 1;
    padding: 13px;
    font-size: 15px;
  }
  .auth-code {
    border: 0;
    background: transparent;
    color: #3AC7F5;
    font-size: 16px;
  }
  &.vux-1px-b:after {
    left: 15px;
    right: 15px;
    border-color: #ccc;
    opacity: .5;
  }
  ::-webkit-input-placeholder {
    color: #ccc
  }
}

.xx-readme {
  label {
    display: flex;
    padding: 5px 28px;
    font-size: 13px;
    color: #666;
    align-items: center;
  }
  input {
    position: relative;
    margin-right: 4px;
    top: -2px;
    width: 14px;
    height: 14px;
  }
  a {
    color: #3BC8F6
  }
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
