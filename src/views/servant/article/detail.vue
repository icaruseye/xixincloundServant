<template>
  <div v-if="article" style="padding-bottom:80px" @click="commentSendTextVisible = false">
    <xx-go-back></xx-go-back>
    <h1 class="article_title">{{article.Title}}</h1>
    <div class="article_Attribute_tags clearfix">
      <span v-for="(Attribute, index) in AttributeList" :key="index" class="article_count_tags">
        {{Attribute}}
      </span>
    </div>
    <div class="article_count_box clearfix">
      <div class="pull-left">
        <span class="article_count_tags">
          {{article.CreateTime | xxTimeFormatFilter('HH:mm')}}
        </span>
      </div>
      <div class="pull-right">
        <span class="article_count_tags">
          阅读{{article.ViewCount}}
        </span>
        <span class="article_count_tags">
          赞{{article.GiveCount}}
        </span>
      </div>
    </div>
    <div class="article_content_container">
      <img :src="article.Cover | transformImgUrl" alt="">
      <div class="article_content_text">
        {{article.Content}}
      </div>
      <img v-for="(img, index) in imgsList" :key="index" :src="img | transformImgUrl" alt="">
    </div>
    <div class="article_count_box clearfix" style="padding-bottom:10px">
      <div class="pull-right">
        <span class="article_count_tags">
          <img class="article_count_tags_img_icon" src="@/assets/images/ic-comment.png" alt="评论数">
          {{CommentList.length}}
        </span>
        <span class="article_count_tags">
          <img class="article_count_tags_img_icon" src="@/assets/images/ic-praise.png" alt="点赞">
          {{article.GiveCount}}
        </span>
      </div>
    </div>
    <!-- 留言列表 -->
    <div class="comment_list_container">
      <div class="comment_list_title">精选留言</div>
      <div>
        <commentListItems v-for="(comment, index) in CommentList" 
          :key="index"
          :Index="index"
          :Avatar="comment.Avatar"
          :commentId="comment.ID"
          :Reply="comment.Reply"
          :CommentName="comment.CommentName"
          :Status="comment.Status"
          @changeStatus="(status) => {comment.Status = status}"
          @reply="commentReply">
          {{comment.CommentContent}}
        </commentListItems>
      </div>
      <xxPageSorter
        ref="xxPageSorterRef"
        :TotalPage="CommentPage"
        :pageNumber="commentPageNumber"
        @nextPage="loadNextPage"
      >
      </xxPageSorter>
    </div>
    <commentSendText
     @click.native.stop="() => {}"
     v-model="commentSendTextVisible"
    :replyInfo="replyInfo"
    @setReply="(content) => {replyInfo.Reply = content}"
    ></commentSendText>
  </div>
</template>
<script>
import commentListItems from './components/commentListItems'
import commentSendText from './components/commentSendText'
export default {
  components: {
    commentListItems,
    commentSendText
  },
  data () {
    return {
      commentSendTextVisible: false,
      article: null,
      replyInfo: null,
      CommentList: [],
      commentPageNumber: 1,
      CommentPage: 0
    }
  },
  computed: {
    articleID () {
      return this.$route.params.id
    },
    AttributeList () {
      if (this.article.Attributes) {
        return this.article.Attributes.split(',')
      } else {
        return []
      }
    },
    imgsList () {
      if (this.article.Imgs && this.article.Imgs !== '') {
        return this.article.Imgs.split(',')
      } else {
        return []
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    commentReply (key) {
      console.log(key)
      this.replyInfo = this.CommentList[key]
      this.commentSendTextVisible = true
    },
    async init () {
      await this.getArticle()
      this.initCommentList()
    },
    async getArticle () {
      const result = await this.$http.get(`/Article?articleId=${this.articleID}`)
      if (result.data.Code === 100000) {
        this.article = result.data.Data
        return result.data
      } else {
        return false
      }
    },
    loadNextPage () {
      this.commentPageNumber += 1
      this.loadCommentList().then(result => {
        this.$refs.xxPageSorterRef.loading = false
        if (result.Code === 100000) {
          this.CommentPage = result.Data.CommentPage
          this.CommentList = [
            ...this.CommentList,
            ...result.Data.Comments
          ]
        }
      })
    },
    initCommentList () {
      this.loadCommentList().then(result => {
        if (result.Code === 100000) {
          this.CommentPage = result.Data.CommentPage
          this.CommentList = result.Data.Comments
        }
      })
    },
    async loadCommentList () {
      const result = await this.$http.get(`/CommentList?articleId=${this.articleID}&index=${this.commentPageNumber}`)
      return result.data
    }
  }
}
</script>

<style lang="less" scoped>
.article_title
{
  font-weight: normal;
  color: #666;
  font-size: 15px;
  line-height: 21px;
  background-color: #fff;
  padding: 12px 13px 0;
  text-align: justify;
}
.article_Attribute_tags
{
  padding: 0px 12px;
  background-color: #fff;
  .article_count_tags
  {
    display: inline-block;
    font-size: 12px;
    color: #fff;
    line-height: 20px;
    margin-right: 10px;
    height: 20px;
    background-color: #ccc;
    padding: 0 5px;
    border-radius: 10px;
  }
}
.article_count_box
{
  padding: 0px 12px;
  background-color: #fff;
  .article_count_tags
  {
    display: inline-block;
    font-size: 12px;
    color: #999;
    line-height: 20px;
    .article_count_tags_img_icon
    {
      display: inline-block;
      width: 16px;
      margin-right: 3px;
      vertical-align: middle;
    }
  }
  .pull-left
  {
    .article_count_tags
    {
      margin-right: 20px;
    }
  }
  .pull-right
  {
    .article_count_tags
    {
      margin-left: 20px;
    }
  }
}
.article_content_container
{
  background-color: #fff;
  .article_content_text
  {
    padding: 10px 15px 0;
    font-size: 14px;
    color: #999;
    text-align: justify;
    line-height: 26px;
    word-break: break-all;
  }
}
.comment_list_title
{
  font-size: 12px;
  color: #999;
  padding: 15px 12px 9px;
}
</style>

