<template>
  <div class="list_container">
    <ul v-if="list && list.length > 0" class="plans_list">
      <li class="plans_list_items" v-for="(plan, index) in list" :key="index">
        <div class="time_container">{{plan.StartTime | xxTimeFormatFilter('HH:mm')}} ~ {{plan.EndTime | xxTimeFormatFilter('HH:mm')}}</div>
        <div class="content_container">
          <span>
            可预约{{plan.ReserveNum}}次，
          </span>
          <span>
            已预约{{plan.AlreadyReserveNum}}次，
          </span>
          <span>
            剩余<b>{{plan.ReserveNum - plan.AlreadyReserveNum}}</b>次
          </span>
        </div>
        <i class="iconfont icon-trash plan_delete_icon" @click="deletePlan(plan.ID, index)"></i>
      </li>
    </ul>
    <div class="noPlan_text" v-else>
      还没有添加任何排班计划
    </div>
    <div v-if="!acticeDateIsLessThanToday()" class="add_plan_btn" @click="addPlanDialogVisible = true">
      <i class="iconfont icon-hao"></i>
      设置排班计划
    </div>
    <x-dialog v-model="addPlanDialogVisible" :hide-on-blur="true">
      <div style="padding:15px;">
        设置排班计划
        <div style="margin-top:20px">
          <div class="select_items clearfix">
            开始时间
            <div class="select_items_content_container">
              <Datetime v-model="startTime" :min-hour="6" :max-hour="18" placeholder="请选择时间" :minute-list="['00', '30']" format="HH:mm" hour-row="{value}点" minute-row="{value}分"></Datetime>
            </div>
          </div>
          <div class="select_items clearfix">
            结束时间
            <div class="select_items_content_container">
              <Datetime v-model="endTime" :min-hour="6" :max-hour="18" placeholder="请选择时间" :minute-list="['00', '30']" format="HH:mm" hour-row="{value}点" minute-row="{value}分"></Datetime>
            </div>
          </div>
          <div class="select_items clearfix">
            服务类型
            <div class="select_items_content_container" style="color:#3ac7f5" v-if="ScheduleType != null" @click="showServiceTypeHandle">
              {{typeText[ScheduleType]}}
            </div>
            <div class="select_items_content_container" v-else style="color:#ccc" @click="showServiceTypeHandle">
              请选择服务类型
            </div>
          </div>
          <div class="select_items clearfix" v-if="[1, 2].indexOf(ScheduleType) >= 0">
            设置服务
            <div class="select_items_content_container" style="color:#3ac7f5" @click="showServiceListHandle">
              <template v-if="selectItems.length === 0">
                <i class="iconfont icon-jiahao"></i>&nbsp;添加服务
              </template>
              <template v-else>已选择{{selectItems.length}}项</template>
            </div>
          </div>
          <div class="select_items clearfix" v-if="[0,3].indexOf(ScheduleType) > 0">
            可预约次数
            <div class="select_items_content_container">
              <van-stepper v-model="ReserveNum" :min="1" :integer="true" :max="500"/>
            </div>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <button class="btn gray_btn" @click="addPlanDialogVisible = false">取消</button>
        <button class="btn" @click="addPlan">确定</button>
      </div>
    </x-dialog>

    <!-- 服务类型 -->
    <div v-transfer-dom>
      <popup :popup-style="{zIndex: 9999}" v-model="showServiceTypePopup" @on-hide="showServiceTypePopup = false">
        <div class="service_type_box">
          <ul class="xx_actionsheet">
            <li class="xx_actionsheet_item title">选择服务类型</li>
            <li class="xx_actionsheet_item" @click="selectServiceTypeHandle(0, '全部')">全部</li>
            <li class="xx_actionsheet_item" @click="selectServiceTypeHandle(1, '服务套餐')">服务套餐</li>
            <li class="xx_actionsheet_item" @click="selectServiceTypeHandle(2, '服务项')">服务项</li>
            <li class="xx_actionsheet_item cancel" @click="showServiceTypePopup = false">取消</li>
          </ul>
        </div>
      </popup>
    </div>

    <!-- 服务列表 -->
    <div v-transfer-dom>
      <popup :popup-style="{zIndex: 9999}" v-model="showServiceListPopup" @on-hide="showServiceTypePopup = false">
        <div class="service_type_box">
        <div class="xx_actionsheet">
          <div class="xx_actionsheet_item title">选择服务</div>
          <div style="max-height:300px;overflow:auto;">
            <div class="xx_actionsheet_item checker_item" :key="index" v-for="(item, index) in itemList">
              <span class="item-title">{{item.Name}}</span>
              <van-stepper v-model="item.ServiceNum" :min="0" :integer="true" :max="500"/>
            </div>
          </div>
          <div class="xx_actionsheet_item cancel" @click="setServiceTimes">确认</div>
        </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { XDialog, Datetime, TransferDom, Popup, Checker, CheckerItem } from 'vux'
