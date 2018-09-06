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
      pageSize: 10,
      articleList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get('/ArticleList', {
        Index: this.pageNumber
      }).then(result => {
        if (result.data.Code === 100000) {
          this.articleList = result.data.Data.ArticleResponses
        }
      })
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

