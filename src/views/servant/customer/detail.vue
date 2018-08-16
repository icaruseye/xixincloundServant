<template>
  <div v-if="userInfo" style="padding-bottom:60px">
    <div class="user_bg_container">
      <div class="user_info_container">
        <div class="avatar_box">
          <img :src="userInfo.FriendAvatar | transformImgUrl" :alt="userInfo.RealName.substring(0, 1)">
        </div>
        <h4 class="realName">{{userInfo.RealName}}</h4>
        <p class="user_desc_p">
          {{userInfo.Mobile}}
        </p>
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

    <div class="tabs_container">
      <router-link class="tabs_items" to="/">健康档案</router-link>
      <router-link class="tabs_items" to="/">消息</router-link>
    </div>

    <ul style="margin-top: 10px">
      <li class="list_link_items" @click="listLinkRedirect('/')">
        服务套餐
        <i class="iconfont icon-jiantouyou"></i>
      </li>
      <li class="list_link_items" @click="listLinkRedirect('/')">
        服务计划
        <i class="iconfont icon-jiantouyou"></i>
      </li>
      <li class="list_link_items" @click="listLinkRedirect('/')">
        日程
        <i class="iconfont icon-jiantouyou"></i>
      </li>
    </ul>

    <div style="margin-top: 10px">
      <div>
        <div class="list_link_items" to="/">
          跟踪记录
        </div>
      </div>
      <div v-if="remarkList" class="remark_list_container">
        <template v-if="remarkList.length > 0">
          <div v-for="(item, index) in remarkList" :key="index" class="remark_list_items">
            <p class="time">{{item.CreateTime | tiemFormat}}</p>
            <p class="text">
              <i class="left_point_container"></i>
              {{item.FollowContent}}
            </p>
          </div>
        </template>
        <template v-else>
          <div class="empty_container">
            <i class="iconfont icon-kong"></i>
            <p>还没有添加过追踪记录</p>
          </div>
        </template>
      </div>
    </div>

    <div class="btn_bar">
      <button class="btn" @click="addRemarkDialogVisible = true">+ 追踪记录</button>
    </div>

    <!-- 添加追踪记录弹窗 -->
    <x-dialog
      v-model="addRemarkDialogVisible"
    >
      <div class="addRemarkDialog_container">
        <div class="addRemarkDialog_input_box">
          <textarea class="addRemarkDialog_input_textarea" v-model="remarkValue" placeholder="请添加"></textarea>
          <span class="addRemarkDialog_input_fontnums">{{remarkValue.length}} / 500</span>
        </div>
        <div class="addRemarkDialog_btn_box">
          <div class="btn_box">
            <button class="btn" @click="addRemarkSubmit" style="background-color:#3AC7F5">确定</button>
          </div>
          <div class="btn_box">
            <button class="btn" @click="addRemarkDialogVisible = false">取消</button>
          </div>
        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import {XDialog, dateFormat} from 'vux'
