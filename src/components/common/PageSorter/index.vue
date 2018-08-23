<template>
  <div class="pageSorter_container">
    <a v-if="totalPage > pageNumber" href="javascript:void(0)" style="color:#3AC7F5;line-height:25px;font-size:12px;" @click="nextPage">
      点击加载更多
    </a>
    <span v-else style="color:#999;font-size:12px;line-height:25px">
      没有更多了
    </span>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageNumber: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  computed: {
    totalPage () {
      return (this.total === 0) ? 0 : Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    nextPage () {
      this.$emit('nextPage')
    }
  }
}
</script>
<style lang="less" scoped>
.pageSorter_container
{
  padding:20px 0;
  text-align:center;
  height:25px
}
</style>