import util from '@/plugins/util'
export default {
  directives: {
    TransferDom
  },
  props: {
    list: {
      type: Array,
      default: null
    },
    activeDate: {
      type: Date,
      default: null
    }
  },
  components: {
    XDialog,
    Datetime,
    Popup,
    Checker,
    CheckerItem
  },
  data () {
    return {
      typeText: {
        0: '全部',
        1: '服务套餐',
        2: '服务项'
      },
      addPlanDialogVisible: false,
      showServiceTypePopup: false,
      showServiceListPopup: false,
      ScheduleType: null, // 服务类型
      selectItems: [],
      itemList: [],
      startTime: null,
      endTime: null,
      ReserveNum: 1
    }
  },
  computed: {
    todayStartTime () {
      let date = new Date()
      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      return date
    }
  },
  watch: {
    addPlanDialogVisible () {
      this.startTime = null
      this.endTime = null
    },
    async ScheduleType (val) {
      this.selectItems = []
      if ([1, 2].indexOf(val) >= 0) {
        // 根据类型获取对应的服务列表
        const res = await this.getServiceItemList(val)
        this.itemList = res
      }
    }
  },
  methods: {
    acticeDateIsLessThanToday () {
      return this.activeDate.getTime() < this.todayStartTime.getTime()
    },
    deletePlan (id, index) {
      const that = this
      that.$vux.confirm.show({
        confirmText: '移除',
        content: '确认要移除这条排班计划？',
        onConfirm () {
          that.$http.delete(`/Schedule/Delete?id=${id}`).then(result => {
            if (result.data.Code === 100000) {
              that.$vux.toast.text('移除成功')
              that.$emit('deleteSuccess', index)
            }
          })
        }
      })
    },
    addPlan () {
      if (!this.startTime) {
        this.$vux.toast.text('请选择开始时间')
        return false
      }
      if (!this.endTime) {
        this.$vux.toast.text('请选择开始时间')
        return false
      }
      if (!this.timeInList()) {
        return false
      }
      if ([0, 1, 2].indexOf(this.ScheduleType) < 0) {
        this.$vux.toast.text('请选择服务类型')
        return false
      }
      if (this.ScheduleType !== 0 && this.selectItems.length === 0) {
        this.$vux.toast.text('至少要选择一项服务')
        return false
      }
      if (this.ScheduleType !== 0) {
        this.ReserveNum = 0
        for (let item of this.selectItems) {
          if (item.ServiceNum > 0) {
            this.ReserveNum += item.ServiceNum
          }
        }
      }
      let date = util.timeFormatFilter(this.activeDate, 'YYYY-MM-DD')
      let startTime = `${date} ${this.startTime}:00`
      let endTime = `${date} ${this.endTime}:00`
      this.$http.post(`/Schedule/Add`, {
        StartTime: startTime,
        EndTime: endTime,
        ReserveNum: this.ReserveNum,
        ScheduleLimitItems: this.selectItems,
        SchemeID: 0,
        ScheduleType: this.ScheduleType
      }).then(result => {
        if (result.data.Code === 100000) {
          this.$emit('addSuccess', {
            ID: result.data.Data.ID,
            EndTime: endTime,
            StartTime: startTime,
            AlreadyReserveNum: 0,
            ReserveNum: this.ReserveNum
          })
          this.addPlanDialogVisible = false
        } else {
          this.$vux.alert.show({
            title: result.data.Msg,
            content: `错误码：${result.data.Code}`
          })
        }
      })
    },
    timeInList () {
      let today = util.timeFormatFilter(this.activeDate, 'YYYY-MM-DD')
      let startTime = new Date(`${today} ${this.startTime}:00`).getTime()
      let endTime = new Date(`${today} ${this.endTime}:00`).getTime()
      if (startTime > endTime) {
        this.$vux.toast.text('结束时间必选小于开始时间')
        return false
      }
      let timeDistance = Math.abs(endTime - startTime)
      for (let i = 0; i < this.list.length; i++) {
        let listStartTime = new Date(this.list[i].StartTime).getTime()
        let listEndTime = new Date(this.list[i].EndTime).getTime()
        let listTimeDistance = Math.abs(listEndTime - listStartTime)
        let allDistance = timeDistance + listTimeDistance
        let startInterval = Math.abs(startTime - listStartTime)
        let endInterval = Math.abs(endTime - listEndTime)
        if (allDistance > (startInterval + endInterval)) {
          this.$vux.toast.text('时间段已被占用')
          return false
        }
      }
      return true
    },
    async getServiceItemList (val) {
      const url = {
        1: '/BundleList',
        2: '/ItemList'
      }
      const res = await this.$http.get(url[val])
      if (res.data.Code === 100000) {
        for (let item of res.data.Data) {
          item.ServiceNum = 0
        }
        return res.data.Data
      }
    },
    setMaskzIndex (val) {
      this.$nextTick(() => {
        document.querySelector('.vux-popup-mask').style.zIndex = val
      })
    },
    // 选择服务类型弹层
    showServiceTypeHandle () {
      this.showServiceTypePopup = true
      this.setMaskzIndex(9998)
    },
    // 选择服务列表弹层
    showServiceListHandle () {
      this.showServiceListPopup = true
      this.setMaskzIndex(9998)
    },
    selectServiceTypeHandle (val, text) {
      this.showServiceTypePopup = false
      this.ScheduleType = val
    },
    setServiceTimes () {
      this.selectItems = []
      for (let item of this.itemList) {
        if (item.ServiceNum > 0) {
          this.selectItems.push({
            ServiceItemID: item.ID,
            ServiceNum: item.ServiceNum
          })
        }
      }
      console.log(this.itemList)
      this.showServiceListPopup = false
    }
  }
}
</script>

