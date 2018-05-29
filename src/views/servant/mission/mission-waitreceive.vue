<template>
  <div class="wrap">
    <div class="mission-title">服务项</div>
    <mission-info></mission-info>
    <div class="weui-form">
      <mission-step></mission-step>
      <div class="weui-cell nobor">
        <button class="weui-btn weui-btn_primary">我已到达，开始任务</button>
      </div>
    </div>
  </div>
</template>

<script>
import missionInfo from '@/views/servant/mission/mission-info-box'
import missionStep from '@/views/servant/mission/mission-step'
export default {
  components: {
    missionInfo,
    missionStep
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.wrap {
  background: #fff;
  min-height: 100vh;
}
</style>
