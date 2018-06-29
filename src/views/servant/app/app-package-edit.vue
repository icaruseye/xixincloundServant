<template>
  <div class="weui-form">
    <div class="weui-cell-form-title">填写服务套餐信息</div>
    <div class="weui-cell nobor">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">服务包名称</label>
          <input v-model="reqParams.Name" v-validate="'required'" name="PackageName" type="text" placeholder="请输入服务包名称">
      </div>
      <span v-show="errorBags.has('PackageName')" class="help is-danger">{{ errorBags.first('PackageName') }}</span>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top">
          <label class="label" for="">添加服务项</label>
          <a href="javascript:;" style="color:#3ecccc;flex:1;text-align:right;" @click="addItemPopup = true">+添加</a>
          <input type="hidden" v-model="reqParams.itemsInfoList" v-validate="'required'" name="itemsInfoList">
      </div>
      <span v-show="errorBags.has('itemsInfoList')" class="help is-danger">{{ errorBags.first('itemsInfoList') }}</span>
    </div>
    <div class="weui-cell" v-if="reqParams.itemsInfoList.length !== 0">
      <template v-for="(item, index) in reqParams.itemsInfoList">
        <div class="weui-cell-add" :key="index">
          <div class="title">{{item.Name}}</div>
          <div class="mid">
            <label for="">单价:</label><input type="text" v-model="item.Price" @change="totalPrice">
            <label for="">数量:</label><input type="text" v-model="item.ItemNumber" @change="totalPrice">
          </div>
          <span class="delete" @click="deleteItems(index)">删除</span>
        </div>
      </template>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">真实售价</label>
          <input v-model="reqParams.Price" v-validate="'required'" readonly name="Price" type="number" placeholder="请输入真实售价">
      </div>
      <span v-show="errorBags.has('Price')" class="help is-danger">{{ errorBags.first('Price') }}</span>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">展示价格</label>
          <input v-model="reqParams.BundleViewPrice" v-validate="'required'" readonly name="PackageBundleViewPrice" type="number" placeholder="请输入展示价格">
      </div>
      <span v-show="errorBags.has('PackageBundleViewPrice')" class="help is-danger">{{ errorBags.first('PackageBundleViewPrice') }}</span>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">库存数量</label>
          <input v-model="reqParams.Count" v-validate="'required|min_value:1|max_value:500'" name="Count" type="text" placeholder="请输入库存数量">
      </div>
      <span v-show="errorBags.has('Count')" class="help is-danger">{{ errorBags.first('Count') }}</span>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top">
          <label class="label" for="">服务包分类</label>
          <select v-model="reqParams.PackageType" @change="serviceTypeChange">
            <option v-for="(item, index) in BundleTypeList" :key="index" :value="item.ID">{{item.Name}}</option>
            <option :value="0">新增分类</option>
          </select>
          <i class="iconfont icon-jiantouyou"></i>
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">有效期单位</label>
          <select name="" v-model="reqParams.EffectiveType">
            <option :value="1">年</option>
            <option :value="2">月</option>
            <option :value="3">日</option>
          </select>
          <i class="iconfont icon-jiantouyou"></i>
      </div>
      <span v-show="errorBags.has('EffectiveType')" class="help is-danger">{{ errorBags.first('EffectiveType') }}</span>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">有效期时长</label>
          <input v-model="reqParams.EffectiveValue" v-validate="'required|min_value:1'" name="EffectiveValue" type="text" placeholder="请输入有效期时长">
      </div>
      <span v-show="errorBags.has('EffectiveValue')" class="help is-danger">{{ errorBags.first('EffectiveValue') }}</span>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top">
          <label class="label" for="">服务包介绍</label>
          <textarea v-model="reqParams.Description" v-validate="'required'" name="PackageDescription" placeholder="请输入服务包介绍"></textarea>
      </div>
      <span v-show="errorBags.has('PackageDescription')" class="help is-danger">{{ errorBags.first('PackageDescription') }}</span>
    </div>
    <div class="weui-cell">
      <button type="button" class="weui-btn weui-btn_primary" @click="validateBeforeSubmit" :disabled="submitBtn">提交</button>
    </div>
    <!-- 服务项列表 -->
    <div v-transfer-dom>
      <popup v-model="addItemPopup" height="100%" :hide-on-blur=false style="background: #fff;">
        <div class="popup">
          <div class="service-item_list">
            <ul>
              <li @click="chooseItem(index, item.ID)" v-for="(item, index) in serviceItemList" :key="index">
                <div>
                  <img class="poster" src="@/assets/images/icon_tcmr.png" >
                </div>
                <div class="title">{{item.Name}}</div>
                <i class="iconfont icon-jiantouyou"></i>
              </li>
            </ul>
          </div>
          <div class="weui-cell" style="position:fixed;bottom:0;width:100%;display:flex;z-index:99">
            <a href="javascript:;" style="font-size:16px;padding:8px 0" class="weui-btn weui-btn_warning" @click="addItemPopup = false">关闭</a>
          </div>
        </div>
      </popup>
    </div>
    <!-- 新增分类 -->
    <div v-transfer-dom>
      <confirm v-model="addType"
      show-input
      title="输入分类名称"
      :input-attrs="{type: 'text'}"
      @on-cancel="addTypeCancel"
      @on-confirm="addTypeonConfirm">
      </confirm>
    </div>
  </div>
