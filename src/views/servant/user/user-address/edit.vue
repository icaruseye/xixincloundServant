<template>
  <div style="position:fixed;left:0;top:0;right:0;">
    <div class="form-panel addressEdit_container">
      <div class="weui-form-cell">
        <label class="label" for="xaddress">所在地区：</label>
        <x-address
          title=""
          id="xaddress"
          v-model="citys"
          class="address_select_control"
          :list="addressData"
          placeholder="请选择地址" 
          value-text-align="center" 
          :popup-style="{'z-index': 503}"
          >
        </x-address>
      </div>
      <div class="weui-form-cell">
          <label class="label" for="">详细地址：</label>
          <textarea v-model="SpecificAddress" class="textarea_control"  name="address" placeholder="请输入具体地址"></textarea>
      </div>
      <div class="weui-form-cell">
        <label class="label" for="" style="width:95px">标签：</label>
        <input v-model="Remark" name="tag" type="text" class="input_control" placeholder="请输入标签">
        <checker v-model="Remark" :radio-required="true" default-item-class="tags-item" selected-item-class="tags-item-selected">
          <checker-item value="机构">机构</checker-item>
          <checker-item value="医院">医院</checker-item>
          <checker-item value="其他">其他</checker-item>
        </checker>
      </div>
      <div class="weui-form-cell">
        <p class="weui-cell-top">
          <label class="label" for="" style="width:95px">是否默认：</label>
          <inline-x-switch v-model="IsDefault" :value-map="[0, 1]" :disabled="defaultOnly"></inline-x-switch>
        </p>
      </div>
    </div>
    <div class="delete_address_btn_box">
      <button v-if="id !== -1" class="delete_address_btn" @click="showRemove" :disbaled="removeBtn">删除此地址</button>
    </div>

    <div style="position: fixed;bottom: 0;width:100%;display:flex">
      <button type="button" class="weui-btn weui-btn_cancel" @click="cancel">取消</button>
      <button type="button" class="weui-btn weui-btn_primary" @click="save" :disabled="submitBtn">保存</button>
    </div>
    <div v-transfer-dom>
      <confirm v-model="isShowRemove"
      @on-confirm="removeAddress">
      <p>确定要删除该地址吗？</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import ChinaAddressV4Data from '@/plugins/datas/ChinaAddressV4Data.json'
import { Group, XAddress, Checker, CheckerItem, InlineXSwitch, Confirm, TransferDom } from 'vux'
import util from '@/plugins/util'
export default {
  directives: {
    TransferDom
  },
  components: {
    XAddress,
    Group,
    Checker,
    CheckerItem,
    InlineXSwitch,
    Confirm
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    defaultOnly: {
      type: Boolean,
      default: false
    },
    UserAddress: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    citys: {
      cache: false,
      get: function () {
        return this.modelAddress.cityTemp
      },
      set: function (val) {
        this.modelAddress.cityTemp = val
      }
    },
    SpecificAddress: {
      cache: false,
      get: function () {
        return this.modelAddress.SpecificAddress
      },
      set: function (val) {
        this.modelAddress.SpecificAddress = val
      }
    },
    Remark: {
      cache: false,
      get () {
        return this.modelAddress.Remark
      },
      set (val) {
        this.modelAddress.Remark = val
      }
    },
    IsDefault: {
      cache: false,
      get () {
        return this.modelAddress.IsDefault
      },
      set (val) {
        this.modelAddress.IsDefault = val
      }
    }
  },
  mounted () {
    this.modelAddress.cityTemp = (this.modelAddress.Province ? [this.modelAddress.Province, this.modelAddress.City, this.modelAddress.Area] : [])
  },
  data () {
    const that = this
    return {
      modelAddress: Object.assign({Remark: '', Province: '', City: '', Area: ''}, that.UserAddress),
      isShowRemove: false,
      submitBtn: false,
      removeBtn: false,
      addressData: ChinaAddressV4Data,
      address: '',
      authText: {
        IsDefault: {
          required: false
        },
        citys: {
          text: '所在地区',
          required: true
        },
        SpecificAddress: {
          text: '详细地址',
          required: true
        },
        Remark: {
          text: '标签',
          required: true
        }
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    showRemove () {
      this.isShowRemove = true
    },
    async removeAddress () {
      const that = this
      this.removeBtn = true
      const res = await this.$http.delete(`/ServantAddress?addressID=${this.id}`)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: '删除成功',
          time: 500,
          onHide () {
            that.removeBtn = false
            that.$emit('success')
          }
        })
      } else if (res.data.Code === 300201) {
        this.$vux.toast.text(res.data.Msg)
      } else {
        this.$vux.toast.show({
          text: '出错了，请重试'
        })
        this.submitBtn = false
      }
    },
    async save () {
      const that = this
      const isValidate = util.validateForm({
        citys: this.citys,
        IsDefault: this.IsDefault,
        SpecificAddress: this.SpecificAddress,
        Remark: this.Remark
      }, that.authText)
      if (isValidate) {
        this.submitBtn = true
        const UserAddress = {
          IsDefault: this.IsDefault,
          Province: this.citys[0],
          City: this.citys[1],
          Area: this.citys[2],
          SpecificAddress: this.SpecificAddress,
          Remark: this.Remark
        }
        const method = this.id === -1 ? 'post' : 'put'
        const url = this.id === -1 ? '/ServantAddress' : `/ServantAddress?addressID=${this.id}`
        const res = await this.$http.send(url, method, UserAddress)
        if (res.data.Code === 100000) {
          this.$vux.toast.show({
            text: '提交成功',
            time: 500,
            onHide () {
              that.submitBtn = false
              that.$emit('success')
            }
          })
        } else {
          this.$vux.toast.show({
            text: '出错了，请重试'
          })
          this.submitBtn = false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form-panel
{
  background-color: #fff;
  margin: 20px 10px;

}
// 地址编辑
.addressEdit_container
{
  .weui-form-cell
  {
    position: relative;
    min-height: 40px;
    padding-left: 120px;
    padding-right: 20px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    &::after
    {
      position: absolute;
      content: '';
      display: block;
      height: 1px;
      background-color: rgba(0,0,0,.1);
      left: 20px;
      right: 20px;
      bottom: 0;
      transform: scaleY(.5)
    }
    &:last-child::after
    {
      display: none;
    }
    .label
    {
      position: absolute;
      left: 0;
      top: 0;
      width: 100px;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      padding-left: 20px;
      color: #999
    }
    .input_control
    {
      height: 40px;
      width: 100%;
    }
    .textarea_control
    {
      width: 100%;
      border: none;
      resize: none;
      outline: none;
      height: 80px;
      padding: 10px 0
    }
  }
}
.delete_address_btn_box
{
  padding: 10px 20px;
  .delete_address_btn
  {
    display: block;
    height: 45px;
    border: none;
    font-size: 18px;
    color: #fff;
    width: 100%;
    border: 1px solid #f44336;
    color: #fff;
    border-radius: 5px;
    background: #f44336
  }
}
.weui-btn_cancel
{
  background-color: #ffc349
}
</style>
