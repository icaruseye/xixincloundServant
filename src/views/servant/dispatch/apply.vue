<template>
  <div class="wrapper" v-show="isApply">
    <div class="tips" v-if="ServantSwitch === 1">
      <i class="iconfont icon-warning"></i>
      <div class="text">派单申请审核中</div>
    </div>
    <xx-cell class="mt10px">
      <xx-cell-items label="接受派单地址" class="noraml_cell_right" style="color:#3AC7F5" @click.native="showAddressPopup">
        <p style="font-size: 12px;max-width: 216px;text-align: justify;float: right;">
          {{detail.Address || '请选择接受派单地址'}}
        </p>
      </xx-cell-items>
    </xx-cell>
    <button type="button" class="weui-btn weui-btn_primary weui-btn-bottom" @click="submit">提交</button>
    <!-- 地址列表 -->
    <div
      v-transfer-dom
      :should-rerender-on-show="true"
      max-height="50%">
      <popup v-model="isShowAddressList" :popup-style="{zIndex: 9999}">
        <div class="address-list_title">请选择地址</div>
        <div class="address-list_container">
          <template v-for="(item, index) in addressList">
            <div class="address-list_item" :key="index" @click="chooseAdress(index)">
              <div class="tag">{{item.Remark}}<span v-if="index === 0">(默认)</span></div>
              <div class="detail">{{item.Province | _transformAddress}}{{item.City | _transformAddress}}{{item.Area | _transformAddress}}{{item.SpecificAddress}}</div>
              <i v-if="addressIndex === index" class="iconfont icon-xuanzhong" style="color:#3AC7F5"></i>
            </div>
          </template>
          <div class="address-list_item_add" @click="toEdit(-1, 0)">添加新地址</div>
          <div class="address-list_item_add" style="margin-top:10px" @click="isShowAddressList = false">取消</div>
        </div>
      </popup>
    </div>
    <!-- 新增编辑地址 -->
    <div v-transfer-dom>
      <popup
        v-model="showAddress"
        :should-rerender-on-show="true"
        height="100%" :popup-style="{zIndex: 9999}">
        <div v-if="showAddress">
          <AddressEdit :UserAddress="UserAddress" :id="addressID" :defaultOnly="addressList.length === 0" @cancel="cancelAddress" @success="successAddress"></AddressEdit>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import ChinaAddressV4Data from '@/plugins/datas/ChinaAddressV4Data.json'
import AddressEdit from '@/views/servant/user/user-address/edit'
import { TransferDomDirective as TransferDom, Popup, AlertModule } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    AddressEdit,
    Popup
  },
  filters: {
    _transformAddress (val) {
      let name = ''
      ChinaAddressV4Data.map((item) => {
        if (item.value === val) {
          name = item.name
        }
      })
      return name
    }
  },
  data () {
    return {
      isApply: false,
      ServantSwitch: 0,
      isShowAddressList: false,
      showAddress: false,
      addressList: [],
      UserAddress: {},
      addressID: null,
      addressIndex: null,
      detail: {
        Address: ''
      }
    }
  },
  created () {
    this.getServantSwitch()
    this.getAddressList()
    this.getAddress()
  },
  mounted () {
  },
  methods: {
    async getAddress () {
      const res = await this.$http.get(`/DispatchService/Address`)
      if (res.data.Code === 100000) {
        console.log(res.data.Data)
        this.detail.Address = this.concatAdress(res.data.Data)
        this.addressID = res.data.Data.ID
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async getServantSwitch () {
      const that = this
      const res = await this.$http.get(`/DispatchService/ServantSwitch`)
      if (res.data.Code === 100000) {
        this.isApply = res.data.Data
        if (!res.data.Data) {
          AlertModule.show({
            title: '提示',
            content: '尚未申请派单',
            buttonText: '立即申请',
            onHide () {
              that.isApply = true
            }
          })
        }
        this.ServantSwitch = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async getAddressList () {
      const res = await this.$http.get('/ServantAddressList')
      if (res.data.Code === 100000) {
        this.addressList = res.data.Data
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    async getShopSwitch () {
      const res = await this.$http.get(`/DispatchService/ShopSwitch`)
      if (res.data.Code === 100000) {
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async submit () {
      const that = this
      const url = this.ServantSwitch ? '/DispatchService/Address' : '/DispatchService/Apply'
      const method = this.ServantSwitch ? 'put' : 'post'
      const res = await this.$http.send(`${url}?addressID=${this.addressID}`, method)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: '提交成功',
          time: 1000,
          onHide () {
            that.$router.back()
          }
        })
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 选择地址
    chooseAdress (index) {
      this.isShowAddressList = false
      this.detail.Address = this.concatAdress(this.addressList[index])
      this.addressID = this.addressList[index].ID
    },
    // 编辑新增地址
    toEdit (id, index) {
      if (id !== -1) { // 编辑
        this.UserAddress = this.addressList[index]
        this.UserAddress.IsDefault = (index === 0) ? 1 : 0
      } else {
        this.UserAddress = { // 新增
          IsDefault: this.addressList.length > 0 ? 0 : 1
        }
      }
      this.showAddress = true
      this.isShowAddressList = false
      this.addressID = id
    },
    // 展示地址列表
    showAddressPopup () {
      this.isShowAddressList = true
      this.showAddress = false
      this.setMaskzIndex(9998)
    },
    // 转换地址
    concatAdress (address) {
      return this.transformAddress(address.Province) + this.transformAddress(address.City) + this.transformAddress(address.Area) + address.SpecificAddress
    },
    cancelAddress () {
      this.showAddressPopup()
    },
    successAddress () {
      this.isShowAddressList = true
      this.showAddress = false
      this.getAddressList()
    },
    setMaskzIndex (val) {
      this.$nextTick(() => {
        document.querySelector('.vux-popup-mask').style.zIndex = val
      })
    },
    transformAddress (val) {
      let name = ''
      ChinaAddressV4Data.map((item) => {
        if (item.value === val) {
          name = item.name
        }
      })
      return name
    }
  }
}
</script>

<style lang="less" scoped>
.address-list_title {
  text-align: center;
  padding: 10px;
  background: #fff;
  color: #f8a519;
  border-bottom: 1px solid #eee;
}
.address-list_item_add {
  position: relative;
  padding: 15px;
  color: #f8a519;
  background: #fff;
  font-size: 14px;
  text-align: center;
}
.address-list_container {
  min-height: 100px;
}
.address-list_item {
  position: relative;
  background: #fff;
  padding: 15px;
  display: flex;
  align-items: center;
  font-size: 14px;
  &::after {
    content: " ";
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 0;
    height: 1px;
    border-bottom: 1px solid #d9f7f5;
    color: #d9f7f5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  .tag {
    width: 100px;
    color: #999;
  }
  .detail {
    flex: 1;
    color: #666;
    padding-right: 10px;
  }
}

.tips {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 10px;
  background: #fdf6ec;
  border: 1px solid #faecd8;
  color: #e6a23c;
  font-size: 12px;
  .text {
    margin-left: 5px;
    text-align: center;
  }
}
</style>
