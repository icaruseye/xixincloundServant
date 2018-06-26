<template>
  <div style="padding-bottom: 100px">
    <xx-step-bar step="2">
      <xx-step-items slot="items">
        手机认证
      </xx-step-items>
      <xx-step-items slot="items">
        实名认证
      </xx-step-items>
      <xx-step-items slot="items">
        执业认证
      </xx-step-items>
      <xx-step-items slot="items">
        开始服务
      </xx-step-items>
    </xx-step-bar>
    <div class="weui-form step-form">
      <div class="weui-cell nobor">
        <div class="weui-cell-top">
          <label class="label" for="">姓名</label>
          <input v-model="reqParam.RealName" type="text" placeholder="请输入姓名">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell-top">
          <label class="label" for="">身份证号码</label>
          <input v-model="reqParam.IDCard" type="text" placeholder="请输入身份证号码">
        </div>
      </div>
    </div>
    <div class="weui-form-title">
      *上传身份证正反面照片
    </div>
    <div style="padding: 0 20px">
      <xx-uploader
      title="身份证正面"
      :limit="1"
      :maxSize="1024 * 1024 * 5"
      :imgList="imgList1"
      @onUpdate="onUpdate1"
    ></xx-uploader>
    <xx-uploader
      title="身份证背面"
      :limit="1"
      :maxSize="1024 * 1024 * 5"
      :imgList="imgList2"
      @onUpdate="onUpdate2"
    ></xx-uploader>
    </div>
    <div class="step-btn">
      <button class="weui-btn" @click="submit">下一步</button>
    </div>
  </div>
</template>

<script>
import stepBar from './user-auth-stepbar'
import util from '@/plugins/util'
export default {
  metaInfo: {
    title: '实名认证'
  },
  components: {
    stepBar
  },
  data () {
    return {
      count: 3,
      imgList1: [],
      imgList2: [],
      reqParam: {
        RealName: '',
        IDCard: '',
        IDCardImg: '',
        IDCardBackImg: ''
      },
      authText: {
        RealName: {
          text: '真实姓名',
          required: true
        },
        IDCard: {
          text: '身份证号码',
          required: true
        },
        IDCardImg: {
          text: '身份证正面',
          required: true
        },
        IDCardBackImg: {
          text: '身份证背面',
          required: true
        }
      }
    }
  },
  methods: {
    onUpdate1 (id) {
      this.reqParam.IDCardImg = id.toString()
    },
    onUpdate2 (id) {
      this.reqParam.IDCardBackImg = id.toString()
    },
    async submit () {
      const that = this
      const isValidate = util.validateForm(this.reqParam, this.authText)
      if (isValidate) {
        if (util.CheckIDCardNum(this.reqParam.IDCard)) {
          const res = await this.$http.put('/Info', this.reqParam)
          if (res.data.Code === 100000) {
            this.$vux.toast.show({
              text: '提交成功',
              onHide () {
                that.$store.dispatch('getAccount').then(() => {
                  that.$router.push('/user/authstep3')
                })
              }
            })
          } else {
            this.$vux.toast.text(res.data.Msg)
          }
        } else {
          alert('身份证格式不正确')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.step-form {
  margin-top: 10px;
  &.weui-form {
    .weui-cell {
      padding: 30px 15px 15px;
      &::before {
        border-color: #ccc;
        left: 15px;
        right: 15px;
        opacity: .5;
      }
    }
    .weui-cell-top {
      padding: 0 9px;
      input::-webkit-input-placeholder {
        color: #ccc
      }
    }
  }
}

.weui-form-title {
  padding: 10px 24px;
  color: #D4D4D4;
  font-size: 14px;
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
