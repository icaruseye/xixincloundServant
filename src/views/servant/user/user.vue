<template>
  <div>
    <div class="has-tabbar">
      <div class="user-info">
        <img class="avatar" :src="userAccount.Avatar | transformImgUrl" >
        <p class="name">{{userAccount.NickName}}</p>
        <img class="qrcode" src="@/assets/images/code-1.png"  @click="maskShow = true">
      </div>
      <!-- <div v-if="userInfoCompleteProgress<100" class="user-info_percent">
        你的资料完整度为 {{userInfoCompleteProgress}}%，完善资料和验证手机后您才能为用户提供服务
      </div> -->
      <div class="user-panel">
        <router-link to="/" class="user-panel_item">
            <img src="@/assets/images/ic_message_account.png" >
            <p class="text">消息</p>
        </router-link>
        <router-link to="/mission" class="user-panel_item">
            <img src="@/assets/images/ic_mission_account.png" >
            <p class="text">任务</p>
        </router-link>
        <router-link to="/user/order" class="user-panel_item">
            <img src="@/assets/images/ic_order_account.png" >
            <p class="text">订单</p>
        </router-link>
      </div>
      <div class="setting-panel mt10px">
        <router-link to="/user/info" class="setting-panel_item">
          <img src="@/assets/images/ic_myInfo_account.png" >
          <span class="title">个人资料</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        
        <router-link to="/user/withdraw" class="setting-panel_item">
          <img src="@/assets/images/ic_withdraw_account.png" >
          <span class="title">提现</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>

        <router-link to="/user/bankCard" class="setting-panel_item">
          <img src="@/assets/images/ic_withdraw_account.png" >
          <span class="title">我的银行卡</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/address" class="setting-panel_item">
          <img src="@/assets/images/icon-my-address.png" >
          <span class="title">服务地址管理</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/recommend" class="setting-panel_item">
          <img src="@/assets/images/icon-my-address.png" >
          <span class="title">推荐有奖</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
      </div>


      <div class="setting-panel mt10px">
        <router-link to="/user/authstep3" class="setting-panel_item">
          <img src="@/assets/images/ic_myInfo_account.png" >
          <span class="title">我的执业证</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/complaint" class="setting-panel_item">
          <img src="@/assets/images/ic_complaint_account.png" >
          <span class="title">投诉</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <!-- 
        <a href="javascript:alert('开发中')" class="setting-panel_item">
          <img src="@/assets/images/ic_help_account.png" >
          <span class="title">帮助</span>
          <i class="iconfont icon-jiantouyou"></i>
        </a>
        <router-link to="/user/phone" class="setting-panel_item">
          <img src="@/assets/images/icon-my-phone.png" >
          <span class="title">手机认证</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link> -->
        <!-- <router-link to="/user/date" class="setting-panel_item">
          <img src="@/assets/images/icon-my-phone.png" >
          <span class="title">我的日程</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link> -->
      </div>
      
      <!-- <div class="setting-panel mt10px">
        <router-link to="/user/info" class="setting-panel_item">
          <img src="@/assets/images/ic_setting_account.png" >
          <span class="title">设置</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
      </div> -->
      
    </div>
    <xx-tabbar></xx-tabbar>
    <x-dialog v-model="maskShow" :hide-on-blur="true">
      <show-Qrcode></show-Qrcode>
    </x-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { XDialog } from 'vux'
import ShowQrcode from '@/components/ShowQrCode'
export default {
  components: {
    XDialog,
    ShowQrcode
  },
  data () {
    return {
      maskShow: false
    }
  },
  methods: {
    ...mapActions([
      'getUserAccount',
      'getUserInfo'
    ]),
    async updateUserAccountAndUserInfo () {
      await this.getUserAccount()
      await this.getUserInfo()
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo'
    ]),
    userInfoCompleteProgress () {
      let step = 0
      if (this.userInfo.Mobile) {
        step += 1
      }
      if (this.userInfo.IDCard) {
        step += 1
      }
      if (this.userAccount.NickName) {
        step += 1
      }
      if (this.userInfo.RealName) {
        step += 1
      }
      if (this.userInfo.RealName) {
        step += 1
      }
      if (this.userAccount.Description) {
        step += 1
      }
      return Math.ceil((step / 6) * 100)
    }
  },
  created () {
    this.updateUserAccountAndUserInfo()
  },
  mounted () {
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
  height: 60px;
  display: flex;
  background: #fff;
  font-size: 12px;
  .user-panel_item {
    position: relative;
    display: flex;
    flex: 1;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    color: #666;
    img {
      display: block;
      width: auto;
      height: 22px;
    }
    .text
    {
      text-align: center;
      margin-top: 4px;
      width: 100%;
      color: #666;
      font-size: 14px;
    }
  }
  .user-panel_item::after
  {
    position: absolute;
    content: '';
    display: block;
    top: 10px;
    bottom: 10px;
    width: 1px;
    right: 0;
    background-color: #CCF0EE;
    transform: scaleX(.5) translateX(-50%)
  }
  .user-panel_item:last-child:after{
    display: none;
  }
}

.setting-panel {
  background: #fff;
  &.vux-1px-t:before {
    border-color: #e5e5e5;
  }

  &:after {
    border-color: #e5e5e5;
  }
  .setting-panel_item {
    position: relative;
    width: 90%;
    height: 45px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: #666;
    font-size: 12px;
    &:after {
      position: absolute;
      display: block;
      content: '';
      height: 1px;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(58,199,245,.1);
    }
    img {
      width: auto;
      height: 15px;
      padding-right: 10px;
    }
    .title {
      flex: 1;
    }
    .iconfont {
      color: #ccc
    }
  }
.setting-panel_item:last-child::after
{
  display: none;
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
