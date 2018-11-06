<template>
  <div class="wrapper">
    <xx-go-back></xx-go-back>
    <div class="course_list">
      <div class="course_list_item">
        <img src="http://service.t.vcmps.com/app/activity/detail/1" alt="" class="icon">
        <div class="title">啊啊啊</div>
        <button class="btn close">上架</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.course_list {
  padding: 0 12px;
  background: #fff;
}

.course_list_item {
  display: flex;
  align-items: center;
  padding: 20px 5px;
  border-bottom: 1px solid RGBA(0, 180, 171, .1);
  &:last-child {
    border: 0;
  }
  .icon {
    width: 29px;
    height: 29px;
    border-radius: 4px;
    margin-right: 10px;
  }
  .title {
    flex: 1;
    font-size: 18px;
    color: #666;
    font-weight: bold;
  }
  .btn {
    padding: 2px 8px;
    font-size: 13px;
    color: #fff;
    border-radius: 2px;
    border: 1px solid #F8A519;
    background: #F8A519;
    &.close {
      border: 1px solid #3AC7F5;
      background: #3AC7F5;
    }
  }
}
</style>
