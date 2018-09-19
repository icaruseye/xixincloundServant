<template>
  <div class="wrapper">
    <div style="padding: 15px 12px 5px;background: #fff;">
      <div class="search-bar">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="搜索">
        <button class="all">全选</button>
      </div>
      <div class="tags-box">
        <div class="title">用户标签</div>
        <div class="list">
          <checker v-model="params.tagId" :radio-required="true" default-item-class="tags-item" selected-item-class="tags-item-selected">
            <checker-item :value="0">全部</checker-item>
            <checker-item v-for="(item, index) in tagList" :key="index" :value="item.TagID">{{item.TagName}}</checker-item>
          </checker>
        </div>
      </div>
    </div>
    <div class="userlist-box">
      <div class="title">通讯录</div>
      <div class="list">
        <checker v-model="params.userlist" default-item-class="item" selected-item-class="item-selected">
          <checker-item :value="0">
            <span class="xx-radio-item" :class="params.userlist === 0 ? 'active' : ''"></span>
            <img class="avatar" src="https://tva1.sinaimg.cn/crop.0.0.179.179.180/771d5a55gw1emwpljaw12j2050050t8o.jpg" alt="">
            <span class="name">伍米常</span>
          </checker-item>
          <checker-item :value="1">
            <span class="xx-radio-item" :class="params.userlist === 1 ? 'active' : ''"></span>
            <img class="avatar" src="https://tvax4.sinaimg.cn/crop.0.0.996.996.180/9d0d09ably8foq7clnhjwj20ro0ro3yv.jpg" alt="">
            <span class="name">易米常</span>
          </checker-item>
        </checker>
      </div>
    </div>
    <div class="tool-bar">
      <span class="text">是否创建为群组</span>
      <checker v-model="isCreateGroup" class="list" default-item-class="item" selected-item-class="item-selected" :radio-required="true">
        <checker-item :value="1">
          <span>是</span>
          <span class="xx-radio-item" :class="isCreateGroup === 1 ? 'active' : ''"></span>
        </checker-item>
        <checker-item :value="0">
          <span>否</span>
          <span class="xx-radio-item" :class="isCreateGroup === 0 ? 'active' : ''"></span>
        </checker-item>
      </checker>
    </div>
    <button type="button" class="weui-btn weui-btn_primary">提交</button>
  </div>
</template>

<script>
import { TransferDom, Checker, CheckerItem } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Checker,
    CheckerItem
  },
  data () {
    return {
      isCreateGroup: 0,
      tagList: [{
        TagName: '愚愚人',
        TagID: 1
      }, {
        TagName: '海关监管和价格',
        TagID: 2
      }, {
        TagName: '而我认为认为',
        TagID: 3
      }],
      params: {
        userlist: null
      }
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
.weui-btn {
  position: fixed;
  bottom: 0;
}
.wrapper {
  min-height: 100vh;
  padding-bottom: 105px;
}
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px 0;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 60px;
    height: 1px;
    background: #CFCFCF;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .iconfont {
    margin-right: 5px;
    color: #aaa;
  }
  input {
    flex: 1;
    padding-left: 5px;
    font-size: 16px;
    color: #666;
    &::-webkit-input-placeholder {
      color: #aaa;
    }
  }
  .all {
    display: block;
    width: 55px;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid #CFCFCF;
    border-radius: 4px;
    font-size: 16px;
    color: #aaa;
    background: transparent;
  }
}
.tags-box {
  padding-top: 14px;
  .title {
    position: relative;
    font-size: 15px;
    color: #666;
    padding-left: 12px;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -8px;
      width: 3px;
      height: 15px;
      border-radius: 4px;
      background: #3AC7F5;
    }
  }
  .list {
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    padding-top: 12px;
    .tags-item {
      margin: 0 10px 10px 0;
      padding: 0 13px;
      background: #F6F6F6;
      height: 22px;
      line-height: 22px;
      border-radius: 13px;
      color: #999;
      font-size: 13px;
      &.tags-item-selected {
        background: RGBA(58, 199, 245, .2);
        color: #3AC7F5;
      }
    }
  }
}
.userlist-box {
  .title {
    padding-left: 12px;
    background: #F6F6F6;
    height: 30px;
    line-height: 30px;
    font-size: 10px;
    color: #999;
  }
  .list {
    padding: 0 12px;
    background: #fff;
    .item {
      padding: 10px 0;
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid RGBA(0, 180, 171, .1);
      &:last-child {
        border: 0;
      }
      .avatar {
        margin: 0 20px 0 15px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
      }
      .name {
        font-size: 18px;
        color: #333;
      }
    }
  }
}
.tool-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 52px;
  right: 0;
  left: 0;
  padding: 0 12px;
  height: 42px;
  background: #fff;
  font-size: 13px;
  .text {
    color: #999
  }
  .list {
    display: flex;
    .item {
      display: flex;
      align-items: center;
      margin-left: 40px;
      color: #666;
      span {
        margin: 0 3px;
      }
    }
  }
}
</style>
