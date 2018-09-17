<template>
  <div v-if="detail" style="padding-bottom:80px">
    <xxGoBack></xxGoBack>
    <p class="title_box">将此方案应用到以下日期</p>
    <div>
      <selectSchemeCalendar :activeDate="activeDate" :hasScheduleList="hasScheduleList" @change="CalendarChange" @addPlanToDate="addPlanToDate" @removePlanToDate="removePlanToDate"></selectSchemeCalendar>
    </div>
    <p class="title_box">方案详情</p>
    <div class="form_container">
      <div class="select_items clearfix">
        方案名称：
        <div class="select_items_content_container">
          {{detail.SchemeName}}
        </div>
      </div>
      <div class="select_items clearfix">
        开始时间：
        <div class="select_items_content_container">
          {{detail.StartTime}}
        </div>
      </div>
      <div class="select_items clearfix">
        结束时间：
        <div class="select_items_content_container">
          {{detail.EndTime}}
        </div>
      </div>
      <div class="select_items clearfix">
        可预约次数：
        <div class="select_items_content_container">
          {{detail.ReserveNum}}
        </div>
      </div>
      <div class="oper_detail_btn_box">
        <router-link class="btn" :to="`/schedule/schemeEdit?id=${ID}`">编辑当前方案</router-link>
        <a href="javascript:void(0)" class="btn" @click="deleteScheme">删除当前方案</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Datetime } from 'vux'
import util from '@/plugins/util'
import selectSchemeCalendar from './components/selectSchemeCalendar'
export default {
  components: {
    Datetime,
    selectSchemeCalendar
  },
  data () {
    return {
      activeDate: new Date(),
      detail: null,
      hasScheduleList: []
    }
  },
  computed: {
    ID () {
      return this.$route.params.id
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      const detail = await this.getDetail()
      if (detail.Code === 100000) {
        this.detail = detail.Data
        this.getHasScheList(detail.Data.ID).then(result => {
          if (result.Code === 100000) {
            this.hasScheduleList = result.Data
          }
        })
      }
    },
    async getDetail () {
      const res = await this.$http.get(`/Schedule/Scheme/Detail?schemeId=${this.ID}`)
      return res.data
    },
    async getHasScheList (ID) {
      const res = await this.$http.get(`/Schedule/IsNoSchedule/Scheme?schemeId=${ID}`)
      return res.data
    },
    deleteScheme () {
      const that = this
      that.$vux.confirm.show({
        confirmText: '删除提示',
        content: '确认要删除条排版方案？',
        onConfirm () {
          that.$http.delete(`/Schedule/Delete/Scheme?schemeId=${that.ID}`).then(result => {
            if (result.data.Code === 100000) {
              that.$vux.toast.text(`删除成功`)
              that.$router.push(`/schedule/schemeList`)
            } else {
              this.$vux.toast.text(`删除失败，错误码：${result.data.Code}`)
            }
          })
        }
      })
    },
    removePlanToDate (date, calendar) {
      let date1 = util.timeFormatFilter(date.date, 'YYYY-MM-DD 00:00:00')
      this.$http.delete(`/Schedule/DeleteScheme?schemeID=${this.ID}&dateTime=${date1}`).then(result => {
        calendar.loading = false
        if (result.data.Code === 100000) {
          this.hasScheduleList.splice(date.hasPlanIndex, 1)
        }
      })
    },
    addPlanToDate (date, calendar) {
      let date1 = util.timeFormatFilter(date, 'YYYY-MM-DD')
      let startTime = `${date1} ${this.detail.StartTime}`
      let endTime = `${date1} ${this.detail.EndTime}`
      this.$http.post(`/Schedule/Add`, {
        StartTime: startTime,
        EndTime: endTime,
        Items: '',
        ReserveNum: this.detail.ReserveNum,
        SchemeID: this.detail.ID
      }).then(result => {
        calendar.loading = false
        if (result.data.Code === 100000) {
          this.hasScheduleList.push(date1)
        } else if (result.data.Code === 1100040) {
          this.$vux.toast.text(result.data.Msg)
        } else {
          const that = this
          that.$vux.confirm.show({
            title: '此时间段已被占用！',
            content: `${date1}（${this.detail.StartTime}~${this.detail.EndTime}）已有排班计划`,
            confirmText: '查看详情',
            cancelText: '算了',
            onConfirm () {
              that.$router.push(`/schedule/calendar?defaultActiveDate=${date1}&redirect=/schedule/scheme/${that.ID}/detail`)
            }
          })
        }
      })
    },
    CalendarChange (date, calendar) {
      this.activeDate = date
    }
  }
}
</script>

<style lang="less" scoped>
.form_container
{
  background-color: #fff;
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
      height: 35px;
      flex: 1;
      padding: 0 15px;
      color: #999;
      text-align: right;
      line-height: 35px;
    }
  }
  .oper_detail_btn_box
  {
    border-top: 1px solid rgba(0,0,0,.1);
    height: 40px;
    display: flex;
    .btn
    {
      position: relative;
      flex: 1;
      text-align: center;
      line-height: 40px;
      color: #3AC7F5;
      font-size: 14px;
      text-align: center;
      &::after
      {
        position: absolute;
        right: 0;
        top: 10px;
        bottom: 10px;
        display: block;
        width: 1px;
        content: '';
        background-color: #ddd;
      }
      &:last-child
      {
        color: #ff5f5f;
        &::after
        {
          display: none;
        }
      }
    }
  }
}
.title_box
{
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
  font-size: 12px;
  color: #999;
}
</style>
