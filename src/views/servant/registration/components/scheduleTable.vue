<template>
  <div class="wrapper">
    <div class="schedule_table_wrap">
      <div class="title" v-if="timeBucket.length > 0">
        <div class="item" v-for="item in timeBucket" :key="item.ID">{{item.Name}}</div>
      </div>
      <div class="weeklist">
        <template v-for="(item, index) in list">
          <div class="col" :key="index">
            <template v-for="(i, timeIndex) in item.scheduleRegistrResult">
              <div
                @click="clickItem(index, timeIndex)"
                class="item"
                :class="{ active: list[index].startTime === list[index].date && i.ReserveNum > 0 }"
                :key="timeIndex"
                :data-id="i.ScheduleID">
                <div v-if="i.AlreadyReserveNum > 0 && !isEdit">
                  挂 {{i.AlreadyReserveNum}}
                </div>
                <div v-if="i.ReserveNum > 0 && !isEdit">
                  余 {{i.ReserveNum}}
                </div>
                <div v-if="isEdit && i.ReserveNum">
                  {{i.ReserveNum}}
                </div>
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
          <van-stepper v-model="count" :min="0"/>
        </div>
        <div style="display: flex;justify-content: space-around;height:45px;line-height:45px">
          <span>设置价格</span>
          <input type="number" v-model="price" placeholder="请输入挂号价格">
        </div>
        <div class="btns">
          <button class="submit" @click="setNumber" :disabled="submitDisable">确定</button>
          <button @click="showToast = false">取消</button>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { XDialog, TransferDomDirective as TransferDom, dateFormat } from 'vux'
import { mapGetters } from 'vuex'
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
      this.endDate = this.end
      this.getList()
    }
  },
  data () {
    return {
      showToast: false,
      submitDisable: false,
      count: 1,
      startDate: this.start,
      endDate: this.end,
      timeBucket: [],
      list: [],
      scheduleList: [],
      index: null,
      timeIndex: null
    }
  },
  mounted () {
    if (!this.start) {
      this.setStartAndEndDate()
    }
    this.getTimeBucket().then(res => {
      this.getList()
    })
  },
  methods: {
    async getList () {
      this.$vux.loading.show()
      const res = await this.$http.get(`/Registration/Registr-Situation-List?startTime=${dateFormat(this.startDate, 'YYYY-MM-DD')}&endTime=${dateFormat(this.endDate, 'YYYY-MM-DD')}`)
      if (res.data.Code === 100000) {
        this.scheduleList = res.data.Data
        this.createWeekList()
        this.mergeWeekList()
      }
      this.$vux.loading.hide()
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
    async editInfo (data) {
      const res = await this.$http.put('/Registration/Modify-Registr-Schedule', {
        ViewID: this.userAccount.ViewID,
        ScheduleID: data.ScheduleID,
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
        this.index = index
        this.timeIndex = timeIndex
        console.log(index, timeIndex)
        this.showToast = true
        if (this.list[index].scheduleRegistrResult[timeIndex].ReserveNum) {
          this.count = this.list[index].scheduleRegistrResult[timeIndex].ReserveNum
        } else {
          this.count = 1
        }
      }
      this.$emit('on-item-click', this.list[index].scheduleRegistrResult[timeIndex])
    },
    createWeekList () {
      this.list = []
      for (let index = 0; index < 7; index++) {
        let date = new Date(this.startDate)
        date.setDate(new Date(this.startDate).getDate() + index)
        let _obj = Object.assign({
          date: dateFormat(date, 'YYYY-MM-DD'),
          scheduleRegistrResult: []
        }, {})
        this.list.push(_obj)
      }
    },
    mergeWeekList () {
      for (let item of this.list) {
        for (let index = 0; index < this.timeBucket.length; index++) {
          item.scheduleRegistrResult.push({
            ReserveNum: 0,
            AlreadyReserveNum: 0,
            EndTime: this.timeBucket[index].EndTime,
            StartTime: this.timeBucket[index].StartTime,
            ScheduleID: null
          })
        }
      }
      for (let schedule of this.scheduleList) {
        for (let item of this.list) {
          if (item.date === dateFormat(new Date(schedule.startTime), 'YYYY-MM-DD')) {
            item.startTime = item.date
            for (let a = 0; a < item.scheduleRegistrResult.length; a++) {
              for (let b = 0; b < schedule.scheduleRegistrResult.length; b++) {
                if (dateFormat(new Date(item.scheduleRegistrResult[a].StartTime), 'HH:mm:ss') === dateFormat(new Date(schedule.scheduleRegistrResult[b].StartTime), 'HH:mm:ss')) {
                  item.scheduleRegistrResult[a] = Object.assign(schedule.scheduleRegistrResult[b])
                }
              }
            }
          }
        }
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
      this.submitDisable = true
      if (this.list[this.index].scheduleRegistrResult[this.timeIndex].ReserveNum) {
        await this.editInfo({
          ScheduleID: this.list[this.index].scheduleRegistrResult[this.timeIndex].ScheduleID,
          ReserveNum: this.count

        })
      } else {
        await this.addInfo({
          StartTime: `${this.list[this.index].date} ${dateFormat(new Date(this.timeBucket[this.timeIndex].StartTime), 'HH:mm:ss')}`,
          EndTime: `${this.list[this.index].date} ${dateFormat(new Date(this.timeBucket[this.timeIndex].EndTime), 'HH:mm:ss')}`,
          ReserveNum: this.count
        }
      }
      this.submitDisable = false
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
  input {
    margin: 7px 0;
    width: 115px;
    height: 30px;
    line-height: 30px;
    background: #F6F6F6;
    border: 1px solid #eaeaea;
    font-size: 12px;
    padding: 0 10px;
    box-sizing: border-box;
    border-radius: 2px;
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
        &:disabled {
          background: #ccc;
        }
      }
    }
  }
}
</style>
