<template>
  <div class="wrapper has-tabbar">
    <div style="position:absolute;left:0;right:0;top:0;background-color: #fff;z-index: 10">
      <xx-tab v-model="tabIndex" active-color="#3AC7F5" custom-bar-width="25px">
        <xx-tab-item @on-item-click="onItemClick">服务产品</xx-tab-item>
        <xx-tab-item @on-item-click="onItemClick">课程产品</xx-tab-item>
        <!-- <xx-tab-item @on-item-click="onItemClick">挂号产品</xx-tab-item> -->
      </xx-tab>
    </div>
    <div class="serviceItem_list">
      <checker v-model="selectedItem" default-item-class="serviceItem_list_item" selected-item-class="serviceItem_list_item_selected" radio-required>
        <template v-for="(item, index) in itemList">
          <checker-item :value="index" :key="index" v-if="tabIndex === 0">
            <img class="icon" :src="item.PackageType | xxMissionTypeIconFilter" alt="" srcset="">
            <div class="title">{{item.Name}}</div>
            <i class="iconfont icon-xuanzhong" v-if="selectedItem == index"></i>
          </checker-item>
          <checker-item :value="index" :key="index" v-if="tabIndex === 1">
            <img class="icon" :src="item.PackageType | xxMissionTypeIconFilter" alt="" srcset="">
            <div class="title">{{item.Title}}</div>
            <i class="iconfont icon-xuanzhong" v-if="selectedItem == index"></i>
          </checker-item>
        </template>
      </checker>
    </div>
    <button type="button" class="weui-btn weui-btn_primary weui-btn-bottom" @click="submit">确定</button>
  </div>
</template>

<script>
import { Checker, CheckerItem, ButtonTab, ButtonTabItem } from 'vux'
export default {
  components: {
    Checker,
    CheckerItem,
    ButtonTab,
    ButtonTabItem
  },
  data () {
    return {
      tabIndex: 0,
      selectedItem: -1,
      itemList: [],
      courseList: []
    }
  },
  watch: {
    tabIndex (val) {
      this.selectedItem = -1
      if (val === 0) {
        this.getItemList()
      } else {
        this.getCourseList()
      }
    }
  },
  mounted () {
    this.getItemList()
  },
  methods: {
    // 获取服务包列表
    async getItemList () {
      const res = await this.$http.get(`/Push/Package/List`)
      if (res.data.Code === 100000) {
        this.itemList = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 获取课程列表
    async getCourseList () {
      const res = await this.$http.get(`/Proxy-Courses-List`)
      if (res.data.Code === 100000) {
        this.itemList = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    onItemClick (val) {
      this.tabIndex = val
    },
    submit () {
      if (this.selectedItem < 0) {
        this.$vux.toast.text('请选择一项')
      } else {
        const data = Object.assign({}, this.itemList[this.selectedItem])
        data.CommodityType = this.tabIndex + 1
        this.$emit('selected', data)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  background: #fff;
}
.serviceItem_list {
  height: 300px;
  overflow: scroll;
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
  }
  .iconfont {
    font-size: 14px;
    color: #F8A519;
  }
}
</style>