export default {
  components: {
    XDialog
  },
  data () {
    return {
      addRemarkDialogVisible: false,
      userInfo: null,
      userTags: null,
      remarkList: null,
      remarkValue: ''
    }
  },
  computed: {
    ID () {
      return this.$route.params.id
    }
  },
  filters: {
    tiemFormat (val) {
      console.log(new Date(val))
      return dateFormat(new Date(val), 'YYYY-MM-DD HH:mm:ss 星期E')
    }
  },
  created () {
    this.init()
  },
  methods: {
    listLinkRedirect () {
      this.$vux.toast.text('开发中…')
    },
    addRemarkSubmit () {
      if (this.remarkValue.length <= 0) {
        this.$vux.toast.text('追踪记录不可为空')
        return false
      }
      if (this.remarkValue.length > 500) {
        this.$vux.toast.text('追踪记录不可超过500字')
        return false
      }
      this.$vux.loading.show('添加中')
      this.$http.post(`/Attribute/FollowRecord/Add?userId=${this.ID}&followContent=${this.remarkValue}`).then(result => {
        this.$vux.loading.hide()
        this.$vux.toast.text('添加成功')
        this.remarkList.unshift({
          CreateTime: new Date(),
          FollowContent: this.remarkValue
        })
        this.addRemarkDialogVisible = false
        this.remarkValue = ''
      })
    },
    init () {
      this.getUserInfo()
      this.getTags()
      this.getRemarkList()
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
    },
    async getRemarkList () {
      const res = await this.$http.get(`/Attribute/FollowRecord/List?userId=${this.ID}`)
      if (res.data.Code === 100000) {
        this.remarkList = res.data.Data
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
    .user_desc_p
    {
      font-size: 12px;
      color: #fff;
      padding-left: 24px;
      margin-top: 5px;
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
.tabs_container
{
  display: flex;
  flex-flow: nowrap;
  height: 55px;
  background-color: #fff;
  margin-top: 10px;
  .tabs_items
  {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #333;
    &::after
    {
      position: absolute;
      display: block;
      content: '';
      right: 0;
      top: 13px;
      bottom: 13px;
      width: 1px;
      background-color: #D8F4F2;
    }
    &:last-child::after
    {
      display: none
    }
  }
}

.list_link_items
{
  position: relative;
  display: block;
  height: 44px;
  line-height: 44px;
  background-color: #fff;
  border-bottom: 1px solid #D8F4F2;
  color: #333333;
  padding-left: 48px;
  font-size: 16px;
  &:last-child
  {
    border-bottom: none;
  }
  .icon-jiantouyou
  {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #ddd;
    font-size: 16px;
  }
}

.btn_bar
{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-flow: nowrap;
  height: 52px;
  .btn
  {
    flex: 1;
    border: none;
    outline: none;
    background-color: #3AC7F5;
    font-size: 18px;
    color: #fff;
  }
}

.remark_list_container
{
  padding: 30px 0;
  .remark_list_items
  {
    position: relative;
    padding: 25px 27px 25px 50px;
    min-height: 50px;
    .time
    {
      font-size: 12px;
      color: #999;
    }
    .text
    {
      position: relative;
      background-color: #fff;
      padding: 15px 12px;
      border-radius: 4px;
      margin-top: 4px;
      font-size: 12px;
      text-align: justify;
      line-height: 14px;
      color: #999;
      .left_point_container
      {
        position: absolute;
        top: 50%;
        right: 100%;
        width: 50px;
        height: 18px;
        background-color: #f6f6f6;
        transform: translateY(-50%);
        &::before
        {
          position: absolute;
          display: block;
          content: '';
          top: 50%;
          left: 21px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: radial-gradient(rgba(58, 199, 245, 1), rgba(58, 199, 245, .2));
          transform: translate(-50%, -50%);
        }
        &::after
        {
          position: absolute;
          display: block;
          content: '';
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          border-width: 10px;
          border-style: solid;
          border-color: transparent #fff transparent transparent
        }
      }
    }
    &::before
    {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20px;
      width: 1px;
      background-color: rgba(51,51,51,.2);
      content: '';
      display: block;
      transform: scaleX(.5)
    }
  }
}
.addRemarkDialog_container
{
  background-color: #fff;
  padding: 20px 10px;
  .addRemarkDialog_input_box
  {
    height: 270px;
    background-color: #f9f9f9;
    padding-bottom: 70px;
    box-sizing: border-box;
    position: relative;
    .addRemarkDialog_input_fontnums
    {
      position: absolute;
      bottom: 5px;
      right: 10px;
      font-size: 14px;
      color: #ccc;
    }
    .addRemarkDialog_input_textarea
    {
      display: block;
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      border: none;
      resize: none;
      background-color: transparent;
      color: #999;
      font-size: 16px;
    }
  }
  .addRemarkDialog_btn_box
  {
    margin-top: 20px;
    display: flex;
    flex-flow: nowrap;
    .btn_box
    {
      flex: 1;
      display: flex;
      flex-flow: nowrap;
      justify-content: center;
      align-items: center;
      .btn
      {
        height: 30px;
        padding: 0 25px;
        border-radius: 15px;
        border: none;
        outline: none;
        background-color: #CCCCCC;
        color: #fff;
        font-size: 18px;
      }
    }
  }
}
.empty_container
{
  text-align: center;
  .iconfont
  {
    font-size: 48px;
    color: #ccc;
  }
  p
  {
    color: #999;
    font-size: 14px;
  }
}
</style>
