<template>
  <div style="padding:10px 0 80px">
    <div class="title_input_container">
      <label class="title_input_label">标题</label>
      <div class="title_input_box">
        <input class="title_input_contorl" v-model="params.title" placeholder="请输入" type="text">
      </div>
    </div>
    <div class="content_input_container">
      <label class="content_input_label">内容</label>
      <div class="content_input_box">
        <textarea class="content_input_textarea" v-model="params.content" placeholder="请输入"></textarea>
        <span class="content_input_nums_count">{{params.content.length}}/10000</span>
      </div>
    </div>
    <div class="title_input_container">
      <label class="title_input_label">标签</label>
      <div class="title_input_box">
        <span></span>
      </div>
    </div>
    <div class="title_input_container">
      <label class="title_input_label" style="flex:0 0 80px">更换封面</label>
      <div class="title_input_box">
      </div>
    </div>
    <div class="title_input_container">
      <label class="title_input_label" style="flex:0 0 100px">上传相关图片</label>
      <div class="title_input_box">
      </div>
    </div>
    <div class="btn_bar">
      <button class="btn" @click="submit">确认</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      params: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    submit () {
      this.$http.post('/Article', {
        Title: this.params.title,
        Content: this.params.content,
      }).then(result => {
        
      })
    }
  }
}
</script>

<style lang="less" scoped>
.title_input_container
{
  display: flex;
  width: 100%;
  flex-flow: nowrap;
  background-color: #fff;
  height: 57px;
  padding-right: 13px;
  box-sizing: border-box;
  border-bottom: 1px solid RGBA(0, 180, 171, .2);
  .title_input_label
  {
    display: flex;
    align-items: center;
    flex: 0 0 55px;
    font-size: 16px;
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
  padding: 0 12px 23px;
  background-color: #fff;
  border-bottom: 1px solid RGBA(0, 180, 171, .2);
  .content_input_label
  {
    height: 40px;
    line-height: 40px;
    color: #666666;
    font-size: 16px;
  }
  .content_input_box
  {
    position: relative;
    height: 182px;
    background-color: #F6F6F6;
    border-radius: 2px;
    .content_input_textarea
    {
      border: none;
      background-color: #F6F6F6;
      resize: none;
      width: 100%;
      height: 140px;
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
.btn_bar
{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 52px;
  .btn
  {
    border: none;
    color: #fff;
    flex: 1;
    font-size: 18px;
    background-color: #3AC7F5;
  }
}
</style>
