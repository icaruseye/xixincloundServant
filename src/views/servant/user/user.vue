<template>
  <div>
    <div class="has-tabbar">
      <div class="user-info">
        <img class="avatar" :src="userAccount.Avatar | transformImgUrl" >
        <span class="name">{{userAccount.NickName}}</span>
        <img class="qrcode" src="@/assets/images/code-1.png"  @click="toggleMask(true)">
      </div>
      <div class="user-info_percent">
        你的资料完整度为 0%，完善资料和验证手机后您才能为用户提供服务
      </div>
      <div class="user-panel">
        <router-link to="/" class="user-panel_item">
            <img src="@/assets/images/icon-my-manager.png" >
            <span>消息</span>
        </router-link>
        <router-link to="/" class="user-panel_item">
            <img src="@/assets/images/icon-my-service.png" >
            <span>任务</span>
        </router-link>
        <router-link to="/" class="user-panel_item">
            <img src="@/assets/images/icon-my-calendar.png" >
            <span>应用</span>
        </router-link>
      </div>
      <div class="setting-panel vux-1px-t vux-1px-b" style="margin-top:10px">
        <router-link to="/user/info" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-set.png" >
          <span class="title">个人资料</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/phone" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-phone.png" >
          <span class="title">手机认证</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/withdraw" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-phone.png" >
          <span class="title">提现</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/complaint" class="setting-panel_item vux-1px-b">
          <img src="@/assets/images/icon-my-phone.png" >
          <span class="title">我的投诉</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/date" class="setting-panel_item">
          <img src="@/assets/images/icon-my-phone.png" >
          <span class="title">我的日程</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/Servant/Login" class="setting-panel_item">
          <img src="@/assets/images/icon-my-phone.png" >
          <span class="title">登录测试接口</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
      </div>
      
    </div>
    <xx-tabbar></xx-tabbar>
    <div class="weui-mask" v-show="maskShow">
      <div class="weui-mask-layer" @click="toggleMask(false)"></div>
      <img :src="userAccount.QRCodeStr" >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  metaInfo: {
    title: '我的'
  },
  data () {
    return {
      maskShow: false
    }
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ])
  },
  methods: {
    toggleMask (val) {
      this.maskShow = val
    }
  }
}
</script>

<style lang="less">
.user-info_percent {
  background: #fff;
  padding: 15px 20px;
  font-size: 12px;
  color: #3ac7f5;
}
.user-panel {
  padding: 10px 0;
  display: flex;
  background: #fff;
  border-bottom: #9fe6e6 1px solid;
  font-size: 12px;
  .user-panel_item {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    border-right: #d9f7f5  1px solid;
    color: #666;
    &:last-child {
      border: 0;
    }
    img {
      width: 31px;
      margin-right: 10px;
    }
  }
}

.setting-panel {
  background: #fff;
  &.vux-1px-t:before {
    border-color: #e5e5e5;
  }

  &.vux-1px-b:after {
    border-color: #e5e5e5;
  }
  .setting-panel_item {
    width: 90%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 15px 0;
    display: flex;
    align-items: center;
    color: #666;
    font-size: 12px;
    &.vux-1px-b:after {
      border-color: #daf6f5;
    }
    img {
      width: 24px;
      height: 24px;
      padding-right: 10px;
    }
    .title {
      flex: 1;
    }
    .iconfont {
      color: #f8a519
    }
  }
}

.weui-mask {
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
  }
}
</style>
