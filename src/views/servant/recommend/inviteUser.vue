<template>
  <div class="warp_container">
    <div class="user_background_container"></div>
    <div class="user_info_container">
      <img class="avatar_img" :src="userAccount.Avatar | transformImgUrl" alt="">
      <h1 class="real_name_box">{{userInfo.RealName}}</h1>
      <p class="shop_name_box">{{shopName}}</p>
      <p class="user_desc">
        <i class="iconfont pre_icon icon-yinyong"></i>
        {{userAccount.Description || '好像还没有填写自我介绍啊！'}}
        <i class="iconfont next_icon icon-yinyong1"></i>
      </p>
      <img class="invate_user_info_bg" src="@/assets/images/invate_user_info_bg.png" alt="">
    </div>

    <h2 class="title_box">
      {{userInfo.RealName}}愿竭尽所能为您服务
    </h2>
    <div class="qr_code_box">
      <!-- <div class="qr_code_avatar_img_box">
        <img class="qr_code_avatar_img" :src="userAccount.Avatar | transformImgUrl" alt="">
      </div> -->
      <img :src="`${API_PATH}/QrCodeToUser/?servantID=${userAccount.ID}`" alt="">
    </div>
    <p class="scan_qr_text">长按识别二维码，绑定我</p>

    <img class="invate_user_service_title" src="@/assets/images/invate_user_service_title.png" alt="">

    <ul class="service_list">
      <li class="service_items_container">
        <img class="service_items_icon" :src="2 | xxMissionTypeIconFilter">
        <h4 class="service_items_title">1、图文咨询</h4>
        <p class="service_items_desc">有任何问题，可在平台向您的服务者发起咨询</p>
      </li>
      <li class="service_items_container">
        <img class="service_items_icon" :src="1 | xxMissionTypeIconFilter">
        <h4 class="service_items_title">2.上门服务</h4>
        <p class="service_items_desc">您可以选择提供普通换药、PICC换药、尿管 护理、胃管护理等项目的上门服务</p>
      </li>
      <li class="service_items_container">
        <img class="service_items_icon" :src="3 | xxMissionTypeIconFilter">
        <h4 class="service_items_title">3.院内陪诊</h4>
        <p class="service_items_desc">您可设置您可以陪诊的医院，如：四川省华西医院、四川省人民医院等，用户如有您设置医院的陪诊需求，可直接下单。</p>
      </li>
    </ul>

    <div class="invate_user_page_bg_box">
      <p>长按或扫一扫可识别二维码，绑定我</p>
      <img class="invate_user_page_bg" src="@/assets/images/invate_user_page_bg.png" alt="">
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {}
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
    }
  }
}
</script>
<style lang="less" scoped>
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
  background: linear-gradient(to right, #BEF3CA,#41CCCB);
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
    background: linear-gradient(to right, #BEF3CA,#41CCCB);
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
  padding: 30px 0 40px;
  box-sizing: border-box;
  .invate_user_info_bg
  {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .avatar_img
  {
    position:absolute;
    top: 25px;
    right: 25px;
    display: block;
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }
  .real_name_box
  {
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    padding: 0 0 0 20px;
  }
  .shop_name_box
  {
    font-size: 14px;
    color: #999;
    text-align: left;
    padding: 0 0 0 20px;
  }
  .user_desc
  {
    position: relative;
    font-size: 12px;
    color: #999;
    padding: 10px 20px;
    margin: 10px 20px 0;
    text-align: justify;
    .pre_icon,
    .next_icon
    {
      position: absolute;
      color: #ddd;
    }
    .pre_icon
    {
      left: 0;
      top: 0;
    }
    .next_icon
    {
      right: 0;
      bottom: 0;
    }
  }
}
.title_box
{
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  font-weight: normal;
  background: linear-gradient(to right, #6AE3D1, #99EBBB);
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
.service_list
{
  padding: 20px 20px 0;
  .service_items_container
  {
    position: relative;
    padding-left: 60px;
    min-height: 40px;
    margin-bottom: 40px;
    .service_items_icon
    {
      display: block;
      width: 30px;
      height: 30px;
      position: absolute;
      left: 0;
      top: 10px;
    }
    .service_items_title
    {
      font-weight: normal;
      font-size: #333;
      font-size: 18px;
    }
    .service_items_desc
    {
      margin-top: 5px;
      border-top: 1px dotted #ddd;
      padding-top: 14px;
      font-size: 14px;
      color: #999;
      text-align: justify;
    }
  }
}
</style>
