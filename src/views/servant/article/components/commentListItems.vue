<template>
  <div class="container">
    <div class="avatar_box">
      <img :src="Avatar | transformImgUrl" alt="">
    </div>
    <div class="nickName">
      {{CommentName}}
      <a v-if="Status !== 2" href="javascript:void(0)" class="show_commentt_btn" @click="auditComment">显示留言</a>
    </div>
    <div class="comment_text">
      <slot></slot>
    </div>
    <div v-if="!Reply" class="clearfix">
      <a href="javascript:void(0)" class="reply_btn" @click.stop="commentReply">回复</a>
    </div>
    <div v-if="Reply" class="author_reply">
      <div class="author_reply_title">作者回复</div>
      <div class="author_reply_content">
        {{Reply}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Index: {
      type: Number,
      default: null
    },
    Reply: {
      type: String,
      default: null
    },
    commentId: {
      type: Number,
      default: null
    },
    CommentName: {
      type: String,
      default: ''
    },
    Avatar: {
      type: String,
      default: ''
    },
    Status: {
      type: Number,
      default: 2
    }
  },
  methods: {
    commentReply () {
      this.$emit('reply', this.Index)
    },
    auditComment () {
      const that = this
      that.$vux.confirm.show({
        title: '是否要显示这条留言',
        confirmText: '确定',
        content: '确认显示将在文章留言可见！',
        onConfirm () {
          that.$http.put(`/Audit?id=${that.commentId}`).then(result => {
            if (result.data.Code === 100000) {
              that.$vux.toast.show('操作成功')
              that.$emit('changeStatus', 2)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container
{
  position: relative;
  padding: 0 14px 0 50px;
  min-height: 30px;
  background-color: #f6f6f6;
  padding-bottom: 10px;
  margin-top: 15px;
  &::after
  {
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    display: block;
    height: 1px;
    background-color: #D8D8D8;
    content: '';
    transform: scaleY(.5)
  }
  &:last-child::after
  {
    display: none;
  }
  .author_reply_content
  {
    margin-top: 5px;
    font-size: 12px;
    color: #999;
    text-align: justify;
    line-height: 16px;
  }
  .author_reply_title
  {
    position: relative;
    padding-left: 9px;
    font-size: 12px;
    line-height: 17px;
    height: 17px;
    color: #666;
    margin-top: 6px;
    &::before
    {
      position: absolute;
      left: 0;
      top: 50%;
      display: block;
      height: 10px;
      width: 2px;
      background-color: #3ECCCC;
      margin-top: -5px;
      content: ''
    }
  }
  .comment_text
  {
    font-size: 12px;
    color: #999;
    text-align: justify;
  }
  .nickName
  {
    font-size: 12px;
    color: #666;
    .show_commentt_btn
    {
      float: right;
      color: #3AC7F5;
    }
  }
  .reply_btn
  {
    color: #3AC7F5;
    font-size: 12px;
  }
  .avatar_box
  {
    position: absolute;
    top: 0;
    left: 25px;
    margin-left: -12px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    img
    {
      border-radius: 50%
    }
  }
}
</style>

