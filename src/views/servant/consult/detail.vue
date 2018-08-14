<template>
 <div @click="closeEmojiBox" style="padding-top:100px;overflow:hidden">
    <div style="position:fixed;top:0;left:0;right:0;z-index:1000">
      <xx-go-back></xx-go-back>
      <xx-step-bar :step="detail.State | stepFilter">
        <xx-step-items slot="items">
          已确认
        </xx-step-items>
        <xx-step-items slot="items">
          服务中
        </xx-step-items>
        <xx-step-items slot="items">
          已完成
        </xx-step-items>
      </xx-step-bar>
    </div>
    <div class="content_container" :style="'padding-bottom:'+ boxPaddingBottom+'px'">
      <system-msg-item v-if="warmPrompt">
        {{warmPrompt}}
      </system-msg-item>
      <a v-if="messageId !== -1" href="javascript:" class="moreMessage_text" @click="moreMessage">
        <i class="icon-clock iconfont"></i>
        查看更多消息
      </a>
      <template v-if="messageList.length > 0">
        <div v-for="(item, index) in messageList" :key="index">
          <system-msg-item v-if="item.SendTime" msgType="time" class="mt25px">
            {{item.SendTime | xxTimeFormatFilter}}
          </system-msg-item>
          <text-chat-item
            v-if="item.MsgType === 1 || item.MsgType === 2"
            :IsServantReceive="item.IsServantReceive"
            :class="['mt10px', 'message_item_'+item.ID]"
            :avatar="(item.IsServantReceive === 0)?userAccount.Avatar:FromAvatar"
            :Content="item.Content"
            :MsgType="item.MsgType"
            :imgIndex="item.imgIndex"
            @previewImage="previewImage"
          >
          </text-chat-item>
          <graphic-message 
            v-if="item.MsgType === 5 || item.MsgType === 6"
            :class="['mt10px', 'message_item_'+item.ID]"
            :avatar="(item.IsServantReceive === 0)?userAccount.Avatar:FromAvatar"
            :IsServantReceive="item.IsServantReceive"
            :Content="detail"
            :MsgType="item.MsgType"
            @showCommentPanel ="commentPanelVisible = true"
          >
          </graphic-message>
        </div>
      </template>
      <div v-if="detail.State === -1" style="margin-top:40px">
        <system-msg-item msgType="time">
          任务已被取消
        </system-msg-item>
        <system-msg-item class="mt10px">
          取消原因： {{detail.CancelDescription || '服务者4小时未做出响应'}}
        </system-msg-item>
      </div>
    </div>
    <div v-if="detail.State === 0" class="btn_bar">
      <button v-if="detail.CanCancel" style="background: #ffc349" @click="cancelMissionPopupVisible = true">取消</button>
      <button @click="confirmTheConsult">开始服务</button>
    </div>
    

    <!-- 新消息提醒toast -->
    <toast @click.native="scrollToBottom" v-model="showNewMessageRemind" type="text" position= "bottom" width="12em">
      您有新消息了
      <i class="iconfont icon-arrow-down1"></i>
    </toast>
    
    <!-- 查看评价弹出框 -->
    <div v-if="detail.State === 4 || detail.State === 5" class="btn_bar">
      <button @click="commentPanelVisible = true">查看评价</button>
    </div>
    <comments v-model="commentPanelVisible" :result="detail.Result"></comments>

    <!-- 取消任务弹窗 -->
    <cancel-mission-popup v-model="cancelMissionPopupVisible" :options="cancelReason" @confirmCancel="cancelMissionEvent"></cancel-mission-popup>

    <!-- 发送消息组件 -->
    <send-msg-bar @click.native.stop="sendMessageBarClick" ref="SendMsgBarRef" v-if="detail.State === 3" @changeHeight="changePaddingBottom" :missionID="ID" @sendMsg="sendMsg"></send-msg-bar>
 </div>
