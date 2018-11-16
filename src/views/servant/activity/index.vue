<template>
  <div class="wrapper">
    <xx-go-back></xx-go-back>
    <div class="ac_container" v-if="list.Curriculum.length > 0">
      <div class="ac_container_title">服务产品</div>
      <div class="ac_container_list">
        <template v-for="(item, index) in list.Service">
          <div class="ac_list_item" :key="index">
            <img class="icon" :src="item.CoverPhoto | transformImgUrl" alt="">
            <div class="content" @click="go(`/app/activity/detail/${item.ID}`)">
              <div class="name">{{item.ActivityName}}</div>
              <div class="price">￥{{item.PresentPrice | price}}元</div>
            </div>
            <div class="btns">
              <button class="btn yellow" @click="edit(item.ID)">编辑</button>
              <button class="btn red" @click="remove(item.ID)">删除</button>
            </div>
            <!-- <img class="status" src="@/assets/images/ic_dqr.png" alt=""> -->
          </div>
        </template>
      </div>
    </div>
    <div class="ac_container" v-if="list.Service.length > 0">
      <div class="ac_container_title">课程产品</div>
      <div class="ac_container_list">
        <template v-for="(item, index) in list.Curriculum">
          <div class="ac_list_item" :key="index">
            <img class="icon" :src="item.CoverPhoto | transformImgUrl" alt="">
            <div class="content" @click="go(`/app/activity/detail/${item.ID}`)">
              <div class="name">{{item.ActivityName}}</div>
              <div class="price">￥{{item.PresentPrice | price}}元</div>
            </div>
            <div class="btns">
              <button class="btn yellow" @click="edit(item.ID)">编辑</button>
              <button class="btn red" @click="remove(item.ID)">删除</button>
            </div>
            <!-- <img class="status" src="@/assets/images/ic_dqr.png" alt=""> -->
          </div>
        </template>
        <!-- <template v-for="(item, index) in list.Service">
          <div class="ac_list_item" :key="index">
            <div class="content">
              <div class="name course">{{}}<span class="tag">录播</span></div>
              <div class="time">30分钟</div>
            </div>
            <div class="btns">
              <button class="btn yellow">管理</button>
              <button class="btn blue" style="margin-left:13px;">查询</button>
            </div>
          </div>
        </template> -->
      </div>
    </div>
    <button type="button" class="weui-btn weui-btn_primary weui-btn-bottom" @click="edit('add')">+添加活动</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: {
        Curriculum: [],
        Service: []
      }
    }
  },
  filters: {
    price (val) {
      return (val / 100).toFixed(2)
    }
  },
  created () {
  },
  mounted () {
    this.getActivityList()
  },
  methods: {
    async getActivityList () {
      this.$vux.loading.show()
      const res = await this.$http.get(`/Activity-List`)
      this.$vux.loading.hide()
      if (res.data.Code === 100000) {
        this.list = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    edit (id) {
      this.$router.push(`/app/activity/edit/${id}`)
    },
    async remove (id) {
      const res = await this.$http.delete(`/Activity-Delete?activityId=${id}`)
      if (res.data.Code === 100000) {
        this.$vux.toast.text('删除成功')
        this.getActivityList()
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    go (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  padding-bottom: 60px;
}

.ac_container {
  margin-top: 13px;
  padding: 0 11px;
  background: #fff;
}

.ac_container_title {
  padding: 11px 0 5px;
  font-size: 15px;
  color: #666;
  border-bottom: 1px solid RGBA(0, 180, 171, .1);
}

.ac_container_list {
  .ac_list_item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid RGBA(0, 180, 171, .1);
    &:last-child {
      border: 0;
    }
    .icon {
      margin-right: 8px;
      width: 29px;
      height: 29px;
      border-radius: 4px;
    }
    .content {
      flex: 1;
      .name {
        font-size: 18px;
        color: #666;
        font-weight: bold;
        &.course {
          font-weight: normal;
        }
        .tag {
          margin-left: 5px;
          color: #F8A519;
          font-size: 9px;
          border: 1px solid #F8A519;
          padding: 2px 4px;
          border-radius: 2px;
        }
      }
      .time {
        font-size: 9px;
        color: #999;
      }
      .price {
        font-size: 15px;
        color: #FF5F5F;
      }
    }
    .status {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .btns {
      .btn {
        padding: 0 5px;
        height: 24px;
        line-height: 24px;
        font-size: 15px;
        text-align: center;
        border-radius: 2px;
        border: 1px solid #fff;
        background: #fff;
        &.yellow {
          color: #F8A519;
          border-color: #F8A519
        }
        &.blue {
          color: #3AC7F5;
          border-color: #3AC7F5;
        }
        &.red {
          color: #FF5F5F;
          border-color: #FF5F5F;
        }
      }
    }
  }
}
</style>
