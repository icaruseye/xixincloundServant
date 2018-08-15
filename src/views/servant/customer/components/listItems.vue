<template>
  <div class="listItem_contianer">
    <div  v-if="Avatar" class="avatar_img_box">
      <img class="avatar_img" :src="Avatar" :alt="UserName.substring(0, 1)">
    </div>
    <div class="userName">
      {{UserName}}
      <span v-if="ShowTime" class="ShowTime">{{ShowTime | xxTimeFormatFilter}}</span>
    </div>
    <div v-if="Attrs" class="Attrs_container">
      <span v-for="(item, index) in Attrs" :key="index" class="tags_span">
        {{item}}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Avatar: null,
    UserName: '',
    Attrs: {
      type: Array,
      default: null
    },
    ShowTime: null
  }
}
</script>

<style lang="less" scoped>
.listItem_contianer
{
  position: relative;
  height: 80px;
  background-color: #fff;
  padding: 20px 12px 0 90px;
  box-sizing: border-box;
  &::after
  {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 0;
    content: '';
    display: block;
    height: 1px;
    background-color: rgba(0, 180, 171, .2)
  }
  &:last-child::after
  {
    display: none;
  }
  .avatar_img_box
  {
    position: absolute;
    left: 20px;
    top: 50%;
    margin-top: -25px;
    border-radius: 50%;
    background-color: #f6f6f6;
    font-size: 16px;
    font-weight: 600;
    color: #ccc;
    line-height: 50px;
    width: 50px;
    height: 50px;
    text-align: center;
    .avatar_img
    {
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .userName
  {
    font-size: 18px;
    color: #333;
    height: 25px;
    line-height: 25px;
    .ShowTime
    {
      float: right;
      color: #999;
      font-size: 12px;
    }
  }
  .Attrs_container
  {
    .tags_span
    {
      display: inline-block;
      height: 22px;
      line-height: 22px;
      font-size: 12px;
      color: #999;
      background-color: #F6F6F6;
      border-radius: 9px;
      padding: 0 10px;
      white-space: nowrap;
      margin-right: 8px;
    }
  }
}
</style>
