<template>
  <div class="container send_message_container" ref="operContainerRef">
    <a class="finished_service_btn" @click="showFinishServicePopup" href="javascript:void(0)">完成服务</a>
    <div class="oper_container">
      <div class="select_img_btn">
        <label class="icon-tupian iconfont" for="uploadImgBtn"></label>
        <input id="uploadImgBtn" type="file" accept="image/*" @change="uploadImgChange">
      </div>
      <div class="input_control_box">
        <textarea
         @focus="pushContainerShow = false"
         ref="chatInput"
         @keyup.enter="sendTextMsg"
         v-model="msg">
        </textarea>
      </div>
      <!-- <div class="emoji_show_container" @click="emojiContainerShow = !emojiContainerShow">
        <i v-if="!emojiContainerShow" class="iconfont icon-biaoqing-xue"></i>
        <i v-else class="iconfont icon-jianpan"></i>
      </div> -->
      <div class="send_push_container" @click="pushContainerShow = !pushContainerShow">
        <i class="more-icon" :class="{ active: pushContainerShow }"></i>
      </div>
      <div class="send_msg_container">
        <button @click="sendTextMsg">发送</button>
      </div>
    </div>
    <!-- <div v-if="emojiContainerShow" class="emoji_container">
      <a href="javascript:;" class="emoji_items" v-for="(item, index) in faceList" :key="index" @click="chooseFace(item)">{{item}}</a>
      <i class="iconfont icon-delete" @click="backspaceInputValue"></i>
    </div> -->
    <div class="push_container" :class="{ active: pushContainerShow }">
      <div class="push_item" @click="emitPushType(0)">
        <img src="@/assets/images/ic-msg-push-1.png" alt="">
        <span>文章</span>
      </div>
      <div class="push_item" @click="emitPushType(1)">
        <img src="@/assets/images/ic-msg-push-2.png" alt="">
        <span>日程方案</span>
      </div>
      <div class="push_item" @click="emitPushType(2)">
        <img src="@/assets/images/ic-msg-push-3.png" alt="">
        <span>服务包信息</span>
      </div>
      <div class="push_item" @click="emitPushType(3)">
        <img src="@/assets/images/ic-msg-push-4.png" alt="">
        <span>调研问题</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import util from '@/plugins/util'
import EXIF from 'exif-js'
export default {
  data () {
    return {
      msg: '',
      snedMsgObject: {
        IsServantReceive: 0
      },
      emojiContainerShow: false,
      pushContainerShow: false,
      faceList: ['😀', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '😇', '😐', '😑', '😶', '😏', '😣', '😥', '😮', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '😒', '😒', '😓', '😔', '😕', '😲', '😷', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😬', '😰', '😱', '😳', '😵', '😡', '😠', '💪', '👈', '👉', '✌', '👆', '👇', '✋', '👌', '👍', '👏', '👐', '🙏'],
      imgUploadProgress: 0
    }
  },
  watch: {
    emojiContainerShow () {
      this.operContainerHeight()
    },
    pushContainerShow () {
      this.operContainerHeight()
    }
  },
  props: {
    missionID: ''
  },
  methods: {
    backspaceInputValue () {
      const emojiReg = /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f])|(\ud83d[\ude80-\udeff])/
      const len = this.msg.length
      const lastTwoChar = this.msg.substring(len - 2, len)
      if (lastTwoChar.search(emojiReg) === 0) {
        this.msg = this.msg.substring(0, len - 2)
      } else {
        this.msg = this.msg.substring(0, len - 1)
      }
    },
    showFinishServicePopup () {
      this.$router.push(`/consult/finishService/${this.missionID}`)
    },
    chooseFace (face) {
      this.msg = this.msg + face
      this.$nextTick(() => {
        this.$refs.chatInput.scrollTop = this.$refs.chatInput.scrollHeight
      })
    },
    operContainerHeight () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$emit('changeHeight', this.$refs.operContainerRef.offsetHeight)
        }, 500)
      })
    },
    // 发送文本消息
    sendTextMsg () {
      this.snedMsgObject = {
        IsServantReceive: 0
      }
      if (this.msg.length <= 0) {
        this.$vux.toast.show({
          text: '消息不可为空',
          position: 'bottom',
          type: 'text'
        })
        return false
      }
      if (this.msg.length > 200) {
        this.$vux.toast.show({
          text: '消息不可超过200字符',
          position: 'bottom',
          type: 'text'
        })
        return false
      }
      this.snedMsgObject.MsgType = 1
      this.snedMsgObject.Content = this.msg
      this.msg = ''
      if (!this.emojiContainerShow) {
        this.$refs.chatInput.focus()
      }
      this.$emit('sendMsg', this.snedMsgObject)
    },
    // 发送图片消息
    uploadImgChange (e) {
      const that = this
      that.snedMsgObject = {
        IsServantReceive: 0
      }
      let file = e.target.files[0]
      if (!file) return false
      if (!this.verifyFileType(file, e)) return false
      let orientation = null
      EXIF.getData(file, function () {
        orientation = EXIF.getTag(this, 'Orientation')
      })
      const reader = new FileReader()
      const uploadImage = new Image()
      that.snedMsgObject.MsgType = 2
      reader.onload = function (e) {
        uploadImage.src = e.target.result
      }
      uploadImage.onload = function (e) {
        util.compressImage(
          {
            Img: this,
            maxWidth: 750,
            maxHeight: 1334,
            file: file,
            fileType: file.type,
            orientation: orientation
          }, (blob, base64Url) => {
          that.snedMsgObject.Content = base64Url
          that.uploadImg(blob)
        })
      }
      reader.readAsDataURL(file)
      e.target.value = ''
    },
    async uploadImg (blob) {
      const that = this
      that.imgUploadProgress = 0
      let fd = new FormData()
      fd.append('fileUpload', blob)
      var options = {
        method: 'post',
        url: `${process.env.IMAGE_HOST}/File/Upload`,
        data: fd,
        timeout: 15000,
        onUploadProgress: function (progressEvent) {
          that.imgUploadProgress = (progressEvent.loaded / progressEvent.total * 100 | 0)
        }
      }
      try {
        that.$vux.loading.show('发送中')
        const res = await axios(options)
        that.snedMsgObject.Image = res.data.data.objectId
        that.$emit('sendMsg', that.snedMsgObject)
        that.$vux.loading.hide()
      } catch (error) {
        that.$vux.loading.hide()
        this.$vux.toast.text('网络异常，发送失败')
      }
    },
    verifyFileType (file, e) {
      if (file.type.indexOf('image') < 0) {
        this.$vux.toast.show({
          text: '只能发送图片',
          position: 'bottom',
          type: 'text'
        })
        e.target.value = ''
        return false
      } else {
        return true
      }
    },
    emitPushType (type) {
      this.$emit('changePushType', type)
    }
  }
}
</script>

