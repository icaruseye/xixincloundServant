<template>
  <div>
    <xxGoBack></xxGoBack>
    <div>
      <div class="weui-panel weui-list-panel">
        <div class="weui-cell" @click="redirectUrl('/schedule/calendar')">
          <div class="weui-cell-top">
            <div class="icon"><img src="@/assets/images/app-pbsz.png"></div>
            <div class="title">排班日历</div>
            <i class="iconfont icon-jiantouyou"></i>
          </div>
        </div>
        <div class="weui-cell" @click="redirectUrl('/schedule/schemeList')">
          <div class="weui-cell-top">
            <div class="icon"><img src="@/assets/images/app-ffsz.png"></div>
            <div class="title">批量设置排班方案</div>
            <i class="iconfont icon-jiantouyou"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    redirectUrl (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.weui-list-panel {
  .weui-cell-top {
    display: flex;
    align-items: center;
    .icon {
      width: 31px;
      height: 31px;
    }
    .title {
      margin-left: 17px;
      flex: 1;
      color: #666;
      font-size: 16px;
    }
    .icon-jiantouyou {
      color: #ccc;
    }
  }
}
</style>
