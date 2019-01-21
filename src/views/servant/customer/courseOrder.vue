<template>
  <div class="wrapper">
    <xx-go-back :url="`/customer/${userID}/detail`"></xx-go-back>
    <div v-if="courseList.length > 0">
      <section
        class="items_section"
        v-for="(course, index) in courseList"
        @click="redirectUrl(`/customer/${userID}/studyRecord/${course.ServantShopProxyCourseID}/list`)"
        :key="index">
        <p class="item_name">{{course.ShopProxyCourseName}}</p>
        <p class="item_desc">分类：{{course.CourseTypeName}}</p>
      </section>
      <xxPageSorter
        ref="xxPageSorterRef"
        :pageSize="pageSize"
        :total="totalNumber"
        :pageNumber="pageNumber"
        @nextPage="loadNextPage"
      >
      </xxPageSorter>
    </div>
    <xx-occupied-box v-else>
      该用户没有培训记录
    </xx-occupied-box>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      pageNumber: 1,
      pageSize: 10,
      totalNumber: 0,
      courseList: []
    }
  },
  watch: {},
  computed: {
    userID () {
      return this.$route.params.id || ''
    }
  },
  methods: {
    redirectUrl (url) {
      this.$router.push(url)
    },
    loadNextPage () {
      this.pageNumberChange(this.pageNumber + 1).then(result => {
        if (result.Code === 100000) {
          this.totalNumber = result.Data.Total
          this.courseList = [
            ...this.courseList,
            ...result.Data.courseResponseList
          ]
        } else {
          this.$vux.toast(result.Msg)
        }
      })
    },
    init () {
      this.pageNumberChange(1).then(result => {
        if (result.Code === 100000) {
          this.totalNumber = result.Data.Total
          this.courseList = result.Data.courseResponseList
        } else {
          this.$vux.toast(result.Msg)
        }
      })
    },
    async pageNumberChange (pageNumber) {
      this.pageNumber = pageNumber
      const res = await this.getCourseList()
      return res
    },
    async getCourseList () {
      const result = await this.$http.get(`/UserCourseList`, {
        page: this.pageNumber,
        pageSize: this.pageSize,
        userID: this.userID
      })
      return result.data
    }
  },
  created () {
    this.init()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.wrapper{
  .items_section
  {
    background-color: #fff;
    margin-top: 20px;
    padding: 10px 20px;
    .item_name
    {
      font-size: 14px;
      color: #333
    }
    .item_desc
    {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }
  }
}
</style>
