<template>
  <div>
    <xx-go-back v-if="detail" :url="`/systemMail/${detail.Type}/list`"></xx-go-back>
    <div v-if="detail">
      <div class="detail_top_container">
        {{detail.Type | xxSiteNoticeTypeTitleFilter}}
      </div>
      <div class="detail_content_bg"></div>
      <div class="detail_content_container">
        <div class="detail_Title_contianer">
          <h1 class="detaile_title">
            {{detail.Title}}
          </h1>
          <p class="create_time">
            {{detail.CreateTime | xxTimeFormatFilter}}
          </p>
        </div>
        <div class="detail_message_container">
          {{detail.Message}}
          <!-- <div class="btn_container">
            <button @click="goback" class="go_back_btn">返回</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    ID () {
      return this.$route.params.id
    }
  },
  data () {
    return {
      detail: null
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.$vux.loading.show('加载中')
      this.$http.get(`/SiteNoticeList/Detail?id=${this.ID}`).then(result => {
        this.$vux.loading.hide()
        if (result.data.Code === 100000) {
          this.detail = result.data.Data
        }
      })
    },
    goback () {
      this.$router.push(`/systemMail/${this.detail.Type}/list`)
    }
  }
}
</script>
<style lang="less" scoped>
  .detail_top_container
  {
    height: 50px;
    padding: 20px 10px 0;
    color: #fff;
    line-height: 50px;
    font-size: 18px;
    background-color: rgba(58, 199, 245, .7)
  }
  .detail_content_bg
  {
    height: 80px;
    background: linear-gradient(rgba(58, 199, 245, .7), rgba(0,0,0,0));
  }
  .detail_content_container
  {
    margin-top: -80px;
    padding-bottom: 40px;
  }
  .detail_Title_contianer
  {
    position: relative;
    background-color: #fff;
    padding: 30px 20px 10px;
    margin: 0 10px;
    &::after
    {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      display: block;
      content: '';
      height: 1px;
      background-color: rgba(0,0,0,.1);
      transform: scaleY(.5)
    }
    .detaile_title
    {
      font-size: 16px;
      color: #333;
      text-align: justify;
    }
    .create_time
    {
      font-size: 14px;
      margin-top: 5px;
      color: #999
    }
  }
  .detail_message_container
  {
    margin: 0 10px;
    background: linear-gradient(#fff, #f6f6f6);
    padding: 20px 20px;
    text-align: justify;
    font-size: 14px;
    color: #666
  }
  .btn_container
  {
    position: relative;
    margin-top: 20px;
    padding-top: 10px;
    &::after
    {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      display: block;
      content: '';
      height: 1px;
      background-color: rgba(0,0,0,.1);
      transform: scaleY(.5)
    }
  }
  .go_back_btn
  {
    height: 30px;
    padding: 0 20px;
    background: none;
    border: 1px solid #ddd;
    color: #333;
    outline: none
  }
</style>
