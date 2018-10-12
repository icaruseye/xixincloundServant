<template>
  <div class="calendar_container">
    <transition enter-active-class="animated fadeIn">
      <div v-if="loading" class="loading_shadow_container">
        <xxLoading>加载中…</xxLoading>
      </div>
    </transition>
    <div class="calendar_header_container">
      <div class="front_items" @click="setTodayActive">今日</div>
      <div class="arrows_items" @click="goPreMonth">
        <i class="iconfont icon-sanjiao-left"></i>
      </div>
      <div class="content_items">
        {{selectedMonth | xxTimeFormatFilter('YYYY年MM月')}}排班表
      </div>
      <div class="arrows_items" @click="goNextMonth">
        <i class="iconfont icon-sanjiao-right"></i>
      </div>
      <div class="end_items"></div>
    </div>
    <div class="calendar_content_container">
      <table class="calendar_content_table">
        <thead>
          <tr>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
            <th>日</th>
          </tr>
        </thead>
        <tbody v-if="dateList && dateList.length > 0">
          <tr v-for="row in Math.floor(dateList.length / 7)" :key="row">
            <td v-for="col in 7" :key="col" :class="[dateList[(row - 1) * 7 + col - 1].hasPlan ? 'hasSchedule_td' : '']">
              <div :class="['date_dev', dateList[(row - 1) * 7 + col - 1].isCurMonth ? 'curMonth' : '', dateList[(row - 1) * 7 + col - 1].isActive ? 'isActive' : '', dateList[(row - 1) * 7 + col - 1].isToday ? 'isToday' : '', dateList[(row - 1) * 7 + col - 1].hasPlan ? 'hasSchedule' : '']" @click="clickDate(dateList[(row - 1) * 7 + col - 1])">
                <span class="date_span">
                  {{dateList[(row - 1) * 7 + col - 1].day}}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import util from '@/plugins/util'
