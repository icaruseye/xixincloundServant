<template>
  <div class="wrap">
    <div class="container">
      <div class="userinfo-pannel">
        <img :src="userAccount.Avatar | transformImgUrl" alt="">
        <div class="name">{{userAccount.NickName}}</div>
      </div>
      <div class="invite_btn_box">
        <router-link class="invite_btn" to="/recommend/inviteServant">推荐服务者</router-link>
        <router-link class="invite_btn" style="background-color:#3ECCCC" to="/recommend/inviteUser">推荐用户</router-link>
      </div>
    </div>
    <!-- <div class="rule_container">
      <h5 class="title">推荐规则：</h5>
      <p class="item">1、在 Vue 中即使是过渡也是数据驱动的！动态过渡最基本的例子是通过 name 特性来绑定动态值。</p>
      <p class="item">2、在 Vue 中即使是过渡也是数据驱动的！动态过渡最基本的例子是通过 name 特性来绑定动态值。</p>
      <p class="item">3、在 Vue 中即使是过渡也是数据驱动的！动态过渡最基本的例子是通过 name 特性来绑定动态值。</p>
      <p class="item">4、在 Vue 中即使是过渡也是数据驱动的！动态过渡最基本的例子是通过 name 特性来绑定动态值。</p>
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
.wrap {
  min-height: 100vh;
  padding-top: 70px;
  box-sizing: border-box;
  background: @theme-color;
  .container {
    position: relative;
    padding-top: 120px;
    margin: 0 20px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  }
}
.userinfo-pannel {
  position: absolute;
  width: 100%;
  top: -50px;
  text-align: center;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid #fff;
  }
  .name {
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
  }
  .tag {
    width: 85px;
    height: 22px;
    line-height: 22px;
    margin: 0 auto;
    border-radius: 4px;
    font-size: 12px;
    color: #fff;
    background: linear-gradient(to right, @theme-color, @theme-color-lucency);
  }
}
.invite_btn_box
{
  display: flex;
  flex-flow: nowrap;
  align-content: space-around;
  justify-content: space-around;
  margin-top: 20px;
  text-align:center;
  padding-bottom:40px
}
.invite_btn
{
  height: 40px;
  width: 140px;
  text-align: center;
  line-height: 40px;
  background-color: #3ac7f5;
  color: #fff;
}
.rule_container
{
  margin: 20px 30px;
  .title
  {
    color: #fff;
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 10px;
  }
  .item
  {
    font-size: 12px;
    color: #fff;
    margin-bottom: 10px;
    text-align: justify;
  }
}
</style>