<style lang="less" scoped>
.list_container
{
  margin-top: 10px;
  background-color: #fff;
  padding: 20px;
  .add_plan_btn
  {
    height: 40px;
    border: 1px solid #ddd;
    text-align: center;
    line-height: 40px;
    color: #999;
    font-size: 14px;
  }
  .plans_list_items
  {
    position: relative;
    margin-bottom: 20px;
    padding: 0px 10px;
    border-left: 1px solid #3AC7F5;
    .time_container
    {
      font-size: 14px;
      color: #666;
    }
    .content_container
    {
      span
      {
        display: inline-block;
        font-size: 12px;
        color: #999;
        b
        {
          font-weight: normal;
          color: #3AC7F5;
        }
      }
    }
    .plan_delete_icon
    {
      position: absolute;
      right: 0;
      top: 50%;
      display: block;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      transform: translateY(-50%);
      color: rgb(255, 95, 95);
    }
  }
}
.select_items
{
  display: flex;
  flex-flow: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 10px 15px;
  font-size: 14px;
  .select_items_content_container
  {
    height: 40px;
    display: flex;
    flex-flow: nowrap;
    align-items: center;
    justify-content: space-between;
  }
}
.btn_box
{
  padding: 10px 0 20px;
  display: flex;
  flex-flow: nowrap;
  align-content: center;
  justify-content: space-around;
  .btn
  {
    padding: 0 40px;
    height: 40px;
    background-color: #3AC7F5;
    color: #fff;
    border:none;
    border-radius: 5px;
    &.gray_btn
    {
      background-color: #ddd
    }
  }
}
.noPlan_text
{
  padding: 20px 0;
  text-align: center;
  font-size: 12px;
  color: #999;
}
.checker_item {
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  font-size: 14px;
  .icon {
    margin: 0 10px;
    width: 25px;
    height: 25px;
  }
  .item-title {
    flex: 1;
    text-align: left;
  }
}
</style>
