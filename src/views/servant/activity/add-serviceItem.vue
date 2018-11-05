<template>
  <div class="wrapper has-tabbar">
    <div style="position:fixed;left:0;right:0;top:0;background-color: #fff;z-index: 10">
      <xx-tab v-model="modelMissionTabIndex" active-color="#3AC7F5" custom-bar-width="25px">
        <xx-tab-item @on-item-click="onItemClick">服务产品</xx-tab-item>
        <xx-tab-item @on-item-click="onItemClick">课程产品</xx-tab-item>
        <!-- <xx-tab-item @on-item-click="onItemClick">挂号产品</xx-tab-item> -->
      </xx-tab>
    </div>
    <div class="serviceItem_list">
      <checker v-model="selectedItem" default-item-class="serviceItem_list_item" selected-item-class="serviceItem_list_item_selected">
        <checker-item :value="1">
          <img class="icon" src="https://tvax1.sinaimg.cn/crop.0.0.473.473.180/78258c21ly8ft5x6jpwepj20d50d5wec.jpg" alt="" srcset="">
          <div class="title">院内陪朕</div>
          <i class="iconfont icon-xuanzhong" v-if="selectedItem == 1"></i>
        </checker-item>
        <checker-item :value="2">
          <img class="icon" src="https://tvax1.sinaimg.cn/crop.0.0.473.473.180/78258c21ly8ft5x6jpwepj20d50d5wec.jpg" alt="" srcset="">
          <div class="title">院内陪朕</div>
          <i class="iconfont icon-xuanzhong" v-if="selectedItem == 2"></i>
        </checker-item>
      </checker>
    </div>
    <button type="button" class="weui-btn weui-btn_primary weui-btn-bottom" @click="submit">确定</button>
  </div>
</template>

<script>
import { Checker, CheckerItem } from 'vux'
export default {
  components: {
    Checker,
    CheckerItem
  },
  data () {
    return {
      modelMissionTabIndex: 0,
      selectedItem: null
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    onItemClick () {}
  }
}
</script>

<style lang="less" scoped>
.serviceItem_list {
  padding: 50px 12px 0 12px;
  background: #fff;
}
.serviceItem_list_item {
  display: flex;
  align-items: center;
  padding: 25px 5px;
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
  .iconfont {
    font-size: 14px;
    color: #F8A519;
  }
}
</style>
