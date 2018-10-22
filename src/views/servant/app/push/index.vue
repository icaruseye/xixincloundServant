<template>
  <div class="has-tabbar">
    <div class="checker-bar">
      <span style="width:80px" class="">筛选条件：</span>
      <ul>
        <li :class="pushListTabIndex === 0 ? 'active' : ''" @click="changeChecker(0)">全部</li>
        <li :class="pushListTabIndex === 1 ? 'active' : ''" @click="changeChecker(1)">审批中</li>
        <li :class="pushListTabIndex === 2 ? 'active' : ''" @click="changeChecker(2)">已发送</li>
        <li :class="pushListTabIndex === 3 ? 'active' : ''" @click="changeChecker(3)">等待发送</li>
        <li :class="pushListTabIndex === 4 ? 'active' : ''" @click="changeChecker(4)">已取消</li>
      </ul>
    </div>
    <div class="list-box">
      <template v-for="(item, index) in pushList">
        <div :key="index">
          <div class="list-item-card">
            <div class="title-bar">
              <span>{{item.PushPeopleName.split(',').length}}位收件人：</span>
              <span class="name">{{item.PushPeopleName}}</span>
            </div>
            <div class="dec">{{item.Describe}}</div>
            <div class="handle-bar">
              <span class="date-text">{{item.CreateTime | xxTimeFormatFilter('MM月DD日')}}</span>
              <button v-if="item.Status === 1" class="cancel-btn" @click="cancelPushHandle(item.ID)">取消发送</button>
            </div>
            <div class="status-bar">
              <router-link :to="`/app/push/detail/${item.ID}`" class="link">查看详情</router-link>
              <span class="text" :class="{ fail: item.status == 3 }">{{item.Status | pushStatus}} 
                <span class="text fail" style="margin-left:10px;" @click="deleteHandle(item.ID)">删除</span>
                <span class="text primary" style="margin-left:10px;" @click="editHandle(item.ID)">编辑</span>
              </span>
            </div>
          </div>
          <div class="date-bar">
            <span>{{item.CreateTime | xxTimeFormatFilter('周E HH:mm')}}</span>
          </div>
        </div>
      </template>
      <div v-if="pushList.length === 0" class="occupied_container">
        <img class="occupied_img" src="@/assets/images/empty_icon.png" alt="">
        <p class="occupied_text">暂无数据</p>
      </div>
      <xx-loadmore
        v-if="pushList.length > 0"
        :pageindex="pageIndex"
        :pageTotal="totalPage"
        :loadText="loadText"
        @onClick="loadmore">
      </xx-loadmore>
    </div>
    <router-link to="/app/push/edit/add">
      <button type="button" class="weui-btn weui-btn_primary">添加</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pushListTabIndex: 0,
      checkerIndexLoack: true,
      pageIndex: 1,
      totalPage: 1,
      loadText: '查看更多',
      pushList: []
    }
  },
  filters: {
    pushStatus (val) {
      switch (val) {
        case 1:
          return '等待发送'
        case 2:
          return '已发送'
        case 3:
          return '已驳回'
        case 4:
          return '已取消'
        case -1:
          return '已删除'
      }
    }
  },
  watch: {
    pushListTabIndex () {
      this.getPushList().then(res => {
        if (res.SiteNoticePushResponses) {
          this.pushList = res.SiteNoticePushResponses
        }
        this.totalPage = res.pateTotal
      })
    }
  },
  mounted () {
    this.getPushList().then(res => {
      if (res.SiteNoticePushResponses) {
        this.pushList = res.SiteNoticePushResponses
      }
      this.totalPage = res.pateTotal
    })
  },
  methods: {
    async getPushList () {
      this.$vux.loading.show({text: 'Loading'})
      const res = await this.$http.get(`/Push/List?pageIndex=${this.pageIndex}&status=${this.pushListTabIndex}`)
      this.$vux.loading.hide()
      if (res.data.Code === 100000) {
        return res.data.Data
      }
    },
    async changeChecker (index) {
      if (this.checkerIndexLoack) {
        this.checkerIndexLoack = false
        this.pushListTabIndex = index
        await this.getPushList()
        this.checkerIndexLoack = true
      }
    },
    async loadmore () {
      this.pageIndex++
      this.loadText = '加载中...'
      this.getPushList().then(res => {
        if (res.SiteNoticePushResponses) {
          this.pushList.push(...res.SiteNoticePushResponses)
        }
        this.totalPage = res.pateTotal
      })
      this.loadText = '加载更多'
    },
    deleteHandle (id) {
      const that = this
      this.$vux.confirm.show({
        title: '删除推送',
        content: '确认要删除此次推送吗？',
        onConfirm () {
          that.deletePush(id)
        }
      })
    },
    cancelPushHandle (id) {
      const that = this
      this.$vux.confirm.show({
        title: '取消推送',
        content: '确认要取消此次推送吗？',
        onConfirm () {
          that.cancelPush(id)
        }
      })
    },
    editHandle (id) {
      this.$router.push(`/app/push/edit/${id}`)
    },
    async cancelPush (id) {
      const res = await this.$http.put(`/Push/Cancel?pushID=${id}`)
      if (res.data.Code === 100000) {
        this.$vux.toast.text('已取消')
        this.getPushList()
      } else {
        this.$vux.toast.text(`出错了,错误码：${res.data.Code}`)
      }
    },
    async deletePush (id) {
      const res = await this.$http.delete(`/Push/Delete?pushID=${id}`)
      if (res.data.Code === 100000) {
        this.$vux.toast.text('已删除')
        this.getPushList()
      } else {
        this.$vux.toast.text(`出错了,错误码：${res.data.Code}`)
      }
    }
  }
}
</script>

