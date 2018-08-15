<template>
  <div v-if="userInfo">
    <div class="user_bg_container">
      <div class="user_info_container">
        <div class="avatar_box">
          <img :src="userInfo.FriendAvatar | transformImgUrl" :alt="userInfo.RealName.substring(0, 1)">
        </div>
        <h4 class="realName">{{userInfo.RealName}}</h4>
      </div>
      <div class="user_tags_container clearfix">
        <template v-if="userTags">
          <div v-if="userTags.length > 0">
            <span class="userTags_icon" v-for="(item, index) in userTags" :key="index">{{item.AttrName}}</span>
          </div>
          <div class="no_tags" v-else>
            还没有为该用户添加标签！
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: null,
      userTags: null
    }
  },
  computed: {
    ID () {
      return this.$route.params.id
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getUserInfo()
      this.getTags()
    },
    async getUserInfo () {
      const res = await this.$http.get(`/Attribute/Friends/Detail?userId=${this.ID}`)
      if (res.data.Code === 100000) {
        this.userInfo = res.data.Data
      }
    },
    async getTags () {
      const res = await this.$http.get(`/Attribute/UserAttribute/List?userId=${this.ID}`)
      if (res.data.Code === 100000) {
        this.userTags = res.data.Data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user_bg_container
{
  background: linear-gradient(to right, #3AC7F5, #9EC2FB);
  .user_info_container
  {
    position: relative;
    height: 105px;
    padding: 20px 20px 20px 74px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(255,255,255,.2);
    .avatar_box
    {
      position: absolute;
      left: 12px;
      top: 50%;
      margin-top: -25px;
      width: 50px;
      height: 50px;
      background-color: #fff;
      border-radius: 50%;
      font-size: 16px;
      font-weight: 600;
      color: #ccc;
      line-height: 50px;
      width: 50px;
      height: 50px;
      text-align: center;
      img
      {
        display: block;
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }
    }
    .realName
    {
      color: #fff;
      font-size: 18px;
      font-weight: 500;
    }
  }
  .user_tags_container
  {
    padding-right: 40px;
    box-sizing: border-box;
    padding-bottom: 9px;
    .no_tags
    {
      font-size: 14px;
      color: #fff;
      height: 25px;
      line-height: 25px;
      padding: 0 15px;
      margin-top: 10px;
    }
    .userTags_icon
    {
      display: block;
      float: left;
      height: 18px;
      line-height: 18px;
      padding: 0 9px;
      border-radius: 9px;
      border: 1px solid #eee;
      margin-left: 12px;
      font-size: 12px;
      color: #fff;
      margin-top: 10px;
      box-sizing: border-box;
      white-space: nowrap;
    }
  }
}
</style>
