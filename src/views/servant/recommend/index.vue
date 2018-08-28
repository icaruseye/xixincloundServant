<template>
  <div class="wrap">
    <div class="income_container">
      <router-link class="right_top_btn" to="/">帮助说明</router-link>
      <div class="amount_box">
        <span class="icon">￥</span>299.25
      </div>
      <p class="amount_desc_text">邀请收入总金额</p>
    </div>
    <div class="invite_btn_box">
      <router-link class="invite_btn left" to="/recommend/inviteServant">
        <span class="title">邀请服务者</span>
      </router-link>
      <router-link class="invite_btn right" to="/recommend/inviteUser">
        <span class="title">推荐用户</span>
      </router-link>
    </div>
    <!-- <div class="container">
      <div class="userinfo-pannel">
        <img :src="userAccount.Avatar | transformImgUrl" alt="">
        <div class="name">{{userAccount.NickName}}</div>
      </div>
      <div class="invite_btn_box">
        <router-link class="invite_btn" to="/recommend/inviteServant">推荐服务者</router-link>
        <router-link class="invite_btn" style="background-color:#3ECCCC" to="/recommend/inviteUser">推荐用户</router-link>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ButtonTab, ButtonTabItem } from 'vux'
export default {
  components: {
    ButtonTab,
    ButtonTabItem
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ]),
    API_PATH () {
      return process.env.API_PATH
    }
  },
  data () {
    return {
      index: 0
    }
  }
}
</script>

<style scoped lang="less">
.income_container
{
  position: relative;
  height: 140px;
  padding-top: 19px;
  box-sizing: border-box;
  background: linear-gradient(to right, #9EC2FB,#3CC7F5);
  .right_top_btn
  {
    position: absolute;
    right: 12px;
    top: 14px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    box-sizing: border-box;
    color: #fff;
    border:1px solid #fff;
    padding: 0 12px;
    border-radius: 13px;
  }
  .amount_box
  {
    text-align: center;
    color: #FFFFFF;
    font-size: 30px;
    line-height: 42px;
    .icon
    {
      vertical-align: middle;
      font-size: 25px;
    }
  }
  .amount_desc_text
  {
    text-align: center;
    color: #fff;
    font-size: 14px;
    left: 18px;
  }
}
.invite_btn_box
{
  position: relative;
  height: 56px;
  .invite_btn
  {
    position: absolute;
    top: -30px;
    left: 50%;
    width: 100px;
    height: 76px;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
    color: #fff;
    .title
    {
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
      bottom: 10px;
      white-space: nowrap;
    }
  }
  .left
  {
    margin-left: -120px;
    background: linear-gradient(to right bottom,#BEF3CA, #43CDCB);
  }
  .right
  {
    margin-left: 20px;
    background: linear-gradient(to right bottom,#6BA6F9, #687CFF);
  }
}
</style>