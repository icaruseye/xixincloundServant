<template>
  <div class="weui-form">
    <form action="">
      <div class="weui-cell">
        <p class="weui-cell-top" style="align-items:center">
            <label class="label" for="">头像</label>
            <uploader
              style="flex:1"
              class="upload"
              :isAvatar="true"
              :maxSize="1024 * 1024 * 2"
              :imgList="imgList5"
              @onUpdate="onUpdate5"
            ></uploader>
            <i class="iconfont icon-jiantouyou"></i>
        </p>
      </div>
      <div class="weui-cell">
        <p class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">昵称</label>
            <input v-model="nickname" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('nickname') }" name="nickname" type="text" placeholder="请输入昵称">
        </p>
        <span v-show="errors.has('nickname')" class="help is-danger">{{ errors.first('nickname') }}</span>
      </div>
      <div class="weui-cell">
        <p class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">真实姓名</label>
            <input v-model="ServantInfo.RealName" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('RealName') }" name="RealName" type="text" placeholder="请输入真实姓名">
        </p>
        <span v-show="errors.has('RealName')" class="help is-danger">{{ errors.first('RealName') }}</span>
      </div>
      <div class="weui-cell">
        <p class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">执业证编号</label>
            <input v-model="ServantInfo.ZhiyeNum" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('ZhiyeNum') }" name="ZhiyeNum" type="text" placeholder="请输入执业证编号">
        </p>
        <span v-show="errors.has('ZhiyeNum')" class="help is-danger">{{ errors.first('ZhiyeNum') }}</span>
      </div>
      <div class="weui-cell">
        <p class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">身份证号码</label>
            <input v-model="ServantInfo.IDCard" v-validate="'required|IDCard'" data-vv-validate-on="blur" @blur="calculate" :class="{'input': true, 'is-danger': errors.has('IDCard') }" name="IDCard" type="text" placeholder="请输入身份证号码">
        </p>
        <span v-show="errors.has('IDCard')" class="help is-danger">{{ errors.first('IDCard') }}</span>
      </div>
      <div class="weui-cell">
        <p class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">出生日期</label>
            <input v-model="birthday" name="birthday" type="text" readonly placeholder="根据身份证自动计算">
        </p>
      </div>
      <div class="weui-cell">
        <p class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">年龄</label>
            <input v-model="age" name="age" type="text" readonly placeholder="根据身份证自动计算">
        </p>
      </div>
      <uploader
        title="执业证正面"
        :limit="1"
        :maxSize="1024 * 1024 * 5"
        :imgList="imgList1"
        @onUpdate="onUpdate1"
      ></uploader>
      <div class="weui-cell-upload">
        <p class="weui-cell-top" :class="{ 'control': true }">
          <input v-model="ZhiyeNumImg" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('ZhiyeNumImg') }" name="ZhiyeNumImg" type="hidden">
        </p>
        <span v-show="errors.has('ZhiyeNumImg')" class="help is-danger">{{ errors.first('ZhiyeNumImg') }}</span>
      </div>
      <uploader
        title="执业证背面"
        :limit="2"
        :maxSize="1024 * 1024 * 2"
        :imgList="imgList2"
        @onUpdate="onUpdate2"
      ></uploader>
      <uploader
        title="身份证正面"
        :limit="1"
        :maxSize="1024 * 1024 * 4"
        :imgList="imgList3"
        @onUpdate="onUpdate3"
      ></uploader>
      <uploader
        title="身份证背面"
        :limit="1"
        :maxSize="1024 * 1024 * 2"
        :imgList="imgList4"
        @onUpdate="onUpdate4"
      ></uploader>
      <div class="weui-cell">
        <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="email">个人介绍</label>
          <textarea name="intro" placeholder="请输入个人介绍" v-model="ServantInfo.Description"></textarea>
        </p>
      </div>
      <div class="weui-cell">
        <a class="weui-btn weui-btn_primary" @click="validateBeforeSubmit">保存</a>
      </div>
    </form>
  </div>
</template>

<script>
import http from '@/api/index'
import uploader from '@/components/common/uploader'
export default {
  components: {
    uploader
  },
  data () {
    return {
      ServantInfo: {
        ID: '',
        nickname: '',
        RealName: '',
        ZhiyeNum: '',
        IDCard: '',
        ZiGeImg: '',
        ZiGeImg1: '',
        IDCardImg: '',
        IDCardBackImg: '',
        ServantTitleID: '',
        Description: '',
        Mobile: '',
        IsMobileChecked: '',
        State: ''
      },
      nickname: '',
      birthday: '',
      age: '',
      imgList1: [], // 图片上传回填数据
      imgList2: [],
      imgList3: [],
      imgList4: [],
      imgList5: [
        { url: 'http://xixincloud.com:6883/File/GetImage/' + JSON.parse(sessionStorage.getItem('GET_USER_INFO')).Avatar }
      ],
      ZhiyeNumImg: [], // 图片guid集合
      ZhiyeNumImgBack: ['5ade4697ce3fab1f7c191f0d'],
      IDCardImg: [],
      IDCardImgBack: [],
      intro: '',
      nicknameFocus: false
    }
  },
  created () {
    const that = this
    http.get('/Servant/Info').then((res) => {
      that.ServantInfo = res.data.Data
      that.imgList1 = that.insertImgList(that.ServantInfo.ZiGeImg)
    })
  },
  methods: {
    onUpdate1 (id) {
      this.ZhiyeNumImg = id
    },
    onUpdate2 (id) {
      this.uploadId2 = id
    },
    onUpdate3 (id) {
      this.uploadId3 = id
    },
    onUpdate4 (id) {
      this.uploadId4 = id
    },
    onUpdate5 (id) {
      this.uploadId4 = id
    },
    insertImgList (origin) {
      const _origin = origin.split(' ')
      let res = []
      _origin.map((item) => {
        let obj = Object.assign({}, {
          url: '',
          progress: 100,
          status: 1,
          file: '',
          name: ''
        })
        obj.url = 'http://xixincloud.com:6883/File/GetImage/' + item
        res.push(obj)
      })
      return res
    },
    calculate () {
      const id = this.IDCard
      if (!id) return false
      this.birthday = id.substr(6, 4) + '-' + id.substr(10, 2) + '-' + id.substr(12, 2)
      console.log(this.birthday)
      this.age = new Date().getFullYear() - id.substr(6, 4)
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
