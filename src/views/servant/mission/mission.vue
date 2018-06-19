<template>
  <div class="has-tabbar">
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="false">
      <xx-tab v-model="tabIndex" active-color="#3AC7F5" custom-bar-width="25px">
        <xx-tab-item :selected="tabIndex === 0" @on-item-click="onItemClick">服务中</xx-tab-item>
        <xx-tab-item :selected="tabIndex === 1" @on-item-click="onItemClick">已完成</xx-tab-item>
      </xx-tab>
    </sticky>
    <!-- 服务中 -->
    <div class="tabbox" v-show="tabIndex === 0">
      <div class="checker-bar">
        <span class="">筛选条件：</span>
        <ul>
          <li :class="checkerIndex === 0 ? 'active' : ''" @click="changeChecker(0)">全部</li>
          <li :class="checkerIndex === 1 ? 'active' : ''" @click="changeChecker(1)">待确认</li>
          <li :class="checkerIndex === 2 ? 'active' : ''" @click="changeChecker(2)">待服务</li>
          <li :class="checkerIndex === 3 ? 'active' : ''" @click="changeChecker(3)">待评价</li>
        </ul>
      </div>
      <div class="weui-panel" style="margin-top:0">
        <div class="weui-list_container">
          <div v-if="dataList.length >0" class="weui-list_item" v-for="(item, index) in dataList" :key="index" @click="redirectDetail(item.State, item.Type, item.ID)">
            <div class="avatar"><img src="https://tva1.sinaimg.cn/crop.0.0.180.180.50/5e9d399fjw1e8qgp5bmzyj2050050aa8.jpg" alt=""></div>
            <div class="mid">
              <div style="display: flex;justify-content: space-between;align-items: baseline;">
                <div class="title" style="font-weight:normal">{{item.ItemName}}</div>
              </div>
              <div style="font-size:13px;color:#999;">患者：{{item.ServantName}}</div>
              <div style="font-size:13px;color:#999;">内容：{{item.Discription?item.Discription:'该患者没有留言'}}</div>
              <div class="describe">时间：{{item.EndTime | timeFormat}}</div>
            </div>
            <img v-if="item.State == 0 && item.Type == 0" style="width:50px;height:50px;" src="@/assets/images/ic_dqr.png" alt="">
            <img v-if="item.State == 0  && item.Type == 1" style="width:50px;height:50px;" src="@/assets/images/ic_dff.png" alt="">
            <img v-if="item.State == 4" style="width:50px;height:50px;" src="@/assets/images/ic_dpj.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 已完成 -->
    <div class="tabbox" v-show="tabIndex === 1">
      <div class="weui-panel">
        <div class="weui-list_container">
          <div class="weui-list_item" @click="toDetail(1)">
            <div class="avatar"><img src="https://tva1.sinaimg.cn/crop.0.0.180.180.50/5e9d399fjw1e8qgp5bmzyj2050050aa8.jpg" alt=""></div>
            <div class="mid">
              <div style="display: flex;justify-content: space-between;align-items: baseline;">
                <div class="title" style="font-weight:normal">PICC换药1</div>
              </div>
              <div style="font-size:13px;color:#999;">患者：xxx</div>
              <div style="font-size:13px;color:#999;">内容：阿莫西林3颗含服</div>
              <div class="describe">到期时间：2018/06/08</div>
            </div>
            <img style="width:50px;height:50px;" src="@/assets/images/ic_ywj.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <xx-tabbar></xx-tabbar>
  </div>
</template>

<script>
import { Sticky, dateFormat } from 'vux'
import http from '@/api'
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
  data () {
    return {
      dataList: [],
      tabIndex: 0,
      checkerIndex: 0 // 0、全部；1、待确认；2、待服务；3、待评价
    }
  },
  watch: {
    serviceTabIndex (val) {
      this.tabIndex = val
    },
    checkerIndex () {
      this.initData()
    }
  },
  created () {
    this.initData()
  },
  methods: {
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
    initData () {
      const that = this
      that.dataList = []
      switch (that.checkerIndex) {
        case 0:
          that.getAll()
          break
        case 1:
          that.getUserReserveServiceList().then(value => {
            that.dataList = value
          })
          break
        case 2:
          that.getWaitForServiceList().then(value => {
            that.dataList = value
          })
          break
        case 3:
          that.getWaitForReview().then(value => {
            that.dataList = value
          })
          break
      }
    },

    /** 查看全部 */
    async getAll () {
      const that = this
      await that.getInServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getUserReserveServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getWaitForServiceList().then(value => {
        that.dataList = that.dataList.concat(value)
      })
      await that.getWaitForReview().then(value => {
        that.dataList = that.dataList.concat(value)
      })
    },

    /** 服务中 */
    async getInServiceList () {
      const res = await http.get('/MissionList/InService')
      return res.data.Data
    },
    /** 待服务 */
    async getWaitForServiceList () {
      const res = await http.get('/MissionList/WaitForService')
      return res.data.Data
    },
    /** 待确认 */
    async getUserReserveServiceList () {
      const res = await http.get('/UserReserveServiceList')
      return res.data.Data
    },
    /** 待评价 */
    async getWaitForReview () {
      const res = await http.get('/MissionList/WaitForReview')
      return res.data.Data
    },

    changeChecker (index) {
      this.checkerIndex = index
    },
    onItemClick (id) {
      this.$store.commit('setServiceTabIndex', id)
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