<template>
  <div :class="['container','clearfix', originator+'_container']">
    <div class="avatar_contianer">
      <img v-if="MsgType === 8" src="@/assets/images/kefu.png"  class="avatar" alt="助理">
      <img v-else :src="avatar | transformImgUrl" class="avatar" alt="">
    </div>
    <!-- 只有图片的类型 -->
    <div v-if="MsgType === 2" :class="[originator+'_imgChat_msg']">
      <div class="thumbs_container">
        <img
          :src="modelImage"
          @click="previewImage(imgIndex)"
          :class="[`chat_imgs_thumb_${imgIndex}`]"
          @load="onloaded"
         >
      </div>
    </div>
    <!-- 文本 -->
    <div v-if="MsgType === 1" :class="[originator+'_textChat_msg', (IsServantReceive === 0) ?'yellow_textChat':'']">
      <div v-if="Content" class="msg_text_container">
        {{Content}}
      </div>
    </div>
    <!-- 助理消息 -->
    <div v-if="MsgType === 8" :class="[originator+'_textChat_msg', 'blue_textChat']">
      <div v-if="Content" class="msg_text_container">
        {{Content}}
      </div>
      <span class="tag_span">[助理回复]</span>
    </div>
  </div>
</template>
<script>
import util from '@/plugins/util'
export default {
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
      type: String,
      default: ''
    },
    MsgType: {
      type: Number,
      default: ''
    },
    imgIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    modelImage: {
      cache: false,
      get () {
        return util.transformImgUrl(this.Content)
      }
    },
    originator () {
      return (this.IsServantReceive === 1) ? 'from' : 'to'
    }
  },
  methods: {
    previewImage (index) {
      this.$emit('previewImage', index)
    },
    onloaded () {
      this.$emit('onloaded')
    }
  }
}
</script>
<style lang="less" scoped>
.container
{
  position: relative;
  min-height: 50px;
  padding: 0 70px;
  margin-bottom: 25px;
  .avatar_contianer
  {
    position: absolute;
    top: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: #fff
  }
  .avatar
  {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
}
.to_container
{
  .avatar_contianer
  {
    right: 0;
  }
}
.from_container
{
  .avatar_contianer
  {
    left: 0;
  }
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
  max-width: 100%;
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
  .msg_text_container
  {
    margin-bottom: 10px;
    padding: 0 15px;
    font-size: 14px;
    text-align: justify;
    color: #666;
    word-break: break-word;
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
.blue_textChat
{
  background-color: #3ac7f5;
  border: 1px solid #3ac7f5;
  &::after
  {
    background-color: #3ac7f5;
    border-color: #3ac7f5 #3ac7f5 transparent transparent
  }
  .msg_text_container
  {
    color: #fff;
  }
  .tag_span
  {
    position: absolute;
    right: 100%;
    top: 10px;
    margin-right: 10px;
    white-space: nowrap;
    font-size: 12px;
    color: #3ac7f5;
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
.thumbs_container
{
  display: inline-block;
  background-color: #fff;
}
</style>

