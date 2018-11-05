<template>
  <div class="wrapper">
    <xx-go-back></xx-go-back>
    <div class="ac_container">
      <div class="ac_container_title">服务产品</div>
      <div class="ac_container_list">
        <div class="ac_list_item" @click="go('/app/activity/detail/1')">
          <img class="icon" src="https://tvax4.sinaimg.cn/crop.0.0.996.996.180/9d0d09ably8foq7clnhjwj20ro0ro3yv.jpg" alt="">
          <div class="content">
            <div class="name">院内陪诊</div>
            <div class="price">￥199元</div>
          </div>
          <!-- <div class="btns">
            <button class="btn yellow">管理</button>
            <button class="btn blue" style="margin-left:13px;">查询</button>
          </div> -->
          <img class="status" src="@/assets/images/ic_dqr.png" alt="">
        </div>
      </div>
    </div>
    <div class="ac_container">
      <div class="ac_container_title">课程产品</div>
      <div class="ac_container_list">
        <div class="ac_list_item">
          <div class="content">
            <div class="name course">院内陪诊<span class="tag">录播</span></div>
            <div class="time">30分钟</div>
          </div>
          <div class="btns">
            <button class="btn yellow">管理</button>
            <button class="btn blue" style="margin-left:13px;">查询</button>
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="weui-btn weui-btn_primary weui-btn-bottom" @click="edit">+添加活动</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    edit () {
      this.$router.push(`/app/activity/edit/add`)
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
      }
    }
  }
}
</style>
