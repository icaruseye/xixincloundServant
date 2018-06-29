<template>
  <div>
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
    <div class="auth_state_container" v-if="userState === 1">
      身份证审核中
      <span class="auth_state_refresh" @click="updateUserAccountAndUserInfo">刷新</span>
    </div>
    <div class="panel">
        <template v-for="(item, index) in list">
          <div class="cell" :class="list.length !== index + 1 ? 'vux-1px-b' : ''" :key="index">
            <div class="cell-in">
              <div class="title"><span>{{item.Name}}</span></div>
              <button v-if="item.State === 2" class="btn" @click="toNext(item.ShopCertificateTypeID, item.ImgNums)">申请</button>
              <button v-if="item.State === 0" style="background-color:#F8A519" class="btn" @click="getCertificateType">等待审核</button>
              <button v-if="item.State === 1" style="background-color:#3eb94e" class="btn">审核通过</button>
              <button v-if="item.State === -1" style="background-color:#e15f63" class="btn" @click="toNext(item.ShopCertificateTypeID, item.ImgNums)" >审核驳回</button>
            </div>
          </div>
        </template>
    </div>
    <div class="weui-form-title">
      *以上执业资格证书审核通过任意一项后，即可申请 相关服务项，进行服务
    </div>
    <div class="step-btn"  v-if="userState === 0">
      <router-link to="/user/authstep2" class="weui-btn">上一步</router-link>
    </div>
    <div class="step-btn"  v-if="userState === 3">
      <router-link to="/user" class="weui-btn">进入主页</router-link>
    </div>
  </div>
</template>

<script>
import http from '@/api'
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
      'userState'
    ])
  },
  created () {
    this.updateUserAccountAndUserInfo()
    this.getCertificateType()
  },
  methods: {
    ...mapActions([
      'getUserAccount',
      'getUserInfo'
    ]),
    async updateUserAccountAndUserInfo () {
      await this.getUserAccount()
      await this.getUserInfo()
    },
    toNext (ShopCertificateTypeID, ImgNums) {
      this.$router.push(`/user/authstep3-1?ShopCertificateTypeID=${ShopCertificateTypeID}&ImgNums=${ImgNums}`)
    },
    async getCertificateType () {
      const res = await http.get('/CertificateType')
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
.panel {
  margin-top: 10px;
  background: #fff;
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
