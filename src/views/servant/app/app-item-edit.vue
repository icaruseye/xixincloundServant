<template>
  <div class="weui-form">
    <div class="weui-cell-form-title">填写服务项目的信息</div>
    <xx-cell>
      <xx-cell-items label="服务包名称：" class="noraml_cell_right" labelClass="the-cells-items_label">
        <div class="input_control_container">
          {{templateDetail.Name}}
        </div>
      </xx-cell-items>
      <xx-cell-items label="真实售价：" class="noraml_cell_right" labelClass="the-cells-items_label">
        <div class="input_control_container">
          <div class="input_control_inner_box">
            <input @blur="priceBlur" class="input_control" type="Number" v-model="templateDetail.Price" v-validate="'currency|required'" name="Price" placeholder="请输入真实售价">
          </div>
          <span class="input_control_suffix">元</span>
          <p v-show="errorBags.has('Price')" class="help is-danger">{{ errorBags.first('Price') }}</p>
        </div>
      </xx-cell-items>
      <xx-cell-items label="展示价格：" class="noraml_cell_right" labelClass="the-cells-items_label">
        <div class="input_control_container">
          <div class="input_control_inner_box">
            <input readonly class="input_control" type="Number" v-model="ViewPrice" v-validate="'currency|required'" name="PackageViewPrice" placeholder="请输入展示价格">
          </div>
          <span class="input_control_suffix">元</span>
          <p v-show="errorBags.has('PackageViewPrice')" class="help is-danger">{{ errorBags.first('PackageViewPrice') }}</p>
        </div>
      </xx-cell-items>
      <xx-cell-items label="库存数量：" class="noraml_cell_right" labelClass="the-cells-items_label">
        <div class="input_control_container">
          <div class="input_control_inner_box">
            <input class="input_control" type="Number" v-model="reqParams.Count" v-validate="'required|min_value:1|max_value:500'" name="Count" placeholder="请输入库存数量">
          </div>
          <span class="input_control_suffix"></span>
          <p v-show="errorBags.has('Count')" class="help is-danger">{{ errorBags.first('Count') }}</p>
        </div>
      </xx-cell-items>
      <xx-cell-items label="有效期单位：" class="noraml_cell_right" @click.native="expiryUnitVisable = true" labelClass="the-cells-items_label">
        <div class="input_control_container">
          <p class="EffectiveValue_select">{{EffectiveType | expiryUnitFilter}}</p>
        </div>
      </xx-cell-items>
      <xx-cell-items label="有效期时长：" class="noraml_cell_right" labelClass="the-cells-items_label">
        <div class="input_control_container">
          <div class="input_control_inner_box">
            <input class="input_control" type="Number" v-model="reqParams.EffectiveValue" v-validate="'required|min_value:1|max_value:500'" name="EffectiveValue" placeholder="请输入有效期时长">
          </div>
          <span class="input_control_suffix" @click="expiryUnitVisable = true">{{EffectiveType | expiryUnitFilter}}</span>
          <p v-show="errorBags.has('EffectiveValue')" class="help is-danger">{{ errorBags.first('EffectiveValue') }}</p>
        </div>
      </xx-cell-items>
      <xx-cell-items label="服务介绍：" class="noraml_cell_right" labelClass="the-cells-items_label">
        <div class="input_control_container">
          <div class="input_control_inner_box">
            <textarea class="textarea_control"  v-model="templateDetail.Content"  v-validate="'required'" name="PackageDescription" placeholder="请输入服务包介绍"></textarea>
          </div>
          <span class="input_control_suffix"></span>
          <p v-show="errorBags.has('PackageDescription')" class="help is-danger">{{ errorBags.first('PackageDescription') }}</p>
        </div>
      </xx-cell-items>
      <xx-cell-items labelClass="the-cells-items_label">
        <button type="button" class="weui-btn weui-btn_primary" @click="submit" :disabled="submitBtn">{{submitBtnText}}</button>
      </xx-cell-items>
    </xx-cell>
    
    <popup v-model="expiryUnitVisable">
      <popup-header
        left-text="取消"
        @on-click-left="expiryUnitVisable = false"
        title="请选择有效期单位"
        :show-bottom-border="false"
      >
      </popup-header>
      <group style="padding: 0 0 45px 0">
        <radio title='有效期单位：' :options="expiryUnitList" v-model="EffectiveType" @on-change="expiryUnitVisable = false"></radio>
      </group>
    </popup>
  </div>
</template>

