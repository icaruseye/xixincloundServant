<template>
  <div class="wrap_container">
    <div class="userInfo_container">
      <div class="user_avatar_container">
        <img class="avatar" :src="userAccount.Avatar | transformImgUrl" alt="">
      </div>
      <h3 class="nickName">
        {{userInfo.RealName}}
      </h3>
      <p class="desc">{{userAccount.Description | stringSub(85)}}</p>
    </div>
    <div class="qr_code_box">
      <img :src="`${API_PATH}/QrCodeToUser/?servantID=${userAccount.ID}`" alt="">
    </div>
    <p class="hint_desc">扫一扫二维码，可加我为好友</p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Qrcode } from 'vux'
export default {
  components: {
    Qrcode
  },
  filters: {
    stringSub (value = '', len) {
      return value.length > len ? value.substring(0, len) + '…' : value
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo'
    ]),
    API_PATH () {
      return process.env.API_PATH
    }
  }
}
</script>
<style lang="less" scoped>
.wrap_container
{
  padding: 25px 20px;
}
.qr_code_box
{
  position: relative;
  margin: 0 auto;
  width: 200px;
  height: 200px;
  margin-top: 10px;
  overflow: hidden;
  img {
    position: relative;
    z-index: 2;
  }
}

.qr_code_box::before
{
  position: absolute;
  display: block;
  content: '';
  width: 200%;
  height: 200%;
  border: 1px solid RGBA(58, 199, 245, .5);
  transform-origin: 0 0;
  transform: scale(0.5, 0.5);
  box-sizing: border-box;
  border-radius: 10px;
  z-index: 1;
}
.userInfo_container
{
  .avatar
  {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 auto;
  }
  .nickName
  {
    text-align: left;
    color: #333;
    font-weight: normal;
    font-size: 18px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    margin-top: 10px;
    .actor
    {
      display: inline-block;
      color: #666;
      font-size: 14px;
      margin-left: 15px;
    }
  }
  .desc
  {
    margin-top: 10px;
    font-size: 12px;
    color: #999;
    line-height: 20px;
    text-align: justify
  }
}
.hint_desc
{
  font-size: 14px;
  color: #999;
  margin-top: 15px;
}
</style>