export default {
  props: {
    activeDate: {
      type: Date,
      default: () => new Date()
    },
    hasScheduleList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: false,
      selectedMonth: new Date()
    }
  },
  updated () {
    this.drawRadius()
  },
  watch: {
    selectedMonth () {
      this.drawRadius()
    }
  },
  mounted () {
    this.selectedMonth = this.activeDate || new Date()
  },
  methods: {
    getZeroTime (date) {
      date.setHours(0)
      date.setSeconds(0)
      date.setMinutes(0)
      return date
    },
    drawRadius () {
      let a = document.querySelectorAll('.hasSchedule_td')
      for (let i = 0; i < a.length; i++) {
        a[i].classList.remove('row_start')
        a[i].classList.remove('row_end')
        let nextNode = a[i].nextElementSibling
        if (nextNode && this.hassClass(nextNode, 'hasSchedule_td')) {
        } else {
          a[i].classList.add('row_end')
        }
        let preNode = a[i].previousElementSibling
        if (preNode && this.hassClass(preNode, 'hasSchedule_td')) {
        } else {
          a[i].classList.add('row_start')
        }
      }
    },
    hassClass (element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1
    },
    dateInHasScheduleList (date) {
      let flag = {status: false}
      let date1 = util.timeFormatFilter(date, 'YYYY-MM-DD')
      this.hasScheduleList.map((item, index) => {
        let date2 = util.timeFormatFilter(item, 'YYYY-MM-DD')
        if (date1 === date2) {
          flag.status = true
          flag.index = index
        }
      })
      return flag
    },
    clickDate (date) {
      if ((date.date.getTime() > this.getZeroTime(new Date()).getTime())) {
        this.loading = true
        if (date.hasPlan) {
          this.$emit('removePlanToDate', date, this)
        } else {
          this.$emit('addPlanToDate', date.date, this)
        }
      }
    },
    setTodayActive () {
      this.dateChange(new Date())
    },
    dateChange (date) {
      this.selectedMonth = date
      this.$emit('change', date, this)
    },
    goPreMonth () { // 上一个月
      let curDate = new Date(this.fromtDate(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, this.selectedMonth.getDate()))
      let curMonth = curDate.getMonth()
      curDate.setMonth(curMonth - 1)
      this.selectedMonth = curDate
    },
    goNextMonth () { // 下一个月
      let curDate = new Date(this.fromtDate(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, this.selectedMonth.getDate()))
      let curMonth = curDate.getMonth()
      curDate.setMonth(curMonth + 1)
      this.selectedMonth = curDate
    },
    addZero (num) {
      return num < 10 ? `0${num}` : num
    },
    fromtDate (year, month, day) {
      return `${year}-${this.addZero(month)}-${this.addZero(day)}`
    }
  },
  computed: {
    currentMonthDays () { // 所选月当月天数
      let curDate = new Date(this.fromtDate(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 1))
      let curMonth = curDate.getMonth()
      curDate.setMonth(curMonth + 1)
      curDate.setDate(0)
      return curDate.getDate()
    },
    preMonthDays () { // 所选月上月天数
      let curDate = new Date(this.fromtDate(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 1))
      let curMonth = curDate.getMonth()
      curDate.setMonth(curMonth)
      curDate.setDate(0)
      return curDate.getDate()
    },
    currentMonthFirstDay () { // 所选月当月第一天日期
      return this.fromtDate(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 1)
    },
    currentMonthFirstDayWeek () { // 所选月当月月第一天为星期几
      return new Date(this.currentMonthFirstDay).getDay()
    },
    currentMonthLastDay () { // 所选月当月最后一天日期
      return this.fromtDate(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, this.currentMonthDays)
    },
    currentMonthLastDayWeek () { // 所选月当月月最后一天为星期几
      return new Date(this.currentMonthLastDay).getDay()
    },
    dateList () { // 日历表
      let list = []
      let today = new Date()
      let index = 0
      for (let i = (this.preMonthDays - (this.currentMonthFirstDayWeek === 0 ? 7 : this.currentMonthFirstDayWeek) + 1 + 1); i <= this.preMonthDays; i++) {
        let date = new Date(this.fromtDate(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 1))
        date.setMonth(date.getMonth() - 1)
        date.setDate(i)
        let thisDateTime = new Date(this.fromtDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
        let dateInHasSchedule = this.dateInHasScheduleList(thisDateTime)
        list.push({
          date: thisDateTime,
          isCurMonth: false,
          day: i,
          hasPlan: dateInHasSchedule.status,
          hasPlanIndex: dateInHasSchedule.index
        })
        index += 1
      }
      for (let i = 0; i < this.currentMonthDays; i++) {
        let date = new Date(this.fromtDate(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, i + 1))
        let thisDateTime = new Date(this.fromtDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
        let dateInHasSchedule = this.dateInHasScheduleList(thisDateTime)
        list.push({
          isCurMonth: true,
          day: i + 1,
          date: thisDateTime,
          isToday: today.getFullYear() === this.selectedMonth.getFullYear() && today.getMonth() === this.selectedMonth.getMonth() && today.getDate() === (i + 1),
          hasPlan: dateInHasSchedule.status,
          hasPlanIndex: dateInHasSchedule.index
        })
        index += 1
      }
      for (let i = 0; i < (42 - index); i++) {
        let date = new Date(this.fromtDate(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 1))
        date.setMonth(date.getMonth() + 1)
        date.setDate(i + 1)
        let thisDateTime = new Date(this.fromtDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
        let dateInHasSchedule = this.dateInHasScheduleList(thisDateTime)
        list.push({
          isCurMonth: false,
          date: thisDateTime,
          day: i + 1,
          hasPlan: dateInHasSchedule.status,
          hasPlanIndex: dateInHasSchedule.index
        })
      }
      return list
    }
  }
}
</script>

<style lang="less" scoped>
.calendar_container
{
  position: relative;
  .loading_shadow_container
  {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 2;
    background-color: rgba(255, 255, 255, .8)
  }
}
.calendar_header_container
{
  display: flex;
  flex-flow: nowrap;
  height: 40px;
  background-color: #fff;
  .front_items,
  .end_items
  {
    display: flex;
    flex: 0 0 54px;
    justify-content: center;
    align-items: center;
  }
  .front_items
  {
    font-size: 14px;
    color: #3AC7F5;
  }
  .arrows_items
  {
    display: flex;
    flex: 0 0 40px;
    justify-content: center;
    align-items: center;
    .iconfont
    {
      font-size: 12px;
      color: #D8D8D8;
    }
  }
  .content_items
  {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #333;
  }
}
.calendar_content_container
{
  padding: 10px 0;
  background-color: #fff;
  .calendar_content_table
  {
    border-collapse: collapse;
    width: 100%;
    th
    {
      height: 25px;
      font-size: 14px;
      color: #686868;
      font-weight: normal;
    }
    td
    {
      height: 42px;
      text-align: center;
      div
      {
        position: relative;
        font-size: 14px;
        height: 25px;
        line-height: 25px;
        color: #ccc;
        &.curMonth
        {
          color: #666;
        }
        .date_span
        {
          position: absolute;
          display: block;
          left: 50%;
          top: 50%;
          width: 28px;
          height: 28px;
          margin-left: -14px;
          margin-top: -14px;
          border-radius: 50%;
          line-height: 28px;
          box-sizing: border-box;
        }
        &.isToday
        {
          .date_span
          {
            border: 1px solid #3AC7F5;
            color: #3AC7F5;
            &::before
            {
              position: absolute;
              display: block;
              content: '';
              width: 4px;
              height: 4px;
              border-radius: 50%;
              left: 50%;
              top: 2px;
              background-color: #3AC7F5;
              margin-left: -2px;
            }
          }
        }
        &.isActive
        {
          .date_span
          {
            border: 1px solid #3AC7F5;
            color: #fff;
            background-color: #3AC7F5
          }
        }
        &.isActive.isToday
        {
          .date_span
          {
            &::before
            {
              background-color: #fff;
            }
          }
        }
      }
      &.hasSchedule_td
      {
        .date_dev
        {
          background-color: #F2F2F2;
        }
        &.row_end
        {
          .date_dev
          {
            border-bottom-right-radius: 12px;
            border-top-right-radius: 12px;
          }
        }
        &.row_start
        {
          .date_dev
          {
            border-bottom-left-radius: 12px;
            border-top-left-radius: 12px;
          }
        }
      }
    }
  }
}
</style>