<script>
import { TransferDom, XTextarea, XInput, Group, Radio, Popup, PopupHeader, Confirm, Cell } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    XInput,
    Confirm,
    Popup,
    PopupHeader,
    XTextarea,
    Radio,
    Cell
  },
  filters: {
    expiryUnitFilter (val) {
      switch (val) {
        case 1:
          return '年'
        case 2:
          return '月'
        case 3:
          return '日'
      }
    }
  },
  data () {
    return {
      expiryUnitVisable: false,
      EffectiveType: 1,
      submitBtnText: '',
      expiryUnitList: [
        {
          key: 1,
          value: '年'
        },
        {
          key: 2,
          value: '月'
        },
        {
          key: 3,
          value: '日'
        }
      ],
      templateDetail: {},
      ViewPriceTemp: null,
      submitBtn: false,
      reqParams: {
        EffectiveValue: 1, // 有效期值
        EffectiveType: 1, // 有效期单位
        Count: 10 // 库存
      }
    }
  },
  computed: {
    templateID () {
      return this.$route.params.id
    },
    ViewPrice: {
      get () {
        if (this.ViewPriceTemp !== null) {
          return this.ViewPriceTemp
        } else {
          return ((Math.ceil((this.templateDetail.Price * 1.2 * 100)).toFixed(2)) / 100)
        }
      },
      set (val) {
        this.ViewPriceTemp = val
      }
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    sessionStorage.removeItem('packageServiceDetail')
  },
  methods: {
    priceBlur () {
      let parsePrice = parseFloat(this.templateDetail.Price)
      this.templateDetail.Price = (isNaN(parsePrice) ? 0 : parsePrice)
    },
    async init () {
      let packageDetail = JSON.parse(sessionStorage.getItem('packageServiceDetail'))
      if (packageDetail) {
        console.log(packageDetail)
        this.reqParams = packageDetail
        this.templateDetail = packageDetail
        this.EffectiveType = packageDetail.EffectiveType
        this.submitBtnText = '修改'
        document.title = '修改服务项'
      } else {
        document.title = '新增服务项'
        this.submitBtnText = '提交'
        await this.getData().then(value => {
          if (value.Code === 100000) {
            let tempData = value.Data
            this.templateDetail = {
              ID: tempData.ID,
              Name: tempData.Name,
              Price: tempData.Price / 100,
              PackageType: tempData.PackageType,
              Img: tempData.Img,
              State: tempData.State,
              UseType: tempData.UseType,
              Content: tempData.Content
            }
          }
        })
      }
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
      const that = this
      if (+that.$route.query.isAdd) {
        that.addSubmit()
      } else {
        that.editSubmit()
      }
    },
    async addSubmit () {
      const that = this
      let params = {
        TemplateID: +that.templateID,
        Name: that.templateDetail.Name,
        Price: parseInt((that.templateDetail.Price * 100).toFixed(0)),
        ViewPrice: parseInt((that.ViewPrice * 100).toFixed(0)),
        EffectiveValue: that.reqParams.EffectiveValue,
        EffectiveType: that.EffectiveType,
        Count: that.reqParams.Count,
        Description: that.templateDetail.Content
      }
      const res = await this.$validator.validateAll()
      if (res) {
        this.submitBtn = true
        const res = await this.$http.post('/CertificatePackage', params)
        this.submitBtn = false
        if (res.data.Code === 100000) {
          this.$vux.toast.show({
            text: '提交成功',
            onHide () {
              that.$router.back()
            }
          })
        } else if (res.data.Code === 300201) {
          this.$vux.confirm.show({
            title: '温馨提示',
            content: res.data.Msg,
            confirmText: '添加地址',
            onConfirm () {
              that.$router.push('/user/address')
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
      let params = {
        ID: that.templateDetail.ID,
        Name: that.templateDetail.Name,
        Price: parseInt((that.templateDetail.Price * 100).toFixed(0)),
        ViewPrice: parseInt((that.ViewPrice * 100).toFixed(0)),
        EffectiveValue: that.reqParams.EffectiveValue,
        EffectiveType: that.EffectiveType,
        Count: that.reqParams.Count,
        Description: that.templateDetail.Content
      }
      const res = await that.$validator.validateAll()
      if (res) {
        this.submitBtn = true
        that.$vux.loading.show('加载中')
        const res = await that.$http.put('/Package', params)
        that.submitBtn = false
        that.$vux.loading.hide()
        if (res.data.Code === 100000) {
          this.$vux.toast.show({
            text: '修改成功',
            onHide () {
              that.$router.back()
            }
          })
        } else {
          that.$vux.toast.text(res.data.Msg)
        }
      } else {
        that.$vux.loading.hide()
        // 设置焦点到第一个未验证通过的表单元素
        let field = that.$validator.errors.items[0].field
        that.$validator.fields.items.map((i) => {
          if (i.name === field) {
            return i.el.focus()
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
.weui-form {
  min-height: 100vh;
  background: #ffffff;
  padding-bottom: 100px;
}
.the-cells-items_label
{
  flex: 0 0 100px;
  height: 100%;
  text-align: right;
  font-size: 12px;
  color: #999;
  padding-right: 10px;
}
.input_control_container
{
  position: relative;
  display: flex;
  flex-flow: nowrap;
  .input_control_inner_box
  {
    flex: 1;
    .input_control,
    .textarea_control
    {
      background-color: #f8f8f8;
      font-size: 12px;
      color: #666;
      width: 100%;
      outline: none
    }
    .input_control
    {
      height: 45px;
      padding: 0 15px;
      box-sizing: border-box;
    }
  }
  .textarea_control
  {
    border: none;
    resize: none;
    padding: 15px;
    height: 100px;
    box-sizing: border-box
  }
  .input_control_suffix
  {
    flex: 0 0 25px;
    font-size: 14px;
    color: #999;
    padding: 0 10px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;

  }
  .help
  {
    position: absolute;
    font-size: 12px;
    top: -20px;
    height: 20px;
  }
  .help.is-danger
  {
    color: #ff0000;
  }
  .EffectiveValue_select
  {
    font-size: 14px;
    color: #666;
    padding:  0 15px
  }
}
</style>
