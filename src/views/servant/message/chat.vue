<template>
  <div @click="closeEmojiBox">
    <div style="z-index: 10;position: fixed;top: 0;right:0;left:0">
      <xx-go-back></xx-go-back>
      <div class="firend_info_container">
        <img class="avatar_img" :src="userAccount.Avatar | transformImgUrl" alt="">
        {{userAccount.NickName}}
        <router-link class="viewDetail_btn" :to="`/customer/${userAccount.ID}/detail`">查看详情</router-link>
      </div>
    </div>
    <div class="chat-list" id="chatList"  :style="'padding-bottom:'+ boxPaddingBottom+'px'">
      <div class="service_explain" @click="serviceExplainDialogVisible = true">
        服务说明：此聊天窗口只解答服务包售前疑惑，不解答图文咨询的内容
        <i class="iconfont icon-jiantouyou"></i>
      </div>
      <text-chat-item
        v-for="(item, index) in chatList"
        :key="index"
        :IsServantReceive="item.IsServantReceive"
        :class="['message_item_'+item.ID]"
        :avatar="(item.IsServantReceive === 0)?mineAccount.Avatar:userAccount.Avatar"
        :Content="item.Content"
        :MsgType="item.MsgType"
      >
      </text-chat-item>
    </div>
    
    <!-- 新消息提醒toast -->
    <toast @click.native="scrollToBottom" v-model="showNewMessageRemind" type="text" position= "bottom" width="12em">
      您有新消息了
      <i class="iconfont icon-arrow-down1"></i>
    </toast>

    <!-- 发送消息组件 -->
    <send-msg-bar @click.native.stop="sendMessageBarClick" ref="SendMsgBarRef" @changeHeight="changePaddingBottom" @sendMsg="sendMsg"></send-msg-bar>

      <x-dialog 
        v-model="serviceExplainDialogVisible"
        class="dialog"
        width="90%"
        :hide-on-blur="true">
        <div class="content">
          <div class="title">服务说明</div>
          <ul>
            <li>• 售前咨询仅解答用户对于服务包的售前疑惑，请勿直接回复图文咨询服务内容。</li>
            <li>• 若用户在售前咨询板块询问图文咨询内容，请推送图文咨询服务包引导其购买后发起咨询</li>
          </ul>
          <button class="close" @click="serviceExplainDialogVisible = false">知道了</button>
        </div>
      </x-dialog>
  </div>
</template>