<style scoped lang="less">
.checker-bar {
  padding: 20px 12px 15px;
  display: flex;
  font-size: 14px;
  color: #999;
  span {
    width: 70px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      position: relative;
      padding: 0 10px;
      &::after {
        content: "";
        position: absolute;
        top: -1px;
        right: 0;
        background: #999;
        height: 24px;
        border-right: 1px solid #D8D8D8;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      &:last-child::after {
        border: 0;
      }
    }
    li.active {
      color: #3AC7F5;
    }
  }
}
.weui-btn {
  position: fixed;
  bottom: 0;
}
.list-box {
  padding: 0 12px;
  .list-item-card {
    background: #fff;
    border-radius: 4px;
    .title-bar {
      padding: 15px 10px 0;
      font-size: 12px;
      color: #999;
      .name {
        color: #3AC7F5;
      }
    }
    .dec {
      padding: 15px 10px 0;
      font-size: 15px;
      color: #666;
    }
    .handle-bar {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      border-bottom: 1px solid RGBA(0, 180, 171, .1);
      .date-text {
        color: #999;
      }
      .cancel-btn {
        display: block;
        padding: 0 5px;
        border: 1px solid #979797;
        background: transparent;
        color: #979797;
        border-radius: 10px;
      }
    }
    .status-bar {
      padding: 12px 10px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      .link {
        color: #3AC7F5;
      }
      .text {
        color: #999;
        &.fail {
          color: #FF5455;
        }
        &.primary {
          color: #3AC7F5;
        }
      }
    }
  }
  .date-bar {
    padding: 15px 0;
    text-align: center;
    span {
      display: inline-block;
      padding: 0 5px;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #fff;
      background: #E2E2E2;
      border-radius: 2px;
    }
  }
}
.occupied_container
{
  padding: 120px 0;
}
.occupied_img
{
  display: block;
  width: 80px;
  margin: 0 auto;
}
.occupied_text
{
  margin-top: 10px;
  font-size: 14px;
  color: #999;
  text-align: center;
}
</style>