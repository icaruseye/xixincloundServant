<template>
  <div>
    <div class="weui-form">
      <uploader
        title="执业证照片"
        :limit="2"
        :maxSize="1024 * 1024 * 2"
        :imgList="imgList1"
        @onUpdate="onUpdate1"
      ></uploader>
    </div>
    <div class="weui-form-title">
      *执业证信息
    </div>
    <div class="weui-form step-form">
      <div class="weui-cell nobor">
        <div class="weui-cell-top">
          <label for="">执业证编号</label>
          <input type="text" placeholder="输入执业证编号">
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell-top">
          <label for="">首次注册日期</label>
          <datetime class="datetime" v-model="date" format="YYYY-MM-DD" placeholder="请选择日期"></datetime>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
    </div>
    <div class="step-btn">
      <button class="weui-btn">提交</button>
    </div>
  </div>
</template>

<script>
import uploader from '@/components/common/uploader'
import { Group, Datetime } from 'vux'
export default {
  components: {
    uploader,
    Group,
    Datetime
  },
  data () {
    return {
      date: '',
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
.weui-form-title {
  padding: 10px 24px;
  color: #D4D4D4;
  font-size: 14px;
}

.step-form {
  &.weui-form {
    & > .weui-cell {
      padding: 30px 15px 15px;
      .weui-cell-top {
        padding: 0 9px;
        input {
          margin-left: 100px;
          overflow: hidden;
          color: #757575;
        }
        ::-webkit-input-placeholder {
          color: #ccc;
        }
        .iconfont {
          color: #ccc;
        }
        .datetime {
          flex: 1;
          margin-left: 100px;
          overflow: hidden;
          color: #757575;
          .vux-datetime-value {
            .vux-cell-placeholder {
              color: #ccc;
            }
          }
        }
      }
      &::before {
        border-color: #ccc;
        left: 15px;
        right: 15px;
        opacity: .5;
      }
    }
  }
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
