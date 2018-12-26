<template>
  <div v-if="CertificateType" style="min-height:100vh;position:relative;padding-bottom:100px">
    <xx-go-back></xx-go-back>
    <div style="padding:20px;background-color: #fff">
      <h1 style="font-size: 18px;font-weight: normal;border-bottom: 1px solid #ddd;line-height:40px;margin-bottom: 20px">
        {{CertificateType.Name}}
      </h1>
      <div class="item_desc">
        头衔：{{CertificateType.Title}}
      </div>
      <div v-if="CertificateImgList.length > 0">
        <div class="certificateImg_box" v-for="(item, index) in CertificateImgList" :key="index">
          <xx-uploader
            :limit="1"
            :title = "item"
            ref = "uploaderRef"
            @onUpdate="onUpdate(index)"
          ></xx-uploader>
        </div>
      </div>
      <div  class="item_desc" v-else>
        不需要上传证件照片
      </div>
      <template v-if="CertificateType.DescriptionNames">
        <InputMulti ref="DescriptionsRef" v-model="reqParam.Descriptions" :labelNames="CertificateType.DescriptionNames"></InputMulti>
      </template>
      <div  class="item_desc" v-else>
        不需要填写证件信息
      </div>
    </div>
    <div class="step-btn">
      <button class="weui-btn" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import util from '@/plugins/util'
import { Group, XSwitch } from 'vux'
import InputMulti from '@/components/common/InputMulti'
export default {
  components: {
    Group,
    XSwitch,
    InputMulti
  },
  data () {
    return {
      CertificateType: null,
      reqParam: {
        Imgs: '',
        Descriptions: '',
        IsDefault: 0
      },
      authText: {
        Imgs: {
          text: '执业证照片'
        },
        isDefault: {
          required: false
        }
      }
    }
  },
  computed: {
    CertificateTypeID () {
      return this.$route.query.CertificateTypeID
    },
    CertificateImgList () {
      let list = []
      if (this.CertificateType.ImgNames) {
        list = this.CertificateType.ImgNames.split(',')
      }
      return list
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    init () {
      this.getCertificateTypeByID()
    },
    async getCertificateTypeByID () {
      const result = await this.$http.get(`/CertificateType/${this.CertificateTypeID}`)
      if (result.data.Code === 100000) {
        this.CertificateType = result.data.Data
      } else {
        this.$vux.toast(result.data.Msg)
      }
    },
    onUpdate () {
      const that = this
      let imglist = ''
      this.$refs.uploaderRef.map(item => {
        imglist += (item.guid[0] + ',')
      })
      that.reqParam.Imgs = imglist.substring(0, imglist.lastIndexOf(','))
    },
    async submit () {
      if (this.validateCertificateImgs() && this.validateCertificateDesc()) {
        this.submitPost()
      }
    },
    async submitPost () {
      const that = this
      const isValidate = util.validateForm(that.reqParam, that.authText)
      if (isValidate) {
        that.reqParam.CertificateTypeID = this.CertificateType.CertificateTypeID
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
    validateCertificateImgs () {
      if (this.$refs['uploaderRef']) {
        for (let index in this.$refs['uploaderRef']) {
          let item = this.$refs['uploaderRef'][index]
          if (item.guid[0] === undefined) {
            this.$vux.toast.text(`请上传${item.title}`)
            return false
          }
        }
      }
      return true
    },
    validateCertificateDesc () {
      if (this.$refs['DescriptionsRef']) {
        return this.$refs['DescriptionsRef'].validateParams()
      }
      return true
    }
  }
}
</script>

<style lang="less">
.item_desc
{
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}
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
