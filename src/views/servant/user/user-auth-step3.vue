<template>
  <div>
    <step-bar :list="stepInfo"></step-bar>
    <div class="panel">
        <template v-for="(item, index) in list">
          <div class="cell" :class="list.length !== index + 1 ? 'vux-1px-b' : ''" :key="index">
            <div class="cell-in">
              <div class="title"><span>{{item.Name}}</span></div>
              <button v-if="item.State === 2" class="btn" @click="toNext(item.ShopCertificateTypeID, item.ImgNums)">申请</button>
              <button v-if="item.State === 0" style="background-color:#F8A519" class="btn">待审核</button>
              <button v-if="item.State === 1" style="background-color:#3eb94e" class="btn">审核通过</button>
              <button v-if="item.State === -1" style="background-color:#e15f63" class="btn">审核驳回</button>
            </div>
          </div>
        </template>
    </div>
    <div class="weui-form-title">
      *以上执业资格证书审核通过任意一项后，即可申请 相关服务项，进行服务
    </div>
    <!-- <div class="step-btn">
      <button class="weui-btn">上一步</button>
    </div> -->
  </div>
</template>

<script>
import http from '@/api'
import stepBar from './user-auth-stepbar'
export default {
  components: {
    stepBar
  },
  data () {
    return {
      stepInfo: [{
        text: '手机认证',
        type: 1
      }, {
        text: '实名认证',
        type: 1
      }, {
        text: '执业认证',
        type: 1
      }, {
        text: '开始服务',
        type: 0
      }],
      list: []
    }
  },
  created () {
    this.getCertificateType()
  },
  methods: {
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
      width: 65px;
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
