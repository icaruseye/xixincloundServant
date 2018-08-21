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
      <div class="user_wallet_bottom_container" style="position:relative">
        <p>
          <span style="font-size:16px;color:#666666;font-weight: 600">可提现金额</span><span style="font-size:12px;color:#FF5F5F">￥</span><span style="color:#FF5F5F;font-size:18px;">169</span><span style="font-size:12px;color:#FF5F5F">元</span>
        </p>
        <p style="font-size:12px;color:#999;margin-top:5px">每月10号可结算上月冻结收入</p>
        <router-link class="show_freeze_btn" to="/user/account">查看冻结</router-link>
      </div>
      <div class="user_wallet_info_container">
        <dl>
          <dd><span class="rmb_symbol">￥</span>1921.50</dd>
          <dt>可结算</dt>
        </dl>
        <dl>
          <dd><span class="rmb_symbol">￥</span>1269.50</dd>
          <dt>可提现</dt>
        </dl>
        <dl>
          <dd><span class="rmb_symbol">￥</span>1369.50</dd>
          <dt>已提现</dt>
        </dl>
      </div>
    </div>
    <div class="uset_links_container">
      <router-link class="user_links_items" to="/user/order">
        <img class="user_links_items_icon" src="@/assets/images/ic_user_index_order.png" alt="订单">
        订单
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
      <router-link class="user_links_items" to="/recommend">
        <img class="user_links_items_icon" src="@/assets/images/ic_user_index_invate.png" alt="我的邀请">
        我的邀请
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
      <router-link class="user_links_items" to="/user/bankCard">
        <img class="user_links_items_icon" src="@/assets/images/ic_user_bankcard.png" alt="银行卡">
        银行卡
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
      <router-link class="user_links_items" to="/user/info">
        <img class="user_links_items_icon" src="@/assets/images/ic_myInfo_account.png" alt="个人资料">
        个人资料
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
    </div>
    <div class="uset_links_container">
      <router-link class="user_links_items" to="/user/complaint">
        <img class="user_links_items_icon" src="@/assets/images/ic_complaint_account.png" alt="投诉">
        投诉
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
      <router-link class="user_links_items" to="/user/complaint">
        <img class="user_links_items_icon" src="@/assets/images/ic_userIndex_help.png" alt="帮助">
        帮助
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
    </div>
    <div class="uset_links_container">
      <router-link class="user_links_items" to="/user/info">
        <img class="user_links_items_icon" src="@/assets/images/ic_setting_account.png" alt="设置">
        设置
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
      <router-link class="user_links_items" to="/user/address">
        <img class="user_links_items_icon" src="@/assets/images/icon-my-address.png" alt="地址">
        地址
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
      <router-link class="user_links_items" to="/user/authstep3">
        <img class="user_links_items_icon" src="@/assets/images/ic_userIndex_wdzyz.png" alt="我的执业证">
        我的执业证
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
      <router-link class="user_links_items" to="/user/info">
        <img class="user_links_items_icon" src="@/assets/images/ic_userIndex_sjrz.png" alt="手机认证">
        手机认证
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
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
  height: 143px;
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
    width: 60px;
    height: 60px;
    border: 1px solid rgba(255,255,255,.5);
    padding: 5px;
    box-sizing: border-box
  }
}
.user_content_container
{
  position: relative;
  margin: -43px 7px 0px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 7px 15px #D3D3D3;
  .user_wallet_info_container
  {
    position: relative;
    display: flex;
    height: 61px;
    flex-flow: nowrap;
    &::after
    {
      position: absolute;
      content: '';
      top: 0;
      left: 0px;
      right: 0px;
      height: 1px;
      background-color: #CCF0EE;
    }
    dl
    {
      position: relative;
      display: flex;
      flex: 1;
      flex-flow: wrap;
      height: 100%;
      padding: 7px 0;
      box-sizing: border-box;
      align-items: center;
      &::after
      {
        position: absolute;
        content: '';
        right: 0;
        top: 14px;
        bottom: 14px;
        width: 1px;
        background-color: #CCF0EE;
      }
      &:last-child::after
      {
        display: none
      }
      dd
      {
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #FF5F5F;
        .rmb_symbol
        {
          font-size: 12px;
        }
      }
      dt
      {
        width: 100%;
        font-size: 14px;
        color: #666666;
        text-align: center;
      }
    }
  }
  .user_wallet_bottom_container
  {
    padding: 10px 9px;
    .show_freeze_btn
    {
      position: absolute;
      right:5px;
      bottom:8px;
      font-size:10px;
      color:#fff;
      line-height:19px;
      background-color: #F8A519;
      border-radius: 14px;
      display: block;
      padding: 0 8px;
    }
  }
}
.uset_links_container
{
  background-color: #fff;
  margin: 10px 7px 0;
  border-radius: 8px;
  .user_links_items
  {
    position: relative;
    display: block;
    height: 47px;
    line-height: 47px;
    padding: 0 15px 0 34px;
    font-size: 15px;
    color: #666666;
    .icon-jiantouyou
    {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      color: #ccc;
      font-size: 15px;
    }
    &::after
    {
      position: absolute;
      content: '';
      bottom: 0;
      left: 5px;
      right: 5px;
      height: 1px;
      transform: scaleY(.5);
      background-color: rgba(0, 180, 171,.2);
    }
    &:last-child:after
    {
      display: none;
    }
    .user_links_items_icon
    {
      position: absolute;
      display: block;
      left: 6px;
      top: 50%;
      max-width: 15px;
      max-height: 15px;
      transform: translateY(-50%);
    }
  }
}
</style>
