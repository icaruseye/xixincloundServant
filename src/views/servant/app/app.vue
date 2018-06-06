<template>
  <div class="has-tabbar">
    <!-- <div class="vux-flexbox vux-flex-row">
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
    </div> -->
    <div class="income-panel">

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
.income-panel {
  margin: 10px 7px 12px 7px;
  height: 100px;
  border-radius: 5px;
  box-shadow: 1px 1px 15px rgba(204, 204, 204, .5);
  background: linear-gradient(to right, #5ED3F9, #62D2F9, #9EC2FB)
}
</style>
