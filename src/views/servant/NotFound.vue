<template>
  <div>
    <div style="font-size: 120px;text-align:center;margin-top:60px">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#icon-Group`"></use>
      </svg>
    </div>
    <p style="font-size: 14px;text-align: center;color:#999">您的页面被外星人吸走了！</p>
    <router-link class="btn" to="/">去首页</router-link>
  </div>
</template>
<style scoped>
  .btn
  {
    display:block;
    height:40px;
    margin: 40px auto 0 auto;
    width: 140px;
    text-align:center;
    line-height:40px;
    border: 1px solid #3ac7f5;
    font-size: 14px;
    color: #3ac7f5;
    border-radius: 20px
  }
</style>
