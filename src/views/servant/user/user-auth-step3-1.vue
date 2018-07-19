<template>
  <div style="min-height:100vh;position:relative;padding-bottom:100px">
    <div style="padding:20px;background-color: #fff">
      <h1 style="font-size: 18px;font-weight: normal;border-bottom: 1px solid #ddd;line-height:40px;margin-bottom: 20px">
        {{Name}}认证
      </h1>
      <div class="certificateImg_box" v-for="(item, index) in CertificateImgList" :key="index">
        <xx-uploader
          :limit="1"
          :title = "item"
          ref = "uploaderRef"
          :maxSize="1024 * 1024 * 20"
          @onUpdate="onUpdate(index)"
        ></xx-uploader>
      </div>
    </div>
    <div class="weui-form-title">
      *{{Name}}信息
    </div>
    <div class="weui-form step-form">
      <div class="weui-cell nobor">
        <div class="weui-cell-top">
          <label for="CertificateNum">执业证编号</label>
          <input id="CertificateNum" v-model="reqParam.CertificateNum" type="text" :placeholder="`输入${Name}编号`">
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
      <!-- <group>
        <x-switch title="是否默认" v-model="reqParam.IsDefault" :value-map="[0, 1]"></x-switch>
      </group>
      <p style="padding: 15px 15px;font-size: 14px;color: #f44336;text-align: justify;">
        * 由于您可以申请认证多个证书，选择默认意为用户端展示您的默认身份
      </p> -->
    </div>
    <div class="step-btn">
      <button class="weui-btn" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import util from '@/plugins/util'
import { Group, XSwitch } from 'vux'
export default {
  components: {
    Group,
    XSwitch
  },
  data () {
    return {
      reqParam: {
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
  computed: {
    Name () {
      return this.$route.query.Name
    },
    ImgNames () {
      return this.$route.query.ImgNames
    },
    ShopCertificateTypeID () {
      return this.$route.query.ShopCertificateTypeID
    },
    CertificateImgList () {
      let list = this.ImgNames.split(',')
      return list
    }
  },
  mounted () {
    document.title = `${this.Name}认证`
  },
  methods: {
    onUpdate () {
      const that = this
      let imglist = ''
      this.$refs.uploaderRef.map(item => {
        imglist += (item.guid[0] + ',')
      })
      that.reqParam.Imgs = imglist.substring(0, imglist.lastIndexOf(','))
    },
    async submit () {
      const that = this
      await that.validateCertificateImgs().then(value => {
        if (value) {
          that.submitPost()
        } else {
          return value
        }
      })
    },
    async submitPost () {
      const that = this
      const isValidate = util.validateForm(that.reqParam, that.authText)
      if (isValidate) {
        that.reqParam.ShopCertificateTypeID = this.ShopCertificateTypeID
        const res = await that.$http.post('/ServantShopCertificate', that.reqParam)
        if (res.data.Code === 100000) {
          this.$vux.toast.show({
            text: '提交成功',
            onHide () {
              that.$router.push('/user/authstep3')
            }
          })
        } else {
          that.$vux.toast.text(res.data.Msg)
        }
      }
    },
    async validateCertificateImgs () {
      for (let index in this.$refs.uploaderRef) {
        let item = this.$refs.uploaderRef[index]
        if (item.guid[0] === undefined) {
          this.$vux.toast.text(`请上传${item.title}`)
          return false
        }
      }
      return true
    }
  }
}
</script>

<style lang="less">
.certificateImg_box
{
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  &:last-child
  {
    border-bottom: none
  }
}
.weui-uploader__hd
{
  font-size: 14px;
  height: 35px;
  color: #999;
  line-height: 35px;
  font-weight: normal;
}



.weui-form-title {
  padding: 10px 15px;
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
  position: fixed;
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
