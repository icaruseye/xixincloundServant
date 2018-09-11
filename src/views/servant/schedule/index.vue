<template>
  <div>
    <xx-go-back></xx-go-back>
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
            <td v-for="col in 7" :key="col" :title="dateList[(row - 1) * 7 + col - 1].date">
              <div :class="[dateList[(row - 1) * 7 + col - 1].isCurMonth ? 'curMonth' : '', col === 1 ? 'rowStart' : '', col === 7 ? 'rowEnd' : '', dateList[(row - 1) * 7 + col - 1].isActice ? 'isActice' : '', dateList[(row - 1) * 7 + col - 1].isToday ? 'isToday' : '']" @click="setActiveDate(dateList[(row - 1) * 7 + col - 1].date)">
                <span class="date_span">
                  {{dateList[(row - 1) * 7 + col - 1].day}}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <scheduleList></scheduleList>
  </div>
</template>
<script>
import scheduleList from './components/scheduleList'
export default {
  components: {
    scheduleList
  },
  data () {
    return {
      selectedMonth: new Date(),
      activeDete: new Date()
    }
  },
  methods: {
    setActiveDate (date) {
      this.selectedMonth = new Date(date)
      this.activeDete = new Date(date)
    },
    setTodayActive () {
      this.selectedMonth = new Date()
      this.activeDete = new Date()
    },
    goPreMonth () {
      let curDate = new Date(`${this.selectedMonth.getFullYear()}-${this.selectedMonth.getMonth() + 1}-${this.selectedMonth.getDate()}`)
      let curMonth = curDate.getMonth()
      curDate.setMonth(curMonth - 1)
      this.selectedMonth = curDate
    },
    goNextMonth () {
      let curDate = new Date(`${this.selectedMonth.getFullYear()}-${this.selectedMonth.getMonth() + 1}-${this.selectedMonth.getDate()}`)
      let curMonth = curDate.getMonth()
      curDate.setMonth(curMonth + 1)
      this.selectedMonth = curDate
    }
  },
  computed: {
    currentMonthDays () { // 所选月当月天数
      let curDate = new Date(`${this.selectedMonth.getFullYear()}-${this.selectedMonth.getMonth() + 1}-01`)
      let curMonth = curDate.getMonth()
      curDate.setMonth(curMonth + 1)
      curDate.setDate(0)
      return curDate.getDate()
    },
    preMonthDays () { // 所选月上月天数
      let curDate = new Date(`${this.selectedMonth.getFullYear()}-${this.selectedMonth.getMonth() + 1}-01`)
      let curMonth = curDate.getMonth()
      curDate.setMonth(curMonth)
      curDate.setDate(0)
      return curDate.getDate()
    },
    currentMonthFirstDay () { // 所选月当月第一天日期
      return `${this.selectedMonth.getFullYear()}-${this.selectedMonth.getMonth() + 1}-1`
    },
    currentMonthFirstDayWeek () { // 所选月当月月第一天为星期几
      return new Date(this.currentMonthFirstDay).getDay()
    },
    currentMonthLastDay () { // 所选月当月最后一天日期
      return `${this.selectedMonth.getFullYear()}-${this.selectedMonth.getMonth() + 1}-${this.currentMonthDays}`
    },
    currentMonthLastDayWeek () { // 所选月当月月最后一天为星期几
      return new Date(this.currentMonthLastDay).getDay()
    },
    dateList () { // 日历表
      let list = []
      let today = new Date()
      let index = 0
      for (let i = (this.preMonthDays - (this.currentMonthFirstDayWeek === 0 ? 7 : this.currentMonthFirstDayWeek) + 1 + 1); i <= this.preMonthDays; i++) {
        let date = new Date(`${this.selectedMonth.getFullYear()}-${this.selectedMonth.getMonth() + 1}-01`)
        date.setMonth(date.getMonth() - 1)
        date.setDate(i)
        list.push({
          date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          isCurMonth: false,
          day: i
        })
        index += 1
      }
      for (let i = 0; i < this.currentMonthDays; i++) {
        let date = new Date(`${this.selectedMonth.getFullYear()}-${this.selectedMonth.getMonth() + 1}-${i + 1}`)
        list.push({
          isCurMonth: true,
          day: i + 1,
          date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          isToday: today.getFullYear() === this.selectedMonth.getFullYear() && today.getMonth() === this.selectedMonth.getMonth() && today.getDate() === (i + 1),
          isActice: this.activeDete.getFullYear() === this.selectedMonth.getFullYear() && this.activeDete.getMonth() === this.selectedMonth.getMonth() && this.activeDete.getDate() === (i + 1)
        })
        index += 1
      }
      for (let i = 0; i < (42 - index); i++) {
        let date = new Date(`${this.selectedMonth.getFullYear()}-${this.selectedMonth.getMonth() + 1}-01`)
        date.setMonth(date.getMonth() + 1)
        date.setDate(i + 1)
        list.push({
          isCurMonth: false,
          date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          day: i + 1
        })
      }
      return list
    }
  }
}
</script>
<style lang="less" scoped>
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
        &.isActice
        {
          .date_span
          {
            border: 1px solid #3AC7F5;
            color: #fff;
            background-color: #3AC7F5
          }
        }
        &.isActice.isToday
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
    }
  }
}
</style>


