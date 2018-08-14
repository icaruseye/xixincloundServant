<template>
  <div v-if="goBackParam" class="goback_container">
    <div class="goback_btn" @click="redirectTo">
      <i class="iconfont icon-jiantouzuo"></i>
      返回
    </div>
    <router-link class="user_link_btn" to="/user">
      <img class="avatar" :src="userAccount.Avatar | transformImgUrl" alt="">
      {{userInfo.RealName}}
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    url: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo'
    ]),
    goBackParam () {
      return this.$route.meta.goBackParam
    }
  },
  methods: {
    redirectTo () {
      if (this.url) {
        this.$router.push(this.url)
      } else if (this.goBackParam.url) {
        this.$router.push(this.goBackParam.url)
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .goback_container
  {
    position: relative;
    height: 45px;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    .goback_btn
    {
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      height: 45px;
      line-height: 45px;
      padding: 0 10px;
      font-size: 14px;
      color: #999;
      .iconfont
      {
        font-size: 14px;
      }
    }
    .user_link_btn
    {
      position: absolute;
      right: 0;
      top: 0;
      display: block;
      height: 45px;
      padding: 0 10px 0 30px;
      font-size: 14px;
      color: #999;
      line-height: 45px;
      box-sizing: border-box;
      .avatar
      {
        position: absolute;
        left: 0;
        top: 10px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
    }
  }
</style>
