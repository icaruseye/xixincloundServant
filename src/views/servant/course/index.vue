<template>
  <div class="wrapper">
    <xx-go-back></xx-go-back>
    <div class="course_list" v-if="list.length > 0">
      <template v-for="(item, index) in list">
        <div class="course_list_item" :key="index">
          <div class="title">
            <div class="title_text">{{item.Title}}</div>
            <div class="title_price">￥{{item.Price | price}}</div>
          </div>
          <button class="btn" :class="item.IsUpperShelf ? 'close' : ''" @click="changeStatus(item.ServantShopProxyCourseID, !item.IsUpperShelf)">{{item.IsUpperShelf ? '下架' : '上架'}}</button>
          <button class="btn manage" @click="toList(item.CourseId)">管理</button>
        </div>
      </template>
    </div>
    <xx-occupied-box v-else>
      暂无课程
    </xx-occupied-box>
  </div>
</template>

<script>
export default {
  filters: {
    price (val = 0) {
      return (val / 100).toFixed(2)
    }
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getCourseList()
  },
  methods: {
    async getCourseList () {
      const res = await this.$http.get(`/Proxy-Course-List`)
      if (res.data.Code === 100000) {
        this.list = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async changeStatus (servantShopProxyCourseID, isUpperShelf) {
      const res = await this.$http.put(`/Upper-Lower?servantShopProxyCourseID=${servantShopProxyCourseID}&isUpperShelf=${isUpperShelf}`)
      if (res.data.Code === 100000) {
        if (isUpperShelf) {
          this.$vux.toast.text('上架成功')
        } else {
          this.$vux.toast.text('下架成功')
        }
        this.getCourseList()
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    toList (id) {
      this.$router.push(`/app/course/${id}/userlist`)
    }
  }
}
</script>

<style lang="less" scoped>
.course_list {
  background: #fff;
}

.course_list_item {
  display: flex;
  align-items: center;
  padding: 20px 12px;
  border-bottom: 1px solid RGBA(0, 180, 171, .1);
  &:last-child {
    border: 0;
  }
  .icon {
    width: 29px;
    height: 29px;
    border-radius: 4px;
    margin-right: 10px;
  }
  .title {
    flex: 1;
    font-size: 15px;
    color: #666;
    .title_price {
      font-size: 12px;
      color: #FF5F5F;
    }
  }
  .btn {
    padding: 2px 8px;
    font-size: 13px;
    color: #fff;
    border-radius: 2px;
    border: 1px solid #F8A519;
    background: #F8A519;
    &.close {
      border: 1px solid #3AC7F5;
      background: #3AC7F5;
    }
    &.manage {
      margin-left: 10px;
      color: #3AC7F5;
      background: #fff;
      border: 1px solid #3AC7F5;
    }
  }
}
</style>
