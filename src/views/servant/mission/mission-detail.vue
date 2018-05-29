<template>
  <div class="wrap">
    <div class="mission-title">服务项</div>
    <mission-info></mission-info>
    <div class="weui-form">
      <mission-step></mission-step>
      <div class="row">
        <div class="title">服务结果</div>
        <div style="padding:0 15px;"><textarea name="" ></textarea></div>
      </div>
      <uploader
        title="病情照片"
        :limit="1"
        :maxSize="1024 * 1024 * 5"
        textColor='#3ecccc'
        :imgList="imgList1"
        @onUpdate="onUpdate1"
      ></uploader>
      <div class="weui-cell">
        <button type="button" class="weui-btn weui-btn_primary">完成任务</button>
      </div>
    </div>
  </div>
</template>

<script>
import uploader from '@/components/common/uploader'
import missionInfo from '@/views/servant/mission/mission-info-box'
import missionStep from '@/views/servant/mission/mission-step'
export default {
  components: {
    uploader,
    missionInfo,
    missionStep
  },
  data () {
    return {
      step1: false,
      imgList1: []
    }
  },
  methods: {
    onUpdate1 (id) {
      console.log(id)
    }
  }
}
</script>

<style lang="less" scoped>

.wrap {
  background: #fff;
  min-height: 100vh;
}

.weui-form {
  .row {
    position: relative;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #d9f7f5;
      color: #d9f7f5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
    &:first-child::before {
      display: none;
    }
    .title {
      padding: 13px 15px;
      font-size: 14px;
      color: #3ecccc;
    }
    textarea {
      resize: none;
      width: 100%;
      box-sizing: border-box;
      min-height: 100px;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #f7f7f7;
    }
  }
  .weui-uploader__hd {
    color: #3ecccc;
  }
}

</style>
