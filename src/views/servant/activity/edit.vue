<template>
  <div class="wrapper has-tabbar">
    <div class="content_input_container" style="margin-top: 10px;padding-top:10px">
      <xx-uploader
        :limit="1"
        title="活动封面"
        :imgList="initCover"
        @onUpdate="onUpdateCover">
      </xx-uploader>
    </div>
    <div class="content_input_container">
      <label class="content_input_label">活动介绍</label>
      <div class="content_input_box">
        <textarea class="content_input_textarea" v-model="params.Describe" placeholder="请输入"></textarea>
        <span class="content_input_nums_count">{{params.Describe ? params.Describe.length : 0}}/100</span>
      </div>
    </div>
    <div class="content_input_container">
      <label class="content_input_label">活动详情</label>
      <div class="content_input_box">
        <textarea class="content_input_textarea" v-model="params.Describe" placeholder="请输入"></textarea>
        <span class="content_input_nums_count">{{params.Describe ? params.Describe.length : 0}}/100</span>
      </div>
    </div>
    <div class="content_input_container" style="padding-top:10px">
      <xx-uploader
        title="活动介绍图片"
        :limit="1"
        :imgList="initIntroImgs"
        @onUpdate="onUpdateCover">
      </xx-uploader>
    </div>
    <div class="title_text_container">
      <label class="title_text_label">活动时间</label>
      <div class="title_text_box" @click="selectDateTime">{{params.PushTime || '请选择活动时间'}}<i class="iconfont icon-jiantouyou"></i></div>
    </div>
    <div class="title_text_container">
      <label class="title_text_label">报名时间</label>
      <div class="title_text_box" @click="selectDateTime">{{params.PushTime || '请选择报名时间'}}<i class="iconfont icon-jiantouyou"></i></div>
    </div>
    <!-- 添加服务 -->
    <div class="serviceItem_list">
      <div class="serviceItem_list_item">
        <img src="https://tvax1.sinaimg.cn/crop.0.0.473.473.180/78258c21ly8ft5x6jpwepj20d50d5wec.jpg" alt="" class="icon">
        <div class="content">
          <div class="title">图文问诊</div>
          <div class="price">￥199元</div>
        </div>
        <span class="count">X1</span>
      </div>
    </div>
    <router-link class="serviceItem_list_item_add" to="/app/activity/addServiceItem">+ 添加服务</router-link>
    <button type="button" class="weui-btn weui-btn_primary weui-btn-bottom" @click="submit">提交</button>
  </div>
</template>

<script>
import util from '@/plugins/util'
export default {
  data () {
    return {
      initCover: '',
      initIntroImgs: '',
      params: {
        Title: '',
        Describe: '',
        PushTime: '',
        Cover: ''
      }
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    // 寻找推送时间
    selectDateTime () {
      const that = this
      this.$vux.datetime.show({
        value: this.params.PushTime,
        format: 'YYYY-MM-DD HH:mm',
        startDate: util.timeFormatFilter(new Date(), 'YYYY-MM-DD'),
        onConfirm (value) {
          that.params.PushTime = value
        }
      })
    },
    onUpdateCover (val) {
      if (val.length > 0) {
        this.params.Cover = val[0]
      } else {
        this.params.Cover = null
      }
    },
    submit () {

    }
  }
}
</script>

<style lang="less" scoped>
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
    border-radius: 4px;
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

.serviceItem_list {
  background: #fff;
  padding: 0 10px;
  align-items: center;
  border-bottom: 1px solid RGBA(0, 180, 171, .1);
  .serviceItem_list_item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid RGBA(0, 180, 171, .1);
    &:last-child {
      border: 0;
    }
    .icon {
      margin-right: 10px;
      width: 29px;
      height: 29px;
      border-radius: 4px;
    }
    .content {
      flex: 1;
      .title {
        font-size: 15px;
        color: #666;
        font-weight: bold;
      }
      .price {
        color: #FF5F5F;
        font-size: 15px;
      }
    }
    .count {
      font-size: 15px;
      color: #999;
    }
  }
}
.serviceItem_list_item_add {
  display: block;
  margin-bottom: 20px;
  height: 48px;
  line-height: 48px;
  background: #fff;
  text-align: center;
  font-size: 15px;
  color: #3AC7F5;
}
</style>
