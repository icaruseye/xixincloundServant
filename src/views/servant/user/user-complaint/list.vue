<template>
  <div>
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="true">
      <xx-tab v-model="modelComplaintTabIndex" active-color="#3AC7F5" custom-bar-width="25px">
        <xx-tab-item>投诉中</xx-tab-item>
        <xx-tab-item>已完成</xx-tab-item>
      </xx-tab>
    </sticky>
    <div v-if="list.length > 0" class="weui-panel">
      <div v-for="(item, index) in list" :key="index" class="weui-cell" @click = "redirectDetail(item.ID)">
        <div class="left">
          <img class="img_icon" src="@/assets/images/icon_tcmr.png" alt="">
        </div>
        <div class="right">
          <div class="title">
            {{item.MissionName}}
            <span class="username">用户：{{item.UserName}}</span>
          </div>
          <div class="desc">投诉原因:{{item.UserComplaintTitle}}</div>
          <div class="time">投诉时间:{{item.CreateTime | timeFormat}}</div>
        </div>
      </div>
    </div>
    <xx-occupied-box v-else>
      {{occupiedText}}
    </xx-occupied-box>
  </div>
</template>

<script>
import { Sticky, dateFormat } from 'vux'
import { mapGetters, mapMutations } from 'vuex'
export default {
  metaInfo: {
    title: '我的投诉'
  },
  components: {
    Sticky
  },
  data () {
    return {
      list: [],
      occupiedText: ''
    }
  },
  filters: {
    timeFormat (value) {
      return dateFormat(new Date(value), 'YYYY-MM-DD HH:mm:ss')
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
        this.list = value.Data
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

