<template>
  <div>
    <div class="has-tabbar">
      <div class="user-info">
        <img class="avatar" src="https://img3.doubanio.com/icon/u53078059-35.jpg" alt="">
        <span class="name">夸夸夸</span>
        <img class="qrcode" src="@/assets/servant/code-1.png" alt="">
      </div>
      <sticky
        ref="sticky"
        :offset="0"
        :check-sticky-support="false">
        <tab :line-width="2">
          <tab-item @on-item-click="onItemClick">待确认<span class="weui-badge">1</span></tab-item>
          <tab-item selected @on-item-click="onItemClick">待服务</tab-item>
          <tab-item @on-item-click="onItemClick">服务中</tab-item>
          <tab-item @on-item-click="onItemClick">待确认</tab-item>
        </tab>
      </sticky>
      <!-- 待确认 -->
      <div v-show="tabIndex === 0">
        <div class="weui-panel">
          <div class="weui-cell item" @click="toReceive(1)">
            <div class="left">
              <img class="avatar" src="https://avatars2.githubusercontent.com/u/5502029?v=4" alt="">
              <span>1carus</span>
            </div>
            <div class="mid">
              <div class="title">测试服务包1-上门输液</div>
              <div class="time">预计服务时间：2018-04-27 14:49</div>
              <div class="mark">备注：没有哦</div>
            </div>
            <div class="right">待确认</div>
          </div>
        </div>
      </div>
      <!-- 待服务 -->
      <div v-show="tabIndex === 1">
        <div v-show="calendarShow" style="border-bottom: 1px solid #eefffe">
          <inline-calendar
          ref="calendar"
          @on-change="calendarChange"
          class="inline-calendar-demo"
          v-model="calendarVal"
          :highlight-weekend="true"
          :replace-text-list="{'TODAY':'今'}"
          :disable-past="true">
          </inline-calendar>
        </div>
        <div class="weui-cell-calendar vux-1px-b" @click="toggleCalender">
          {{calendarBarText}} <i class="iconfont" :class="{'icon-jiantoushang' : calendarShow, 'icon-jiantouxia': !calendarShow}"></i>
        </div>
        <div class="weui-panel">
          <div class="weui-cell item" @click="toWait(1)">
            <div class="left">
              <img class="avatar" src="https://avatars2.githubusercontent.com/u/5502029?v=4" alt="">
              <span>1carus</span>
            </div>
            <div class="mid">
              <div class="title">测试服务包1-上门输液</div>
              <div class="time">服务开始时间：2018-04-27 14:49</div>
              <div class="mark">备注：没有哦</div>
            </div>
            <div class="right">等待服务</div>
          </div>
        </div>
      </div>
      <!-- 服务中 -->
      <div v-show="tabIndex === 2">
        <div class="weui-panel">
          <div class="weui-cell item" @click="toDetail(1)">
            <div class="left">
              <img class="avatar" src="https://avatars2.githubusercontent.com/u/5502029?v=4" alt="">
              <span>1carus</span>
            </div>
            <div class="mid">
              <div class="title">测试服务包1-上门输液</div>
              <div class="time">预计服务时间：2018-04-27 14:49</div>
              <div class="mark">备注：没有哦</div>
            </div>
            <div class="right">服务中</div>
          </div>
        </div>
      </div>
      <!-- 待评价 -->
      <div v-show="tabIndex === 3">
        <div class="weui-panel">
          <div class="weui-cell item" @click="toDetail(1)">
            <div class="left">
              <img class="avatar" src="https://avatars2.githubusercontent.com/u/5502029?v=4" alt="">
              <span>1carus</span>
            </div>
            <div class="mid">
              <div class="title">测试服务包1-上门输液</div>
              <div class="time">预计服务时间：2018-04-27 14:49</div>
              <div class="mark">备注：没有哦</div>
            </div>
            <div class="right">待评价</div>
          </div>
        </div>
      </div>
    </div>
    <servant-tabbar></servant-tabbar>
  </div>
</template>

<script>
import { Tab, TabItem, Sticky, InlineCalendar } from 'vux'
import servantTabbar from '@/components/common/servantTabbar'
import util from '@/plugins/util'
export default {
  metaInfo: {
    title: '悉心服务-任务'
  },
  components: {
    Tab,
    TabItem,
    Sticky,
    servantTabbar,
    InlineCalendar
  },
  data () {
    return {
      tabIndex: 1,
      calendarShow: true,
      calendarBarText: '收起日历',
      calendarVal: 'TODAY'
    }
  },
  methods: {
    onItemClick (index) {
      this.tabIndex = index
      util.formatDate(new Date())
    },
    toggleCalender () {
      this.calendarShow = !this.calendarShow
      this.calendarBarText = this.calendarShow ? '收起日历' : '展开日历'
    },
    calendarChange (val) {
      console.log('on-change', val)
    },
    toReceive (id) {
      this.$router.push(`/mission/receive/${id}`)
    },
    toDetail (id) {
      this.$router.push(`/mission/detail/${id}`)
    },
    toWait (id) {
      this.$router.push(`/mission/waitreceive/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  color: #f8a519
}

.weui-cell-calendar {
  font-size: 14px;
  color: #f8a519;
  padding: 15px;
  text-align: center;
  background: #fff;
  justify-content: center
}

.item {
  display: flex;
  .left {
    margin-right: 10px;
    text-align: center;
    color: @yellow;
    font-size: 12px;
    text-align: center;
    .avatar {
      display: block;
      width: 50px;
      height: 50px;
      margin-bottom: 5px;
    }
  }
  .mid {
    flex: 1;
    font-size: 12px;
    color: #999;
    .title {
      color: #666;
      font-size: 14px;
    }
  }
  .right {
    font-size: 14px;
    color: #f8a519;
  }
}

.vux-tab-item {
  position: relative;
}

.weui-badge {
    display: inline-block;
    padding: .15em .4em;
    min-width: 9px;
    border-radius: 18px;
    background-color: #f8a519;
    color: #FFFFFF;
    line-height: 1.2;
    text-align: center;
    font-size: 12px;
    position: relative;
    top: -2px;
    left: 1px;
}
</style>
