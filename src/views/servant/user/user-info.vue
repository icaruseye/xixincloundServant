<template>
  <div class="weui-form">
    <div class="weui-cell-form-title">编辑个人信息</div>
    <div class="weui-cell nobor">
      <div class="weui-cell-top" style="align-items:center">
        <label class="label" for="">头像</label>
        <uploader
          style="flex:1"
          class="upload"
          :isAvatar="true"
          :maxSize="1024 * 1024 * 2"
          :imgList="avatarUrl"
          @onUpdate="onUpdate5"
        ></uploader>
        <i class="iconfont icon-jiantouyou"></i>
    </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top">
        <label class="label" for="">昵称</label>
        <input v-model="nickname" name="nickname" type="text" placeholder="请输入昵称">
    </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top">
        <label class="label" for="email">个人介绍</label>
        <textarea name="intro" placeholder="请输入个人介绍" v-model="Description"></textarea>
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
        <div><img style="width:150px;" :src="ServantInfo.IDCardImg | transformImgUrl" alt=""></div>
      </div>
    </div>
    <div class="weui-cell nobor">
      <div class="weui-cell-top">
        <label class="label" for="">身份证反面</label>
        <div><img style="width:150px;" :src="ServantInfo.IDCardBackImg | transformImgUrl" alt=""></div>
      </div>
    </div>
    <div class="weui-cell nobor">
      <a class="weui-btn weui-btn_primary" @click="validateBeforeSubmit">保存</a>
    </div>
  </div>
</template>

<script>
import http from '@/api/index'
import uploader from '@/components/common/uploader'
import util from '@/plugins/util'
export default {
  components: {
    uploader
  },
  data () {
    return {
      ServantInfo: {
        RealName: '',
        IDCard: '',
        Mobile: '',
        IDCardImg: '',
        IDCardBackImg: ''
      },
      Description: '',
      nickname: '',
      gender: '',
      birthday: '',
      age: '',
      avatarUrl: [{
        url: JSON.parse(sessionStorage.getItem('userAccount')).Avatar
      }]
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
    onUpdate5 (id) {
      this.uploadId4 = id
    },
    async validateBeforeSubmit () {
      let res = await this.$validator.validateAll()
      if (res) {
        console.log('验证通过')
      } else {
        // 设置焦点到第一个未验证通过的表单元素
        let field = this.$validator.errors.items[0].field
        this.$validator.fields.items.map(i => {
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
.form-panel {
  .weui-cells {
    margin-top: 0;
  }
  .upload {
    flex: 1;
    .weui-uploader__input-box,
    .weui-uploader__file {
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