<style lang="less" scoped>
.container
{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}
.finished_service_btn
{
  position: absolute;
  top: -50px;
  left: 0;
  height: 30px;
  padding: 0 15px;
  display: block;
  border-radius: 0 15px 15px 0;
  background-color: rgba(255,255,255,.9);
  font-size: 14px;
  border: 1px solid #D8D8D8;
  border-left: none;
  line-height: 30px;
  color: #999;
  z-index: 10;
}

.oper_container
{
  display: flex;
  flex-flow: nowrap;
  width: 100%;
  height: 52px;
  align-items: center;
  .select_img_btn
  {
    position: relative;
    display: block;
    flex: 0 0 60px;
    text-align: center;
    overflow: hidden;
    .iconfont
    {
      font-size: 36px;
      color: #999;
      z-index: 0;
    }
    input[type=file]
    {
      position: absolute;
      left: 0;
      top: 0;
      visibility: hidden;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
  .input_control_box
  {
    flex: 1;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    textarea
    {
      border: none;
      width: 100%;
      height: 35px;
      padding: 5px 10px;
      outline: none;
      color: #999;
      border-radius: 0;
      font-size: 14px;
      box-sizing: border-box;
      resize: none;
      background: #f6f6f6;
      border-radius: 4px;
      -webkit-tap-highlight-color: rgba(0,0,0,0)
    }
  }
  .emoji_show_container
  {
    flex: 0 0 60px;
    text-align: center;
    line-height: 52px;
    .iconfont
    {
      font-size: 36px;
      color: #999
    }
  }
  .send_msg_container
  {
    flex: 0 0 80px;
    padding: 0 10px;
    height: 30px;
    box-sizing: border-box;
    button
    {
      width: 100%;
      height: 100%;
      border: none;
      font-size: 14px;
      color: #fff;
      border-radius: 5px;
      outline: none;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      background-color: #3ac7f5
    }
  }
}
.emoji_container
{
  position: relative;
  display: flex;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  flex-flow: wrap;
  .emoji_items
  {
    display: block;
    flex: 0 0 10%;
    height: 35px;
    line-height: 35px;
    text-align: center;
  }
  .iconfont
  {
    position: absolute;
    right: 15px;
    bottom: 15px;
    display: block;
    width: 10%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 26px;
  }
}

.send_push_container {
  padding: 0 0 0 10px;
  .more-icon {
    display: block;
    width: 30px;
    height: 30px;
    background: url(../../../../assets/images/ic-msg-push-add.png) no-repeat;
    background-size: contain;
    transition: .5s;
    &.active {
      transform: rotate(135deg);
    }
  }
}
.push_container {
  display: flex;
  align-items: center;
  height: 0;
  overflow: hidden;
  opacity: 0;
  transition: .3s;
  box-sizing: border-box;
  &.active {
    height: 85px;
    opacity: 1;
  }
  .push_item {
    flex: 1;
    padding: 18px 0;
    text-align: center;
    img {
      margin: 0 auto;
      display: block;
      height: 24px;
      width: auto;
    }
    span {
      font-size: 10px;
      color: #666;
    }
  }
}
</style>
