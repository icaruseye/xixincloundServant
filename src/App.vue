<template>
  <div id="app">
    <xx-occupied-box v-if="routerLoading">
      页面加载中…
    </xx-occupied-box>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'routerLoading'
    ])
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/reset.less';
@import '/styles/common.less';
@import '/styles/public.less';
body {
  background-color: #f6f6f6;
  font-family: Arial, Helvetica, "STHeiti STXihei", "Microsoft YaHei", Tohoma, sans-serif;
}
</style>
