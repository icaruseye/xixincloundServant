<template>
  <div>
    <div style="z-index: 10;position: fixed;top: 0;right:0;left:0">
      <xx-go-back></xx-go-back>
    </div>
    <div class="chat-list" id="chatList" :style="{paddingBottom : faceHeight + 'px'}">
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
      <!-- <template v-for="(item, index) in chatList">
        <div class="chat-item" :key="index">
          <div class="chat-item-time" v-if="item.SendTime"><span>{{item.SendTime | xxTimeFormatFilter}}</span></div>
          <div :class="[item.IsServantReceive ? 'chat-item-left' : 'chat-item-right']">
            <div class="chat-item-avatar" v-if="item.IsServantReceive">
              <img :src="userAccount.Avatar | transformImgUrl">
            </div>
            <div class="chat-item-avatar" v-if="!item.IsServantReceive">
              <img :src="mineAccount.Avatar | transformImgUrl">
            </div>
            <div class="chat-item-content">
              {{item.Content}}
            </div>
            <inline-loading v-show="item.loading"></inline-loading>
          </div>
      </div>
      </template> -->
    </div>
    <div class="mask" v-show="isFaceShow" @click="hideFace"></div>
    <div class="chat-send-bar" :style="{ transform: 'translateY('+ translateFace +'px)' }">
      <div class="top">
        <input class="input" type="text" id="chatInput"
        v-model="chatMsg"
        @click="isFaceShow = false"
        @focus="inputFocus"
        @keyup.enter="sendMsg">
        <!-- <i class="iconfont icon-biaoqing1" @click="showFace"></i> -->
        <div style="height: 100%;width:10px"></div>
        <button type="button" class="send-msg" @click="sendMsg">发送</button>
      </div>
      <!-- <div v-if="showFace" class="chat-face-box" id="chatFaceBox">
        <div class="" style="font-size:22px;text-align:justify">
          <a href="javascript:;" style="margin:0 3px;" v-for="(item, index) in faceList" :key="index" @click="chooseFace(item)">{{item}}</a>
        </div>
      </div> -->
    </div>
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
import { InlineLoading, XDialog } from 'vux'
export default {
  components: {
    InlineLoading,
    XDialog,
    TextChatItem
  },
  data () {
    return {
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
    const that = this
    const res = await http.get('/ChatRecord', { UserViewID: this.$route.params.id, pageIndex: 1 })
    this.userAccount = res.data.Data.UserAccount
    this.chatList = res.data.Data.ChatHisList
    setTimeout(function () {
      that.goDown()
    }, 0)
    window.servantTimer = setInterval(async function () {
      await that.chatRecordTimePoll()
    }, 5000)
  },
  mounted () {
    this.goDown()
    this.faceboxHeight = document.getElementById('chatFaceBox').offsetHeight // 获取表情高度
    this.translateFace = this.faceboxHeight + 5 // 表情上弹高度
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(window.servantTimer)
    next()
  },
  methods: {
    // 页面逻辑函数
    chooseFace (face) {
      this.chatMsg = this.chatMsg + face
    },
    showFace () {
      const that = this
      this.isFaceShow = true
      this.translateFace = 0
      this.faceHeight = this.faceboxHeight + 100 // padding-bottom高度加上表情高度
      setTimeout(function () {
        that.goDown()
      }, 500)
    },
    hideFace () {
      this.isFaceShow = false
      this.translateFace = this.faceboxHeight + 5
      this.faceHeight = 100 // 还原padding-bottom初始高度
    },
    inputFocus () {
      const that = this
      this.hideFace()
      setTimeout(function () {
        that.goDown()
      }, 500)
    },
    goDown () {
      document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight
    },
    // 功能逻辑函数
    async chatRecordTimePoll () {
      const res = await http.get('/ChatRecord', { UserViewID: this.userAccount.ViewID })
      const that = this
      if (res.data.Data.ChatHisList.length > 0) {
        res.data.Data.ChatHisList.map((item) => {
          this.chatList.push(item)
          setTimeout(function () {
            that.goDown()
          }, 1)
        })
      }
    },
    async sendMsg () {
      const that = this
      if (!this.isFaceShow) {
        document.getElementById('chatInput').focus()
      } else {
        this.showFace()
      }
      if (!this.chatMsg) return false
      let msg = {
        userAvatar: this.mineAccount.Avatar,
        userName: this.mineAccount.NickName,
        IsServantReceive: 0,
        Content: this.chatMsg,
        MsgType: 1,
        time: new Date()
      }
      await http.post('/ChatRecord', {
        UserViewID: this.userAccount.ViewID,
        MsgType: msg.MsgType,
        Content: this.chatMsg
      })
      let _msg = Object.assign({}, msg)
      this.chatList.push(_msg)
      this.chatMsg = ''
      setTimeout(function () {
        that.goDown()
      }, 0)
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
  padding: 50px 15px 100px;
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
  margin: 15px 12px 0;
  border: 1px solid #FFDCA1;
  border-radius: 4px;
  background-color: #FFFBF2;
  font-size: 10px;
  padding: 5px 15px;
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
</style>
