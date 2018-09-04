<template>
  <div class="eidt_items_container">
    <div class="content clearfix">
      <div class="article_img_click" @click="redirectUrl(`/article/1/detail`)">
        <img class="article_cover_imgs" src="@/assets/images/banner-4.jpg" alt="">
      </div>
      <div class="article_title" @click="redirectUrl(`/article/1/detail`)">
        根据公众号的历史文章、类型等，推荐订阅……
      </div>
      <div class="article_count_container clearfix">
        <div class="create_time">
          2018/01/01 13:30
        </div>
        <div class="view_nums">
          180人看过
        </div>
      </div>
    </div>
    <div class="bottom">
      <router-link class="link_btns" to="/">
        <img class="link_btns_icon" src="@/assets/images/ic-edit.png" alt="编辑">
        编辑
      </router-link>
      <router-link class="link_btns" to="/">
        <img class="link_btns_icon" src="@/assets/images/ic-share.png" alt="分享">
        分享
      </router-link>
      <router-link class="link_btns" to="/">
        <img class="link_btns_icon" src="@/assets/images/ic-delete.png" alt="删除">
        删除
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    redirectUrl (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.eidt_items_container
{
  background-color: #fff;
  margin-top: 10px;
  .content
  {
    padding: 10px 20px;
    .article_cover_imgs
    {
      display: block;
      width: 118px;
      height: 80px;
      float: left;
      margin-right: 10px;
    }
    .article_title
    {
      line-height: 21px;
      font-size: 15px;
      color: #666;
      text-align: justify;
    }
    .article_count_container
    {
      margin-top: 18px;
      .create_time
      {
        float: left;
        font-size: 9px;
        color: #999;
      }
      .view_nums
      {
        float: right;
        font-size: 9px;
        color: #999;
      }
    }
  }
  .bottom
  {
    position: relative;
    display: flex;
    flex-flow: nowrap;
    height: 40px;
    border-top: 1px solid #CCF0EE;
    .link_btns
    {
      position: relative;
      flex: 1;
      display: flex;
      font-size: 10px;
      color: #999;
      justify-content: center;
      align-items: center;
      &::after
      {
        position: absolute;
        content: '';
        display: block;
        height: 15px;
        width: 1px;
        background-color: RGBA(216, 216, 216, .5);
        right: 0;
        top: 50%;
        transform: translate(-50%, -50%) scaleX(.5)
      }
      &:last-child::after
      {
        display: none;
      }
      .link_btns_icon
      {
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 6px;
        vertical-align: middle
      }
    }
  }
}
</style>
