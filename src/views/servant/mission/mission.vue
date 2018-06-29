<template>
  <div class="has-tabbar">
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="true">
      <xx-tab v-model="modelMissionTabIndex" active-color="#3AC7F5" custom-bar-width="25px">
        <xx-tab-item @on-item-click="onItemClick">服务中</xx-tab-item>
        <xx-tab-item @on-item-click="onItemClick">已完成</xx-tab-item>
      </xx-tab>
    </sticky>
    <!-- 服务中 -->
    <div class="tabbox">
      <div class="checker-bar" v-show="modelMissionTabIndex === 0">
        <span class="">筛选条件：</span>
        <ul>
          <li :class="missionSmallTabIndex === 0 ? 'active' : ''" @click="changeChecker(0)">全部</li>
          <li :class="missionSmallTabIndex === 1 ? 'active' : ''" @click="changeChecker(1)">待确认</li>
          <li :class="missionSmallTabIndex === 2 ? 'active' : ''" @click="changeChecker(2)">待服务</li>
          <li :class="missionSmallTabIndex === 3 ? 'active' : ''" @click="changeChecker(3)">待评价</li>
        </ul>
      </div>
      <div  v-if="dataList.length >0"  class="weui-panel" style="margin-top:0">
        <div class="weui-list_container">
          <div class="weui-list_item" v-for="(item, index) in dataList" :key="index" @click="redirectDetail(item.State, item.Type, item.ID)">
            <div class="avatar"><img src="https://tva1.sinaimg.cn/crop.0.0.180.180.50/5e9d399fjw1e8qgp5bmzyj2050050aa8.jpg" alt=""></div>
            <div class="mid">
              <div style="display: flex;justify-content: space-between;align-items: baseline;">
                <div class="title" style="font-weight:normal">{{item.ItemName}}</div>
              </div>
              <div style="font-size:13px;color:#999;">患者：{{item.UserName}}</div>
              <div style="font-size:13px;color:#999;">
                <p>药品：{{item.NeedDrug?'需要': '不需要'}}</p>
                <p>工具：{{item.NeedTools?'需要': '不需要'}}</p>
              </div>
              <div class="describe">时间：{{item.EndTime | xxTimeFormatFilter}}</div>
            </div>
            <img v-if="item.State == 0 && item.Type == 0" style="width:50px;height:50px;" src="@/assets/images/ic_dqr.png" alt="">
            <img v-if="(item.State == 0  && item.Type == 1) || item.State == 3 && item.Type == 1" style="width:50px;height:50px;" src="@/assets/images/ic_dff.png" alt="">
            <img v-if="item.State == 4 && item.Type == 1" style="width:50px;height:50px;" src="@/assets/images/ic_dpj.png" alt="">
            <img v-if="item.State >= 5 && item.Type == 1" style="width:50px;height:50px;" src="@/assets/images/ic_ywj.png" alt="">
          </div>
        </div>
      </div>
      <xx-occupied-box v-else>
        {{occupiedText}}
      </xx-occupied-box>
    </div>
    <xx-tabbar></xx-tabbar>
  </div>
</template>

