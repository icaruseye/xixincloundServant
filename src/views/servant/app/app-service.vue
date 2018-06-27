<template>
  <div class="has-tabbar">
    <xx-tab v-model="index" custom-bar-width="25px">
      <xx-tabItem selected @on-item-click="changeTab">服务项</xx-tabItem>
      <xx-tabItem @on-item-click="changeTab">服务套餐</xx-tabItem>
    </xx-tab>
    <!-- 服务项 -->
    <div v-if="index === 0">
      <template v-for="(item, pIndex) in itemList">
        <div :key="pIndex">
          <div class="weui-list-title">{{item.PackageTypeName}}</div>
          <div class="weui-list-panel weui-panel">
            <template v-if="item.PackageList.length > 0">
              <service-item v-for="(service, serviceIndex) in item.PackageList" 
              :key="serviceIndex"
              :id="service.ID"
              :title="service.Name"
              :price="service.Price/100"
              :count="service.Count"
              :state ="service.State"
              :effectiveDay ="service.EffectiveDay"
              :effectiveMonth ="service.EffectiveMonth"
              :effectiveYear ="service.EffectiveYear"
              :description ="service.Description"
              @changeState = "service.State = service.State === 0 ? 1 : 0"
              ></service-item>
            </template>
            <div  style="position: relative;height:200px" v-else>
              <xx-occupied-box>
                {{item.PackageTypeName}}列表为空
              </xx-occupied-box>
            </div>
          </div>
        </div>
      </template>
      <button type="button" class="weui-btn weui-btn_primary" @click="addServiceItem">申请开通</button>
    </div>
    <!-- 服务套餐 -->
    <div v-if="index === 1">
      <template v-for="(item, typeIndex) in packageList">
        <div :key="typeIndex" v-if="packageList.length > 0">
          <div class="weui-list-title">{{BundleType[typeIndex].Name}}</div>
          <div class="weui-list-panel weui-panel">
            <template v-for="(i, index) in packageList[typeIndex]">
              <div class="weui-cell" :key="index">
                <div class="weui-cell-top">
                  <div class="icon"><img src="@/assets/images/icon_tcmr.png" alt=""></div>
                  <div class="mid">
                    <div class="name">{{i.PackageInfo.Name}}</div>
                    <div class="price"><span>￥</span>{{i.PackageInfo.Price === 0 ? '0' : (i.PackageInfo.Price / 100).toFixed(2)}}</div>
                  </div>
                  <div class="btns">
                    <button class="gray btn">库存:{{i.PackageInfo.Count}}</button>
                    <button class="danger btn" @click="changeStatusDown(i.PackageInfo.ID)" v-if="i.PackageInfo.State === 1">下架</button>
                    <button class="default btn" @click="changeStatusUp(i.PackageInfo.ID)" v-if="i.PackageInfo.State === 0">上架</button>
                    <button class="default btn" @click="showPopup(i.PackageInfo.ID, typeIndex, index)">操作</button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
      <button type="button" class="weui-btn weui-btn_primary" @click="addServicePackage">创建套餐包</button>
    </div>
    <div v-transfer-dom>
      <popup v-model="isShowPopup">
        <div class="popup">
          <ul>
            <!-- <li v-show="index" @click="recommend">推荐</li> -->
            <li @click="modify">修改</li>
            <li @click="removoe">删除</li>
          </ul>
          <a href="javascript:;" class="cancel" @click="isShowPopup = false">取消</a>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import http from '@/api'
