<template>
 <div>
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="true">
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
    </sticky>
    <div class="content_container" :style="'padding-bottom:'+ boxPaddingBottom+'px'">
      <system-msg-item>
        温馨提示：服务者的回复仅供参考，不能作为诊断及医疗依据
      </system-msg-item>
      <a href="javascript:" class="moreMessage_text" @click="moreMessage">
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
            class="mt10px"
            :avatar="userAccount.Avatar"
            :Content="item.Content"
            :MsgType="item.MsgType"
            @onloaded = "scrollToBottom"
          >
          </text-chat-item>
          <graphic-message 
            v-if="item.MsgType === 5 || item.MsgType === 6"
            class="mt10px"
            :avatar="userAccount.Avatar"
            :IsServantReceive="item.IsServantReceive"
            :Content="detail"
            @onloaded = "scrollToBottom"
            :MsgType="item.MsgType"
          >
          </graphic-message>
        </div>
      </template>
    </div>
    <div v-if="detail.State === 0" class="btn_bar">
      <button @click="confirmTheConsult">开始服务</button>
    </div>
    <send-msg-bar v-if="detail.State === 3" @changeHeight="changePaddingBottom" :missionID="ID" @sendMsg="sendMsg"></send-msg-bar>
 </div>
</template>
<script>
import { Sticky } from 'vux'
import { mapGetters } from 'vuex'
import SystemMsgItem from './components/systemMsgItem'
import TextChatItem from './components/textChatItem'
import GraphicMessage from './components/GraphicMessage'
import SendMsgBar from './components/sendMsgBar'
export default {
  components: {
    Sticky,
    SystemMsgItem,
    TextChatItem,
    SendMsgBar,
    GraphicMessage
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
      detail: {},
      boxPaddingBottom: 82,
      messageList: [],
      pageIndex: 1
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
  updated () {
  },
  created () {
    this.init()
  },
  methods: {
    // 向服务器推送消息
    async sendMsg (msg) {
      this.messageList.push(msg)
      this.scrollToBottom()
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
    // 初始化
    async init () {
      this.getMissionDetail().then(result => {
        if (result.Code === 100000) {
          this.detail = result.Data
        }
      })
      this.getMessageList().then(result => {
        if (result.Code === 100000) {
          this.messageList = result.Data.ContentList
          this.scrollToBottom()
        }
      })
    },
    // 获取任务详情
    async getMissionDetail () {
      const res = await this.$http.get(`/QueryConsult?missionId=${this.ID}`)
      return res.data
    },
    // 获取消息列表
    async getMessageList () {
      const res = await this.$http.get(`/QueryConsultDialog?missionId=${this.ID}&pageIndex=${this.pageIndex}`)
      return res.data
    },
    // 更多的消息
    moreMessage () {
      this.pageIndex += 1
      this.getMessageList().then(result => {
        this.messageList = [
          ...result.Data,
          ...this.messageList
        ]
      })
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
  color: #3ac7f5
}
</style>
