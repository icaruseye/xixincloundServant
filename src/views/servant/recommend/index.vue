<template>
  <div class="wrap">
    <xx-go-back></xx-go-back>
    <div class="income_container" :style="{backgroundImage: `url(${imageReslove('recommend-3.jpg')})`}" >
      <a class="right_top_btn" href="javascript:void(0)" @click="helpsDialogVisible = true">帮助说明</a>
      <div class="amount_box">
        <span class="icon">￥</span>{{RecommendTotalAmount | currencyFilter}}
      </div>
      <p class="amount_desc_text">邀请收入总金额</p>
    </div>
    <div class="invite_btn_box">
      <router-link class="invite_btn left" :style="{backgroundImage: `url(${imageReslove('recommend-1.png')})`}" :to="`/recommend/inviteServant?viewID=${userAccount.ViewID}`">
        <img class="recommend_invite_btn_icon" src="@/assets/images/recommend-4.png" alt="">
        <span class="title">邀请服务者</span>
      </router-link>
      <router-link class="invite_btn right" :style="{backgroundImage: `url(${imageReslove('recommend-2.png')})`}" :to="`/recommend/inviteUser?viewID=${userAccount.ViewID}`">
        <img class="recommend_invite_btn_icon" src="@/assets/images/recommend-5.png" alt="">
        <span class="title">推荐用户</span>
      </router-link>
    </div>
    <div>
      <h1 class="recommend_list_title">推荐奖励明细</h1>
      <ul v-if="WalletLogList.length > 0" class="recommend_list_container">
        <!-- <li v-for="(recommend, index) in recommendList" :key="index" class="recommend_list_items">
          <h4 class="recommend_list_items_title">院内陪诊</h4>
          <p class="recommend_list_items_intro">
            2018-07-25 15:00
            <span class="username">用户：张**</span>
          </p>
          <span class="amount_span">
            <i class="amount_symbol">￥</i>10元
          </span>
        </li> -->
        <list-items
          v-for="(WalletLog, index) in WalletLogList"
          @click.native="redirectToDetail(`/user/bills/${WalletLog.ID}/detail`)"
          :key="index"
          :Amount="WalletLog.Amount"
          :Type="WalletLog.OperatingType"
          :CreateTime="WalletLog.CreateTime">
        </list-items>
      </ul>
      <xx-occupied-box v-else>
        还没有获得邀请奖励哦！
      </xx-occupied-box>
    </div>
    <!-- 帮助说明 -->
    <x-dialog
      v-model="helpsDialogVisible"
      :hide-on-blur="true"
      class="dialog-demo">
       <div style="background-color:#fff;padding:20px">
         <p style="font-size:14px;color:#333;text-align:justify">推荐用户及推荐服务者加入平台，均有相应的返利，返利会在用户预约服务完成后发放到推荐者系统钱包。</p>
         <p style="font-size:12px;margin-top:10px; color:#999;text-align:justify">①	推荐用户：通过平台生成的二维码，推荐给用户加入平台，在用户消费服务完成后会给到相应的推荐奖励。</p>
         <p style="font-size:12px;margin-top:10px; color:#999;text-align:justify">②	邀请服务者：邀请您身边的医护好友加入平台，在服务者完成给用户的每一单服务后，会得到相应的推荐奖励。</p>
       </div>
      </x-dialog>
  </div>
</template>

<script>
import ListItems from '@/views/servant/user/user-bills/components/listItems'
import { mapGetters } from 'vuex'
import { ButtonTab, ButtonTabItem, XDialog, numberComma } from 'vux'
export default {
  components: {
    ButtonTab,
    ButtonTabItem,
    XDialog,
    ListItems
  },
  filters: {
    currencyFilter (val = 0) {
      if (val === 0) {
        return '0.00'
      } else {
        return numberComma((val / 100).toFixed(2))
      }
    }
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
      helpsDialogVisible: false,
      pageNumber: 1,
      RecommendTotalAmount: 0,
      WalletLogList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    imageReslove (url) {
      return require(`@/assets/images/${url}`)
    },
    getData () {
      this.$http.get(`/Recommend/Info?page=${this.pageNumber}`).then(result => {
        if (result.data.Code === 100000) {
          this.RecommendTotalAmount = result.data.Data.RecommendTotalAmount
          this.WalletLogList = result.data.Data.RecommendLogList
        }
      })
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