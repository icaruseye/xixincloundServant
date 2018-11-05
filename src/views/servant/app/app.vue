<template>
  <div class="has-tabbar">
    <!-- <div class="vux-flexbox vux-flex-row">
      <div class="vux-flexbox-item cbox vux-1px-b vux-tap-active" style="flex: 0 0 33.3333%;" @click="go('contacts')">
        <div class="vux-1px-r cbox-inner">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tongxunlu"></use>
          </svg><br>
          <span>通讯录</span>
        </div>
      </div>
      <div class="vux-flexbox-item cbox vux-1px-b vux-tap-active" style="flex: 0 0 33.3333%;" @click="go('packageList')">
        <div class="vux-1px-r cbox-inner">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gongwenbao"></use>
          </svg><br>
          <span>服务包管理</span>
        </div>
      </div>
      <div class="vux-flexbox-item cbox vux-1px-b vux-tap-active" style="flex: 0 0 33.3333%;" @click="go('itemList')">
        <div class="cbox-inner">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangmu"></use>
          </svg><br>
          <span>服务项管理</span>
        </div>
      </div>
    </div> -->
    <!-- 面板信息 -->
    <div class="income-panel-wrap">
      <div class="income-panel">
        <template>
          <div class="item">
            <div class="row-1">
              <div class="title">本月服务收入</div>
              <div class="count">{{workSpaceData.ServiceIncome | moneyFilter}}</div>
            </div>
            <div class="row-2">
              <div class="title">本月服务数量</div>
              <div class="count">{{workSpaceData.MissionCount}}</div>
            </div>
          </div>
          <div class="item">
            <div class="row-1">
              <div class="title">本月推荐收入</div>
              <div class="count">{{workSpaceData.RecommendIncome | moneyFilter}}</div>
            </div>
            <div class="row-2">
              <div class="title">总出售服务包</div>
              <div class="count">{{workSpaceData.TotalSelledPackage}}</div>
            </div>
          </div>
          <div class="item">
            <div class="row-1">
              <div class="title">累计收入</div>
              <div class="count">{{workSpaceData.TotalIncome | moneyFilter}}</div>
            </div>
            <div class="row-2">
              <div class="title">总服务数</div>
              <div class="count">{{workSpaceData.TotalService}}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 列表 -->
    <div class="weui-panel weui-list-panel">
      <div class="weui-cell" @click="$router.push(`/customer`)">
        <div class="weui-cell-top">
          <div class="icon"><img src="@/assets/images/app-yhgl.png"></div>
          <div class="title">用户管理</div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
      <!-- <div class="weui-cell nobor">
        <div class="weui-cell-top">
          <div class="icon"><img src="@/assets/images/app-yhgl.png"></div>
          <div class="title">用户管理</div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div> -->
    </div>
    <div class="empty-bar"></div>
    <div class="weui-panel weui-list-panel">
      <div class="weui-cell" @click="go('/app/service')">
        <div class="weui-cell-top">
          <div class="icon"><img src="@/assets/images/app-ffsz.png"></div>
          <div class="title">服务设置</div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
      <div class="weui-cell" @click="go('/schedule')">
        <div class="weui-cell-top">
          <div class="icon"><img src="@/assets/images/app-pbsz.png"></div>
          <div class="title">排班设置</div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
    </div>
    <div class="empty-bar"></div>
    <div class="weui-panel weui-list-panel">
      <div class="weui-cell" @click="go('/article')">
        <div class="weui-cell-top">
          <div class="icon"><img src="@/assets/images/ic_app_wzsz.png"></div>
          <div class="title">文章设置</div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
      <!-- <div class="weui-cell" @click="go('/activity')">
        <div class="weui-cell-top">
          <div class="icon"><img src="@/assets/images/ic_app_hdsz.png"></div>
          <div class="title">活动设置</div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div> -->
    </div>
    <div class="empty-bar"></div>
    <div class="weui-panel weui-list-panel">
      <div class="weui-cell" @click="go('/app/activity')">
        <div class="weui-cell-top">
          <div class="icon"><img src="@/assets/images/ic_app_hdsz.png"></div>
          <div class="title">活动设置</div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
      <div class="weui-cell" @click="go('/app/push')">
        <div class="weui-cell-top">
          <div class="icon"><img src="@/assets/images/ic_app_ts.png"></div>
          <div class="title">推送设置</div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
      <div v-if="moduleSwitch.RegisterSwitch" class="weui-cell" @click="go('/app/registration')">
        <div class="weui-cell-top">
          <div class="icon"><img src="@/assets/images/app-ghsz.png"></div>
          <div class="title">挂号设置</div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
    </div>
    <xx-tabbar></xx-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { numberComma } from 'vux'
export default {
  computed: {
    ...mapGetters([
      'moduleSwitch'
    ])
  },
  data () {
    return {
      workSpaceData: {
        MissionCount: 0,
        RecommendIncome: 0,
        ServiceIncome: 0,
        TotalIncome: 0,
        TotalSelledPackage: 0,
        TotalService: 0
      }
    }
  },
  created () {
    this.getWorkSpaceData()
  },
  filters: {
    moneyFilter (val = 0) {
      if (val === 0) {
        return '0.00'
      }
      let amount = (val / 100).toFixed(2)
      if (amount < 10000) {
        return numberComma(amount)
      }
      if (amount < 100000000) {
        amount = (amount / 10000).toFixed(2)
        return numberComma(amount) + '万'
      }
      if (amount >= 100000000) {
        amount = (amount / 100000000).toFixed(2)
        return numberComma(amount) + '亿'
      }
      return '0.00'
    }
  },
  methods: {
    go (url) {
      this.$router.push(`${url}`)
    },
    getWorkSpaceData () {
      this.$http.get(`/WorkSpace`).then(result => {
        if (result.data.Code === 100000) {
          this.workSpaceData = result.data.Data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.has-tabbar {
  min-height: 100vh;
  box-sizing: border-box;
  background: #fff;
}

.income-panel-wrap {
  padding: 10px 7px 12px 7px;
  background: #F6F6F6;
}

.income-panel {
  display: flex;
  padding: 16px 0 14px 0;
  border-radius: 5px;
  box-shadow: 1px 1px 15px rgba(204, 204, 204, .5);
  background: linear-gradient(to right, #5ED3F9, #62D2F9, #9EC2FB);
  .item {
    flex: 1;
    color: #fff;
    text-align: center;
    .row-1 {
      margin-bottom: 24px;
    }
    .title {
      margin-bottom: 2px;
      font-size: 13px;
      opacity: .7;
    }
    .count {
      font-size: 20px;
    }
  }
}

.weui-list-panel {
  .weui-cell-top {
    display: flex;
    align-items: center;
    .icon {
      width: 31px;
      height: 31px;
    }
    .title {
      margin-left: 17px;
      flex: 1;
      color: #666;
      font-size: 16px;
    }
    .icon-jiantouyou {
      color: #ccc;
    }
  }
}

.empty-bar {
  height: 10px;
  background: #F6F6F6;
}
</style>
