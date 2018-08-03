<template>
  <div style="padding-bottom:100px">
    <div>
      <mail-group-item :msgType="1"></mail-group-item>
      <mail-group-item :msgType="2"></mail-group-item>
      <mail-group-item :msgType="4"></mail-group-item>
    </div>

    <div v-if="list.length > 0" class="tabbox-list vux-1px-b vux-1px-t mt10px">
      <div v-for="(item, index) in list" class="item vux-1px-b" @click="goChat(item.UserViewID, index)" :key="index">
        <div class="UnreadCount_box">
          <i class="UnreadCount_icon" v-if="item.UnreadCount > 0">{{item.UnreadCount}}</i>
          <img class="avatar" :src="item.UserAvatar | transformImgUrl" >
        </div>
        <div class="mid">
          <div class="name">{{item.UserName}}</div>
          <p class="text fof">{{item.NewestContent | xxTextTruncateFilter(18)}}</p>
        </div>
        <i class="iconfont icon-jiantouyou"></i>
      </div>
    </div>
    <xx-occupied-box v-else>
      {{occupiedText}}
    </xx-occupied-box>

    <xx-tabbar></xx-tabbar>
  </div>
</template>

<script>
import MailGroupItem from './components/MailGroupItem'
import {mapGetters, mapActions} from 'vuex'
export default {
  components: {
    MailGroupItem
  },
  data () {
    return {
      list: [],
      siteNoticeNum: 0,
      occupiedText: ''
    }
  },
  watch: {
    updateChatList () {
      this.restData()
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo',
      'hasNewChat',
      'updateChatList'
    ])
  },
  created () {
    this.getData()
    this.getChatHasNews()
    this.getSiteNoticeNum()
  },
  methods: {
    ...mapActions([
      'getChatHasNews'
    ]),
    goChat (id, index) {
      sessionStorage.setItem('friendInfo', JSON.stringify(this.list[index]))
      this.$router.push(`/message/chat/${id}`)
    },
    async getData () {
      this.$vux.loading.show('加载中')
      this.occupiedText = '正在请求数据…'
      const res = await this.$http.get('/ContactList', { Page: 1, Size: 100 })
      this.list = res.data.Data
      this.$vux.loading.hide()
      this.occupiedText = '没有联系人'
    },
    restData () {
      this.$http.get('/ContactList', { Page: 1, Size: 100 }).then(result => {
        this.list = result.data.Data
      })
    },
    async getSiteNoticeNum () {
      const res = await this.$http.get('/SiteNotice/Count/Unread')
      this.siteNoticeNum = res.data.Data
    }
  }
}
</script>

<style lang="less">
.system_message_entrance_container
{
  display: flex;
  height: 50px;
  width: 100%;
  flex-flow: nowrap;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(153, 153, 153, 0.5);
  padding-left: 5px;
  box-sizing: border-box;
  .avatar_container
  {
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex: 0 0 70px;
    img {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .content
  {
    display: flex;
    flex: 1;
    align-items: center;
    color: #333333;
    font-size: 18px;
    .professional_title
    {
      padding: 0 15px;
      color: #999;
      font-size: 12px;
    }
  }
  .icon_box
  {
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex: 0 0 50px;
    .sysetem_message_img_icon {
      position: relative;
      display: block;
      width: 20px;
      .new_sysetem_message_icon
      {
        position: absolute;
        display: block;
        top: 0;
        right: 0;
        width: 6px;
        height: 6px;
        background-color: #FF3939;
        border-radius: 50%;
      }
    }
  }
}
.vux-1px-b:after {
  border-bottom: 1px solid #e5e5e5;
}

.vux-1px-t::before {
  border-top: 1px solid #e5e5e5;
}


.tabbox-list {
  padding: 15px 15px 15px;
  background: #fff;
  border-color: #E5E5E5;
  margin-bottom: 15px;
  .item {
    display: flex;
    padding: 15px 10px;
    align-items: center;
    color: #666;
    &.vux-1px-b:after {
      border-bottom: 1px solid #d9f7f5;
    }
    &:last-child.vux-1px-b:after {
      border-bottom: 0;
    }
    .mid {
      flex: 1;
      .name {
        color: #3ac7f5;
      }
      .text {
        width: 200px;
        font-size: 14px;
        color: #999;
      }
    }
    .iconfont {
      color: #f8a519;
    }
  }
}
.avatar {
  display: block;
  margin-right: 10px;
  width: 40px;
  height: 40px;
}
.UnreadCount_box
{
  position: relative;
}
.UnreadCount_icon
{
  position: absolute;
  left: 0;
  top: 0;
  font-size: 12px;
  background-color: #f74c31;
  color: #fff;
  display: block;
  padding: 0 5px;
  height: 15px;
  line-height: 15px;
  border-radius: 15px;
  font-style: normal;
  text-align: center;
  transform: translate(-50%,-50%)
}
</style>
