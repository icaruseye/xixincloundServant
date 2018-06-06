<template>
  <div style="min-height:100vh;position:relative">
    <div class="weui-form">
      <uploader
        title="执业证照片"
        :limit="limit"
        :maxSize="1024 * 1024 * 2"
        @onUpdate="onUpdate1"
      ></uploader>
    </div>
    <div class="weui-form-title">
      *执业证信息
    </div>
    <div class="weui-form step-form">
      <div class="weui-cell nobor">
        <div class="weui-cell-top">
          <label for="">执业证编号</label>
          <input v-model="reqParam.CertificateNum" type="text" placeholder="输入执业证编号">
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
      <group>
        <x-switch title="是否默认" v-model="reqParam.IsDefault" :value-map="[0, 1]"></x-switch>
      </group>
    </div>
    <div class="step-btn">
      <button class="weui-btn" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import uploader from '@/components/common/uploader'
import Vue from 'vue'
import util from '@/plugins/util'
import http from '@/api'
import { ToastPlugin, Group, XSwitch } from 'vux'
Vue.use(ToastPlugin)
export default {
  components: {
    uploader,
    Group,
    XSwitch
  },
  data () {
    return {
      limit: +this.$route.query.ImgNums,
      reqParam: {
        ShopCertificateTypeID: this.$route.query.ShopCertificateTypeID,
        Imgs: '',
        CertificateNum: '',
        IsDefault: 0
      },
      authText: {
        Imgs: {
          text: '执业证照片',
          required: true
        },
        CertificateNum: {
          text: '执业证编号',
          required: true
        },
        isDefault: {
          required: false
        }
      }
    }
  },
  methods: {
    onUpdate1 (id) {
      this.reqParam.Imgs = id.toString()
    },
    async submit () {
      const that = this
      const isValidate = util.validateForm(this.reqParam, this.authText)
      if (isValidate) {
        const res = await http.post('/ServantShopCertificate', this.reqParam)
        if (res.data.Code === 100000) {
          this.$vux.toast.show({
            text: '提交成功',
            onHide () {
              that.$router.push('/user/authstep3')
            }
          })
        } else {
          this.$vux.toast.text(res.data.Msg)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.weui-form-title {
  padding: 10px 24px;
  color: #D4D4D4;
  font-size: 14px;
}

.step-form {
  &.weui-form {
    & > .weui-cell {
      padding: 30px 15px 15px;
      .weui-cell-top {
        padding: 0 9px;
        input {
          margin-left: 100px;
          overflow: hidden;
          color: #757575;
        }
        ::-webkit-input-placeholder {
          color: #ccc;
        }
        .iconfont {
          color: #ccc;
        }
        .datetime {
          flex: 1;
          margin-left: 100px;
          overflow: hidden;
          color: #757575;
          .vux-datetime-value {
            .vux-cell-placeholder {
              color: #ccc;
            }
          }
        }
      }
      &::before {
        border-color: #ccc;
        left: 15px;
        right: 15px;
        opacity: .5;
      }
    }
  }
}

.step-btn {
  position: absolute;
  bottom: 23px;
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  .weui-btn {
    padding: 0;
    background: #3BC8F6;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 16px;
  }
}
</style>
