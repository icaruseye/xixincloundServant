<template>
  <div class="wrapper"></div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      pageNumber: 1,
      pageSize: 10
    }
  },
  watch: {},
  computed: {
    userID () {
      return this.$route.params.id || ''
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
      const result = await this.$http.get(`/UserCourseList`, {
        page: this.pageNumber,
        pageSize: this.pageSize,
        userID: this.userID
      })
      if (result.data.Code === 100000) {
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
.wrapper{}
</style>
