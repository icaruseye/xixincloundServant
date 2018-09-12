<template>
  <div>
    <xx-go-back></xx-go-back>
    <weekCalendar v-if="!monthCalendar" ref="calendarRef" :activeDate="activeDate" @change="activeDateChange"></weekCalendar>
    <monthlyCalendar v-if="monthCalendar" ref="calendarRef" :activeDate="activeDate" @change="activeDateChange"></monthlyCalendar>
    <div class="switchCalander_btn" @click="monthCalendar = !monthCalendar">
      <i v-if="!monthCalendar" class="iconfont icon-jiantouxia"></i>
      <i v-if="monthCalendar" class="iconfont icon-jiantoushang"></i>
    </div>
    <scheduleList :list="schedules" :activeDate="activeDate" @addSuccess="scheduleAddPlan"></scheduleList>
  </div>
</template>
<script>
import scheduleList from './components/scheduleList'
import monthlyCalendar from './components/monthlyCalendar'
import weekCalendar from './components/weekCalendar'
import util from '@/plugins/util'
export default {
  components: {
    scheduleList,
    monthlyCalendar,
    weekCalendar
  },
  data () {
    return {
      monthCalendar: false,
      activeDate: new Date(),
      schedules: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    scheduleAddPlan (plan) {
      this.schedules.unshift(plan)
      this.$refs.calendarRef.hasScheduleList.push(util.timeFormatFilter(this.activeDate))
    },
    init () {
      this.getPlansByDateTime(this.activeDate).then(result => {
        if (result.Code === 100000) {
          this.schedules = result.Data.ScheduleResponses
        }
      })
    },
    activeDateChange (date, calendar) {
      this.activeDate = date
      let startTime = new Date().getTime()
      this.getPlansByDateTime(date).then(result => {
        let endTime = new Date().getTime()
        let intervalTime = endTime - startTime
        setTimeout(function () {
          calendar.loading = false
        }, (intervalTime < 500) ? (500 - intervalTime) : intervalTime)
        if (result.Code === 100000) {
          this.schedules = result.Data.ScheduleResponses
        }
      })
    },
    async getPlansByDateTime (date) {
      const result = await this.$http.get(`/Schedule/List`, {
        dateTime: util.timeFormatFilter(date, 'YYYY-MM-DD')
      })
      return result.data
    }
  }
}
</script>
<style lang="less" scoped>
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