<script>
import http from '@/api/index'
import TextChatItem from '@/views/servant/consult/components/textChatItem'
import SendMsgBar from './components/sendMsgBar'
import { InlineLoading, XDialog, Toast } from 'vux'
export default {
  components: {
    InlineLoading,
    XDialog,
    TextChatItem,
    SendMsgBar,
    Toast
  },
  data () {
    return {
      boxPaddingBottom: 82,
      showNewMessageRemind: false,
      serviceExplainDialogVisible: false,
      isFaceShow: false,
      faceHeight: 100,
      translateFace: 0,
      faceboxHeight: 0,
      faceList: ['😀', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '😇', '😐', '😑', '😶', '😏', '😣', '😥', '😮', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '😒', '😒', '😓', '😔', '😕', '😲', '😷', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😬', '😰', '😱', '😳', '😵', '😡', '😠', '💪', '👈', '👉', '✌', '👆', '👇', '✋', '👌', '👍', '👏', '👐', '🙏'],
      chatMsg: '',
      chatList: [],
      userAccount: {},
      mineAccount: JSON.parse(sessionStorage.getItem('userAccount'))
    }
  },
  async created () {
    this.init()
  },
  computed: {
    UserViewID () {
      return this.$route.params.id
    }
  },
  methods: {
    // 初始化方法
    init () {
      this.loadChatRecord().then(result => {
        this.userAccount = result.Data.UserAccount
        this.chatList = result.Data.ChatHisList
        this.$nextTick(() => {
          this.scrollToBottom()
        })
        this.chatRecordTimePoll()
      })
    },
    // 拉取聊天记录
    async loadChatRecord () {
      const res = await http.get('/ChatRecord', {
        UserViewID: this.UserViewID,
        pageIndex: 1
      })
      return res.data
    },
    // 获取一次心跳内所有该任务用户发送的的新消息
    async getGraphicConsultationChat () {
      const res = await this.$http.get(`/ChatRecord`, {
        UserViewID: this.userAccount.ViewID
      })
      return res.data
    },
    // 点击聊天框出发的方法
    sendMessageBarClick (e) {
      return false
    },
    // 更新聊天内容内边框
    changePaddingBottom (height) {
      this.boxPaddingBottom = (height + 30)
      this.scrollToBottom()
    },
    // 滚动到底部
    scrollToBottom () {
      this.$nextTick(() => {
        document.body.scrollTop = document.documentElement.scrollTop = document.querySelector('body').scrollHeight
      })
    },
    // 关闭emoji表情框
    closeEmojiBox (e) {
      if (this.$refs.SendMsgBarRef) {
        this.$refs.SendMsgBarRef.emojiContainerShow = false
      }
    },
    // 轮询消息
    async chatRecordTimePoll () {
      let rotation = null
      clearInterval(rotation)
      rotation = setInterval(() => {
        this.getGraphicConsultationChat().then(result => {
          if (result.Code === 100000) {
            if (result.Data.ChatHisList && result.Data.ChatHisList.length > 0) {
              this.chatList.push(...result.Data.ChatHisList)
              if ((document.documentElement.clientHeight + (document.body.scrollTop || document.documentElement.scrollTop)) >= document.querySelector('body').scrollHeight - 20) {
                this.scrollToBottom()
              } else {
                this.showNewMessageRemind = true
              }
            }
          }
        })
      }, 5000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(rotation)
      })
    },
    // 向服务器推送消息
    async sendMsg (msg) {
      this.lockToBottom = false
      this.chatList.push(msg)
      this.scrollToBottom()
      await http.post('/ChatRecord', {
        UserViewID: this.userAccount.ViewID,
        MsgType: msg.MsgType,
        Content: msg.Content
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  .avatar {
    border-radius: 0;
  }
}

.chat-list {
  padding: 146px 15px 100px;
}

.chat-item {
  padding: 10px;
}

.chat-item-time {
  padding: 5px 0 10px;
  text-align: center;
  span {
    padding: 2px 4px;
    font-size: 13px;
    border-radius: 3px;
    color: #fff;
    background: #d8d8d8;
  }
}

.chat-item-left {
  display: flex;
  flex-direction: row;
  .chat-item-content {
    margin-left: 15px;
    background: #fff;
    border: 1px solid #f3f1f1;
    word-break: break-all;
    &::before {
      content: "";
      position: absolute;
      left: -10px;
      top: 10px;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-right: 10px solid #fff;
      border-bottom: 8px solid transparent;
    }
  }
}

.chat-item-right {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  .chat-item-content {
    margin: 0 15px 0 10px;
    background: #fff;
    border: 1px solid #fff;
    word-break: break-all;
    &::after {
      content: "";
      position: absolute;
      right: -10px;
      top: 10px;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-left: 10px solid #fff;
      border-bottom: 8px solid transparent;
    }
  }
}

.chat-item-content {
  position: relative;
  text-align: justify;
  padding: 10px;
  max-width: 60%;
  color: #333;
  font-size: 15px;
  line-height: 20px;
  border-radius: 4px;
  box-sizing: border-box;
}

.chat-item-avatar {
  img {
    display: block;
    width: 40px;
    height: 40px;
  }
}

.chat-send-bar {
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  .top {
    display: flex;
    align-items: center;
    .input {
      flex: 1;
      background: #F6F6F6;
      border: #F6F6F6 1px solid;
      border-radius: 5px;
      padding: 0 15px;
      line-height: 40px;
      height: 40px;
      box-sizing: border-box;
      font-size: 16px;
      overflow: auto;
      word-break: break-all;
      color: #333;
    }
    .send-msg {
      border: 0;
      color: #fff;
      font-size: 14px;
      background: #3AC7F5;
      height: 40px;
      line-height: 40px;
      padding: 0px 20px;
      border-radius: 5px;
      display: inline-block;
      user-select: none;
      outline: none
    }
    .iconfont {
      margin: 0 5px;
      font-size: 36px;
      color: #999;
    }
  }
  .chat-face-box {
    width: 100%;
    opacity: 1;
  }
}

.mask {
  position: fixed;
  z-index: 98;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: transparent;
}
.service_explain
{
  position: relative;
  margin: 15px 12px 40px;
  border: 1px solid #FFDCA1;
  border-radius: 4px;
  background-color: #FFFBF2;
  font-size: 10px;
  padding: 5px 20px;
  line-height: 15px;
  color: #666666;
  .iconfont
  {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #666666;
  }
}

.dialog {
  .content {
    text-align: left;
    line-height: 2;
    color: #666;
    .title {
      font-size: 15px;
      color: #333;
      margin-bottom: 20px;
      text-align: center;
      padding: 30px 30px 0;
    }
    ul
    {
      padding: 0 30px;
    }
    li {
      margin-bottom: 10px;
      font-size: 14px;
      color: #999;
      text-align: justify;
    }
    .close {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: 50px;
      line-height: 50px;
      outline: none;
      border: 0;
      border-radius: 2px;
      background: #fff;
      color: #999;
      border-top: 1px solid #E7E7E7
    }
  }
}
.firend_info_container
{
  position: relative;
  height: 80px;
  padding: 20px 40px 20px 60px;
  background-color: #fff;
  box-sizing: border-box;
  line-height: 40px;
  .avatar_img
  {
    position: absolute;
    width: 40px;
    height: 40px;
    left: 10px;
    top: 50%;
    border-radius: 50%;
    transform: translateY(-50%);
  }
  .viewDetail_btn
  {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    height: 26px;
    font-size: 14px;
    line-height: 26px;
    border: 1px solid #3AC7F5;
    color: #3AC7F5;
    padding: 0 13px;
    border-radius: 13px;
  }
}
</style>
