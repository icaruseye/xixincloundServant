<template>
  <div style="padding-bottom: 40px">
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="true">
      <xx-tab v-model="modelComplaintTabIndex" active-color="#3AC7F5" custom-bar-width="25px">
        <xx-tab-item>投诉中</xx-tab-item>
        <xx-tab-item>已完成</xx-tab-item>
      </xx-tab>
    </sticky>
    <div v-if="list.length > 0" style="padding: 20px 0 0;border-bottom: 1px solid #eee">
      <list-items v-for="(item, index) in list" 
        :key="index"
        :UseType="item.UseType"
        :State="item.State"
        :UserName="item.UserName"
        :CreateTime="item.CreateTime"
        :MissionName="item.MissionName"
        :Reason="item.UserComplaintTitle"
        @click.native = "redirectDetail(item.ID)"
      ></list-items>
    </div>
    <xx-occupied-box v-else>
      {{occupiedText}}
    </xx-occupied-box>
    <alert title="系统提示" v-model="reminderDealComplaintVisible" content="若收到用户投诉，请尽快处理。从收到投诉的72小时内未处理，平台会自动判定为投诉成功，取消该服务单报酬，退回用户次数。"></alert>
  </div>
</template>

<script>
import { Sticky, Alert } from 'vux'
import { mapGetters, mapMutations } from 'vuex'
import listItems from './components/listItems'
export default {
  components: {
    Sticky,
    Alert,
    listItems
  },
  data () {
    return {
      list: [],
      occupiedText: ''
    }
  },
  filters: {
    textFilter (value = '', len = 10) {
      return value.length > len ? value.substring(0, len) + '…' : value
    }
  },
  watch: {
    complaintTabIndex () {
      this.initList()
    }
  },
  computed: {
    ...mapGetters(['complaintTabIndex']),
    modelComplaintTabIndex: {
      get () {
        return this.complaintTabIndex
      },
      set (val) {
        this.SET_COMPLAINT_TAB_INDEX(val)
      }
    },
    reminderDealComplaintVisible: {
      get () {
        let reminderDealComplaintVisibleStorage = sessionStorage.getItem('reminderDealComplaintVisibleStorage')
        console.log(reminderDealComplaintVisibleStorage)
        return reminderDealComplaintVisibleStorage === null
      },
      set (val) {
        if (!val) {
          sessionStorage.setItem('reminderDealComplaintVisibleStorage', Math.floor(Math.random() * 100000 + 100000))
        }
      }
    }
  },
  created () {
    this.initList()
  },
  methods: {
    ...mapMutations(['SET_COMPLAINT_TAB_INDEX']),
    async initList () {
      this.$vux.loading.show('加载中')
      this.occupiedText = '正在请求数据…'
      await this.getComplaintList().then(value => {
        this.list = value.Data.sort((a, b) => {
          return a.State > b.State
        })
      })
      this.$vux.loading.hide()
    },
    /**
    * 请求数据
     */
    async getComplaintList () {
      const res = await this.$http.get(`/ComplaintList/${this.complaintTabIndex === 0 ? 'Complainting' : 'Complate'}`)
      this.occupiedText = this.complaintTabIndex === 0 ? '没有被投诉中的记录' : '没有已完成的投诉记录'
      return res.data
    },
    redirectDetail (id) {
      this.$router.push(`/user/complaint/${id}/detail`)
    }
  }
}
</script>

<style lang="less" scoped>
.weui-panel {
  margin-top: 0;
}
.weui-cell {
  display: flex;
  align-items: center;
  .left
  {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 100px;
    .img_icon {
      width: 50px;
      height: 50px;
    }
  }
  .right {
    flex: 1;
    line-height: 1.8;
    .title {
      font-size: 18px;
      color: #333;
      height: 30px;
      line-height: 30px;
      .username{
        float: right;
        font-size: 12px;
        color: #3AC7F5;
      }
    }
    .desc {
      font-size: 14px;
      color: #666;
    }
    .time {
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>

