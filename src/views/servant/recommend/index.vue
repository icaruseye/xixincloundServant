<template>
  <div class="wrap">
    <div class="income_container" :style="{backgroundImage: `url(${imageReslove('recommend-3.png')})`}" >
      <router-link class="right_top_btn" to="/">帮助说明</router-link>
      <div class="amount_box">
        <span class="icon">￥</span>299.25
      </div>
      <p class="amount_desc_text">邀请收入总金额</p>
    </div>
    <div class="invite_btn_box">
      <router-link class="invite_btn left" :style="{backgroundImage: `url(${imageReslove('recommend-1.png')})`}" to="/recommend/inviteServant">
        <img class="recommend_invite_btn_icon" src="@/assets/images/recommend-4.png" alt="">
        <span class="title">邀请服务者</span>
      </router-link>
      <router-link class="invite_btn right" :style="{backgroundImage: `url(${imageReslove('recommend-2.png')})`}" to="/recommend/inviteUser">
        <img class="recommend_invite_btn_icon" src="@/assets/images/recommend-5.png" alt="">
        <span class="title">推荐用户</span>
      </router-link>
    </div>
    <div>
      <h1 class="recommend_list_title">推荐明细奖励</h1>
      <ul class="recommend_list_container">
        <li class="recommend_list_items">
          <h4 class="recommend_list_items_title">院内陪诊</h4>
          <p class="recommend_list_items_intro">
            2018-07-25 15:00
            <span class="username">用户：张**</span>
          </p>
          <span class="amount_span">
            <i class="amount_symbol">￥</i>10元
          </span>
        </li>
      </ul>
    </div>
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
  },
  methods: {
    imageReslove (url) {
      return require(`@/assets/images/${url}`)
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
  background-position: center;
  background-size: cover;
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
    background-position: center;
    background-size: cover;
    .recommend_invite_btn_icon
    {
      position: absolute;
      width: 26px;
      top: 13px;
      left: 50%;
      margin-left: -13px;
    }
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
  }
  .right
  {
    margin-left: 20px;
  }
}
.recommend_list_title
{
  height: 56px;
  background-color: #fff;
  text-align: center;
  line-height: 56px;
  font-size: 16px;
  font-weight: normal;
  color: #333;
}
.recommend_list_items
{
  position: relative;
  height: 62px;
  border-top: 1px solid #CCF0EE;
  background-color: #fff;
  padding: 13px 12px 0;
  box-sizing: border-box;
  .recommend_list_items_title
  {
    font-weight: normal;
    font-size: 16px;
    color: #333;
    line-height: 20px;
  }
  .recommend_list_items_intro
  {
    font-size: 12px;
    color: #999;
    .username
    {
      padding-left: 25px;
    }
  }
  .amount_span
  {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 16px;
    color: #FF5F5F;
    .amount_symbol
    {
      font-style: normal;
      font-size: 14px;
      vertical-align: middle;
    }
  }
}
</style>