<template>
  <div class="pageSorter_container">
    <template v-if="loading">
      <span style="color:#999;font-size:12px;line-height:25px">
        加载中…
      </span>
    </template>
    <template v-else>
      <a v-if="totalPageModel > pageNumber" href="javascript:void(0)" style="color:#3AC7F5;line-height:25px;font-size:12px;" @click="nextPage">
        点击加载更多
      </a>
      <span v-else style="color:#999;font-size:12px;line-height:25px">
        没有更多了
      </span>
    </template>
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
    },
    TotalPage: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    totalPageModel () {
      if (this.TotalPage) {
        return this.TotalPage
      } else {
        return (this.total === 0) ? 0 : Math.ceil(this.total / this.pageSize)
      }
    }
  },
  methods: {
    nextPage () {
      this.loading = true
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
