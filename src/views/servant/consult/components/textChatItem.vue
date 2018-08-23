<template>
  <div :class="['container','clearfix', originator+'_container']">
    <img :src="avatar | transformImgUrl" class="avatar" alt="">
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
      <div v-if="Content" class="msg_text_container" v-html="emojiFilter(Content)"></div>
    </div>
  </div>
</template>
<script>
import faceList from '@/plugins/datas/faceList.js'
import util from '@/plugins/util'
export default {
  data () {
    return {
      faceList: faceList,
      emojiImage: require('@/assets/images/15BPafa.png')
    }
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
    layzLoadImage () {
      return require('@/assets/images/loading_img.gif')
    },
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
    },
    emojiFilter (val) {
      const emojiReg = /\[[\u4e00-\u9fa5]{1,}\]/g
      let list = val.match(emojiReg)
      if (list && list.length > 0) {
        list.map(item => {
          if (this.faceList.indexOf(item) >= 0) {
            val = val.replace(item, `<i class="text_emoji_items" style="${this.emojiPositionFilter(item)}"></i>`)
          }
        })
        return val
      }
      return val
    },
    emojiPositionFilter (val) {
      let index = this.faceList.indexOf(val)
      return `background-image: url(${this.emojiImage});background-position: -${index * 28}px 0`
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
  .avatar
  {
    position: absolute;
    top: 0;
    border-radius: 50%;
    width: 50px;
    height: 50px;
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

