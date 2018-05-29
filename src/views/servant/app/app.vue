<template>
  <div class="has-tabbar">
    <div class="vux-flexbox vux-flex-row">
      <div class="vux-flexbox-item cbox vux-1px-b vux-tap-active" style="flex: 0 0 33.3333%;" @click="go('contacts')">
        <div class="vux-1px-r cbox-inner">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tongxunlu"></use>
          </svg><br>
          <span>通讯录</span>
        </div>
      </div>
      <div class="vux-flexbox-item cbox vux-1px-b vux-tap-active" style="flex: 0 0 33.3333%;" @click="go('packageList')">
        <div class="vux-1px-r cbox-inner">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gongwenbao"></use>
          </svg><br>
          <span>服务包管理</span>
        </div>
      </div>
      <div class="vux-flexbox-item cbox vux-1px-b vux-tap-active" style="flex: 0 0 33.3333%;" @click="go('itemList')">
        <div class="cbox-inner">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangmu"></use>
          </svg><br>
          <span>服务项管理</span>
        </div>
      </div>
    </div>
    <servant-tabbar></servant-tabbar>
  </div>
</template>

<script>
import servantTabbar from '@/components/common/servantTabbar'
export default {
  components: {
    servantTabbar
  },
  methods: {
    go (name) {
      this.$router.push(`/app/${name}`)
    }
  }
}
</script>

<style lang="less">
.cbox {
  text-align: center;
  font-size: 14px;
  color: #666;
  background: #fff;
}
.cbox-inner {
  padding: 15px 0;
  width: 100%;
  height: 100%;
}

.icon {
  width: 28px;
  height: 28px;
}
</style>
