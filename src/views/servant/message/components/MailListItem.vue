<template>
  <div class="main_item_container" @click="showMessageDialog = true">
    <div class="left">
      <img class="icon_img" src="@/assets/images/app-yhgl.png" alt="">
    </div>
    <div class="right">  
      <h3 class="title text-overflow-1">
        {{title}}
      </h3>
      <p class="desc text-overflow-1"><slot></slot></p>
      <span class="time">{{time}}</span>
      <i class="mail_num_icon" v-if="count != null">{{count}}</i>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showMessageDialog" :hide-on-blur="true">
        <div style="padding: 20px;">
          <h2 style="font-size: 16px;font-weight: normal;text-align:left">{{title}}</h2>
          <p style="text-align: justify;font-size:14px;color:#999;margin-top:10px">
            <slot></slot>
          </p>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import { XDialog, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog
  },
  props: {
    title: '',
    count: null,
    time: ''
  },
  data () {
    return {
      showMessageDialog: false
    }
  },
  methods: {
    showMessage () {

    }
  }
}
</script>
<style lang="less" scoped>
.main_item_container
{
  position: relative;
  display: flex;
  flex-flow: nowrap;
  height: 70px;
  background-color: #fff;
  .left
  {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 58px;
    .icon_img
    {
      height: 30px;
      width: 30px;
      border-radius: 15px;
    }
  }
  .right
  {
    position: relative;
    display: flex;
    flex: 1;
    flex-flow: column;
    justify-content: center;
    padding-right: 110px;
    .title
    {
      color: #333;
      font-size: 16px;
      width: 100%;
      font-weight: normal;
      height: 24px;
      line-height: 24px;
    }
    .desc
    {
      font-size: 12px;
      color: #999;
      height: 20px;
      line-height: 20px;
    }
    .time
    {
      position: absolute;
      right: 10px;
      top: 15px;
      font-size: 12px;
      color: #999;
      line-height: 24px;
    }
    .mail_num_icon
    {
      position: absolute;
      padding: 0 5px;
      height: 16px;
      display: block;
      font-style: normal;
      background-color: #e7534a;
      border-radius: 8px;
      font-size: 12px;
      color: #fff;
      text-align: center;
      line-height: 16px;
      right: 10px;
      top: 40px;
    }
  }
}
.main_item_container::after
{
  position: absolute;
  content: '';
  display: block;
  height: 1px;
  bottom: 0;
  left: 12px;
  right: 12px;
  background-color: RGBA(0, 180, 171, .2);
  transform: scaleY(.5)
}
.main_item_container:last-child:after
{
  display: none;
}
</style>

