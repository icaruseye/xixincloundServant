<template>
  <div class="wrapper has-tabbar">
    <div style="position:fixed;left:0;right:0;top:0;background-color: #fff;z-index: 10">
      <xx-tab v-model="tabIndex" active-color="#3AC7F5" custom-bar-width="25px">
        <xx-tab-item @on-item-click="onItemClick">服务产品</xx-tab-item>
        <xx-tab-item @on-item-click="onItemClick">课程产品</xx-tab-item>
        <!-- <xx-tab-item @on-item-click="onItemClick">挂号产品</xx-tab-item> -->
      </xx-tab>
    </div>
    <div class="serviceItem_list">
      <checker v-model="selectedItem" default-item-class="serviceItem_list_item" selected-item-class="serviceItem_list_item_selected">
        <template v-for="(item, index) in itemList">
          <checker-item :value="index" :key="index">
            <img class="icon" :src="item.PackageType | xxMissionTypeIconFilter" alt="" srcset="">
            <div class="title">{{item.Name}}</div>
            <i class="iconfont icon-xuanzhong" v-if="selectedItem == index"></i>
          </checker-item>
        </template>
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
      tabIndex: 0,
      selectedItem: -1,
      itemList: [],
      courseList: []
    }
  },
  watch: {
    tabIndex (val) {
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
      const res = await this.$http.get(``)
      if (res.data.Code === 100000) {
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
        const data = this.tabIndex === 0 ? this.itemList[this.selectedItem] : this.courseList[this.selectedItem]
        sessionStorage.setItem('activitySelectedItem', JSON.stringify(data))
        this.$router.back()
      }
    }
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
  }
  .iconfont {
    font-size: 14px;
    color: #F8A519;
  }
}
</style>
