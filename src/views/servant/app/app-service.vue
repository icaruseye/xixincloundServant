<template>
  <div class="has-tabbar">
    <!-- <tab v-model="index" custom-bar-width="25px" :line-width="4">
      <tabItem selected @on-item-click="onItemClick">服务项</tabItem>
      <tabItem @on-item-click="onItemClick">服务套餐</tabItem>
    </tab> -->
    <tab v-model="index" custom-bar-width="25px">
      <tabItem selected @on-item-click="onItemClick">服务项</tabItem>
      <tabItem @on-item-click="onItemClick">服务套餐</tabItem>
    </tab>
    <!-- 服务项 -->
    <div v-if="index === 0">
      <div class="weui-list-title">在线服务</div>
      <div class="weui-list-panel weui-panel">
        <div class="weui-cell">
          <div class="weui-cell-top">
            <div class="icon"><img src="@/assets/images/icon_tcmr.png" alt=""></div>
            <div class="mid">
              <div class="name">图文问诊</div>
              <div class="price"><span>￥</span>100</div>
            </div>
            <div class="btns">
              <button class="gray btn">库存:90</button>
              <button class="default btn">下架</button>
              <button class="default btn" @click="showPopup(1)">操作</button>
            </div>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell-top">
            <div class="icon"><img src="@/assets/images/icon_tcmr.png" alt=""></div>
            <div class="mid">
              <div class="name">图文问诊</div>
              <div class="price"><span>￥</span>99</div>
            </div>
            <div class="btns">
              <button class="gray btn">库存:90</button>
              <button class="default btn">下架</button>
              <button class="default btn">操作</button>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-list-title">特殊服务</div>
      <div class="weui-list-panel weui-panel">
        <div class="weui-cell">
          <div class="weui-cell-top">
            <div class="icon"><img src="@/assets/images/icon_tcmr.png" alt=""></div>
            <div class="mid">
              <div class="name">图文问诊</div>
              <div class="price"><span>￥</span>100</div>
            </div>
            <div class="btns">
              <button class="gray btn">库存:90</button>
              <button class="default btn">下架</button>
              <button class="default btn">操作</button>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="weui-btn weui-btn_primary" @click="addServiceItem">申请开通</button>
    </div>
    <!-- 服务套餐 -->
    <div v-if="index === 1">
      <div class="weui-list-title">套餐分类</div>
      <div class="weui-list-panel weui-panel">
        <div class="weui-cell">
          <div class="weui-cell-top">
            <div class="icon"><img src="@/assets/images/icon_tcmr.png" alt=""></div>
            <div class="mid">
              <div class="name">图文问诊</div>
              <div class="price"><span>￥</span>100</div>
            </div>
            <div class="btns">
              <button class="gray btn">库存:90</button>
              <button class="default btn">下架</button>
              <button class="default btn" @click="showPopup(1)">操作</button>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="weui-btn weui-btn_primary" @click="addServicePackage">创建套餐包</button>
    </div>
    <div v-transfer-dom>
      <popup v-model="isShowPopup">
        <div class="popup">
          <ul>
            <li v-show="index" @click="recommend">推荐</li>
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
import { TransferDom, Popup } from 'vux'
import { Tab, TabItem } from '@/components/common/tab'
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    Popup
  },
  data () {
    return {
      index: 0,
      isShowPopup: false,
      currentId: ''
    }
  },
  methods: {
    showPopup (id) {
      this.currentId = id
      this.isShowPopup = true
    },
    onItemClick (index) {
      this.index = index
    },
    addServicePackage () {
      this.$router.push(`/app/packageEdit/add`)
    },
    addServiceItem () {
      this.$router.push('/app/itemApply')
    },
    recommend () {},
    modify () {
      this.$router.push(`/app/packageEdit/${this.currentId}`)
    },
    removoe () {}
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
      width: 50px;
      height: 25px;
      line-height: 25px;
      font-size: 13px;
      border-radius: 2px;
      margin-right: 16px;
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
</style>
