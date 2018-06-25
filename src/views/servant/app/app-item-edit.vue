<template>
  <div class="weui-form">
    <div class="weui-cell-form-title">填写服务套餐信息</div>
    <div class="weui-cell nobor">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">服务包名称</label>
          {{reqParams.Name}}
      </div>
      <span v-show="errorBags.has('PackageName')" class="help is-danger">{{ errorBags.first('PackageName') }}</span>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">真实售价</label>
          <input v-model="reqParams.Price" @blur="countPrice" v-validate="'required'" name="Price" type="text" placeholder="请输入真实售价">
      </div>
      <span v-show="errorBags.has('Price')" class="help is-danger">{{ errorBags.first('Price') }}</span>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">展示价格</label>
          <input v-model="reqParams.ViewPrice" v-validate="'required'" name="PackageViewPrice" type="text" placeholder="请输入展示价格">
      </div>
      <span v-show="errorBags.has('PackageViewPrice')" class="help is-danger">{{ errorBags.first('PackageViewPrice') }}</span>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">库存数量</label>
          <input v-model="reqParams.Count" v-validate="'required|min_value:1|max_value:500'" name="Count" type="text" placeholder="请输入库存数量">
      </div>
      <span v-show="errorBags.has('Count')" class="help is-danger">{{ errorBags.first('Count') }}</span>
    </div>
    <div class="weui-cell">
      <popup-radio title="options" :options="options1" v-model="option1"></popup-radio>
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
      <button type="button" class="weui-btn weui-btn_primary" @click="submit" :disabled="submitBtn">提交</button>
    </div>
  </div>
</template>

<script>
import http from '@/api'
import { TransferDom,PopupRadio, Popup, Confirm } from 'vux'
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
      serviceItem: [],
      serviceType: 1,
      imgList1: [],
      uploadeId1: [],
      serviceItemList: [], // 服务项列表
      reqParams: {
        TemplateID: '',
        ID: '',
        Name: '',
        Price: '',
        ViewPrice: '',
        PackageTypeID: 1,
        EffectiveValue: '',
        EffectiveType: 1,
        Count: '',
        Description: '',
        PackageImg: '',
        ImageAllInOne: ''
      }
    }
  },
  mounted () {
    if (this.$route.params.id !== 'add') {
      this.getData()
    }
  },
  methods: {
    getData () {
      const info = this.setEffectiveType(JSON.parse(sessionStorage.getItem('packageDetail')))
      this.reqParams = Object.assign(this.reqParams, info)
      this.reqParams.Price = this.convertToyuan(this.reqParams.Price)
      this.reqParams.ViewPrice = this.convertToyuan(this.reqParams.ViewPrice * 1.2)
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
    countPrice () {
      this.reqParams.ViewPrice = this.Price * 1.2
    },
    convertToyuan (val) {
      return (val / 100).toFixed(2)
    },
    submit () {
      if (+this.$route.query.isAdd) {
        this.addSubmit()
      } else {
        this.editSubmit()
      }
    },
    async addSubmit () {
      const that = this
      const res = await this.$validator.validateAll()
      if (res) {
        this.submitBtn = true
        this.reqParams.Price = this.reqParams.Price * 100
        this.reqParams.ViewPrice = this.reqParams.PackageViewPrice * 100
        const res = await http.post('/CertificatePackage', this.reqParams)
        if (res.data.Code === 100000) {
          this.$vux.toast.show({
            text: '提交成功',
            onHide () {
              that.$router.back()
            }
          })
        } else {
          this.$vux.toast.text(res.data.Msg)
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
    async editSubmit () {
      const that = this
      const res = await this.$validator.validateAll()
      if (res) {
        this.submitBtn = true
        this.reqParams.Price = this.reqParams.Price * 100
        this.reqParams.ViewPrice = this.reqParams.PackageViewPrice * 100
        const res = await http.put('/Package', this.reqParams)
        if (res.data.Code === 100000) {
          this.$vux.toast.show({
            text: '提交成功',
            onHide () {
              that.$router.back()
            }
          })
        } else {
          this.$vux.toast.text(res.data.Msg)
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
      width: 40px;
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
