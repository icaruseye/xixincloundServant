<template>
  <div :class="['container', 'clearfix', originator+'_container']">
    <div class="avatar">
      <xxCenterImage :src="avatar" radius="50%"></xxCenterImage>
    </div>
    <div :class="[originator+'_textChat_msg', 'content_container']">
      <h4 class="msg_title">
        <template v-if="MsgType === 5">
          图文咨询
        </template>
        <template v-if="MsgType === 6">
          咨询结果
        </template>
      </h4>
      <template v-if="MsgType === 5">
        <p class="serviceID_p">
          服务单号：{{Content.ServiceID}}
        </p>
        <div class="msg_text_container">
          {{Content.ReserveRemark}}
        </div>
        <div v-if="Content.ReserveImgs != null && Content.ReserveImgs != ''" class="msg_imsg_container">
          <image-preview-item v-if="MsgType === 5" :list="Content.ReserveImgs" @onloaded="onloaded"></image-preview-item>
        </div>
      </template>
      <template  v-if="MsgType === 6">
        <div class="msg_text_container">
          {{Content.Result ? Content.Result : '服务已完成'}}
        </div>
        <div v-if="Content.ServiceImgs != null && Content.ServiceImgs != ''" class="msg_imsg_container">
          <image-preview-item :list="Content.ServiceImgs" @onloaded="onloaded"></image-preview-item>
        </div>
        <div v-if="Content.Discription" class="remark_container">
          备注： {{Content.Discription}}
        </div>
        <div v-if="MsgType === 6" class="msg_link_btn" @click="showCommentPanel">
          去查看评价
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import ImagePreviewItem from '@/components/ImagePreViewItem'
export default {
  components: {
    ImagePreviewItem
  },
  props: {
    avatar: {
      type: String,
      default: ''
    },
    IsServantReceive: {
      type: Number,
      default: 0
    },
    Content: {
      type: Object,
      default: null
    },
    MsgType: {
      type: Number,
      default: ''
    }
  },
  data () {
    return {
      commentPanelVisible: false
    }
  },
  computed: {
    originator () {
      return (this.IsServantReceive === 1) ? 'from' : 'to'
    }
  },
  created () {
  },
  methods: {
    onloaded () {
      this.$emit('onloaded')
    },
    showCommentPanel () {
      this.$emit('showCommentPanel')
    }
  }
}
</script>

<style lang="less" scoped>
.container
{
  position: relative;
  min-height: 50px;
  padding: 0 55px;
  .avatar
  {
    position: absolute;
    top: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
}
.to_container
{
  .avatar
  {
    right: 0;
  }
}
.from_container
{
  .avatar
  {
    left: 0;
  }
}
.content_container
{
  min-width: 200px;
}
.serviceID_p
{
  padding: 0 15px;
  font-size: 12px;
  color: #999;
}
.to_textChat_msg,
.from_textChat_msg
{
  position: relative;
  padding-top: 10px;
  border-radius: 3px;
  min-height: 40px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #eee;
  &::after
  {
    position: absolute;
    background-color: #fff;
    content: '';
    top: 10px;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    border-style: solid;
    border-width: 1px;
  }
  .msg_title
  {
    color: #3AC7F5;
    font-size: 16px;
    margin-bottom: 5px;
    padding: 0 15px;
  }
  .msg_text_container
  {
    margin-bottom: 10px;
    padding: 0 15px;
    font-size: 14px;
    text-align: justify;
    color: #666;
  }
  .msg_imsg_container
  {
    margin-bottom: 10px;
    padding: 0 15px;
  }
  .msg_link_btn
  {
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #999;
    padding: 0 15px;
    border-top: 1px solid #E3F8F7;
    .iconfont
    {
      font-size: 12px;
      float: right;
      color: #999;
    }
  }
}
.to_textChat_msg
{
  float: right;
  &::after
  {
    right: -6px;
    border-color: #eee #eee transparent transparent
  }
}
.yellow_textChat
{
  background-color: #FFEDD1;
  border: 1px solid #FFD797;
  &::after
  {
    background-color: #FFEDD1;
    border-color: #FFD797 #FFD797 transparent transparent
  }
}
.from_textChat_msg
{
  float: left;
  &::after
  {
    left: -6px;
    border-color: transparent transparent #eee #eee
  }
}
.remark_container
{
  padding: 5px 10px;
  margin: 0 15px 15px;
  font-size:12px;
  color: #999;
  border-radius: 5px; 
  background-color: #f6f6f6
}

</style>


