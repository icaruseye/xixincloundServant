<template>
  <div style="padding-bottom:50px">
    <xx-go-back></xx-go-back>
    <template v-if="articleList.length > 0">
      <ListEditItems v-for="(article, index) in articleList" 
        :key="index"
        :Title="article.Title"
        :Cover="article.Cover"
        :CreateTime="article.CreateTime"
        :ViewCount="article.ViewCount"
        :ArticleId="article.ArticleId"
        ></ListEditItems>
        <xxPageSorter
          ref="xxPageSorterRef"
          :TotalPage="TotalPage"
          :pageNumber="pageNumber"
          @nextPage="loadNextPage"
        >
        </xxPageSorter>
    </template>
      <xx-occupied-box v-else>
        文章列表为空
      </xx-occupied-box>
    <router-link class="add_newArticle_btn" to="/article/edit"></router-link>
  </div>
</template>
<script>
import ListEditItems from './components/list-edit-items'
export default {
  components: {
    ListEditItems
  },
  data () {
    return {
      pageNumber: 1,
      TotalPage: 0,
      articleList: []
    }
  },
  created () {
    this.initList()
  },
  methods: {
    loadNextPage () {
      this.pageNumber += 1
      this.getList().then(result => {
        this.$refs.xxPageSorterRef.loading = false
        if (result.Code === 100000) {
          this.TotalPage = result.Data.TotalPage
          this.articleList = [
            ...this.articleList,
            ...result.Data.ArticleResponses
          ]
        }
      })
    },
    initList () {
      this.getList().then(result => {
        if (result.Code === 100000) {
          this.TotalPage = result.Data.TotalPage
          this.articleList = result.Data.ArticleResponses
        }
      })
    },
    async getList () {
      const result = await this.$http.get('/ArticleList', {
        Index: this.pageNumber
      })
      return result.data
    }
  }
}
</script>
<style lang="less" scoped>
.add_newArticle_btn
{
  position: fixed;
  right: 12px;
  bottom: 22px;
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3AC7F5;
  box-shadow: 0 5px 7px #ccc;
  &::before,
  &::after
  {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 2px;
    display: block;
    content: ''
  }
  &::before
  {
    width: 3px;
    height: 28px;
  }
  &::after
  {
    width: 28px;
    height: 3px;
  }
}
</style>

