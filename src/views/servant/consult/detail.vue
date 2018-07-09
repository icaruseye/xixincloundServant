<template>
 <div>
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="true">
      <xx-step-bar :step="detail.State">
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
      <div v-for="(item, index) in messageList" :key="index">
        <system-msg-item v-if="item.time" msgType="time" class="mt25px">
          {{item.time}}
        </system-msg-item>
        <text-chat-item
          :originator="item.originator"
          class="mt10px"
          :avatar="userAccount.Avatar"
          :text="item.text"
          :imgs="item.Imgs"
          :title="item.title"
          :linkName="item.linkName"
          @onloaded = "scrollToBottom"
        >
        </text-chat-item>
      </div>
    </div>
    <!-- <div class="btn_bar">
      <button @click="sendMsg">开始服务</button>
    </div> -->
    <send-msg-bar @changeHeight="changePaddingBottom" @sendMsg="sendMsg"></send-msg-bar>
 </div>
</template>
<script>
import { Sticky } from 'vux'
import { mapGetters } from 'vuex'
import SystemMsgItem from './components/systemMsgItem'
import TextChatItem from './components/textChatItem'
import SendMsgBar from './components/sendMsgBar'
export default {
  components: {
    Sticky,
    SystemMsgItem,
    TextChatItem,
    SendMsgBar
  },
  data () {
    return {
      detail: {
        State: '1'
      },
      boxPaddingBottom: 82,
      messageList: [
        {
          originator: 'to',
          time: '2018年07月4日12:21:05',
          text: '好的，请稍等一下。好的，请稍等一下。好的，请稍等一下。'
        },
        {
          originator: 'from',
          title: '图文咨询',
          time: '2018年07月4日12:21:05',
          text: '目前咨询结果建议，注意观察肿瘤变化情况，皮肤有无破损情况，建议最好去医院做全面检查。',
          Imgs: 'http://thirdwx.qlogo.cn/mmopen/vi_32/lDJ7C7uBGLbIwu6QHCoYs9BQ2be15GTILiaajhr1dbXuZMSptQLNm6uCBWgOiaDZv7GE4K7ItYUBAbYkUfL9Gmzg/132,http://thirdwx.qlogo.cn/mmopen/vi_32/lDJ7C7uBGLbIwu6QHCoYs9BQ2be15GTILiaajhr1dbXuZMSptQLNm6uCBWgOiaDZv7GE4K7ItYUBAbYkUfL9Gmzg/132'
        },
        {
          originator: 'to',
          title: '咨询结果',
          time: '2018年07月4日12:21:05',
          text: '目前咨询结果建议，注意观察肿瘤变化情况，皮肤有无破损情况，建议最好去医院做全面检查。',
          Imgs: 'http://thirdwx.qlogo.cn/mmopen/vi_32/lDJ7C7uBGLbIwu6QHCoYs9BQ2be15GTILiaajhr1dbXuZMSptQLNm6uCBWgOiaDZv7GE4K7ItYUBAbYkUfL9Gmzg/132,http://thirdwx.qlogo.cn/mmopen/vi_32/lDJ7C7uBGLbIwu6QHCoYs9BQ2be15GTILiaajhr1dbXuZMSptQLNm6uCBWgOiaDZv7GE4K7ItYUBAbYkUfL9Gmzg/132',
          linkName: '查看用户信息'
        },
        {
          originator: 'to',
          time: '2018年07月4日12:21:05',
          Imgs: 'http://thirdwx.qlogo.cn/mmopen/vi_32/lDJ7C7uBGLbIwu6QHCoYs9BQ2be15GTILiaajhr1dbXuZMSptQLNm6uCBWgOiaDZv7GE4K7ItYUBAbYkUfL9Gmzg/132'
        },
        {
          originator: 'from',
          time: '2018年07月4日12:21:05',
          Imgs: 'http://image.cloud.zqcj.net.cn/image/1530610010362rymNKFe5FdjUH13lYntMvM3b9WroGnxM.jpg'
        },
        {
          originator: 'to',
          time: '2018年07月4日12:21:05',
          Imgs: 'http://image.cloud.zqcj.net.cn/image/1526526036498WcDCwwRxRpM2M3pXwrnsdJeIoBMtlwh6.png'
        },
        {
          originator: 'to',
          time: '2018年07月4日12:21:05',
          Imgs: 'http://p3.pstatp.com/large/pgc-image/153106000350426f7d87641'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo'
    ])
  },
  updated () {
    this.init()
  },
  methods: {
    sendMsg (msg) {
      this.messageList.push(msg)
      this.scrollToBottom()
    },
    scrollToBottom () {
      this.$nextTick(() => {
        document.body.scrollTop = document.documentElement.scrollTop = document.querySelector('body').scrollHeight
      })
    },
    init () {
      this.scrollToBottom()
    },
    changePaddingBottom (height) {
      this.boxPaddingBottom = (height + 30)
      this.scrollToBottom()
    }
  }
}
</script>
<style lang="less">
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

// 聊天气泡内的样式
.from_textChat_msg,
.to_textChat_msg
{
  .thumbs_container
  {
  padding: 0 !important;
  height: 65px;
  img:last-child
  {
    margin-right: 0
  }
  }
}
.to_imgChat_msg,
.from_imgChat_msg
{
  padding-top: 10px; 
  .thumbs_container{
    width: 120px;
    padding-top: 0 !important;
    img
    {
      width: 100% !important;
      height: auto !important;
      border-radius: 5px;
    }
  }
}
.to_imgChat_msg .thumbs_container
{
  float: right;
}
</style>
