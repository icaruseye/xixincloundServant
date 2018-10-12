<template>
  <div class="wrapper">
    <xx-go-back :url="goBackRedirect"></xx-go-back>
    <div class="calendar_wrap">
      <weekCalendar v-if="!monthCalendar" ref="calendarRef" :readOnly="true" :activeDate="activeDate" @change="activeDateChange"></weekCalendar>
    </div>
    <scheduleTable @on-item-click="onClick" :isEdit="true"></scheduleTable>
    <button type="button" class="weui-btn weui-btn_primary weui-btn_bottom">保存</button>
    <div v-transfer-dom>
      <x-dialog v-model="showToast" class="dialog-wrap">
        <div class="title">设置号源数量</div>
        <div style="display: flex;justify-content: space-around;height:45px;line-height:45px">
          <span>设置数量</span>
          <van-stepper v-model="count" :min="1"/>
        </div>
        <div class="btns">
          <button class="submit" @click="setNumber">确定</button>
          <button @click="showToast = false">取消</button>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import monthlyCalendar from '../schedule/components/monthlyCalendar'
import weekCalendar from '../schedule/components/weekCalendar'
import scheduleTable from './components/scheduleTable'
import { XDialog, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    monthlyCalendar,
    weekCalendar,
    scheduleTable,
    XDialog
  },
  data () {
    return {
      monthCalendar: false,
      activeDate: new Date(),
      showToast: false,
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
      console.log(date, calendar)
    },
    changeCalendar () {
      this.monthCalendar = !this.monthCalendar
    },
    setNumber () {},
    onClick () {
      this.showToast = true
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
.dialog-wrap {
  .title {
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #E7E7E7;
    margin-bottom: 20px;
  }
  .btns {
    display: flex;
    justify-content: center;
    button {
      margin: 20px;
      width: 90px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 18px;
      color: #fff;
      border-radius: 15px;
      border: 0;
      background: #ccc;
      &.submit {
        background: #3AC7F5;
      }
    }
  }
}
</style>