<script>
import { Sticky } from 'vux'
import { mapMutations, mapGetters } from 'vuex'
export default {
  filters: {
    timeFormat (value = '') {
      value = value.replace('T', ' ')
      return value
    }
  },
  metaInfo: {
    title: '任务列表'
  },
  components: {
    Sticky
  },
  computed: {
    ...mapGetters([
      'missionTabIndex',
      'missionSmallTabIndex'
    ]),
    modelMissionTabIndex: {
      get () {
        return this.missionTabIndex
      },
      set (val) {
        this.SET_MISSION_TAB_INDEX(val)
      }
    }
  },
  data () {
    return {
      dataList: [],
      checkerIndexLoack: true,
      occupiedText: ''
    }
  },
  watch: {
    modelMissionTabIndex (val) {
      this.initData()
    }
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapMutations(['SET_MISSION_TAB_INDEX', 'SET_SMALL_MISSION_TAB_INDEX']),
    /**
      跳转详情
     */
    redirectDetail (state, type, id) {
      const that = this
      if (type === 0 && state === 0) {
        that.$router.push('/mission/receive/' + id)
      } else {
        that.$router.push('/mission/waitreceive/' + id)
      }
    },
    /**
      初始化
     */
    async initData () {
      this.$vux.loading.show('加载中')
      this.occupiedText = '正在请求数据…'
      if (this.modelMissionTabIndex === 0) {
        this.dataList = []
        switch (this.missionSmallTabIndex) {
          case 0:
            await this.getAll()
            this.occupiedText = '任务列表空空如也'
            break
          case 1:
            await this.getUserReserveServiceList().then(value => {
              this.dataList = value
              this.checkerIndexLoack = true
              this.occupiedText = '没有待确认的任务'
            })
            break
          case 2:
            await this.getAllWaitForService()
            this.occupiedText = '没有待服务的任务'
            break
          case 3:
            await this.getWaitForReview().then(value => {
              this.dataList = value
              this.checkerIndexLoack = true
              this.occupiedText = '没有待评价的任务'
            })
            break
        }
      }
      if (this.modelMissionTabIndex === 1) {
        await this.getComplateMissionList().then(value => {
          this.dataList = value.Data
          this.occupiedText = '没有已完成的任务'
        })
      }
      this.$vux.loading.hide()
    },
    async getAllWaitForService () {
      const that = this
      await that.getInServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getWaitForServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
    },
    /** 查看全部 */
    async getAll () {
      const that = this
      await that.getUserReserveServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getInServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getWaitForServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getWaitForReview().then(value => {
        that.dataList = that.dataList.concat(value)
      })
    },

    /** 待确认 */
    async getUserReserveServiceList () {
      const res = await this.$http.get('/UserReserveServiceList')
      return res.data.Data
    },
    /** 服务中 */
    async getInServiceList () {
      const res = await this.$http.get('/MissionList/InService')
      return res.data.Data
    },
    /** 待服务 */
    async getWaitForServiceList () {
      const res = await this.$http.get('/MissionList/WaitForService')
      return res.data.Data
    },
    /** 待评价 */
    async getWaitForReview () {
      const res = await this.$http.get('/MissionList/WaitForReview')
      return res.data.Data
    },
    /** 已完成 */
    async getComplateMissionList () {
      const res = await this.$http.get('/MissionList/Complate')
      return res.data
    },
    async changeChecker (index) {
      if (this.checkerIndexLoack) {
        this.checkerIndexLoack = false
        this.SET_SMALL_MISSION_TAB_INDEX(index)
        await this.initData()
        this.checkerIndexLoack = true
      }
    },
    onItemClick (id) {
      this.SET_MISSION_TAB_INDEX(id)
    },
    toDetail (id) {
      this.$router.push(`/service/in/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.weui-panel {
  padding: 0 12px;
}

.weui-list_item {
  position: relative;
  padding: 13px 5px;
  display: flex;
  align-items: center;
  &::after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #d9f7f5;
    color: #d9f7f5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  &:last-child::after {
    border: 0;
  }
  .icon {
    width: 29px;
    height: 29px;
  }
  .avatar {
    border-radius: 50%;
    width: 37px;
    height: 37px;
    overflow: hidden;
  }
  .mid {
    flex: 1;
    margin: 0 19px;
    color: #999;
    .title {
      font-size: 15px;
      color: #666;
      font-weight: bold;
    }
    .balance {
      font-size: 12px;
    }
    .describe {
      font-size: 12px;
    }
  }
  .btn {
    button {
      width: 50px;
      height: 22px;
      line-height: 22px;
      background: #3ecccc;
      color: #fff;
      text-align: center;
      font-size: 15px;
      border: 0;
      border-radius: 2px;
    }
  }
}

.checker-bar {
  padding: 10px 12px;
  display: flex;
  font-size: 15px;
  color: #999;
  ul {
    display: flex;
    li {
      position: relative;
      padding: 0 10px;
      &::after {
        content: "";
        position: absolute;
        right: 0;
        background: #999;
        height: 25px;
        border-right: 1px solid #D8D8D8;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      &:last-child::after {
        border: 0;
      }
    }
    li.active {
      color: #3AC7F5;
    }
  }
}
</style>