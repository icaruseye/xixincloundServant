<template>
  <div style="min-height:100vh;position:relative;padding-bottom:100px">
    <div style="padding:20px;background-color: #fff">
      <h1 style="font-size: 18px;font-weight: normal;border-bottom: 1px solid #ddd;line-height:40px;margin-bottom: 20px">
        {{datail.Name}}
      </h1>
      <div class="certificateImg_box" v-for="(item, index) in CertificateImgList" :key="index">
        <xx-uploader
          :limit="1"
          :title = "item"
          ref = "uploaderRef"
          :maxSize="1024 * 1024 * 5"
          @onUpdate="onUpdate(index)"
        ></xx-uploader>
      </div>
    </div>
    <div class="weui-form-title">
      *{{datail.Name}}信息
    </div>
    <div class="weui-form step-form">
      <div class="weui-cell nobor">
        <div class="weui-cell-top">
          <label for="">{{datail.Name}}编号</label>
          <input v-model="reqParam.CertificateNum" type="text" :placeholder="`输入${datail.Name}编号`">
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
      datail: {
        Name: '学生证',
        ImgNames: '正面,反面'
      },
      uploadImg: null,
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
    ShopCertificateTypeID () {
      return this.$route.query.ShopCertificateTypeID
    },
    CertificateImgList () {
      let list = this.datail.ImgNames.split(',')
      return list
    }
  },
  methods: {
    onUpdate (index) {
      const that = this
      let imglist = ''
      that.uploadImg = null
      this.$refs.uploaderRef.map((item, index) => {
        console.log(item.title)
        that.uploadImg.push({
          title: item.title,
          value: !(item.guid[0] === undefined)
        })
        imglist += (item.guid[0] + ',')
      })
      that.reqParam.Imgs = imglist.substring(0, imglist.lastIndexOf(','))
    },
    async getData () {
      const res = await this.$http.get()
      return res.data
    },
    async submit () {
      const that = this
      const isValidate = util.validateForm(this.reqParam, this.authText)
      if (isValidate) {
        const res = await this.$http.post('/ServantShopCertificate', this.reqParam)
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
