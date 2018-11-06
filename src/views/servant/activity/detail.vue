<template>
  <div class="wrapper">
    <div class="ac_detail_info">
      <div style="position: relative;top: -13px;">
        <img class="icon" src="https://tvax1.sinaimg.cn/crop.0.0.473.473.180/78258c21ly8ft5x6jpwepj20d50d5wec.jpg" alt="">
      </div>
      <div class="content">
        <div class="title">院内陪朕</div>
        <div class="price">￥199元</div>
        <div class="date">2018/08/05～2018/08/25</div>
      </div>
      <img src="@/assets/images/ic_dqr.png" alt="" class="status">
    </div>
    <div class="ac_detail_list_title">
      <span>参与人数</span>
      <span><span style="color: #F8A519">12</span>人</span>
    </div>
    <div class="ac_detail_list">
      <div class="ac_detail_list_item">
        <img src="https://tvax1.sinaimg.cn/crop.0.0.473.473.180/78258c21ly8ft5x6jpwepj20d50d5wec.jpg" alt="" class="avatar">
        <div class="name">杀杀杀</div>
        <button class="btn">查看服务</button>
      </div>
    </div>
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
  }
}
</script>

<style lang="less" scoped>
.ac_detail_info {
  display: flex;
  align-items: center;
  padding: 17px 20px 20px 17px;
  background: #fff;
  .icon {
    margin-right: 14px;
    width: 29px;
    height: 29px;
    border-radius: 4px;
  }
  .content {
    flex: 1;
    .title {
      font-size: 18px;
      color: #666;
      font-weight: bold;
    }
    .price {
      font-size: 15px;
      color: #FF5F5F;
    }
    .date {
      font-size: 12px;
      color: #999;
    }
  }
  .status {
    width: 50px;
    height: 50px;
  }
}


.ac_detail_list_title {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  background: #F6F6F6;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #666;
}

.ac_detail_list {
  padding: 0 12px;
  background: #fff;
  .ac_detail_list_item {
    display: flex;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid RGBA(0, 180, 171, .1);
    &:last-child {
      border: 0;
    }
    .avatar {
      margin-right: 16px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    .name {
      flex: 1;
      font-size: 15px;
      color: #666;
    }
    .btn {
      padding: 2px 8px;
      font-size: 13px;
      color: #3AC7F5;
      border: 1px solid #3AC7F5;
      border-radius: 2px;
      background: #fff;
    }
  }
}

</style>