</template>
<script>
import { Sticky, Toast } from 'vux'
import { mapGetters, mapMutations } from 'vuex'
import CancelMissionPopup from '@/components/cancelMissionPopup'
import SystemMsgItem from './components/systemMsgItem'
import TextChatItem from './components/textChatItem'
import GraphicMessage from './components/GraphicMessage'
import SendMsgBar from './components/sendMsgBar'
import { setInterval, clearInterval } from 'timers'
import comments from './components/comments'
import { ImagePreview } from 'vant'
import util from '@/plugins/util'
export default {
  components: {
    Sticky,
    SystemMsgItem,
    TextChatItem,
    SendMsgBar,
    GraphicMessage,
    CancelMissionPopup,
    Toast,
    comments
  },
  filters: {
    stepFilter (val = 0) {
      switch (val) {
        case 0: {
          return '1'
        }
        case 3: {
          return '2'
        }
        case 4: {
          return '3'
        }
      }
    }
  },
  data () {
    return {
      chatImagePreviewerVisible: false,
      previewImageImage: new Image(),
      commentPanelVisible: false,
      showNewMessageRemind: false,
      detail: {},
      cancelMissionPopupVisible: false,
      boxPaddingBottom: 82,
      messageList: [],
      messageId: 0,
      FromAvatar: '',
      warmPrompt: null,
      cancelReason: [
        {
          key: '999',
          value: '请填写取消原因'
        }
      ],
      chatMsgImgs: []
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo'
    ]),
    ID () {
      return this.$route.params.id || ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapMutations(['SET_MISSION_TAB_INDEX', 'SET_SMALL_MISSION_TAB_INDEX']),
    changeMessageList () {
      const that = this
      let imgs = []
      let index = 0
      for (let i = 0; i < that.messageList.length; i++) {
        if (that.messageList[i].MsgType === 2) {
          that.messageList[i].imgIndex = index
          imgs.push(util.transformImgUrl(that.messageList[i].Content))
          index++
        }
      }
      this.chatMsgImgs = imgs
    },
    previewImage (index) {
      ImagePreview(this.chatMsgImgs, index)
    },
    // 获取温馨提示
    getWarmPrompt () {
      util.getWarmPrompt(18, this.detail.ItemID).then(value => {
        if (value.Code === 100000 && value.Data) {
          this.warmPrompt = value.Data.Content
        }
      })
    },
    sendMessageBarClick (e) {
      return false
    },
    closeEmojiBox (e) {
      if (this.$refs.SendMsgBarRef) {
        this.$refs.SendMsgBarRef.emojiContainerShow = false
      }
    },
    /**
     * 取消任务
     */
    async cancelMissionEvent (option) {
      const that = this
      if (that.submitLocked) {
        return false
      }
      this.$vux.loading.show('加载中')
      const res = await this.$http.put(`/Mission?missionID=${this.ID}`, option)
      this.$vux.loading.hide()
      if (res.data.Code === 100000) {
        that.$vux.toast.show({
          position: 'middle',
          text: '取消成功'
        })
        that.$router.push('/mission')
      } else {
        that.$vux.toast.show({
          width: '60%',
          type: 'text',
          position: 'middle',
          text: res.data.Msg
        })
      }
    },
    // 向服务器推送消息
    async sendMsg (msg) {
      this.lockToBottom = false
      this.messageList.push(msg)
      this.changeMessageList()
      this.scrollToBottom()
      msg.MissionID = this.ID
      await this.$http.post(`/Chat`, {
        Content: (msg.MsgType === 2) ? msg.Image : msg.Content,
        MsgType: msg.MsgType,
        MissionID: this.ID
      })
    },
    // 接受并开始服务
    async confirmTheConsult () {
      this.$vux.loading.show('加载中')
      const res = await this.$http.put(`/ConfirmTheConsult?mid=${this.ID}`)
      this.$vux.loading.hide()
      if (res.data.Code === 100000) {
        this.init()
      } else {
        this.$vux.toast.text(`请求失败,错误码：${res.data.Code}`)
      }
    },
    // 初始化任务
    async initMission () {
      await this.getMissionDetail().then(result => {
        if (result.Code === 100000) {
          this.detail = result.Data
        }
      })
    },
    // 初始化聊天记录
    async initMessageList () {
      await this.getMessageList().then(result => {
        if (result.Code === 100000) {
          this.messageList = result.Data.ContentList
          this.FromAvatar = result.Data.Avatar
          this.messageId = result.Data.MessageID
          this.changeMessageList()
          this.scrollToBottom()
        }
      })
    },
    // 全部初始化
    async init () {
      this.$vux.loading.show('加载中')
      await this.initMission()
      await this.getWarmPrompt()
      await this.initMessageList()
      this.$vux.loading.hide()
      // 消息轮询
      if (this.detail.State === 0 || this.detail.State === 3) {
        let rotation = null
        clearInterval(rotation)
        rotation = setInterval(() => {
          this.getGraphicConsultationChat().then(result => {
            if (result.Code === 100000) {
              if (result.Data && result.Data.length > 0) {
                this.messageList.push(...result.Data)
                this.changeMessageList()
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
      }
      // 设置返回目录
      switch (this.detail.State) {
        case -1:
          this.SET_MISSION_TAB_INDEX(0)
          break
        case 0:
          this.SET_MISSION_TAB_INDEX(0)
          this.SET_SMALL_MISSION_TAB_INDEX(0)
          break
        case 1:
          this.SET_MISSION_TAB_INDEX(0)
          this.SET_SMALL_MISSION_TAB_INDEX(0)
          break
        case 2:
          this.SET_MISSION_TAB_INDEX(0)
          this.SET_SMALL_MISSION_TAB_INDEX(0)
          break
        case 3:
          this.SET_MISSION_TAB_INDEX(0)
          this.SET_SMALL_MISSION_TAB_INDEX(0)
          break
        case 4:
          this.SET_MISSION_TAB_INDEX(0)
          this.SET_SMALL_MISSION_TAB_INDEX(0)
          break
        case 5:
          this.SET_MISSION_TAB_INDEX(1)
          break
        case 6:
          this.SET_MISSION_TAB_INDEX(1)
          break
        case 7:
          this.SET_MISSION_TAB_INDEX(1)
          break
        default:
          this.SET_MISSION_TAB_INDEX(1)
          break
      }
    },
    // 获取任务详情
    async getMissionDetail () {
      const res = await this.$http.get(`/QueryConsult?missionId=${this.ID}`)
      return res.data
    },
    // 获取消息列表
    async getMessageList () {
      const res = await this.$http.get(`/QueryConsultDialog?missionId=${this.ID}&messageId=${this.messageId}`)
      return res.data
    },
    // 更多的消息
    async moreMessage () {
      const prePageLastDomClass = `.message_item_${this.messageList[0].ID}`
      const prescrollTop = (document.body.scrollTop | document.documentElement.scrollTop)
      const prePageLastDomTop = document.querySelector(prePageLastDomClass).offsetTop - prescrollTop
      this.$vux.loading.show('加载中')
      await this.getMessageList().then(result => {
        this.messageId = result.Data.MessageID
        this.messageList.unshift(...result.Data.ContentList)
        this.changeMessageList()
      })
      this.$nextTick(() => {
        const prePageLastDom = document.querySelector(prePageLastDomClass)
        document.body.scrollTop = document.documentElement.scrollTop = (prePageLastDom.offsetTop - prePageLastDomTop)
      })
      this.$vux.loading.hide()
    },
    // 获取一次心跳内所有该任务用户发送的的新消息
    async getGraphicConsultationChat () {
      const res = await this.$http.get(`/GraphicConsultationChat?missionID=${this.ID}`)
      return res.data
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
    }
  }
}
</script>
<style lang="less" scoped>
.mt25px
{
  margin-top: 25px
}
.btn_bar
{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 52px;
  display: flex;
  flex-flow: nowrap;
  button
  {
    flex: 1;
    border: none;
    background-color: #3AC7F5;
    font-size: 18px;
    color: #fff;
    outline: none
  }
}
.content_container
{
  padding: 15px 15px 80px
}
.moreMessage_text
{
  font-size: 14px;
  text-align: center;
  display: block;
  padding: 20px 0;
  color: #3ac7f5;
  outline: none
}
</style>
