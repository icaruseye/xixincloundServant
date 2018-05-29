<template>
  <div>
    <div class="has-tabbar">
      <div class="banner">
      </div>
      <!-- 消息列表 -->
      <div class="tabbox">
        <div class="tabbox-list vux-1px-b" style="border-top:0">
          <router-link to="/">
            <div class="item">
              <img class="avatar" src="@/assets/servant/book-icon-1.png" alt="">
              <div class="mid">
                <div class="name">最近添加</div>
              </div>
              <i class="iconfont icon-jiantouyou"></i>
            </div>
          </router-link>
        </div>
        <div class="tabbox-list vux-1px-b vux-1px-t">
          <template v-for="(item, index) in list">
            <div class="item vux-1px-b" @click="goChat(item.FriendViewID, index)" :key="index">
              <div><img class="avatar" :src="item.FriendAvatar" alt=""></div>
              <div class="mid">
                <div class="name">{{item.FriendName}}</div>
                <p class="text fof">{{item.AddMessage}}</p>
              </div>
              <i class="iconfont icon-jiantouyou"></i>
            </div>
          </template>
        </div>
      </div>
    </div>
    <servant-tabbar></servant-tabbar>
  </div>
</template>

<script>
import http from '@/api/index'
import servantTabbar from '@/components/common/servantTabbar'
export default {
  components: {
    servantTabbar
  },
  metaInfo: {
    title: '通讯录'
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    console.log(this.getData())
  },
  methods: {
    goChat (id, index) {
      sessionStorage.setItem('friendInfo', JSON.stringify(this.list[index]))
      this.$router.push(`/message/chat/${id}`)
    },
    async getData () {
      const res = await http.get('/Servant/ContactList', { Page: 1, Size: 10 })
      this.list = res.data.Data
    }
  }
}
</script>

<style lang="less">
.vux-1px-b:after {
  border-bottom: 1px solid #e5e5e5;
}

.vux-1px-t::before {
  border-top: 1px solid #e5e5e5;
}

.banner {
  font-size: 0;
  width: 100%;
  height: 155px;
  background: url(../../../assets/servant/banner-2.png) no-repeat center;
  background-size: cover;
}

.tabbox {
  .tabbox-list {
    padding: 15px;
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
}


</style>
