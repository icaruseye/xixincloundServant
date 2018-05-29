<template>
  <div>
    <div style="border-bottom: 1px solid #e1e1e1">
      <inline-calendar
      ref="calendar"
      @on-change="calendarChange"
      class="inline-calendar-demo"
      v-model="calendarVal"
      :highlight-weekend="true"
      :replace-text-list="{'TODAY':'今'}"
      :disable-past="true">
      </inline-calendar>
    </div>
    <div>
      <div class="weui-cell">
        <div class="left">
          <div><span>开始：2018-05-05 13:00</span></div>
          <div><span>结束：2018-05-05 13:00</span></div>
        </div>
        <div class="right">
          <span class="type-1">空闲</span>
          <!-- <span class="type-2">繁忙</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { InlineCalendar } from 'vux'
export default {
  components: {
    InlineCalendar
  },
  data () {
    return {
      calendarVal: 'TODAY'
    }
  },
  methods: {
    calendarChange (val) {
      console.log('on-change', val)
    }
  }
}
</script>

<style lang="less" scoped>
.weui-cell {
  padding: 15px;
  background: #fff;
  display: flex;
  align-items: center;
  color: #666;
  .left {
    font-size: 14px;
    flex: 1;
  }
  .right {
    .type-1 {
      color: #3ecccc;
    }
  }
}
</style>

