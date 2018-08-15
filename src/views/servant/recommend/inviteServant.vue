<template>
  <div class="warp_container">
    <div class="user_background_container"></div>
    <div class="user_info_container">
      <transition enter-active-class="animated fadeInBottom" leave-active-class="animated fadeOutTop">  
        <div class="avatar_img_box">
          <img class="avatar_img" :src="userAccount.Avatar | transformImgUrl" alt="">
        </div>
      </transition>
      <p class="introducer_box">
        我创建了我的个人工作室， 老铁，你要不要也弄一个？
      </p>
      <div class="chat_container">
        <transition v-for="(item, index) in chatList" :key="index" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft">
          <div class="chat_items clearfix" v-show="scrollTop >= (index + 1)">
            <img :src="userAccount.Avatar | transformImgUrl" class="avatar" alt="">
            <div class="from_textChat_msg">
              <div class="msg_text_container">
                {{item.text}}
              </div>
            </div>
          </div>
        </transition>
      </div>

      <img class="invate_user_info_bg" src="@/assets/images/invate_servant_info_bg.png" alt="">
    </div>
    <transition enter-active-class="animated fadeInBottom" leave-active-class="animated fadeOutTop">
      <div v-show="scrollTop >= chatList.length">
        <h2 class="title_box">
          {{userInfo.RealName}}邀请您加入悉心云平台
        </h2>
        <div class="qr_code_box">
          <img :src="API_PATH+'/QRCode/'+userAccount.ID" alt="">
        </div>
        <p class="scan_qr_text">长按以上二维码，关注悉心云服务注册即可</p>

        <div class="invate_user_page_bg_box">
          <img class="invate_user_page_bg" src="@/assets/images/invate_servant_page_bg.png" alt="">
        </div>
      </div>
    </transition>
    
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      scrollTop: 0
    }
  },
  mounted () {
    const timer = setInterval(() => {
      this.scrollTop += 1
      if (this.scrollTop > this.chatList.length) {
        clearInterval(timer)
      }
    }, 200)
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo'
    ]),
    shopName () {
      return sessionStorage.getItem('shopName')
    },
    API_PATH () {
      return process.env.API_PATH
    },
    chatList () {
      return [
        {
          text: `hello，我是${this.userInfo.RealName}。我正在使用悉心云平台。台的主要业务是上门服务，他们的核心模式是熟人医患模式，不是抢单/派单模式，不会存在抢不到单或者即便抢到也是偏僻区域单子的情况。`
        },
        {
          text: '你需要自己发展患者，但平台保证：你自己发展的患者只有自己看到，不会向其他医护推荐您的患者，公平无竞争！'
        },
        {
          text: '基于熟人医患模式的上门服务相对安全，你可以自己选择你服务的对象，不选择素质较差的患者即可。'
        },
        {
          text: '除了上门服务，平台还提供院内陪诊、图文问诊服务供你自由选择。所有项目你都可以自由定价，平台无权干涉。'
        },
        {
          text: '平台还有个强大的患者管理功能，分组、分标签、分组推送科普知识等。各类消息均有模板，包括科普知识类文章。提前设置，定时发送即可。患者会以为你无比的关心他。'
        },
        {
          text: '若你觉得还不错，一定扫我的码哦~待你完成了金额大于100元的首单，我们双方都有鼓励金。再给你看看我的介绍页和服务项页面，我觉得特别高大上。'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
// 聊天开始
.chat_container
{
  margin-top: 40px;
  padding: 40px 10px;
  transition: all .2s linear;
  .chat_items
  {
    position: relative;
    min-height: 50px;
    padding: 0 0 0 50px;
    margin-bottom: 40px;
    .avatar
    {
      position: absolute;
      top: -15px;
      left: 0;
      border-radius: 50%;
      width: 35px;
      height: 35px;
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
      background-color: #F6F6F6;
      border: 1px solid #DFDFDF;
      max-width: 100%;
      color: #666666;
      &::after
      {
        position: absolute;
        background-color: #F6F6F6;
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
        border-color: #DFDFDF #DFDFDF transparent transparent
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
        border-color: transparent transparent #DFDFDF #DFDFDF
      }
    }
  }
}
.hide_chat_items
{
  display: none;
}
// 聊天结束
.warp_container
{
  position: relative;
  background-color: #fff;
}
.user_background_container
{
  position: relative;
  z-index: 1;
  height: 130px;
  background: linear-gradient(to right, #44C8F6,#94C2FA);
  &::after
  {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    height: 40px;
    margin-top: -20px;
    display: block;
    content: '';
    background: linear-gradient(to right, #44C8F6,#94C2FA);
    border-radius: 50%;
  }
}
.user_info_container
{
  position: relative;
  z-index: 2;
  margin: -80px 12px 0 12px;
  background-color: #fff;
  border-radius: 4px;
  padding: 50px 0 46px;
  box-sizing: border-box;
  box-shadow: 0 5px 15px rgba(0,0,0,.1);
  transition: all .2s linear;
  .invate_user_info_bg
  {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .avatar_img_box
  {
    position:absolute;
    top: -25px;
    left: 50%;
    margin-left: -30px;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    border: 4px solid #fff;
    box-sizing: border-box;
    .avatar_img
    {
      display: block;
      border-radius: 50%;
      
    }
  }
  .introducer_box
  {
    width: 216px;
    margin: 0 auto;
    text-align: justify;
    font-size: 18px;
    background: linear-gradient(to right, #9AC3FA, #45C8F5);
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 600;
  }
}
.title_box
{
  font-size: 18px;
  text-align: center;
  margin-top: 30px;
  font-weight: normal;
  background: linear-gradient(to right, #99C2FA, #45C8F5);
  -webkit-background-clip: text;
  color: transparent;
}
.qr_code_box
{
  position: relative;
  width: 180px;
  margin: 0 auto;
  .qr_code_avatar_img_box
  {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 5px;
    margin: -15px 0 0 -15px;
    padding: 4px;
    display: block;
  }
}
.scan_qr_text
{
  font-size: 12px;
  color: #999;
  text-align: center;
}
.invate_user_service_title
{
  display: block;
  height: 40px;
  width: auto;
  margin: 40px auto;
}
.invate_user_page_bg_box
{
  position: relative;
  margin-top: 40px;
  p
  {
    position: absolute;
    left: 50%;
    bottom: 15px;
    transform: translateX(-50%);
    white-space: nowrap;
    color: #fff;
    font-size: 12px;
  }
  .invate_user_page_bg
  {
    display: block;
    margin: 0;
    width: 100%;
    padding: 0;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 5s;
  width: auto;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  width: 0;
}
</style>
