<template>
  <div class="has-tabbar">
    <div class="title_input_container" style="margin-top:10px">
      <label class="title_input_label">标题</label>
      <div class="title_input_box">
        <input class="title_input_contorl" v-model="params.title" placeholder="请输入" type="text">
      </div>
    </div>
    <div class="content_input_container">
      <label class="content_input_label">描述</label>
      <div class="content_input_box">
        <textarea class="content_input_textarea" v-model="params.content" placeholder="请输入"></textarea>
        <span class="content_input_nums_count">{{params.content ? params.content.length : 0}}/100</span>
      </div>
    </div>
    <div>
      <div class="title_text_container">
        <label class="title_text_label">推送类型</label>
        <div class="title_text_box" @click="selectPushType = true">请选择<i class="iconfont icon-jiantouyou"></i></div>
      </div>
      <div class="title_text_container">
        <label class="title_text_label">推送名称</label>
        <div class="title_text_box">请选择<i class="iconfont icon-jiantouyou"></i></div>
      </div>
      <div class="title_text_container">
        <label class="title_text_label">推送时间</label>
        <div class="title_text_box">2018/08/25 14:00<i class="iconfont icon-jiantouyou"></i></div>
      </div>
      <div class="title_text_container">
        <label class="title_text_label">推送类型</label>
        <div class="title_text_box" style="display: flex;flex-direction: row-reverse;align-items: center;">
          <i class="iconfont icon-jiantouyou"></i>
          <span style="margin-left:5px;">7人</span>
          <div class="push-list">
            <img src="https://tva1.sinaimg.cn/crop.0.0.180.180.180/5e9d399fjw1e8qgp5bmzyj2050050aa8.jpg" alt="">
            <img src="https://tvax3.sinaimg.cn/crop.0.0.512.512.180/006wZ05Mly8fl3xxdhh8cj30e80e8t8u.jpg" alt="">
            <img src="https://tva4.sinaimg.cn/crop.0.0.180.180.180/622ddd17jw1e8qgp5bmzyj2050050aa8.jpg" alt="">
            <img src="https://tvax1.sinaimg.cn/crop.0.0.512.512.180/0061fIkkly8fnt4zg3d5lj30e80e8glm.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="weui-btn weui-btn_primary">提交</button>
    <!-- 选择推送类型 -->
    <div v-transfer-dom
      :should-rerender-on-show="true"
      max-height="50%">
      <popup v-model="selectPushType" class="type-popup">
        <div class="type-list">
          <div class="item">文章</div>
          <div class="item">服务</div>
        </div>
        <div class="cancel">取消</div>
      </popup>
    </div>
  </div>
</template>

<script>
import { TransferDom, Popup, Checker, CheckerItem } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Checker,
    CheckerItem
  },
  data () {
    return {
      selectPushType: false,
      params: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    async getWalletLog () {
      const res = await this.$http.get(`/WalletLog?id=${this.id}`)
      if (res.data.Code === 100000) {
      }
    }
  }
}
</script>


<style lang="less" scoped>
.weui-btn {
  position: fixed;
  bottom: 0;
}
.title_input_container
{
  display: flex;
  width: 100%;
  flex-flow: nowrap;
  background-color: #fff;
  height: 57px;
  padding-right: 13px;
  box-sizing: border-box;
  border-bottom: 1px solid RGBA(0, 180, 171, .1);
  .title_input_label
  {
    display: flex;
    align-items: center;
    flex: 0 0 55px;
    font-size: 14px;
    color: #666;
    padding-left: 12px;
  }
  .title_input_box
  {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .title_input_contorl
    {
      width: 100%;
      box-sizing: border-box;
      height: 33px;
      background-color: #F6F6F6;
      border-radius: 2px;
      padding: 0 13px;
      font-size: 13px;
    }
  }
}
.content_input_container
{
  padding: 0 12px 5px;
  background-color: #fff;
  .content_input_label
  {
    height: 40px;
    line-height: 40px;
    color: #666666;
    font-size: 14px;
  }
  .content_input_box
  {
    position: relative;
    height: 130px;
    background-color: #F6F6F6;
    border-radius: 2px;
    .content_input_textarea
    {
      border: none;
      background-color: #F6F6F6;
      resize: none;
      width: 100%;
      height: 100px;
      box-sizing: border-box;
      padding: 10px 14px;
      font-size: 13px;
      color: #999;
    }
    .content_input_nums_count
    {
      position: absolute;
      right: 14px;
      bottom: 14px;
      font-size: 12px;
      color: #999;
    }
  }
}
.title_text_container {
  display: flex;
  align-items: center;
  padding: 20px 12px 12px 12px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 180, 171, 0.1);
  &:last-child {
    border: 0;
  }
  .title_text_label {
    font-size: 14px;
    color: #666;
  }
  .title_text_box {
    flex: 1;
    text-align: right;
    font-size: 12px;
    color: #999;
    .iconfont {
      margin-left: 5px;
      font-size: 12px;
    }
  }
}
.push-list {
  display: flex;
  img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: -10px;
  }
}
.type-popup {
  color: #666;
  .type-list {
    .item {
      position: relative;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      text-align: center;
      background-color: #fff;
      &::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        pointer-events: none;
        box-sizing: border-box;
        border: 1px solid #eee;
      }
    }
  }
  .cancel {
    margin-top: 10px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    background-color: #fff;
  }
}
</style>