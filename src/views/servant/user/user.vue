<template>
  <div class="warp">
    <div class="user_top_container">
      <img class="user_avatar" :src="userAccount.Avatar | transformImgUrl" alt="">
      <div class="user_nickName">
        {{userAccount.NickName}}
      </div>
      <!-- <p class="user_desc">
        儿科
        <span style="padding-left:20px">主治医生</span>
      </p> -->
      <p class="user_desc">
        {{subsidiaryOrgan}}
      </p>
      <div class="user_qr_code_box" @click="maskShow = true">
        <img class="qrcode" src="@/assets/images/code-1.png"  @click="maskShow = true">
      </div>
    </div>
    <div class="user_content_container">
      <div class="user_wallet_info_container">
        <dl>
          <dd>￥1921.50</dd>
          <dt>可结算</dt>
        </dl>
        <dl>
          <dd>￥1269.50</dd>
          <dt>可提现</dt>
        </dl>
        <dl>
          <dd>￥1369.50</dd>
          <dt>已提现</dt>
        </dl>
      </div>
      <div class="user_wallet_bottom_container" style="position:relative">
        <p style="font-size:16px;color:#3AC7F5">可提现金额：<span style="color:#FF5F5F"><span style="font-size:12px">￥</span>169<span style="font-size:12px">元</span></span></p>
        <p style="font-size:12px;color:#999;margin-top:5px">每月10号可结算上月冻结收入</p>
        <router-link style="position: absolute;right:20px;top:20px;font-size:12px;color:#3AC7F5;line-height:25px" to="/">查看冻结</router-link>
      </div>
    </div>
    <div class="uset_links_container">
      <router-link class="user_links_items" to="/user/account">
        <i class="user_links_items_icon iconfont icon-zhanghu"></i>
        我的账户
      </router-link>
      <router-link class="user_links_items" to="/user/info">
        <i class="user_links_items_icon iconfont icon-iconfontzhizuobiaozhun0252"></i>
        个人资料
      </router-link>
      <router-link class="user_links_items" to="/recommend">
        <i class="user_links_items_icon iconfont icon-tuijian1" style="color:#3AC7F5"></i>
        推荐有奖
      </router-link>
    </div>
    <div class="uset_links_container">
      <router-link class="user_links_items" to="/user/order">
        <i class="user_links_items_icon iconfont icon-dingdan"></i>
        订单列表
      </router-link>
      <router-link class="user_links_items" to="/user/orderClearing/list">
        <i class="user_links_items_icon iconfont icon-drawa"></i>
        结算列表
      </router-link>
      <router-link class="user_links_items" to="/user/withdraw/list">
        <i class="user_links_items_icon iconfont icon-tixianmingxi"></i>
        提现明细
      </router-link>
    </div>
    <div class="uset_links_container">
      <router-link class="user_links_items" to="/user/bankCard">
        <i class="user_links_items_icon iconfont icon-yinhangqia"></i>
        我的银行卡
      </router-link>
      <router-link class="user_links_items" to="/user/authstep3">
        <i class="user_links_items_icon iconfont icon-zhengjian"></i>
        我的执业证
      </router-link>
      <router-link class="user_links_items" to="/user/address">
        <i class="user_links_items_icon iconfont icon-dizhi"></i>
        服务地址管理
      </router-link>
    </div>
    <div class="uset_links_container">
      <router-link class="user_links_items" to="/user/complaint">
        <i class="user_links_items_icon iconfont icon-tousu"></i>
        投诉
      </router-link>
    </div>
    <xx-tabbar></xx-tabbar>
    <x-dialog v-model="maskShow" :hide-on-blur="true">
      <show-Qrcode></show-Qrcode>
    </x-dialog>
    <!-- <div class="has-tabbar">
      <div class="user-info">
        <img class="avatar" :src="userAccount.Avatar | transformImgUrl" >
        <p class="name">{{userInfo.RealName || userInfo.NickName}}</p>
        <img class="qrcode" src="@/assets/images/code-1.png"  @click="maskShow = true">
      </div>
      <div v-if="userInfoCompleteProgress<100" class="user-info_percent">
        你的资料完整度为 {{userInfoCompleteProgress}}%，完善资料和验证手机后您才能为用户提供服务
      </div>
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
        
        <!-- <router-link to="/user/withdraw" class="setting-panel_item">
          <img src="@/assets/images/ic_withdraw_account.png" >
          <span class="title">提现</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link> -->

        <router-link to="/user/bankCard" class="setting-panel_item">
          <img src="@/assets/images/ic_user_bankcard.png" >
          <span class="title">我的银行卡</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/address" class="setting-panel_item">
          <img src="@/assets/images/icon-my-address.png" >
          <span class="title">服务地址管理</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/recommend" class="setting-panel_item">
          <img src="@/assets/images/ic_myInfo_account.png" >
          <span class="title">推荐有奖</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
      </div>


      <div class="setting-panel mt10px">
        <router-link to="/user/authstep3" class="setting-panel_item">
          <img src="@/assets/images/ic-lawyer_license.png" >
          <span class="title">我的执业证</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
        <router-link to="/user/complaint" class="setting-panel_item">
          <img src="@/assets/images/ic_complaint_account.png" >
          <span class="title">投诉</span>
          <i class="iconfont icon-jiantouyou"></i>
        </router-link>
      </div>
    </div> -->
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
    subsidiaryOrgan () {
      return sessionStorage.getItem('shopName')
    },
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
.warp
{
  padding-bottom: 100px 
}
.user_top_container
{
  position: relative;
  height: 140px;
  background-color: #3AC7F5;
  box-sizing: border-box;
  padding: 20px 90px 0;
  .user_avatar
  {
    position: absolute;
    left: 10px;
    top: 15px;
    height: 60px;
    width: 60px;
    border-radius: 50%
  }
  .user_nickName
  {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
  }
  .user_desc
  {
    font-size: 14px;
    color: #fff
  }
  .user_qr_code_box
  {
    position: absolute;
    right: 10px;
    top: 20px;
    width: 70px;
    height: 70px;
    border: 1px solid rgba(255,255,255,.5);
    padding: 5px;
    box-sizing: border-box
  }
}
.user_content_container
{
  position: relative;
  margin: -20px 20px 0px;
  background-color: #fff;
  &::after
  {
    position: absolute;
    top: 0;
    left: 100%;
    display: block;
    content: '';
    border-style: solid;
    border-width: 10px 5px 10px 5px;
    border-color: transparent transparent rgba(0,0,0,.2) rgba(0,0,0,.2)
  }
  &::before
  {
    position: absolute;
    top: 0;
    right: 100%;
    display: block;
    content: '';
    border-style: solid;
    border-width: 10px 5px 10px 5px;
    border-color: transparent rgba(0,0,0,.2) rgba(0,0,0,.2) transparent 
  }
  .user_wallet_info_container
  {
    position: relative;
    display: flex;
    height: 90px;
    flex-flow: nowrap;
    &::after
    {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0px;
      right: 0px;
      height: 1px;
      background-color: #f6f6f6;
    }
    dl
    {
      position: relative;
      display: flex;
      flex: 1;
      flex-flow: wrap;
      height: 100%;
      padding: 20px 0;
      box-sizing: border-box;
      align-items: center;
      &::after
      {
        position: absolute;
        content: '';
        right: 0;
        top: 20px;
        bottom: 20px;
        width: 1px;
        background-color: #f6f6f6;
      }
      &:last-child::after
      {
        display: none
      }
      dd
      {
        width: 100%;
        text-align: center;
        font-size: 16px;
        color: #3AC7F5;
      }
      dt
      {
        width: 100%;
        font-size: 12px;
        color: #999;
        text-align: center;
      }
    }
  }
  .user_wallet_bottom_container
  {
    padding: 20px
  }
}
.uset_links_container
{
  background-color: #fff;
  margin: 10px 20px 0;
  .user_links_items
  {
    position: relative;
    display: block;
    height: 60px;
    line-height: 60px;
    padding: 0 15px 0 70px;
    font-size: 14px;
    color: #999;
    color: #999;
    &::after
    {
      position: absolute;
      content: '';
      bottom: 0;
      left: 10px;
      right: 10px;
      height: 1px;
      background-color: #f6f6f6;
    }
    &:last-child:after
    {
      display: none;
    }
    .user_links_items_icon
    {
      position: absolute;
      display: block;
      left: 10px;
      top: 0;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 24px;
      color: #999;
    }
  }
}
// .user-info_percent {
//   background: #fff;
//   padding: 15px 20px;
//   font-size: 12px;
//   color: #3ac7f5;
// }
// .user-panel {
//   height: 60px;
//   display: flex;
//   background: #fff;
//   font-size: 12px;
//   .user-panel_item {
//     position: relative;
//     display: flex;
//     flex: 1;
//     flex-flow: column;
//     align-items: center;
//     justify-content: center;
//     color: #666;
//     img {
//       display: block;
//       width: auto;
//       height: 22px;
//     }
//     .text
//     {
//       text-align: center;
//       margin-top: 4px;
//       width: 100%;
//       color: #666;
//       font-size: 14px;
//     }
//   }
//   .user-panel_item::after
//   {
//     position: absolute;
//     content: '';
//     display: block;
//     top: 10px;
//     bottom: 10px;
//     width: 1px;
//     right: 0;
//     background-color: #CCF0EE;
//     transform: scaleX(.5) translateX(-50%)
//   }
//   .user-panel_item:last-child:after{
//     display: none;
//   }
// }

// .setting-panel {
//   background: #fff;
//   &.vux-1px-t:before {
//     border-color: #e5e5e5;
//   }

//   &:after {
//     border-color: #e5e5e5;
//   }
//   .setting-panel_item {
//     position: relative;
//     width: 90%;
//     height: 45px;
//     margin: 0 auto;
//     box-sizing: border-box;
//     display: flex;
//     align-items: center;
//     color: #666;
//     font-size: 12px;
//     &:after {
//       position: absolute;
//       display: block;
//       content: '';
//       height: 1px;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       background-color: rgba(58,199,245,.1);
//     }
//     img {
//       width: auto;
//       height: 15px;
//       padding-right: 10px;
//     }
//     .title {
//       flex: 1;
//     }
//     .iconfont {
//       color: #ccc
//     }
//   }
// .setting-panel_item:last-child::after
// {
//   display: none;
// }
// }
// .weui-mask {
//   img {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%,-50%)
//   }
// }
</style>
