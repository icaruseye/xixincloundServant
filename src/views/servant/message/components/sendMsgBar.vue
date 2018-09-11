<template>
  <div class="container send_message_container" ref="operContainerRef">
    <div class="oper_container">
      <div class="input_control_box">
        <textarea
         @focus="emojiContainerShow = false"
         ref="chatInput"
         @keyup.enter="sendTextMsg"
         v-model="msg">
        </textarea>
      </div>
      <!-- <div class="emoji_show_container" @click="emojiContainerShow = !emojiContainerShow">
        <i v-if="!emojiContainerShow" class="iconfont icon-biaoqing-xue"></i>
        <i v-else class="iconfont icon-jianpan"></i>
      </div> -->
      <div class="send_msg_container">
        <button @click="sendTextMsg">发送</button>
      </div>
    </div>
    <!-- <div v-if="emojiContainerShow" class="emoji_container">
      <div class="emoji_list_container">
        <a :style="computeEmojiStyle(item)" href="javascript:;" class="emoji_items" v-for="(item, index) in faceList" :key="index" @click="chooseFace(item)">
        </a>
      </div>
      <div class="emoji_oper_box">
        <i class="iconfont icon-delete" @click="backspaceInputValue"></i>
      </div>
    </div> -->
  </div>
</template>
<script>
import faceList from '@/plugins/datas/faceList.js'
import { computeEmojiStyle, backspaceTextLastEmoji } from '@/plugins/emojiUtil'
export default {
  data () {
    return {
      msg: '',
      snedMsgObject: {
        IsServantReceive: 0
      },
      faceList: faceList,
      emojiContainerShow: false,
      imgUploadProgress: 0
    }
  },
  watch: {
    emojiContainerShow () {
      this.operContainerHeight()
    }
  },
  methods: {
    computeEmojiStyle,
    backspaceInputValue () {
      this.msg = backspaceTextLastEmoji(this.msg)
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
    // 发送文本消息
    sendTextMsg () {
      this.snedMsgObject = {
        IsServantReceive: 0
      }
      if (this.msg.trim() === '') {
        this.msg = this.msg.trim()
        this.$vux.toast.text('不能发送空白消息')
        return false
      }
      if (this.msg.length > 200) {
        this.$vux.toast.text('消息不可超过200字符')
        return false
      }
      this.snedMsgObject.MsgType = 1
      this.snedMsgObject.Content = this.msg
      this.msg = ''
      if (!this.emojiContainerShow) {
        this.$refs.chatInput.focus()
      }
      this.$emit('sendMsg', this.snedMsgObject)
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
  z-index: 11;
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
  padding-left: 20px;
  box-sizing: border-box;
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
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    button
    {
      width: 100%;
      height: 30px;
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
  padding: 15px 10px 0;
  width: 100%;
  box-sizing: border-box;
  .emoji_list_container
  {
    display: flex;
    flex-flow: wrap;
    justify-content: flex-start;
    .emoji_items
    {
      display: inline-block;
      width: 28px;
      height: 28px;
      text-align: center;
    }
  }
  .emoji_oper_box
  {
    height: 35px;
    width: 100%;
    margin-top: 10px;
    border-top: 1px solid rgba(0,0,0,.1);
    .iconfont
    {
      display: block;
      float: right;
      width: 10%;
      height: 35px;
      line-height: 35px;
      text-align: center;
      font-size: 26px;
    }
  }
}
</style>
