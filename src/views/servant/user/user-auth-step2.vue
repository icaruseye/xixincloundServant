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
    <div style="padding: 20px 0;background-color:#fff" v-if="userAccount.State === 2">
      <p style="font-size: 18px;text-align:center;color:#333">审核驳回</p>
      <p style="font-size: 14px; text-align:center;margin-top:5px;color:#F8A519">驳回原因：{{userAccount.FailReason}}</p>
    </div>
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
    <p class="warring_text">
      * 服务者需保证提供的资料真实、准确、完整且合法有效。因提供的资料不合法、不真实、不准确、不完整的平台有权拒绝为服务者提供服务并删除该账号，且服务者需承担因此引起的相应责任及后果
    </p>
    <div style="padding: 40px 20px; background-color:#fff">
      <div class="weui-form-title">
        *上传身份证正面照片
      </div>
      <xx-uploader
      :limit="1"
      :maxSize="1024 * 1024 * 20"
      :imgList="imgList1"
      @onUpdate="onUpdate1"
    ></xx-uploader>
    <div class="weui-form-title">
      *上传身份证反面照片
    </div>
    <xx-uploader
      :limit="1"
      :maxSize="1024 * 1024 * 20"
      :imgList="imgList2"
      @onUpdate="onUpdate2"
    ></xx-uploader>
    </div>
    <div class="step-btn">
      <button class="weui-btn" :class="[submitLocked?'disabled_btn':'']" @click="submit">下一步</button>
    </div>
  </div>
</template>

<script>
import stepBar from './user-auth-stepbar'
import {mapActions, mapGetters} from 'vuex'
import util from '@/plugins/util'
export default {
  components: {
    stepBar
  },
  data () {
    return {
      count: 3,
      imgList1: [],
      imgList2: [],
      submitLocked: false,
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
  created () {
    this.updateUserAccountAndUserInfo()
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ])
  },
  methods: {
    ...mapActions([
      'getUserAccount',
      'getUserInfo'
    ]),
    async updateUserAccountAndUserInfo () {
      await this.getUserAccount()
      await this.getUserInfo()
      return true
    },
    onUpdate1 (id) {
      this.reqParam.IDCardImg = id.toString()
    },
    onUpdate2 (id) {
      this.reqParam.IDCardBackImg = id.toString()
    },
    async submit () {
      const that = this
      if (that.submitLocked) {
        return false
      }
      const isValidate = util.validateForm(this.reqParam, this.authText)
      if (isValidate) {
        if (util.CheckIDCardNum(this.reqParam.IDCard)) {
          that.submitLocked = true
          const res = await this.$http.put('/Info', this.reqParam)
          if (res.data.Code === 100000) {
            this.$vux.toast.show({
              text: '提交成功',
              onHide () {
                that.updateUserAccountAndUserInfo().then(() => {
                  that.submitLocked = false
                  that.$router.push('/user/authstep3')
                })
              }
            })
          } else {
            that.submitLocked = false
            this.$vux.toast.text(res.data.Msg)
          }
        } else {
          return this.$vux.toast.text('身份证格式不正确')
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
  padding: 10px 0;
  color: #999;
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
  .disabled_btn
  {
    background-color: #ccc
  }
}
.warring_text
{
  padding: 20px;
  font-size: 14px;
  color: #f44336;
  text-align: justify;
}
</style>
