<template>
  <div id="app">
    <div v-if="routerLoading" style="height:100vh;display:flex;justify-content: center;align-items: center">
      <xx-occupied-box v-if="apiError">
        访问异常
      </xx-occupied-box>
      <inline-loading v-else></inline-loading>
    </div>
    <template v-else>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </template>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {InlineLoading} from 'vux'
export default {
  name: 'app',
  components: {
    InlineLoading
  },
  computed: {
    ...mapGetters([
      'routerLoading',
      'apiError'
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
