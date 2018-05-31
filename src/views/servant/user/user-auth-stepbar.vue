<template>
  <div class="xx-step-bar">
    <template v-for="(item, index) in list">
      <div class="xx-step-item" :class="item.type === 1 ? 'type-2' : ''" :key="index">
        <div class="xx-step-circle">{{index + 1}}</div>
        <div class="xx-step-line"></div>
        <div class="xx-step-title">{{item.text}}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  }
}
</script>


<style lang="less" scoped>
.xx-step-bar {
  padding: 29px 20px;
  background: #fff;
  display: flex;
  .xx-step-item {
    position: relative;
    flex: 1;
    text-align: center;
    color: #CCC;
    .xx-step-title {
      font-size: 14px;
    }
    .xx-step-circle {
      position: relative;
      z-index: 99;
      margin: 0 auto 4px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 50%;
      text-align: center;
      color: #fff;
      font-size: 12px;
      background: #ccc;
    }
    .xx-step-line {
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 1px;
      transform: translateX(-50%);
      top: 10px;
      background: #ccc;
    }
    &:first-child {
      .xx-step-line {
        display: none;
      }
    }
    &.type-1 {
      color: #3BC8F6;
      .xx-step-circle,
      .xx-step-line {
        background: #3BC8F6;
      }
    }
    &.type-2 {
      color: #F8A519;
      .xx-step-circle,
      .xx-step-line {
        background: #F8A519;
      }
    }
  }
}
</style>
