<template>
  <div class="calendar_container">
    <transition enter-active-class="animated fadeIn">
      <div v-if="loading" class="loading_shadow_container">
        <xxLoading>加载中…</xxLoading>
      </div>
    </transition>
    <div class="calendar_header_container">
      <div class="front_items" @click="setTodayActive">今日</div>
      <div class="arrows_items" @click="preWeek">
        <i class="iconfont icon-sanjiao-left"></i>
      </div>
      <div class="content_items">
        {{startDate | xxTimeFormatFilter('MM.DD')}}-{{endDate | xxTimeFormatFilter('MM.DD')}}排班表
      </div>
      <div class="arrows_items" @click="nextWeek">
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
        <tbody>
          <tr>
            <td v-for="(date, index) in dateList" :key="index" :class="[dateInHasScheduleList(date.date) ? 'hasSchedule_td' : '']">
              <div :class="['date_dev', date.isActive ? 'isActive': '', date.isCurMonth ? 'curMonth' : '', date.isToday ? 'isToday' : '',dateInHasScheduleList(date.date) ? 'hasSchedule' : '']" @click="setActiveDate(date.date)">
                <span class="date_span">
                  {{date.date | xxTimeFormatFilter('DD')}}
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
      default: new Date()
    }
  },
  data () {
    return {
      loading: false,
      startDate: new Date(),
      endDate: new Date(),
      hasScheduleList: []
    }
  },
  mounted () {
    this.setStartAndEndDate()
  },
  computed: {
    dateList () {
      let list = []
      for (let i = 0; i < 7; i++) {
        let date = this.addDayToDate(this.startDate, i)
        list.push({
          date: date,
          isToday: this.datesIsEqual(new Date(), date),
          isActive: this.datesIsEqual(this.activeDate, date),
          isCurMonth: this.monthISEqual(this.activeDate, date)
        })
      }
      return list
    }
  },
  watch: {
    activeDate () {
      this.setStartAndEndDate()
    },
    startDate () {
      this.getListHasSchedule()
      this.drawRadius()
    }
  },
  updated () {
    this.drawRadius()
  },
  methods: {
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
      let flag = false
      let date1 = util.timeFormatFilter(date, 'YYYY-MM-DD')
      this.hasScheduleList.map(item => {
        let date2 = util.timeFormatFilter(item, 'YYYY-MM-DD')
        if (date1 === date2) {
          flag = true
        }
      })
      return flag
    },
    getListHasSchedule () {
      let startTime = util.timeFormatFilter(this.startDate, 'YYYY-MM-DD 00:00:00')
      let endDate = util.timeFormatFilter(this.endDate, 'YYYY-MM-DD 23:59:59')
      this.$http.get(`/Schedule/IsNoSchedule?startTime=${startTime}&endTime=${endDate}`).then(result => {
        if (result.data.Code === 100000) {
          this.hasScheduleList = result.data.Data
        }
      })
    },
    setStartAndEndDate () {
      let week = this.getWeekByDate(this.activeDate)
      week = week === 0 ? 7 : week
      this.startDate = this.addDayToDate(this.activeDate, (1 - week))
      this.endDate = this.addDayToDate(this.activeDate, (7 - week))
    },
    preWeek () { // 上一周
      this.startDate = this.addDayToDate(this.startDate, -7)
      this.endDate = this.addDayToDate(this.endDate, -7)
    },
    nextWeek () { // 下一周
      this.startDate = this.addDayToDate(this.startDate, 7)
      this.endDate = this.addDayToDate(this.endDate, 7)
    },
    setTodayActive () {
      this.activeDateChange(new Date())
    },
    setActiveDate (date) {
      this.activeDateChange(date)
    },
    activeDateChange (date) {
      this.loading = true
      this.$emit('change', date, this)
    },
    getWeekByDate (date) {
      return date.getDay()
    },
    addDayToDate (date, day) {
      let curDate = new Date(this.fromtDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
      curDate.setDate(date.getDate() + day)
      return curDate
    },
    addZero (num) {
      return num < 10 ? `0${num}` : num
    },
    fromtDate (year, month, day) {
      return `${year}-${this.addZero(month)}-${this.addZero(day)}`
    },
    datesIsEqual (date1, date2) {
      return (date1.getFullYear() === date2.getFullYear()) && (date1.getMonth() === date2.getMonth()) && (date1.getDate() === date2.getDate())
    },
    monthISEqual (date1, date2) {
      return (date1.getFullYear() === date2.getFullYear()) && (date1.getMonth() === date2.getMonth())
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
  padding: 10px 12px;
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
