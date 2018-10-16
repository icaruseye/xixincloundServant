<template>
  <div class="wrapper">
    <xx-go-back :url="goBackRedirect"></xx-go-back>
    <div class="calendar_wrap">
      <weekCalendar ref="calendarRef" :readOnly="true" :activeDate="activeDate" @change="activeDateChange" @on-change-week="onChangeWeek"></weekCalendar>
    </div>
    <scheduleTable @on-item-click="onClick" :start="startDate" :end="endDate" :isEdit="true"></scheduleTable>
    <button type="button" class="weui-btn weui-btn_primary weui-btn_bottom">保存</button>
  </div>
</template>

<script>
import monthlyCalendar from '../schedule/components/monthlyCalendar'
import weekCalendar from '../schedule/components/weekCalendar'
import scheduleTable from './components/scheduleTable'
import { dateFormat } from 'vux'
export default {
  components: {
    monthlyCalendar,
    weekCalendar,
    scheduleTable
  },
  data () {
    return {
      activeDate: new Date(),
      startDate: null,
      endDate: null,
      count: 1
    }
  },
  computed: {
    goBackRedirect () {
      return this.$route.query.redirect || null
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    activeDateChange (date, calendar) {
      this.activeDate = date
    },
    onChangeWeek (data) {
      this.startDate = dateFormat(data.startDate, 'YYYY-MM-DD')
      this.endDate = dateFormat(data.endDate, 'YYYY-MM-DD')
    },
    onClick () {}
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  padding-bottom: 50px;
}
.weui-btn_bottom {
  position: fixed;
  bottom: 0;
}
.calendar_wrap {
  padding-left: 40px;
  background: #fff;
}
.switchCalander_btn
{
  text-align: center;
  background-color: #fff;
  height: 20px;
  line-height: 20px;
  padding: 5px 0 10px;
  color: #999;
}
</style>
