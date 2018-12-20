<template>
  <div style="padding: 0 0 120px 0">
    <xx-step-bar step="3">
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
    <div  v-if="userState === 1" class="auth_state_container">
      身份证审核中
      <span class="auth_state_refresh" @click="updateUserAccountAndUserInfo">刷新</span>
    </div>
    <div v-if="list.length > 0" style="padding: 20px 0">
      <div v-for="(item, index) in list" :key="index" class="certificate_card">
        <div class="certificate_name">
          {{item.Name}}
          <button class="apply_certificate_btn" v-if="item.State === 2" @click="toNext(item.ShopCertificateTypeID, item.ImgNums, item.ImgNames, item.Name)">申请</button>
          <p v-if="item.State === 0" style="color:#F8A519" class="certificate_status_text">审核中</p>
          <p v-if="item.State === -1" style="color:#e15f63" class="certificate_status_text">审核失败</p>
          <p v-if="item.State === 1" style="color:#3eb94e" class="certificate_status_text">审核通过</p>
        </div>
        <div v-if="item.State !== 2" class="content_container">
          <p>
            执业机构：{{item.CertificateNum}}
          </p>
          <p v-if="item.State === -1" style="color:#e15f63">
            失败原因：{{item.ErrorMsg}}
          </p>
          <p v-if="item.State === 1">
            到期时间：{{item.EffectiveTime | xxTimeFormatFilter}}
          </p>
        </div>
        <div v-if="item.State !== 2 " class="btn_container">
          <router-link class="certificate_btn" style="border-color:#3eb94e; color:#3eb94e" v-if="item.State === 1 && userState === 3" to = "/app/itemApply">服务设置</router-link>
          <button class="certificate_btn" v-if="item.State === 0 || item.State === 1" @click="getCertificateType">刷新状态</button>
          <button class="certificate_btn" style="border-color:#e15f63; color:#e15f63" v-if="item.State === -1" @click="toNext(item.ShopCertificateTypeID, item.ImgNums, item.ImgNames, item.Name)">重新申请</button>
        </div>
      </div>
    </div>
    <div v-else style="position: relative; height: 400px">
      <xx-occupied-box>
        当前没有可以申请的执业证书，请联系客服
      </xx-occupied-box>
    </div>
    <div class="weui-form-title" v-if="list.length > 0">
      *以上执业资格证书审核通过任意一项后，即可申请 相关服务项，进行服务
    </div>
    <div class="step-btn"  v-if="userState === 0">
      <router-link to="/user/authstep2" class="weui-btn">上一步</router-link>
    </div>
    <div class="step-btn" v-if="userState === 3">
      <router-link to="/user" class="weui-btn">进入主页</router-link>
    </div>
  </div>
</template>

<script>
import stepBar from './user-auth-stepbar'
import {mapGetters, mapActions} from 'vuex'
export default {
  components: {
    stepBar
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    ...mapGetters([
      'userState',
      'userAccount'
    ])
  },
  created () {
    this.getUserAccount()
    this.getUserInfo()
    this.getCertificateType()
  },
  methods: {
    ...mapActions([
      'getUserAccount',
      'getUserInfo'
    ]),
    async updateUserAccountAndUserInfo () {
      this.$vux.loading.show('加载中')
      await this.getUserAccount()
      await this.getUserInfo()
      this.$vux.loading.hide()
      if (this.userAccount.State === 2) {
        this.$router.push('/user/authstep2')
      }
    },
    toNext (ShopCertificateTypeID, ImgNums, ImgNames, Name) {
      this.$router.push(`/user/authstep3-1?ShopCertificateTypeID=${ShopCertificateTypeID}&ImgNums=${ImgNums}&ImgNames=${ImgNames}&Name=${Name}`)
    },
    async getCertificateType () {
      this.$vux.loading.show('加载中')
      const res = await this.$http.get('/CertificateType')
      this.$vux.loading.hide()
      this.list = res.data.Data
    }
  }
}
</script>

<style lang="less" scoped>
.auth_state_container
{
  position: relative;
  height: 40px;
  margin: 10px 40px;
  border: 1px solid #ffe58f;
  background-color: #fff1b8;
  color: #faad14;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  .auth_state_refresh
  {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: rgb(62, 185, 78);
  }
}
.certificate_card
{
  background: #fff;
  margin-bottom: 10px;
  .certificate_name
  {
    position: relative;
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    .apply_certificate_btn
    {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      height: 30px;
      background-color: #fff;
      padding: 0 20px;
      line-height: 30px;
      border: 1px solid #3BC8F6;
      border-radius: 20px;
      color: #3BC8F6;
      outline: none
    }
  }
  .certificate_status_text
  {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #999;
    line-height: 45px;
  }
  .content_container
  {
    padding: 10px 15px;
    background-color: RGBA(246, 246, 246, .8);
    p
    {
      font-size: 14px;
      color: #666;
      line-height: 25px;
    }
  }
  .btn_container
  {
    position: relative;
    height: 50px;
    padding: 10px 10px;
    box-sizing: border-box;
    .certificate_btn
    {
      float: right;
      height: 30px;
      background-color: #fff;
      padding: 0 15px;
      border: 1px solid #ddd;
      border-radius: 20px;
      color: #999;
      font-size: 14px;
      line-height: 30px;
      outline: none;
      margin-left: 15px;
      box-sizing: border-box
    }
  }
}
/////
.panel {
  margin-top: 10px;
}

.cell {
  padding: 30px 15px 0;
  color: #666;
  .cell-in {
    display: flex;
    align-items: center;
    padding: 0 0 10px 12px;
    .title {
      flex: 1;
      font-size: 16px;
      color: #666;
    }
    .btn {
      padding: 0 15px;
      min-width: 65px;
      height: 28px;
      color: #fff;
      border-radius: 2px;
      border: 0;
      font-size: 15px;
      background: #3BC8F6;
      outline: none;
      &.pass {
        background: #F8A519
      }
    }
  }
  &.vux-1px-b:after {
    left: 15px;
    right: 15px;
    border-color: #ccc;
    opacity: .5;
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
