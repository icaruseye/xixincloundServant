<template>
  <div class="wrapper">
    <div class="schedule_table_wrap">
      <div class="title" v-if="timeBucket.length > 0">
        <div class="item" v-for="item in timeBucket" :key="item.ID">{{item.Name}}</div>
      </div>
      <div class="weeklist">
        <template v-for="(item, index) in list">
          <div class="col" :key="index">
            <template v-for="(time, timeIndex) in timeBucket">
              <div class="item" @click="clickItem(index, timeIndex)" :key="timeIndex">
                <div v-if="item.count > 0">{{item.count}}</div>
                <div v-if="item.sale > 0">{{item.sale}}</div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
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
import { XDialog, TransferDomDirective as TransferDom, dateFormat } from 'vux'
import {mapGetters} from 'vuex'
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    start: String,
    end: String
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ])
  },
  watch: {
    start (val) {
      this.startDate = val
    }
  },
  data () {
    return {
      showToast: false,
      count: 1,
      startDate: this.start,
      endDate: this.end,
      timeBucket: [],
      list: [],
      index: null,
      timeIndex: null
    }
  },
  mounted () {
    if (!this.start) {
      this.setStartAndEndDate()
    }
    this.createWeekList()
    this.getTimeBucket().then(res => {
      this.getList()
    })
  },
  methods: {
    async getList () {
      const res = await this.$http.get(`/Registration/Registr-Situation-List?startTime=${dateFormat(this.startDate, 'YYYY-MM-DD')}&endTime=${dateFormat(this.endDate, 'YYYY-MM-DD')}`)
      if (res.data.Code === 100000) {
        // this.list = res.data.Data
        console.log(res.data.Data)
      }
    },
    async getTimeBucket () {
      const res = await this.$http.get(`/Registration/List/Info`)
      if (res.data.Code === 100000) {
        this.timeBucket = res.data.Data
      }
    },
    async addInfo (data) {
      const res = await this.$http.post('/Registration/Add-Registr-Schedule', {
        ShopId: this.userAccount.ShopID,
        StartTime: data.StartTime,
        EndTime: data.EndTime,
        ReserveNum: data.ReserveNum
      })
      if (res.data.Code === 100000) {
        this.showToast = false
        this.$vux.toast.text('提交成功')
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    clickItem (index, timeIndex) {
      if (this.isEdit) {
        this.count = 1
        this.index = index
        this.timeIndex = timeIndex
        this.showToast = true
      }
      this.$emit('on-item-click', this.list[index])
    },
    createWeekList () {
      for (let index = 0; index < 7; index++) {
        let date = new Date(this.startDate)
        date.setDate(new Date(this.startDate).getDate() + index)
        let _obj = Object.assign({
          date: dateFormat(date, 'YYYY-MM-DD'),
          ScheduleID: null
        }, {})
        this.list.push(_obj)
      }
    },
    setStartAndEndDate () {
      let week = new Date().getDay()
      week = week === 0 ? 7 : week
      this.startDate = this.addDayToDate(new Date(), (1 - week))
      this.endDate = this.addDayToDate(new Date(), (7 - week))
      console.log(this.startDate, this.endDate)
    },
    addDayToDate (date, day) {
      let curDate = new Date()
      curDate.setDate(date.getDate() + day)
      return curDate
    },
    async setNumber () {
      if (this.list[this.index][timeIndex].ReserveNum) {
        await editInfo({
          ScheduleID: this.list[this.index],
          StartTime: `${this.list[this.index].date} ${dateFormat(new Date(this.timeBucket[this.timeIndex].StartTime), 'HH:mm:ss')}`,
          EndTime: `${this.list[this.index].date} ${dateFormat(new Date(this.timeBucket[this.timeIndex].EndTime), 'HH:mm:ss')}`,
          ReserveNum: this.count
        })
      } else {
        await this.addInfo({
          StartTime: `${this.list[this.index].date} ${dateFormat(new Date(this.timeBucket[this.timeIndex].StartTime), 'HH:mm:ss')}`,
          EndTime: `${this.list[this.index].date} ${dateFormat(new Date(this.timeBucket[this.timeIndex].EndTime), 'HH:mm:ss')}`,
          ReserveNum: this.count
        })
      }
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.schedule_table_wrap {
  background: #fff;
  border-top: 1px solid #f1f1f1;
  display: flex;
  .title {
    width: 40px;
    .item {
      width: 100%;
      letter-spacing: 4px;
      -webkit-writing-mode: vertical-rl;
    }
  }
  .weeklist {
    flex: 1;
    display: flex;
    .col {
      flex: 1;
      &:last-child {
        border-right: 0;
      }
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 74px;
    font-size: 12px;
    color: #666;
    text-align: center;
    border-right: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
    div {
      height: 25px;
      line-height: 25px;
    }
    &.active {
      background: #3AC7F5;
      color: #fff;
      font-size: 14px;
    }
  }
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
