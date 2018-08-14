<template>
  <div>
    <xx-go-back></xx-go-back>
    <div class="form-panel">
      <div v-if="addressList.length > 0" >
        <div v-for="(item, index) in addressList" class="weui-form-cell" @click="toEdit(item.ID, index)" :key="index">
          <div class="tag">{{item.Remark}}<span v-if="index === 0">(默认)</span></div>
          <div class="detail">{{item.Province | transformAddress}}{{item.City | transformAddress}}{{item.Area | transformAddress}}{{item.SpecificAddress}}</div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
      <xx-occupied-box v-else>
        你还没有添加过地址哦
      </xx-occupied-box>
    </div>
      <button type="button" class="weui-btn weui-btn_primary" @click="toEdit(-1, 0)">新建地址</button>
    <div v-transfer-dom>
      <popup v-model="showAddress" height="100%">
        <div v-if="showAddress">
          <AddressEdit :UserAddress="UserAddress" :id="addressID" :defaultOnly="addressList.length === 0" @cancel="cancelAddress" @success="successAddress"></AddressEdit>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import ChinaAddressV4Data from '@/plugins/datas/ChinaAddressV4Data.json'
import AddressEdit from './edit'
import { Popup, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    AddressEdit,
    Popup
  },
  data () {
    return {
      showAddress: false,
      addressList: [],
      index: '',
      addressID: null,
      UserAddress: {}
    }
  },
  created () {
    this.getAddressList()
  },
  filters: {
    transformAddress (val) {
      let name = ''
      ChinaAddressV4Data.map((item) => {
        if (item.value === val) {
          name = item.name
        }
      })
      return name
    }
  },
  methods: {
    cancelAddress () {
      this.showAddress = false
    },
    successAddress () {
      this.showAddress = false
      this.getAddressList()
    },
    async getAddressList () {
      const res = await this.$http.get('/ServantAddressList')
      if (res.data.Code === 100000) {
        this.addressList = res.data.Data
      } else {
        this.$vux.toast.text('出错了')
      }
    },
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
      this.addressID = id
    }
  }
}
</script>

<style lang="less" scoped>
.form-panel
{
  .weui-form-cell
  {
  margin-bottom: 5px;
  background-color: #fff;
  padding: 20px 20px
  }
}
.weui-btn {
  position: fixed;
  bottom: 0;
}

.icon-jiantouyou {
  color: #f8a519
}

.weui-form-cell {
  display: flex;
  align-items: center;
  font-size: 14px;
  .tag {
    width: 100px;
    color: #f8a519;
  }
  .detail {
    flex: 1;
    color: #666;
    padding-right: 10px;
  }
}
</style>
