<template>
  <div class="eidt_items_container" v-if="visible">
    <div class="content clearfix" @click="redirectUrl(`/article/${ArticleId}/detail`)">
      <div v-if="Cover && Cover != null" class="article_img_click">
        <img class="article_cover_imgs" :src="Cover | transformImgUrl" alt="">
      </div>
      <div class="article_title">
        {{Title | xxTextSubFilter(20)}}
      </div>
      <div class="article_count_container clearfix">
        <div class="create_time">
          {{CreateTime | xxTimeFormatFilter('YYYY/MM/DD HH:mm')}}
        </div>
        <div class="view_nums">
          {{ViewCount}}人看过
        </div>
      </div>
    </div>
    <div class="bottom">
      <router-link class="link_btns" :to="`/article/edit?id=${ArticleId}`">
        <img class="link_btns_icon" src="@/assets/images/ic-edit.png" alt="编辑">
        编辑
      </router-link>
      <a class="link_btns" @click="articleDispatch">
        <img class="link_btns_icon" src="@/assets/images/ic-fagao.png" alt="发稿">
        发稿
      </a>
      <!-- <a class="link_btns" @click="articleDelete">
        <img class="link_btns_icon" src="@/assets/images/ic-delete.png" alt="删除">
        删除
      </a> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ArticleId: {
      type: Number,
      default: null
    },
    Title: {
      type: String,
      default: ''
    },
    Cover: {
      type: String,
      default: null
    },
    CreateTime: {
      type: String,
      default: ''
    },
    ViewCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    articleDispatch () {
      this.$http.put(`/Draft?articleId=${this.ArticleId}`).then(result => {
        if (result.data.Code === 100000) {
          this.$vux.toast.text('发稿成功')
        }
      })
    },
    // articleDelete () { // 接口名称有问题
    //   this.$http.delete(`/Delete?articleId=${this.ArticleId}`).then(result => {
    //     if (result.data.Code === 100000) {
    //       this.$vux.toast.text('发稿成功')
    //     }
    //   })
    // },
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
    .article_img_click
    {
      float: left;
      margin-right: 10px;
      background-color: #f6f6f6;
      .article_cover_imgs
      {
        display: block;
        width: 118px;
        height: 80px;
      }
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
