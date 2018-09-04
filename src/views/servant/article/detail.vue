<template>
  <div style="padding-bottom:80px">
    <h1 class="article_title">很多人对于材质并不陌生，但是每次使用后最终结果总是差强人意。</h1>
    <div class="article_count_box clearfix">
      <div class="pull-left">
        <span class="article_count_tags">
          糖尿病
        </span>
        <span class="article_count_tags">
          13:30
        </span>
      </div>
      <div class="pull-right">
        <span class="article_count_tags">
          阅读180
        </span>
        <span class="article_count_tags">
          赞20
        </span>
      </div>
    </div>
    <div class="article_content_container">
      <img src="@/assets/images/banner-4.jpg" alt="">
      <div class="article_content_text">
        通过对比不难发现有无材质对于整体的影响，同样的构图，没有材质变化的画面给人一种很单薄、视觉形象不够鲜明的感觉，但是通过添加材质、肌理，画面整体的丰富度大大提升，背景画面的变化增强，通过材质的变化，也使得主体的视觉形象也更加鲜明；将材质作为背景的组成部分，一定要切记时刻围绕主体展开，主体的位置是不可撼动的！ 表现形式二：将材质、肌理作为画面视觉中相对较弱的表现形式，也就是做的不明显，缩小看几乎没有，正常看的情况下又有一定的变化，这种表现形式目的在于增加画面细节感，使得画面不会因为缺少变化而略显单调。
      </div>
    </div>
    <div class="article_count_box clearfix">
      <div class="pull-right">
        <span class="article_count_tags">
          <img class="article_count_tags_img_icon" src="@/assets/images/ic-comment.png" alt="评论数">
          180
        </span>
        <span class="article_count_tags">
          <img class="article_count_tags_img_icon" src="@/assets/images/ic-praise.png" alt="评论数">
          20
        </span>
      </div>
    </div>
    <!-- 留言列表 -->
    <div class="comment_list_container">
      <div class="comment_list_title">精选留言</div>
      <commentListItems></commentListItems>
      <commentListItems></commentListItems>
    </div>
    <commentSendText></commentSendText>
  </div>
</template>
<script>
import commentListItems from './components/commentListItems'
import commentSendText from './components/commentSendText'
export default {
  components: {
    commentListItems,
    commentSendText
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
.article_count_box
{
  padding: 7px 12px 13px;
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
  }
}
.comment_list_title
{
  font-size: 12px;
  color: #999;
  padding: 15px 12px 9px;
}
</style>

