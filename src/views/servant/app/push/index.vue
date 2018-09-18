<template>
  <div class="has-tabbar">
    <div class="checker-bar">
      <span class="">筛选条件：</span>
      <ul>
        <li :class="pushListTabIndex === 0 ? 'active' : ''" @click="changeChecker(0)">全部</li>
        <li :class="pushListTabIndex === 1 ? 'active' : ''" @click="changeChecker(1)">审批中</li>
        <li :class="pushListTabIndex === 2 ? 'active' : ''" @click="changeChecker(2)">已发送</li>
        <li :class="pushListTabIndex === 3 ? 'active' : ''" @click="changeChecker(3)">等待发送</li>
        <!-- <li :class="pushListTabIndex === 4 ? 'active' : ''" @click="changeChecker(4)">发送失败</li> -->
      </ul>
    </div>
    <div class="list-box">
      <div class="list-item-card">
        <div class="title-bar">
          <span>三位收贱人：</span>
          <span class="name">一号收贱人，</span>
          <span class="name">二号收贱人，</span>
          <span class="name">三号收贱人，</span>
          <span class="name">四号收贱人</span>
        </div>
        <div class="dec">关于糖尿病的服务包，以及详情介绍，关于糖尿病 的服务包，以及详情介绍</div>
        <div class="handle-bar">
          <span class="date-text">8月8日</span>
          <button class="cancel-btn">取消发送</button>
        </div>
        <div class="status-bar">
          <router-link to="/app/push/detail/1" class="link">查看详情</router-link>
          <span class="text fail">等待发送</span>
        </div>
      </div>
      <div class="date-bar">
        <span>周一 11:30</span>
      </div>
    </div>
    <router-link to="/app/push/add">
      <button type="button" class="weui-btn weui-btn_primary">添加</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pushListTabIndex: 0,
      checkerIndexLoack: true
    }
  },
  methods: {
    async initData () {
    },
    async changeChecker (index) {
      if (this.checkerIndexLoack) {
        this.checkerIndexLoack = false
        this.pushListTabIndex = index
        await this.initData()
        this.checkerIndexLoack = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.has-tabbar {
  padding: 10px 0;
}
.checker-bar {
  padding: 10px 12px;
  display: flex;
  font-size: 14px;
  color: #999;
  span {
    width: 85px;
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
        right: 0;
        background: #999;
        height: 25px;
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
  padding: 12px;
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
      padding: 10px 10px 0;
      font-size: 15px;
      color: #666;
    }
    .handle-bar {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      border-bottom: 1px solid RGBA(0, 180, 171, .2);
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
      padding: 10px;
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
</style>