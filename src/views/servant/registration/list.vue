<template>
  <div class="wrapper">
    <xx-go-back :url="goBackRedirect"></xx-go-back>
    <div class="date_info_wrap">
      <div class="date">9月17号</div>
      <div class="week">星期四 上午</div>
      <div class="count_wrap">
        <span>总号源： 11</span>
        <span>已挂号： 11</span>
        <span>余号： 11</span>
      </div>
    </div>
    <div class="list_wrap">
      <div class="title">挂号列表</div>
      <ul>
        <li class="item">
          <div class="rank">第1号</div>
          <div class="avatar">
            <img src="https://tva1.sinaimg.cn/crop.0.0.179.179.180/771d5a55gw1emwpljaw12j2050050t8o.jpg" alt="">
          </div>
          <div class="name">小老弟</div>
          <i class="iconfont icon-jiantouyou"></i>
        </li>
        <li class="item">
          <div class="rank">第1号</div>
          <div class="avatar">
            <img src="https://tva1.sinaimg.cn/crop.0.0.179.179.180/771d5a55gw1emwpljaw12j2050050t8o.jpg" alt="">
          </div>
          <div class="name">小老弟</div>
          <i class="iconfont icon-jiantouyou"></i>
        </li>
        <li class="item">
          <div class="rank">第1号</div>
          <div class="avatar">
            <img src="https://tva1.sinaimg.cn/crop.0.0.179.179.180/771d5a55gw1emwpljaw12j2050050t8o.jpg" alt="">
          </div>
          <div class="name">小老弟</div>
          <i class="iconfont icon-jiantouyou"></i>
        </li>
        <li class="item">
          <div class="rank">第1号</div>
          <div class="avatar">
            <img src="https://tva1.sinaimg.cn/crop.0.0.179.179.180/771d5a55gw1emwpljaw12j2050050t8o.jpg" alt="">
          </div>
          <div class="name">小老弟</div>
          <i class="iconfont icon-jiantouyou"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    goBackRedirect () {
      return this.$route.query.redirect || null
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.date_info_wrap {
  padding: 12px;
  height: 110px;
  box-sizing: border-box;
  background: linear-gradient(to right, #65D5F9, #9BC3F9);
  color: #fff;
  font-size: 12px;
  .date {
    font-size: 25px;
    font-weight: bold;
  }
  .week {
    margin-bottom: 10px;
  }
  .count_wrap {
    display: flex;
    justify-content: space-between;
  }
}
.list_wrap {
  .title {
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #666;
    background: #F6F6F6;
  }
  ul {
    background: #fff;
    padding: 0 12px;
  }
  .item {
    position: relative;
    padding: 15px 0;
    display: flex;
    align-items: center;
    font-size: 15px;
    &::after {
      content: " ";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      color: #d9f7f5;
      border-bottom: 1px solid #d9f7f5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
    .rank {
      padding-right: 25px;
      color: #999;
      border-right: 1px solid #D8D8D8;
    }
    .avatar {
      margin: 0 16px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      overflow: hidden;
    }
    .name {
      flex: 1;
      color: #666;
    }
    .iconfont {
      color: #ccc;
    }
  }
}
</style>
