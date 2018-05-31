<template>
  <div>
    <step-bar :list="stepInfo"></step-bar>
    <div class="weui-form step-form">
      <div class="weui-cell nobor">
        <div class="weui-cell-top">
          <label class="label" for="">姓名</label>
          <input type="text" placeholder="请输入姓名">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell-top">
          <label class="label" for="">身份证号码</label>
          <input type="text" placeholder="请输入身份证号码">
        </div>
      </div>
    </div>
    <div class="weui-form-title">
      *上传身份证正反面照片
    </div>
    <div class="weui-form">
      <uploader
        title="身份证正面"
        :limit="1"
        :maxSize="1024 * 1024 * 4"
        :imgList="imgList1"
        @onUpdate="onUpdate1"
      ></uploader>
      <uploader
        title="身份证背面"
        :limit="1"
        :maxSize="1024 * 1024 * 2"
        :imgList="imgList2"
        @onUpdate="onUpdate2"
      ></uploader>
    </div>
    <div class="step-btn">
      <button class="weui-btn">确定</button>
    </div>
  </div>
</template>

<script>
import stepBar from './user-auth-stepbar'
import uploader from '@/components/common/uploader'
export default {
  components: {
    stepBar,
    uploader
  },
  data () {
    return {
      stepInfo: [{
        text: '手机认证',
        type: 1
      }, {
        text: '实名认证',
        type: 1
      }, {
        text: '执业认证',
        type: 0
      }, {
        text: '开始服务',
        type: 0
      }],
      imgList1: [],
      imgList2: []
    }
  },
  methods: {
    onUpdate1 (id) {
      console.log(id)
    },
    onUpdate2 (id) {
      console.log(id)
    }
  }
}
</script>

<style lang="less" scoped>
.step-form {
  margin-top: 10px;
  &.weui-form {
    .weui-cell {
      padding: 30px 15px 15px;
      &::before {
        border-color: #ccc;
        left: 15px;
        right: 15px;
        opacity: .5;
      }
    }
    .weui-cell-top {
      padding: 0 9px;
      input::-webkit-input-placeholder {
        color: #ccc
      }
    }
  }
}

.weui-form-title {
  padding: 10px 24px;
  color: #D4D4D4;
  font-size: 14px;
}

.step-btn {
  position: fixed;
  bottom: 23px;
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  .weui-btn {
    padding: 0;
    background: #3BC8F6;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 16px;
  }
}
</style>
