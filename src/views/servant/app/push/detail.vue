<template>
  <div class="wrap">
    <div class="title-bar">
      <div class="title">关于糖尿病的文章链接</div>
      <div class="info">
        <span class="date">8月5日 12:30:22</span>
        <span class="status">已发送</span>
      </div>
    </div>
    <div class="recipients">
      <span>三位收贱人：</span>
      <span class="name">一号收贱人，</span>
      <span class="name">二号收贱人，</span>
      <span class="name">三号收贱人，</span>
      <span class="name">四号收贱人</span>
    </div>
    <div class="push-dec">关于糖尿病的服务包，以及详情介绍，关于糖尿病的服务包</div>
    <div class="push-card">
      <div class="article">
        <div class="img">
          <img src="https://wx2.sinaimg.cn/mw690/497f855dgy1fvba0f3ypcj21w01w0npd.jpg" alt="">
        </div>
        <div class="content">
          <div class="title">根据公众号的历史文章、类型等，…</div>
          <div class="info">
            <span class="tag">糖尿病</span>
            <span class="date">8月5日 12:30:22</span>
          </div>
        </div>
      </div>
    </div>
    <div class="push-card">
      <div class="package">
        <div class="img">
          <img src="https://wx2.sinaimg.cn/mw690/497f855dgy1fvba0f3ypcj21w01w0npd.jpg" alt="">
        </div>
        <div class="content">
          <div class="title">根据公众号的历史文章、类型等，…</div>
          <div class="dec">工作于急诊，擅长消化道危急重症…</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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