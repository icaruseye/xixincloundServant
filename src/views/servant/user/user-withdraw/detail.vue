<template>
  <div>
    <xx-step-bar :step="step">
      <xx-step-items slot="items">
        申请
      </xx-step-items>
      <xx-step-items slot="items">
        客服审核
      </xx-step-items>
      <xx-step-items slot="items">
        转账
      </xx-step-items>
      <xx-step-items slot="items">
        完成
      </xx-step-items>
    </xx-step-bar>
    <apply v-if="step == 1" @changeStep=changeStep></apply>
    <auditing v-if="step == 2"></auditing>
  </div>
</template>
<script>
import Apply from './include/apply'
import Auditing from './include/auditing'
export default {
  components: {
    Apply,
    Auditing
  },
  data () {
    return {
      step: '2'
    }
  },
  methods: {
    changeStep (val) {
      this.step = val
    }
  }
}
</script>
