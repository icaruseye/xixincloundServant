<template>
  <div class="container">
    <div class="avatar_box">
      <img :src="'5b5eb574ce3fab1aecf213a3' | transformImgUrl" alt="">
    </div>
    <div class="nickName">
      安然
      <a href="javascript:void(0)" class="reply_btn">回复</a>
    </div>
    <div class="comment_text">感谢医生，服务特别好，感觉很专业！</div>
    <div class="author_reply">
      <div class="author_reply_title">作者回复</div>
      <div class="author_reply_content">
        谢谢大家支持
      </div>
    </div>
  </div>
</template>
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
    .reply_btn
    {
      float: right;
      color: #3AC7F5;
    }
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

