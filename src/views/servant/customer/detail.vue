<template>
  <div v-if="userInfo" style="padding-bottom:60px;">
    <xx-go-back></xx-go-back>
    <div class="user_bg_container" style="margin-top:10px">
      <div class="user_info_container">
        <div class="avatar_box">
          <xxCenterImage :src="userInfo.FriendAvatar" radius="50%"></xxCenterImage>
        </div>
        <h4 class="realName">{{userInfo.UserName}}</h4>
        <!-- <p class="user_desc_p">
          {{userInfo.Mobile}}
        </p> -->
        <router-link class="send_message_btn" :to="`/message/chat/${userInfo.ViewId}`">发消息</router-link>
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
        <i class="add_tag_btn iconfont icon-jiahao" @click="selectTagsDialog = true"></i>
      </div>
    </div>

    <!-- <div class="tabs_container">
      <router-link class="tabs_items" to="/">
        <img class="tabs_items_icon" src="@/assets/images/ic_ userDetail_tab_1.png" alt="">
        健康档案
      </router-link>
      <router-link class="tabs_items" to="/">
        <img class="tabs_items_icon" src="@/assets/images/ic_ userDetail_tab_2.png" alt="">
        消息
      </router-link>
    </div> -->

    <ul style="margin-top: 10px">
      <li class="list_link_items" @click="listLinkRedirect(`/customer/${ID}/serviceList`)">
        <img class="list_link_items_icons" src="@/assets/images/ic_userDetail_listItem_1.png" alt="">
        服务套餐
        <i class="iconfont icon-jiantouyou"></i>
      </li>
      <li class="list_link_items" @click="listLinkRedirect(`/customer/${ID}/serviceRecord`)">
        <img class="list_link_items_icons" src="@/assets/images/ic_userDetail_listItem_2.png" alt="">
        服务记录
        <i class="iconfont icon-jiantouyou"></i>
      </li>
      <!-- <li class="list_link_items" @click="listLinkRedirect('/')">
        <img class="list_link_items_icons" src="@/assets/images/ic_userDetail_listItem_3.png" alt="">
        健康计划
        <i class="iconfont icon-jiantouyou"></i>
      </li> -->
    </ul>

    <div style="margin-top: 10px">
      <div style="background-color:#fff">
        <div class="list_link_items list_link_items_hasLeftLine" to="/">
          <img class="list_link_items_icons" src="@/assets/images/ic_userDetail_listItem_4.png" alt="">
          跟踪记录
        </div>
      </div>
      <div v-if="remarkList" class="remark_list_container">
        <template v-if="remarkList.length > 0">
          <img class="ic_userDetail_timeLine_top" src="@/assets/images/ic_userDetail_timeLine_top.png" alt="">
          <transition v-for="(item, index) in remarkList" :key="index" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft">
            <div class="remark_list_items">
              <p class="time">
                {{item.CreateTime | xxTimeFormatFilter}}
                <span style="padding-left:20px">{{item.CreateTime | xxTimeFormatFilter('星期E')}}</span>
              </p>
              <p class="text">
                <i class="left_point_container"></i>
                {{item.FollowContent}}
              </p>
            </div>
          </transition>
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

    <!-- 选择用户标签 -->
    <x-dialog v-model="selectTagsDialog">
      <div class="addRemarkDialog_container">
          <div v-if="userTags && userTags.length > 0">
            <h5 class="select_tag_title">已选标签</h5>
            <div class="tag_select_contianer">
              <div class="tags_checkbox_flex" v-for="(userTag, userTagIndex) in userTags" :key="userTagIndex">
                <label class="tags_checkbox_box">
                  <span class="tags_checkbox_label active" @click="clickAndRemoveTags(userTag.ID)">
                    {{userTag.AttrName}}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div class="mt10px" v-if="systemTags && systemTags.length > 0">
            <h5 class="select_tag_title">可选标签</h5>
            <div class="tag_select_contianer">
              <div class="tags_checkbox_flex" v-for="(systemTag, systemTagIndex) in systemTags" :key="systemTagIndex">
                <label class="tags_checkbox_box">
                  <span class="tags_checkbox_label" @click="clickAndAddTags(systemTag)">
                    {{systemTag}}
                  </span>
                </label>
              </div>
            </div>
          </div>
        <div class="customTag_input_container">
          <input class="add_customTag_control" v-model="customTagValue" type="text" placeholder="自定义标签">
          <span class="add_customTag_btn" @click="addCustomTagAction">添加</span>
        </div>
        <div class="addRemarkDialog_btn_box">
          <div class="btn_box">
            <button class="btn"  @click="selectTagsDialog = false">关闭</button>
          </div>
        </div>
      </div>
    </x-dialog>
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
import {XDialog} from 'vux'
export default {
  components: {
    XDialog
  },
  data () {
    return {
      customTagValue: '',
      selectTagsDialog: false,
      addRemarkDialogVisible: false,
      userInfo: null,
      userTags: null,
      remarkList: null,
      systemTags: null,
      remarkValue: ''
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
    listLinkRedirect (url) {
      this.$router.push(url)
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
        if (result.data.Code === 100000) {
          this.$vux.toast.text('添加成功')
          this.remarkList.unshift({
            CreateTime: new Date(),
            FollowContent: this.remarkValue
          })
          this.addRemarkDialogVisible = false
          this.remarkValue = ''
          this.$nextTick(() => {
            this.addRemarkScroll()
          })
        } else {
          this.$vux.toast.text('添加失败')
        }
      })
    },
    addRemarkScroll () {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      const offsetTop = document.querySelector('.remark_list_container').offsetTop
      if (scrollTop > offsetTop) {
        document.body.scrollTop = document.documentElement.scrollTop = offsetTop
      }
    },
    init () {
      this.getUserInfo()
      this.getTags()
      this.getRemarkList()
      this.getTagsList()
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
    },
    // 获取系统默认标签
    async getTagsList () {
      const res = await this.$http.get(`/Attribute/SysAttribute/List?userId=${this.ID}`)
      if (res.data.Code === 100000) {
        this.systemTags = res.data.Data
      }
    },
    // 异步请求添加用户标签
    async addUserTag (tagName) {
      const res = await this.$http.post(`/Attribute/UserAttribute/Add`, {
        UserId: this.ID,
        Arrs: [tagName]
      })
      return res.data
    },
    // 异步请求删除用户标签
    async deleteTagByTagID (tagID) {
      const res = await this.$http.delete(`/Attribute/UserAttribute/Delete?id=${tagID}`)
      return res.data
    },
    // 点击已选标签移除
    clickAndRemoveTags (tagID) {
      this.deleteTagByTagID(tagID).then(result => {
        if (result.Code === 100000) {
          this.getTags()
          this.getTagsList()
        }
      })
    },
    // 点击未选标签添加
    clickAndAddTags (tagName) {
      this.addUserTag(tagName).then(result => {
        if (result.Code === 100000) {
          this.getTags()
          this.getTagsList()
        }
      })
    },
    // 添加自定义标签
    addCustomTagAction () {
      if (this.customTagValue.length <= 0) {
        this.$vux.toast.text('请输入标签内容')
        return false
      }
      if (this.customTagValue.length > 8) {
        this.$vux.toast.text('标签不可以大于8个字')
        return false
      }
      this.addUserTag(this.customTagValue).then(result => {
        if (result.Code === 100000) {
          this.customTagValue = ''
          this.getTags()
          this.getTagsList()
        }
      })
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
    height: 75px;
    padding: 20px 20px 20px 59px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(255,255,255,.2);
    .avatar_box
    {
      position: absolute;
      left: 12px;
      top: 50%;
      width: 32px;
      height: 32px;
      background-color: #fff;
      border-radius: 50%;
      font-size: 16px;
      font-weight: 600;
      color: #ccc;
      line-height: 32px;
      text-align: center;
      transform: translateY(-50%);
      img
      {
        display: block;
        border-radius: 50%;
        width: 32px;
        height: 32px;
      }
    }
    .realName
    {
      color: #fff;
      font-size: 18px;
      height: 35px;
      line-height: 35px;
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
    position: relative;
    padding-right: 40px;
    box-sizing: border-box;
    padding-bottom: 9px;
    .add_tag_btn
    {
      position: absolute;
      right: 13px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 15px;
      color: #fff;
    }
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
    .tabs_items_icon
    {
      height: 19px;
      width: auto;
      margin-right: 14px;
    }
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
  height: 45px;
  line-height: 45px;
  background-color: #fff;
  border-bottom: 1px solid #D8F4F2;
  color: #333333;
  padding-left: 48px;
  font-size: 16px;
  box-sizing: border-box;
  .list_link_items_icons
  {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    width: 19px;
  }
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
.list_link_items_hasLeftLine
{
  margin-left: 12px;
  &::before
  {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    display: block;
    content: '';
    width: 4px;
    height: 15px;
    border-radius: 4px;
    background-color: #3AC7F5
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
  position: relative;
  padding: 30px 0;
  .ic_userDetail_timeLine_top
  {
    position: absolute;
    display: block;
    width: 15px;
    height: 15px;
    top: 8px;
    left: 14px;
  }
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
      padding: 10px 12px;
      border-radius: 4px;
      margin-top: 4px;
      font-size: 12px;
      text-align: justify;
      line-height: 20px;
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
.select_tag_title
{
  font-size: 12px;
  color: #999;
  font-weight: normal;

}
  .tag_select_contianer
  {
    margin-top: 10px;
    display: flex;
    align-content: space-around;
    flex-flow: wrap;
    .tags_checkbox_flex
    {
      display: flex;
      align-content: center;
      align-items: center;
      padding: 0 5px;
      height: 35px;
      .tags_checkbox_box
      {
        position: relative;
        .tags_checkbox_label
        {
          display: block;
          height: 25px;
          line-height: 25px;
          font-size: 12px;
          color: #999;
          background-color: #F6F6F6;
          border-radius: 13px;
          padding: 0 13px;
          white-space: nowrap;
          &.active
          {
            background-color: rgba(59, 199, 245, .2);
            color: #3AC7F5
          }
        }
      }
    }
  }
  .customTag_input_container
  {
    position: relative;
    margin-top: 30px;
    margin-bottom: 40px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
    padding-right: 100px;
    .add_customTag_control
    {
      background-color: #f6f6f6;
      width: 100%;
      height: 40px;
      padding: 0 10px;
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 14px;
    }
    .add_customTag_btn
    {
      position: absolute;
      right: 0;
      top: 10px;
      height: 40px;
      line-height: 40px;
      width: 80px;
      text-align: center;
      background-color: #3AC7F5;
      color: #fff;
      border-radius: 5px;
      font-size: 14px;
    }
  }
  .send_message_btn
  {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid #ddd;
    padding: 0 13px;
    color: #fff;
    font-size: 14px;
    height: 25px;
    border-radius: 13px;
    line-height: 25px;
    display: block;
  }
</style>
