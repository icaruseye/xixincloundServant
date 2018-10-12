<template>
  <div class="wrapper">
    <xx-go-back :url="goBackRedirect"></xx-go-back>
    <div class="calendar_wrap">
      <weekCalendar v-if="!monthCalendar" :readOnly="true" :activeDate="activeDate" ref="calendarRef" @change="activeDateChange"></weekCalendar>
    </div>
    <scheduleTable @on-item-click="onClick"></scheduleTable>
    <router-link to="/app/registration/setting">
      <button type="button" class="weui-btn weui-btn_primary weui-btn_bottom">设置号源</button>
    </router-link>
  </div>
</template>

<script>
import monthlyCalendar from '../schedule/components/monthlyCalendar'
import weekCalendar from '../schedule/components/weekCalendar'
import scheduleTable from './components/scheduleTable'
export default {
  components: {
    monthlyCalendar,
    weekCalendar,
    scheduleTable
  },
  data () {
    return {
      monthCalendar: false,
      activeDate: new Date()
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
      console.log(date, calendar)
    },
    changeCalendar () {
      this.monthCalendar = !this.monthCalendar
    },
    onClick (data) {
      console.log(data)
    }
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
