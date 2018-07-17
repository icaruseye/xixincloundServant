<template>
  <div class="container send_message_container" ref="operContainerRef">
    <a class="finished_service_btn" @click="showFinishServicePopup" href="javascript:void(0)">完成服务</a>
    <div class="oper_container">
      <label class="select_img_btn">
        <label class="icon-tupian iconfont"  for="uploadImgBtn"></label>
        <input id="uploadImgBtn" type="file" @change="uploadImg">
      </label>
      <div class="input_control_box">
        <textarea
         @focus="emojiContainerShow = false"
         ref="chatInput"
         @keyup.enter="sendTextMsg"
         v-model="msg">
        </textarea>
      </div>
      <div class="emoji_show_container" @click="emojiContainerShow = !emojiContainerShow">
        <i v-if="!emojiContainerShow" class="iconfont icon-biaoqing-xue"></i>
        <i v-else class="iconfont icon-jianpan"></i>
      </div>
      <div class="send_msg_container">
        <button @click="sendTextMsg">发送</button>
      </div>
    </div>
    <div v-if="emojiContainerShow" class="emoji_container">
      <a href="javascript:;" class="emoji_items" v-for="(item, index) in faceList" :key="index" @click="chooseFace(item)">{{item}}</a>
      <i class="iconfont icon-delete" @click="backspaceInputValue"></i>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      msg: '',
      emojiContainerShow: false,
      faceList: ['😀', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '😇', '😐', '😑', '😶', '😏', '😣', '😥', '😮', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '😒', '😒', '😓', '😔', '😕', '😲', '😷', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😬', '😰', '😱', '😳', '😵', '😡', '😠', '💪', '👈', '👉', '✌', '👆', '👇', '✋', '👌', '👍', '👏', '👐', '🙏'],
      imgUploadProgress: 0
    }
  },
  watch: {
    emojiContainerShow () {
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
        this.$emit('changeHeight', this.$refs.operContainerRef.offsetHeight)
      })
    },
    sendTextMsg () {
      if (this.msg.length <= 0) {
        this.$vux.toast.show({
          text: '消息不可为空',
          position: 'bottom',
          type: 'text'
        })
        return false
      }
      if (this.msg.length > 100) {
        this.$vux.toast.show({
          text: '消息不可超过100字符',
          position: 'bottom',
          type: 'text'
        })
        return false
      }
      const msg = {
        IsServantReceive: 0,
        MsgType: 1,
        Content: this.msg
      }
      this.msg = ''
      if (!this.emojiContainerShow) {
        this.$refs.chatInput.focus()
      }
      this.$emit('sendMsg', msg)
    },
    async uploadImg (e) {
      const that = this
      that.imgUploadProgress = 0
      let file = e.target.files[0]
      if (!file) return false
      if (!this.checkSize(file, e)) return false
      let fd = new FormData()
      fd.append('fileUpload', file)
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
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          const msg = {
            IsServantReceive: 0,
            MsgType: 2,
            Content: this.result,
            Image: res.data.data.objectId
          }
          that.$emit('sendMsg', msg)
        }
        e.target.value = ''
        that.$vux.loading.hide()
      } catch (error) {
        that.$vux.loading.hide()
        this.$vux.toast.text('网络异常，发送失败')
      }
    },
    checkSize (file, e) {
      if (file.size > 1024 * 1024 * 5) {
        this.$vux.toast.text('上传图片大小超出限制')
        return false
      }
      return true
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
  .select_img_btn
  {
    position: relative;
    display: block;
    flex: 0 0 60px;
    line-height: 52px;
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
    padding: 11px 0;
    box-sizing: border-box;
    textarea
    {
      border: none;
      border-bottom: 1px solid #979797;
      width: 100%;
      height: 30px;
      padding: 5px 10px;
      outline: none;
      color: #999;
      border-radius: 0;
      font-size: 14px;
      box-sizing: border-box;
      resize: none;
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
    padding: 8px 10px;
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
</style>
