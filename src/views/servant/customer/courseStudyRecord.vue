<template>
  <div class="wrapper">
    <xx-go-back :url="`/customer/${userID}/courseOrder/list`"></xx-go-back>
    <div v-if="userStudyRecordList.length > 0">
      <section class="items_section" v-for="(userStudyRecord, index) in userStudyRecordList" :key="index">
        <p class="item_name">{{userStudyRecord.LessonName}}</p>
        <p class="item_desc">{{userStudyRecord.StudyCount}}</p>
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
      该用户没有学习记录
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
      userStudyRecordList: []
    }
  },
  watch: {},
  computed: {
    userID () {
      return this.$route.params.id || ''
    },
    shopProxyCourseID () {
      return this.$route.params.courseID || ''
    }
  },
  methods: {
    init () {
      this.pageNumberChange(1)
    },
    pageNumberChange (pageNumber) {
      this.pageNumber = pageNumber
      this.getCourseList()
    },
    async getCourseList () {
      const result = await this.$http.get(`/UserStudyRecord`, {
        page: this.pageNumber,
        pageSize: this.pageSize,
        userID: this.userID,
        shopProxyCourseID: this.shopProxyCourseID
      })
      if (result.data.Code === 100000) {
        this.totalNumber = result.data.Data.total
        this.userStudyRecordList = result.data.Data.userStudyRecordList
      } else {
        this.$vux.toast(result.Msg)
      }
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
