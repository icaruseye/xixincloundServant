<template>
  <div style="padding:0px 0 80px">
    <xx-go-back></xx-go-back>
    <div class="title_input_container" style="margin-top:10px">
      <label class="title_input_label">标题</label>
      <div class="title_input_box">
        <input class="title_input_contorl" v-model="params.title" placeholder="请输入" type="text">
      </div>
    </div>
    <div class="content_input_container">
      <label class="content_input_label">内容</label>
      <div class="content_input_box">
        <textarea class="content_input_textarea" v-model="params.content" placeholder="请输入"></textarea>
        <span class="content_input_nums_count">{{params.content ? params.content.length : 0}}/10000</span>
      </div>
    </div>
    <div class="attr_box" v-if="attributeListComputed.length > 0">
      <div class="attr_box_title">标签</div>
      <div class="tag_select_contianer" ref="tagSelectContianerRef">
        <div class="tags_checkbox_flex" v-for="(item, index) in attributeListComputed" :key="index">
          <label class="tags_checkbox_box">
            <input type="checkbox" :value="item.name" :checked="item.status" class="tags_checkbox_control">
            <span class="tags_checkbox_label">
              {{item.name}}
            </span>
          </label>
        </div>
      </div>
    </div>
    <div class="cover_box">
      <xx-uploader
      :limit="1"
      title="封面"
      :imgList="initCover"
      @onUpdate="onUpdateCover"
      ></xx-uploader>
    </div>
    <div class="cover_box">
      <xx-uploader
      :limit="4"
      :imgList="initImgs"
      title="相关图片"
      @onUpdate="onUpdateImgs"
      ></xx-uploader>
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
      params: {},
      initCover: '',
      initImgs: '',
      attributeList: []
    }
  },
  computed: {
    articleId () {
      return this.$route.query.id
    },
    attributeListComputed () {
      let list = []
      for (let i = 0; i < this.attributeList.length; i++) {
        let attr = {
          status: false,
          name: this.attributeList[i]
        }
        if (this.params.Attributes.indexOf(this.attributeList[i]) >= 0) {
          attr.status = true
        }
        list.push(attr)
      }
      return list
    }
  },
  created () {
    this.initDetail()
  },
  methods: {
    getCheckedtags () {
      let ckeckedAttrs = document.querySelectorAll('.tags_checkbox_control:checked')
      let checkedAttrStr = ''
      for (let i = 0; i < ckeckedAttrs.length; i++) {
        checkedAttrStr += `${ckeckedAttrs[i].value},`
      }
      return checkedAttrStr.substring(0, checkedAttrStr.lastIndexOf(','))
    },
    initDetail () {
      this.getArticle()
      this.getAttribute()
    },
    getArticle () {
      if (this.articleId) {
        document.title = '修改文章'
        this.$http.get(`/Article?articleId=${this.articleId}`).then(result => {
          if (result.data.Code === 100000) {
            this.initCover = result.data.Data.Cover
            this.initImgs = result.data.Data.Imgs
            this.params = {
              title: result.data.Data.Title,
              content: result.data.Data.Content,
              Cover: result.data.Data.Cover,
              Imgs: result.data.Data.Imgs,
              Attributes: result.data.Data.Attributes
            }
          }
        })
      } else {
        document.title = '新增文章'
        this.params = {
          title: '',
          content: '',
          Cover: null,
          Imgs: '',
          Attributes: ''
        }
      }
    },
    getAttribute () {
      this.$http.get(`/Attribute/UserAttribute/GetAttribute`).then(result => {
        if (result.data.Code === 100000) {
          this.attributeList = result.data.Data
        } else {
          this.$vux.toast.text(result.data.Msg)
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
    onUpdateImgs (val) {
      let imgsStr = ''
      val.map((item) => {
        imgsStr += item + ','
      })
      this.params.Imgs = imgsStr.substring(0, imgsStr.lastIndexOf(','))
    },
    submit () {
      const that = this
      if (this.params.title.length <= 0) {
        this.$vux.toast.text('请输入标题！')
        return false
      }
      if (this.params.content.length <= 0) {
        this.$vux.toast.text('请输入内容！')
        return false
      }
      if (this.params.content.length > 10000) {
        this.$vux.toast.text('内容字数不可超过10000！')
        return false
      }
      if (this.articleId) {
        that.$http.put('/Article', {
          ArticleID: this.articleId,
          title: this.params.title,
          type: 1,
          Content: this.params.content,
          Attributes: this.getCheckedtags(),
          Cover: this.params.Cover,
          Imgs: this.params.Imgs
        }).then(result => {
          if (result.data.Code === 100000) {
            that.$vux.toast.show({
              text: '修改成功',
              onHide () {
                that.$router.push('/article')
              }
            })
          } else {
            this.$vux.toast.text(result.data.Msg)
          }
        })
      } else {
        that.$http.post('/Article', {
          title: this.params.title,
          type: 1,
          Content: this.params.content,
          Attributes: '',
          Cover: this.params.Cover,
          Imgs: this.params.Imgs
        }).then(result => {
          if (result.data.Code === 100000) {
            that.$vux.toast.show({
              text: '新增成功',
              onHide () {
                that.$router.push('/article')
              }
            })
          } else {
            this.$vux.toast.text(result.data.Msg)
          }
        })
      }
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
.cover_box
{
  padding: 12px;
  background-color: #fff;
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
.attr_box
{
  background-color: #fff;
  padding: 12px;
  .attr_box_title
  {
    font-size: 14px;
    color: #999;
  }
}
  .tag_select_contianer
  {
    margin-top: 10px;
    display: flex;
    align-content: space-around;
    flex-flow: wrap;
    .tags_checkbox_flex
    {
      display: flex;
      align-content: center;
      align-items: center;
      padding: 0 5px;
      height: 35px;
      .tags_checkbox_box
      {
        position: relative;
        .tags_checkbox_control
        {
          position: absolute;
          visibility: hidden;
          &:checked + .tags_checkbox_label
          {
            background-color: rgba(59, 199, 245, .2);
            color: #3AC7F5
          }
        }
        .tags_checkbox_label
        {
          display: block;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          color: #999;
          background-color: #F6F6F6;
          border-radius: 13px;
          padding: 0 13px;
          white-space: nowrap;
        }
      }
    }
  }
</style>
