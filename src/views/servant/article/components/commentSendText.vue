<template>
  <div class="container" v-show="modeValue && replyInfo">
    <div class="username_box" v-if="replyInfo">
      @{{replyInfo.username | xxTextSubFilter(3)}}
    </div>
    <div class="input_box">
      <input v-model="content" class="input_control" type="text">
    </div>
    <div class="btn_box">
      <button class="btn" @click="sendReply">发送</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    replyInfo: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      content: ''
    }
  },
  computed: {
    modeValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    sendReply () {
      if (this.content.length <= 0) {
        this.$vux.toast.text('请输入回复内容')
        return false
      }
      if (this.content.length > 50) {
        this.$vux.toast.text('回复内容不可超过50字')
        return false
      }
      this.$http.post(`/Reply?commentId=${this.replyInfo.commentId}&content=${this.content}`).then(result => {
        if (result.data.Code === 100000) {
          this.$vux.toast.text('回复成功')
          this.modeValue = false
        } else {
          this.$vux.toast.text('发送失败')
        }
      })
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
  height: 50px;
  background-color: #fff;
  display: flex;
  flex-flow: nowrap;
  .username_box
  {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 5px;
    color: #999;
    font-size: 12px;
  }
  .input_box
  {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 0 12px;
    .input_control
    {
      height: 35px;
      width: 100%;
      padding: 0 12px;
      background-color: #f6f6f6;
      border-radius: 4px
    }
  }
  .btn_box
  {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 80px;
    .btn
    {
      width: 62px;
      height: 35px;
      border-radius: 4px;
      background-color: #3AC7F5;
      color: #fff;
      border: none
    }
  }
}
</style>

