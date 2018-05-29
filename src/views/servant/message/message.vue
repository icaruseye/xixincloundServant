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
                <div class="name">系统消息</div>
              </div>
              <i class="iconfont icon-jiantouyou"></i>
            </div>
          </router-link>
        </div>
        <div class="tabbox-list vux-1px-b vux-1px-t">
          <div class="item vux-1px-b" @click="goChat(0)">
            <div><img class="avatar" src="https://img3.doubanio.com/icon/u53078059-35.jpg" alt=""></div>
            <div class="mid">
              <div class="name">1carus</div>
              <p class="text fof">我抬头就看见了月亮</p>
            </div>
            <i class="iconfont icon-jiantouyou"></i>
          </div>
          <div class="item vux-1px-b" @click="goChat(0)">
            <img class="avatar" src="https://img3.doubanio.com/icon/u60691164-1.jpg" alt="">
            <span class="unread"></span>
            <div class="mid">
              <div class="name">雷蒙德·卡佛</div>
              <div class="text fof">当我们谈论爱情时我们在谈论什么</div>
            </div>
            <i class="iconfont icon-jiantouyou"></i>
          </div>
          <div class="item vux-1px-b" @click="goChat(0)">
            <img class="avatar" src="https://img3.doubanio.com/img/author/medium/1492599253.62.jpg" alt="">
            <span class="unread"></span>
            <div class="mid">
              <div class="name">威廉·莎士比亚</div>
              <div class="text fof">我才是仅次于上帝的人</div>
            </div>
            <i class="iconfont icon-jiantouyou"></i>
          </div>
        </div>
      </div>
    </div>
    <servant-tabbar></servant-tabbar>
  </div>
</template>

<script>
import servantTabbar from '@/components/common/servantTabbar'
export default {
  metaInfo: {
    title: '悉心服务-消息'
  },
  components: {
    servantTabbar
  },
  data () {
    return {}
  },
  methods: {
    goChat (id) {
      this.$router.push(`/message/chat/${id}`)
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
