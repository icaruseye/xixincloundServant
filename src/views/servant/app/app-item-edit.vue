<template>
  <div class="weui-form">
    <div class="weui-cell-form-title">填写服务项目的信息</div>
    <div class="weui-cell nobor" style="background-color:#3ac7f5;color:#fff">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">服务包名称：</label>
          {{templateDetail.Name}}
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <x-input title = '真实售价：' v-model="templateDetail.Price" v-validate="'required'" name="Price" placeholder="请输入真实售价"></x-input>
      </div>
      <span v-show="errorBags.has('Price')" class="help is-danger">{{ errorBags.first('Price') }}</span>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <x-input title = '展示价格：' v-model="ViewPrice" v-validate="'required'" name="PackageViewPrice" placeholder="请输入展示价格"></x-input>
      </div>
      <span v-show="errorBags.has('PackageViewPrice')" class="help is-danger">{{ errorBags.first('PackageViewPrice') }}</span>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <x-input title = '库存数量：' v-model="reqParams.Count" v-validate="'required|min_value:1|max_value:500'" name="Count" placeholder="请输入库存数量"></x-input>
      </div>
      <span v-show="errorBags.has('Count')" class="help is-danger">{{ errorBags.first('Count') }}</span>
    </div>
    <div class="weui-cell">
      <popup-radio title='有效期单位：' :options="expiryUnitList" v-model="EffectiveValue">
        <p slot="popup-header" class="vux-1px-b popup_title">请选择有效期单位</p>
      </popup-radio>
      <span v-show="errorBags.has('EffectiveType')" class="help is-danger">{{ errorBags.first('EffectiveType') }}</span>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top" :class="{ 'control': true }">
          <x-input title = '有效期时长：' v-model="reqParams.EffectiveValue" v-validate="'required|min_value:1'" name="EffectiveValue" placeholder="请输入有效期时长"></x-input>
      </div>
      <span v-show="errorBags.has('EffectiveValue')" class="help is-danger">{{ errorBags.first('EffectiveValue') }}</span>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top">
          <x-textarea title="服务介绍：" placeholder="请输入服务包介绍" :show-counter="false" :rows="1" autosize v-model="templateDetail.Content"></x-textarea>
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
import { TransferDom, XTextarea, XInput, PopupRadio, Popup, Confirm } from 'vux'
export default {
  metaInfo: {
    title: '新增服务'
  },
  directives: {
    TransferDom
  },
  components: {
    XInput,
    Confirm,
    Popup,
    PopupRadio,
    XTextarea
  },
  data () {
    return {
      EffectiveValue: '年',
      expiryUnitList: [
        {
          key: '1',
          value: '年'
        },
        {
          key: '2',
          value: '月'
        },
        {
          key: '3',
          value: '日'
        }
      ],
      templateDetail: {},
      submitBtn: false,
      reqParams: {
        EffectiveValue: '', // 有效期值
        EffectiveType: 1, // 有效期单位
        Count: '' // 库存
      }
    }
  },
  computed: {
    templateID () {
      return this.$route.params.id
    },
    ViewPrice: {
      get () {
        return (this.templateDetail.Price * 1.2).toFixed(2)
      },
      set (val) {
        return val
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      await this.getData().then(value => {
        if (value.Code === 100000) {
          this.templateDetail = value.Data
        }
      })
    },
    /**
     * 获取服务项模板
     */
    async getData () {
      const res = await this.$http.get(`/ItemTemplate/${this.templateID}`)
      return res.data
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
        const res = await http.post('/CertificatePackage', {
          TemplateID: that.templateID,
          Name: that.templateDetail.Name,
          Price: that.templateDetail.Price * 100,
          ViewPrice: that.ViewPrice * 100,
          EffectiveValue: that.reqParams.EffectiveValue,
          EffectiveType: that.reqParams.EffectiveType,
          Count: that.reqParams.Count,
          Description: that.templateDetail.Content
        })
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
.popup_title {
  text-align: center;
  padding: 8px 0;
  height: 35px;
  line-height: 35px;
  color: #999;
  background-color: #fff
}
</style>
