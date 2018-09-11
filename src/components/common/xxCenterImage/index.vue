<template>
  <div class="img" :style="{backgroundImage: `url(${fromatUrl})`, borderRadius: this.radius}"></div>
</template>
<script>
import util from '@/plugins/util'
export default {
  props: {
    src: {
      type: String,
      default: null
    },
    radius: {
      type: String,
      default: '0px'
    }
  },
  computed: {
    fromatUrl () {
      return util.transformImgUrl(this.src)
    }
  }
}
</script>
<style lang="less" scoped>
.img
{
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  background-position: center;
  background-size: cover;
}
</style>
