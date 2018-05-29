<template>
  <div class="wrap">
    <div class="mission-title">服务项</div>
    <div class="mission-info-box">
      <div class="icon"><img src="@/assets/servant/calendar-cate-1.png"></div>
      <div class="name">换药测试-换药</div>
      <div class="custom">服务对象：医师啊 <img src="/Content/img/ic_iphone.png"></div>
      <div class="mark">
          <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta">不需要准备工具</li>
            <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">不需要准备药品</li>
          </ul>
      </div>
      <div class="address"><img src="/Content/img/ic_address.png"><a href="javascript:;">四川省成都市锦江区哈哈哈哈啊哈</a></div>
      <div class="time">
        <div>申请执行时间</div>
        <div>
          <span>2018-05-11 19:05</span>至<span>2018-05-11 21:05</span>间开始执行
        </div>
      </div>
      <div class="btn"><a href="javascript:;" class="weui-btn weui-btn_primary showimg" id="pb">查看相关图片</a></div>
    </div>
    <div class="weui-form">
      <group title="">
        <datetime v-model="minuteListValue" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" placeholder="请选择" title="与用户沟通的到达时间"></datetime>
      </group>
      <div class="weui-cell-form-title">服务备注（该内容患者不可见）</div>
      <div class="weui-cell nobor">
        <textarea name=""></textarea>
      </div>
    </div>
    <div class="btn-bar">
      <button type="button" class="weui-btn weui-btn_primary">取消任务</button>
      <button type="button" class="weui-btn weui-btn_primary">生成任务</button>
    </div>
  </div>
</template>

<script>
import { Group, Datetime } from 'vux'
export default {
  components: {
    Group,
    Datetime
  },
  data () {
    return {
      step1: false,
      minuteListValue: ''
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  background: #fff;
  min-height: calc(100vh - 50px);
  padding-bottom: 50px;
}

.mission-title {
  padding: 15px 0;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.mission-info-box {
  padding-top: 12px;
  margin: 0 12px 12px 12px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 0 15px #ecf8f8;
  .icon {
    width: 45px;
    height: 45px;
    margin: 5px auto 10px;
    img {
      width: 100%;
    }
  }
  .name {
    color: #333;
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 15px;
  }
  .custom {
    margin-bottom: 5px;
    color: #999;
    font-size: 12px;
    display: flex;
    align-content: center;
    justify-content: center;
    img {
      width: 20px;
      height: auto;
      margin-left: 3px;
      position: relative;
      top: -1px;
    }
  }
  .mark {
    font-size: 12px;
    margin-bottom: 5px;
    .weui-media-box__info {
      display: flex;
      justify-content: center;
      color: #e25959;
      padding: 0;
    }
  }
  .address {
    color: #6bc9cb;
    font-size: 14px;
    margin-bottom: 10px;
    a {
      color: #6bc9cb;
      text-decoration: underline;
    }
    img {
      width: auto;
      height: 12px;
      margin-right: 2px;
    }
  }
  .time {
    font-size: 12px;
    color: #999;
    padding: 10px 0;
    border-top: 1px dotted #f5f5f5;
    span {
      font-size: 14px;
      color: #333;
      margin: 0 2px;
    }
  }
  .btn {
    padding: 10px 0;
    border-top: 1px dotted #f5f5f5;
    .weui-btn {
      padding: 0;
      width: 115px;
      height: 35px;
      line-height: 36px;
      border-radius: 3px;
      background: #6bc9cb;
      font-size: 14px;
      text-align: center;
      margin: 0 auto;
    }
  }
}

.weui-form {
  .weui-cell-form-title {
    color: #666;
  }
  textarea {
    resize: none;
    width: 100%;
    min-height: 100px;
    padding: 10px;
    font-size: 14px;
    box-sizing: border-box;
    border: 1px solid #f5f5f5;
  }
}

.btn-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  .weui-btn:nth-child(1) {
    background: #ffc349
  }
  .weui-btn:nth-child(2) {
    background: #67c4f0
  }
}
</style>
