<template>
  <div class="wrapper">
    <xx-go-back></xx-go-back>
    <div class="exchange_list" v-if="list.length > 0">
      <template v-for="(item, index) in list">
        <div class="item" @click="toDetail(item.ID, item.State)" :key="index">
          <div class="left">
            <div class="name"><span class="tag" :class="item.PackageType === 6 ? 'course' : 'service'">{{item.PackageType | _PackageType}}</span>{{item.PackageName}}</div>
            <div class="date">{{item.CreateTime | xxTimeFormatFilter}}</div>
          </div>
          <div v-if="item.State === -2" class="right fail">{{item.State | _State}}</div>
          <div v-if="item.State === -1" class="right fail">{{item.State | _State}}</div>
          <div v-if="item.State === 0" class="right applying">{{item.State | _State}}</div>
          <div v-if="item.State === 1" class="right success">{{item.State | _State}}</div>
        </div>
      </template>
      <xxPageSorter
        ref="xxPageSorterRef"
        :TotalPage="CommentPage"
        :pageNumber="page"
        @nextPage="loadNextPage"
      >
      </xxPageSorter>
    </div>
    <xx-occupied-box v-else>
      暂无数据
    </xx-occupied-box>
    <button type="button" class="weui-btn weui-btn_primary weui-btn-bottom" @click="toApply">申请激活码</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      CommentPage: 1,
      page: 1,
      pageSize: 10
    }
  },
  filters: {
    _PackageType (val) {
      switch (val) {
        case 1:
          return '服务'
        case 6:
          return '课程'
        default:
          return ''
      }
    },
    _State (val) {
      switch (val) {
        case -2:
          return '审核驳回'
        case -1:
          return '已删除'
        case 0:
          return '等待审核'
        case 1:
          return '申请成功'
        default:
          return ''
      }
    }
  },
  created () {
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      this.$vux.loading.show()
      const res = await this.$http.get(`/Activation/ActivationGenerate/List?page=${this.page}&pageSize=${this.pageSize}`)
      this.$vux.loading.hide()
      if (res.data.Code === 100000) {
        this.list.push(...res.data.Data.activationGenerateList)
        this.CommentPage = Math.ceil(res.data.Data.total / this.page)
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async loadNextPage () {
      this.page++
      this.getList()
      this.$refs.xxPageSorterRef.loading = false
    },
    toDetail (id, state) {
      if (state === 1) {
        this.$router.push(`/app/exchange/detail/${id}`)
      }
    },
    toApply () {
      this.$router.push('/app/exchange/apply')
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  background: #fcfcfc;
  min-height: 100vh;
}
.exchange_list {
  .item {
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid #eaeaeb;
    .left {
      flex: 1;
      .name {
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #666;
        .tag {
          display: inline-block;
          color: #fff;
          padding: 0 5px;
          font-size: 12px;
          height: 18px;
          line-height: 18px;
          margin-right: 8px;
          border-radius: 2px;
          &.course {
            background: #3ecccc;
          }
          &.service {
            background: #3ac7f5;
          }
        }
      }
      .date {
        font-size: 12px;
        color: #b9b9b9;
      }
    }
    .right {
      font-size: 12px;
      color: #777;
      &.success {
        color: #67C23A;
      }
      &.applying {
        color: #E6A23C;
      }
      &.fail {
        color: #999;
      }
    }
  }
}
</style>