</template>

<script>
import http from '@/api'
import { TransferDom, Popup, Confirm } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    Popup
  },
  data () {
    return {
      submitBtn: false,
      addItemPopup: false, // 添加服务项
      addType: false, // 新增分类
      BundleTypeList: [],
      serviceType: 1,
      serviceItemList: [], // 服务项列表
      reqParams: {
        BundleName: '',
        Price: '',
        BundleViewPrice: '',
        PackageType: 3,
        EffectiveValue: '',
        EffectiveType: 1,
        Count: '',
        PackageDescription: '',
        itemsInfoList: []
      }
    }
  },
  mounted () {
    this.getItemList()
    this.getBundleType()
    if (this.$route.params.id !== 'add') {
      this.getData()
    }
  },
  methods: {
    getData () {
      // 获取服务套餐信息
      const info = JSON.parse(sessionStorage.getItem('packageDetail')).PackageInfo
      // 获取包含服务项
      const itemsInfoList = JSON.parse(sessionStorage.getItem('packageDetail')).ItemsInfo
      // 回填数据
      this.reqParams = Object.assign(info, {itemsInfoList: itemsInfoList})
      // 转换套餐价格
      this.reqParams.BundleViewPrice = this.convertToyuan(this.reqParams.Price * 1.2)
      this.reqParams.Price = this.convertToyuan(this.reqParams.Price)
      // 转换服务项价格
      this.reqParams.itemsInfoList.map((item) => {
        item.Price = this.convertToyuan(item.Price)
      })
      this.setEffectiveType(this.reqParams)
    },
    setEffectiveType (data) {
      if (data.EffectiveYear) {
        data.EffectiveType = 1
        data.EffectiveValue = data.EffectiveYear
        return data
      }
      if (data.EffectiveMonth) {
        data.EffectiveType = 2
        data.EffectiveValue = data.EffectiveMonth
        return data
      }
      if (data.EffectiveDay) {
        data.EffectiveType = 3
        data.EffectiveValue = data.EffectiveDay
        return data
      }
    },
    totalPrice () {
      const itemList = this.reqParams.itemsInfoList
      let res = 0
      for (let i = 0; i < itemList.length; i++) {
        res += parseFloat(itemList[i].Price) * parseFloat(itemList[i].ItemNumber)
      }
      this.reqParams.Price = parseFloat(res).toFixed(2)
      this.reqParams.BundleViewPrice = (res * 1.2).toFixed(2)
    },
    convertToyuan (val) {
      return (val / 100).toFixed(2)
    },
    go (name) {
      this.$router.push(`/app/${name}`)
    },
    chooseItem (index) {
      let obj = Object.assign({ItemNumber: 1}, this.serviceItemList[index])
      for (var i = 0; i < this.reqParams.itemsInfoList.length; i++) {
        if (this.reqParams.itemsInfoList[i].ID === obj.ID) {
          this.$vux.toast.text('已有此服务项')
          return false
        }
      }
      obj.Price = this.convertToyuan(obj.Price)
      this.reqParams.itemsInfoList.push(obj)
      this.totalPrice()
      this.addItemPopup = false
    },
    deleteItems (index) {
      this.reqParams.itemsInfoList.splice(index, 1)
      this.totalPrice()
    },
    serviceTypeChange () {
      if (this.reqParams.PackageType === 0) {
        this.addType = true
      }
    },
    addTypeCancel () {
      this.reqParams.PackageType = 3
    },
    async addTypeonConfirm (val) {
      const res = await http.post('/BundleType', {
        BundleTypeName: val
      })
      if (res.data.Code === 100000) {
        this.getBundleType()
        this.reqParams.PackageType = res.data.Data
      }
    },
    async getItemList () {
      const res = await http.get('/ItemList')
      if (res.data.Code === 100000) {
        this.serviceItemList = res.data.Data
      }
    },
    async getBundleType () {
      const res = await http.get('/BundleType')
      if (res.data.Code === 100000) {
        this.BundleTypeList = res.data.Data
      }
    },
    async validateBeforeSubmit () {
      let res = await this.$validator.validateAll()
      if (res) {
        this.submitBtn = true
        let itemsInfoList = this.reqParams.itemsInfoList.slice(0)

        for (let i = 0; i < itemsInfoList.length; i++) {
          itemsInfoList[i].Price = itemsInfoList[i].Price * 100
        }

        let reqParams = {
          Price: this.reqParams.Price * 100,
          BundleViewPrice: this.reqParams.BundleViewPrice * 100,
          itemsInfoList: itemsInfoList,
          Name: this.reqParams.Name,
          PackageType: this.reqParams.PackageType,
          EffectiveValue: this.reqParams.EffectiveValue,
          EffectiveType: this.reqParams.EffectiveType,
          Count: this.reqParams.Count,
          Description: this.reqParams.Description
        }

        if (this.$route.params.id === 'add') {
          // 新增服务套餐
          this.postPackage(reqParams)
        } else {
          // 编辑服务套餐
          this.putPackage(reqParams)
        }
      } else {
        // 设置焦点到第一个未验证通过的表单元素
        let field = this.$validator.errors.items[0].field
        this.$validator.fields.items.map((i) => {
          if (i.name === field) {
            return i.el.focus()
          }
        })
      }
    },
    // 新增服务套餐
    async postPackage (reqParams) {
      const that = this
      const res = await http.post('/Bundle', reqParams)
      if (res.data.Code === 100000) {
        this.$vux.toast.show('提交成功')
        that.$router.back()
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 编辑服务套餐
    async putPackage (reqParams) {
      const that = this
      const res = await http.put(`/Bundle?packageID=${this.$route.params.id}`, reqParams)
      if (res.data.Code === 100000) {
        this.$vux.toast.show('提交成功')
        that.$router.back()
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.weui-form {
  min-height: 100vh;
  background: #f8f8f8;
}

.iconfont {
  color: #f8a519
}

.service-item_list {
  padding: 0 15px 50px;
  li {
    position: relative;
    display: flex;
    padding: 15px 0;
    align-items: center;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #d9f7f5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
    .poster {
      display: block;
      width: 28px;
      margin-right: 10px;
    }
    .title {
      flex: 1;

    }
  }
}

.weui-cell-add {
  display: flex;
  border-left: 3px solid #3ecccc;
  margin-bottom: 5px;
  margin: 10px 0;
  padding: 0 10px;
  .title {
    flex: 1;
  }
  .mid {
    width: 200px;
    display: flex;
    align-items: center;
    input {
      width: 40px;
      background: #e5e5e5;
      margin: 0 5px;
      color: #3ecccc;
      border-radius: 2px;
      height: 20px;
      line-height: 1;
      padding: 0 5px;
      text-align: center;
    }
  }
  .delete {
    color: #FF5722;
  }
}
</style>
