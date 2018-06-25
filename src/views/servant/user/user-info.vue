<template>
  <div class="weui-form">
    <div class="weui-cell-form-title">编辑个人信息</div>
    <div class="weui-cell nobor">
      <div class="weui-cell-top" style="align-items:center">
        <label class="label" for="">头像</label>
        <xx-uploader
          style="flex:1"
          class="upload"
          :isAvatar="true"
          :maxSize="1024 * 1024 * 2"
          :imgList="avatarUrl"
          @onUpdate="onUpdate5"
        ></xx-uploader>
        <i class="iconfont icon-jiantouyou"></i>
    </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top">
        <label class="label" for="">昵称</label>
        <input v-model="reqParam.nickname" name="nickname" type="text" placeholder="请输入昵称">
    </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top">
        <label class="label" for="email">个人介绍</label>
        <textarea v-model="reqParam.Introduction" name="intro" placeholder="请输入个人介绍"></textarea>
      </div>
    </div>
    <div class="weui-cell-form-title">已认证信息</div>
    <div class="weui-cell nobor">
      <div class="weui-cell-top">
          <label class="label" for="">手机号码</label>
          <div>{{ServantInfo.Mobile}}</div>
      </div>
    </div>
    <div class="weui-cell nobor">
      <div class="weui-cell-top">
        <label class="label" for="">真实姓名</label>
        <div>{{ServantInfo.RealName}}</div>
      </div>
    </div>
    <div class="weui-cell nobor">
      <div class="weui-cell-top">
        <label class="label" for="">身份证号码</label>
        <div>{{ServantInfo.IDCard}}</div>
      </div>
    </div>
    <div class="weui-cell nobor">
        <div class="weui-cell-top">
        <label class="label" for="">出生日期</label>
        <div>{{birthday}}</div>
      </div>
    </div>
    <div class="weui-cell nobor">
      <div class="weui-cell-top">
        <label class="label" for="">年龄</label>
        <div>{{age}}</div>
      </div>
    </div>
    <div class="weui-cell nobor">
      <div class="weui-cell-top">
        <label class="label" for="">性别</label>
        <div>{{gender}}</div>
      </div>
    </div>
    <div class="weui-cell nobor">
      <div class="weui-cell-top">
        <label class="label" for="">身份证正面</label>
        <div><img style="width:150px;" :src="ServantInfo.IDCardImg | transformImgUrl" ></div>
      </div>
    </div>
    <div class="weui-cell nobor">
      <div class="weui-cell-top">
        <label class="label" for="">身份证反面</label>
        <div><img style="width:150px;" :src="ServantInfo.IDCardBackImg | transformImgUrl" ></div>
      </div>
    </div>
    <div class="weui-cell nobor">
      <a class="weui-btn weui-btn_primary" @click="validateBeforeSubmit" :disabled="submitBtn">保存</a>
    </div>
  </div>
</template>

<script>
import http from '@/api/index'
import util from '@/plugins/util'
export default {
  data () {
    return {
      submitBtn: false,
      ServantInfo: {
        RealName: '',
        IDCard: '',
        Mobile: '',
        IDCardImg: '',
        IDCardBackImg: ''
      },
      authText: {
        nickname: {
          required: true,
          text: '昵称'
        },
        Introduction: {
          required: false
        }
      },
      reqParam: {
        Introduction: JSON.parse(sessionStorage.getItem('userAccount')).Description || '',
        nickname: JSON.parse(sessionStorage.getItem('userAccount')).NickName,
        Avatar: ''
      },
      gender: '',
      birthday: '',
      age: '',
      avatarUrl: [{
        url: JSON.parse(sessionStorage.getItem('userAccount')).Avatar
      }]
    }
  },
  computed: {
    currentAvatar () {
      return JSON.parse(sessionStorage.getItem('userAccount')).Avatar
    }
  },
  created () {
    http.get('/Info').then((res) => {
      const id = res.data.Data.IDCard
      this.ServantInfo = res.data.Data
      this.birthday = id.substr(6, 4) + '-' + id.substr(10, 2) + '-' + id.substr(12, 2)
      this.age = new Date().getFullYear() - id.substr(6, 4)
      if (util.getGender(id)) {
        this.gender = '男'
      } else {
        this.gender = '女'
      }
    })
  },
  methods: {
    onUpdate5 (value) {
      let imgsStr = ''
      value.map((item) => {
        imgsStr += item + ','
      })

      this.reqParam.Avatar = imgsStr.substring(0, imgsStr.lastIndexOf(','))
    },
    async validateBeforeSubmit () {
      const that = this
      const isValidate = util.validateForm(this.reqParam, this.authText)
      if (isValidate) {
        this.submitBtn = true
        const res = await http.put('/Account', this.reqParam)
        if (res.data.Code === 100000) {
          this.$vux.toast.show({
            text: '提交成功',
            onHide () {
              that.$store.dispatch('getAccount').then(() => {
                that.$router.back()
              })
            }
          })
        } else {
          this.submitBtn = false
        }
      }
    }
  }
}
</script>

<style lang="less">
.form-panel {
  .weui-cells {
    margin-top: 0;
  }
  .upload {
    flex: 1;
    .weui-xx-uploader__input-box,
    .weui-xx-uploader__file {
      margin-right: 15px;
      float: right;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      overflow: hidden;
    }
  }
  .icon-jiantouyou {
    color: @yellow;
  }
}
</style>
