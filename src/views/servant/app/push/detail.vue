<template>
  <div class="wrap">
    <div class="title-bar">
      <div class="title">{{detail.Title}}</div>
      <div class="info">
        <span class="date">{{detail.CreateTime | xxTimeFormatFilter('MM月DD日 HH:mm:ss')}}</span>
        <span class="status">{{detail.Status | pushStatus}}</span>
      </div>
    </div>
    <div class="recipients">
      <span>{{PushPeopleCount}}位收件人：</span>
      <span class="name">{{detail.PushPeopleName}}</span>
    </div>
    <div class="push-dec">{{detail.Describe}}</div>
    <div class="push-card" v-if="detail.PushType === 0">
      <div class="article">
        <div class="img">
          <img :src="detail.ArticleRes.Cover | transformImgUrl" alt="">
        </div>
        <div class="content">
          <div class="title">{{detail.ArticleRes.ArticleTitle}}</div>
          <div class="info">
            <span class="tag">{{detail.ArticleRes.Attributes}}</span>
            <span class="date">{{detail.ArticleRes.CreateTime | xxTimeFormatFilter('MM月DD日 HH:mm:ss')}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="push-card" v-if="detail.PushType === 1">
      <div class="package">
        <div class="img">
          <img :src="detail.PackageRes.PackageType | xxMissionTypeIconFilter" alt="">
        </div>
        <div class="content">
          <div class="title">{{detail.PackageRes.Name}}</div>
          <div class="dec">{{detail.PackageRes.Description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      detail: {}
    }
  },
  filters: {
    pushStatus (val) {
      switch (val) {
        case 1:
          return '等待发送'
        case 2:
          return '已发送'
        case 3:
          return '已驳回'
        case 4:
          return '已取消'
        case -1:
          return '已删除'
      }
    }
  },
  computed: {
    ID () {
      return +this.$route.params.id
    },
    PushPeopleCount () {
      if (this.detail.PushPeopleName) {
        return this.detail.PushPeopleName.split().length
      }
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      const res = await this.$http.get(`/Push/Detail?pushID=${this.ID}`)
      if (res.data.Code === 100000) {
        this.detail = res.data.Data
      }
    }
  }
}
</script>

<style scoped lang="less">
.wrap {
  min-height: 100vh;
  background: #fff;
  padding: 0 12px;
}
.title-bar {
  padding: 17px 0 5px;
  border-bottom: 1px solid RGBA(0, 180, 171, .2);
  .title {
    font-size: 15px;
    color: #666;
    margin-bottom: 5px;
  }
  .info {
    display: flex;
    justify-content: space-between;
    color: #999;
    font-size: 12px;
  }
}
.recipients {
  margin-top: 14px;
  padding: 10px;
  background: #F6F6F6;
  font-size: 12px;
  color: #999;
  .name {
    color: #3AC7F5;
  }
}
.push-dec {
  margin-top: 16px;
  font-size: 15px;
  color: #666;
}
.push-card {
  margin-top: 16px;
  background: #F6F6F6;
  .article {
    padding: 20px 8px;
    display: flex;
    .img {
      margin-right: 10px;
      width: 100px;
      height: 62px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .title {
        font-size: 14px;
        color: #666;
      }
      .info {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 9px;
        color: RGBA(0, 0, 0, 0.5);
      }
    }
  }
  .package {
    display: flex;
    padding: 14px 22px;
    align-items: center;
    .img {
      margin-right: 10px;
      width: 29px;
      height: 29px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      flex: 1;
      .title {
        font-size: 15px;
        color: #333;
        font-weight: bold;
      }
      .dec {
        font-size: 13px;
        color: #676767;
      }
    }
  }
}
</style>