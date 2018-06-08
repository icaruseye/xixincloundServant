<template>
  <div class="wrap">
    <step-bar step="2">
      <step-items slot="items">
        待确认
      </step-items>
      <step-items slot="items">
        服务中
      </step-items>
      <step-items slot="items">
        已完成
      </step-items>
    </step-bar>
    <div class="btn-bar">
      <button type="button" class="weui-btn weui-btn_primary">取消任务</button>
      <button type="button" class="weui-btn weui-btn_primary">生成任务</button>
    </div>
  </div>
</template>

<script>
import { Group, Datetime } from 'vux'
import stepBar from '@/components/common/operationSteps/bar'
import stepItems from '@/components/common/operationSteps/items'
export default {
  components: {
    Group,
    Datetime,
    stepBar,
    stepItems
  },
  data () {
    return {
      step1: false,
      minuteListValue: ''
    }
  }
}
</script>

<style lang="less" scoped>

.btn-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  .weui-btn:nth-child(1) {
    background: #ffc349
  }
}
</style>