import ServiceItem from './components/serviceItems'
import { TransferDom, Popup } from 'vux'
export default {
  metaInfo: {
    title: '服务设置'
  },
  directives: {
    TransferDom
  },
  components: {
    Popup,
    ServiceItem
  },
  data () {
    return {
      index: 0,
      isShowPopup: false,
      currentId: '',
      itemPageIndex: 1,
      packagePageIndex: 1,
      itemList: [],
      packageList: [],
      singleItem: {},
      BundleType: []
    }
  },
  created () {
    this.getItemList()
    this.getBundleType()
  },
  methods: {
    showPopup (id, typeIndex, index) {
      this.currentId = id
      this.isShowPopup = true
      this.singleItem = this.packageList[typeIndex][index]
    },
    changeTab (index) {
      this.index = index
    },
    addServicePackage () {
      this.$router.push(`/app/packageEdit/add`)
    },
    addServiceItem () {
      this.$router.push('/app/itemApply')
    },
    recommend () {},
    // 修改服务项/套餐
    modify () {
      sessionStorage.setItem('packageDetail', JSON.stringify(this.singleItem))
      if (this.index) {
        this.$router.push(`/app/packageEdit/${this.currentId}?isAdd=0`)
      } else {
        this.$router.push(`/app/itemEdit/${this.currentId}?isAdd=0`)
      }
    },
    // 删除服务项/套餐
    async removoe () {
      if (this.index) {
        const res = await http.delete(`/Bundle/${this.currentId}`)
        if (res.data.Code === 100000) {
          this.$vux.toast.text('删除成功')
          this.isShowPopup = false
          this.getBundleType()
        }
      } else {
        const res = await http.delete(`/Package/${this.currentId}`)
        if (res.data.Code === 100000) {
          this.$vux.toast.text('删除成功')
          this.isShowPopup = false
          this.getItemList()
        }
      }
    },
    // 上下架
    async changeStatusDown (id, pIndex, cIndex) {
      const res = await http.put(`/Bundle/${id}/OffTheShelf`)
      if (res.data.Code === 100000) {
        this.$vux.toast.text('下架成功')
        this.getBundleType()
      }
    },
    async changeStatusUp (id) {
      const res = await http.put(`/Bundle/${id}/OnTheShelf`)
      if (res.data.Code === 100000) {
        this.$vux.toast.text('上架成功')
        this.getBundleType()
      }
    },
    // 服务项列表
    async getItemList () {
      const res = await http.get(`/PackageList?pageIndex=${this.itemPageIndex}`)
      this.itemList = res.data.Data
    },
    // 服务套餐列表
    async getBundleType () {
      // 服务套餐分类
      const res = await http.get('/BundleType')
      if (res.data.Code === 100000) {
        this.BundleType = res.data.Data
        this.packageList = []
        res.data.Data.map(async (item) => {
          let res = await this.getPackageList(item.ID, 1)
          if (res.data.Data.length === 0) return false
          this.packageList.push(res.data.Data)
        })
      }
    },
    async getPackageList (bundleTypeID, pageIndex) {
      let res = await http.get(`/BundleList?bundleTypeID=${bundleTypeID}&pageIndex=${pageIndex}`)
      return res
    }
  }
}
</script>

<style lang="less" scoped>
.weui-btn {
  position: fixed;
  bottom: 0;
}

.weui-list-title {
  padding: 13px 0 2px 10px;
  font-size:16px;
  font-weight: bold;
  color:#787878;
  border-bottom: 1px solid rgba(187,187,187,.2);
  background: #fff;
}

.weui-list-panel {
  margin-bottom: 10px;
  &.weui-panel {
    padding: 0 12px;
  }
  .weui-cell-top {
    display: flex;
    align-items: center;
  }
  .icon {
    width: 29px;
    height: 29px;
  }
  .mid {
    flex: 1;
    padding: 0 7px;
    .name {
      color: #666;
      font-size: 16px;
      font-weight: bold;
    }
    .price {
      span {
        font-size: 12px;
      }
      font-size: 15px;
      color: #999;
    }
  }
  .btns {
    .btn {
      padding: 0 8px;
      min-width: 50px;
      height: 25px;
      line-height: 25px;
      font-size: 13px;
      border-radius: 2px;
      margin-right: 8px;
      border: 0;
      background-color: #fff;
      &:last-child {
        margin-right: 0;
      }
    }
    .gray {
      color: #ccc;
      border: 1px solid #ccc;
      background: transparent;
    }
    .default {
      color: #3AC7F5;
      border: 1px solid #3AC7F5;
      background: transparent;
    }
    .danger {
      border: 1px solid #ff9800;
      color: #ff9800;
    }
  }
}

.popup {
  color: #666;
  font-size: 14px;
  ul {
    margin-bottom: 8px;
    li {
    background: #fff;
    width: 100%;
    padding: 15px 0;
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid #f1f1f1;
    &:nth-child(1) {
      color: #f8a519
    }
    &:nth-child(2) {
      color: #f44336
    }
    }
  }
  .cancel {
    display: block;
    padding: 15px 0;
    width: 100%;
    text-align: center;
    border-top: 1px solid #f1f1f1;
    background: #fff;
    color: inherit;
  }
}
.weui-cell-top
{
  width: 100%;
}
</style>
