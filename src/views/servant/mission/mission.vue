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
    <div class="tabbox" v-show="modelMissionTabIndex === 0">
      <div class="checker-bar">
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
              <div style="font-size:13px;color:#999;">内容：{{item.Result?item.Result:'该患者没有留言'}}</div>
              <div class="describe">时间：{{item.EndTime | timeFormat}}</div>
            </div>
            <img v-if="item.State == 0 && item.Type == 0" style="width:50px;height:50px;" src="@/assets/images/ic_dqr.png" alt="">
            <img v-if="(item.State == 0  && item.Type == 1) || item.State == 3 && item.Type == 1" style="width:50px;height:50px;" src="@/assets/images/ic_dff.png" alt="">
            <img v-if="item.State == 4 && item.Type == 1" style="width:50px;height:50px;" src="@/assets/images/ic_dpj.png" alt="">
          </div>
        </div>
      </div>
      <xx-occupied-box v-else>
        当前列表为空
      </xx-occupied-box>
    </div>
    <!-- 已完成 -->
    <div class="tabbox" v-show="modelMissionTabIndex === 1">
      <div v-if="complateMissionList.length" class="weui-panel">
        <div class="weui-list_container">
          <div v-for="(item, index) in complateMissionList" :key="index" class="weui-list_item" @click="redirectDetail(item.State, item.Type, item.ID)">
            <div class="avatar"><img src="https://tva1.sinaimg.cn/crop.0.0.180.180.50/5e9d399fjw1e8qgp5bmzyj2050050aa8.jpg" alt=""></div>
            <div class="mid">
              <div style="display: flex;justify-content: space-between;align-items: baseline;">
                <div class="title" style="font-weight:normal">{{item.ItemName}}</div>
              </div>
              <div style="font-size:13px;color:#999;">患者：{{item.UserName}}</div>
              <div style="font-size:13px;color:#999;">内容：{{item.Result?item.Result:'该患者没有留言'}}</div>
              <div class="describe">到期时间：{{item.EndTime | timeFormat}}</div>
            </div>
            <img style="width:50px;height:50px;" src="@/assets/images/ic_ywj.png" alt="">
          </div>
        </div>
      </div>
      <xx-occupied-box v-else>
        当前列表为空
      </xx-occupied-box>
    </div>
    <xx-tabbar></xx-tabbar>
  </div>
</template>

<script>
import { Sticky, dateFormat } from 'vux'
import { mapMutations, mapGetters } from 'vuex'
export default {
  filters: {
    timeFormat (value) {
      return dateFormat(new Date(value), 'YYYY-MM-DD HH:mm:ss')
    }
  },
  metaInfo: {
    title: '服务'
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
      complateMissionList: [],
      checkerIndexLoack: true
    }
  },
  watch: {
    missionTabIndex (val) {
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
      const that = this
      that.$vux.loading.show({
        text: '加载中'
      })
      if (that.modelMissionTabIndex === 0) {
        that.dataList = []
        switch (that.missionSmallTabIndex) {
          case 0:
            await that.getAll()
            break
          case 1:
            await that.getUserReserveServiceList().then(value => {
              that.dataList = value
              that.checkerIndexLoack = true
            })
            break
          case 2:
            await that.getAllWaitForService()
            break
          case 3:
            await that.getWaitForReview().then(value => {
              that.dataList = value
              that.checkerIndexLoack = true
            })
            break
        }
        that.$vux.loading.hide()
      }
      if (that.modelMissionTabIndex === 1) {
        that.getComplateMissionList().then(value => {
          that.complateMissionList = value.Data
          that.$vux.loading.hide()
        })
      }
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
      await that.getInServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getWaitForServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getUserReserveServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getWaitForReview().then(value => {
        that.dataList = that.dataList.concat(value)
      })
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
    /** 待确认 */
    async getUserReserveServiceList () {
      const res = await this.$http.get('/UserReserveServiceList')
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