<template>
  <div>
    <div class="weui-panel">
      <div class="weui-cell">
        <div class="left">
          <div class="title">换药测试-换药</div>
          <div class="name">用户姓名:名好牛</div>
          <div class="time">投诉时间:2018-05-09</div>
        </div>
        <div class="right">
          <a href="javascript:;" class="btn" @click="modified(1)">修改</a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="left">
          <div class="title">换药测试-换药</div>
          <div class="name">用户姓名:名好牛</div>
          <div class="time">投诉时间:2018-05-09</div>
        </div>
        <div class="right">
          <a href="javascript:;" class="btn" @click="modified(1)">修改</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    modified (id) {
      console.log(id)
      this.$router.push(`/user/complaint/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.weui-panel {
  margin-top: 0;
}
.weui-cell {
  display: flex;
  align-items: center;
  .left {
    flex: 1;
    line-height: 1.8;
    .title {
      font-size: 14px;
      color: #333;
    }
    .name {
      font-size: 12px;
      color: #666;
    }
    .time {
      font-size: 12px;
      color: #f8a519;
    }
  }
  .right {
    .btn {
      padding: 4px 10px;
      font-size: 14px;
      color: #fff;
      background: #3ecccc;
      border-radius: 2px;
      border: 0;
    }
  }
}
</style>

