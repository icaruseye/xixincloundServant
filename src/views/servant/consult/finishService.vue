<template>
  <div class="container">
    <div class="item_box">
        <h4 class="item_title">服务结果</h4>
        <div class="mt10px text-area_contianer">
          <textarea v-model="result" placeholder="请输入文本" style="height:100px" @keyup="checkResult"></textarea>
          <span v-if="resultError" class="error_box">{{resultError}}</span>
          <span class="textArea_limit_count">{{result.length}} / 500</span>
        </div>
      </div>
      <div class="item_box">
        <h4 class="item_title">备注 <span style="font-size:12px;color:#999">（用户不可见）</span></h4>
        <div class="mt10px text-area_contianer">
          <textarea v-model="remark" placeholder="请输入文本" style="height:65px"></textarea>
          <span v-if="remarkError" class="error_box">{{remarkError}}</span>
          <span class="textArea_limit_count">{{remark.length}} / 200</span>
        </div>
      </div>
      <div class="item_box">
        <h4 class="item_title">服务相关图片</h4>
        <div class="mt10px">  
          <xx-uploader
            class="upload"
            :maxSize="1024 * 1024 * 5"
            :limit="4"
            @onUpdate="onUpdate"
          ></xx-uploader>
        </div>
      </div>
      <div class="btn_bar">
        <button class="btn blue" @click="submit">确认</button>
        <button class="btn gray" @click="redirectUrlToDetail">取消</button>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      result: '',
      resultError: null,
      remark: '',
      remarkError: null,
      imgs: ''
    }
  },
  computed: {
    ID () {
      return this.$route.params.id || ''
    }
  },
  methods: {
    submit () {
      if (!this.checkResult()) return false
      if (!this.checkRemark()) return false
      this.putConsult().then(result => {
        console.log(result)
        if (result.Code === 100000) {
          this.redirectUrlToDetail()
        } else {
          this.$vux.toast.text('提交服务结果失败')
        }
      })
    },
    async putConsult () {
      const res = await this.$http.put(`/Consult?id=${this.ID}`, {
        ServiceResult: this.result,
        Remark: this.remark,
        Img: this.imgs
      })
      return res.data
    },
    // 验证服务结果
    checkResult () {
      if (this.result.length <= 0) {
        this.resultError = '请输入服务结果'
        return false
      }
      if (this.result.length > 500) {
        this.resultError = '服务结果字数不可超过500字'
        return false
      }
      this.resultError = null
      return true
    },
    // 验证备注
    checkRemark () {
      if (this.remark.length > 200) {
        this.remarkError = '备注字数不可超过200字'
        return false
      }
      this.remarkError = null
      return true
    },
    redirectUrlToDetail () {
      this.$router.replace(`/consult/${this.ID}/detail`)
    },
    /**
     * 图片上传回调
     */
    onUpdate (value) {
      let imgsStr = ''
      value.map((item) => {
        imgsStr += item + ','
      })

      this.imgs = imgsStr.substring(0, imgsStr.lastIndexOf(','))
    }
  }
}
</script>
<style lang="less" scoped>
.container
{
  min-height: 100vh;
  background-color: #fff;
  padding: 40px 0 20px 0;
  box-sizing: border-box
}
.title {
  color: #333;
  font-size: 18px;
  text-align: center;
  padding: 0 0 12px 0;
  font-weight: 550;
}
.item_box
{
  padding: 10px 20px;
  margin-bottom: 20px;
}
.item_title
{
  font-weight: normal;
  font-size: 15px;
  color: #333;
}
.text-area_contianer
{
  position: relative;
  border: 1px solid #E6F9F8;
  border-radius: 4px;
  padding-bottom: 20px;
  textarea
  {
    border: none;
    background-color: #fff;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    outline: none;
    font-size: 14px;
    color: #999;
    text-align: justify;
    resize: none;
  }
  .error_box,
  .textArea_limit_count
  {
    position: absolute;
    bottom: 0;
    padding: 0 15px;
    display: block;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }
  .error_box
  {
    left: 0;
    color: #ff3939;
  }
  .textArea_limit_count
  {
    right: 0;
    color: #999;
  }
}
.btn_bar
{
  display: flex;
  flex-flow: nowrap;
  height: 40px;
  margin: 0 40px;
  justify-content: center;
  .btn {
    border-radius: 20px;
    font-size: 18px;
    display: block;
    text-align: center;
    border: 0;
    width: 120px;
    color: #fff;
    outline: none;
    &.blue {
      background: #3ac7f5;
      margin-right: 20px;
    }
    &.gray {
      background: #ccc;
    }
  }
}
</style>

