<template>
  <div>
    <!-- 筛选 -->
    <filtrate :list="list"></filtrate>
    <div class="weui-panel weui-list-panel">
      <div class="weui-cell">
        <div class="weui-cell-top">
          <div class="icon"><img src="@/assets/images/icon_tcmr.png" alt=""></div>
          <div class="name">图文问诊</div>
          <div class="btn">
            <button class="" @click="go(1)">申请</button>
          </div>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell-top">
          <div class="icon"><img src="@/assets/images/icon_tcmr.png" alt=""></div>
          <div class="name">图文问诊</div>
          <div class="btn">
            <button class="" disabled="disabled">已开通</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Filtrate from '@/components/common/filtrate'
export default {
  components: {
    Filtrate
  },
  data () {
    return {
      list: ['全部', '护士', '医生', '教师']
    }
  },
  methods: {
    go (id) {
      this.$router.push(`/app/itemEdit/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.weui-list-panel {
  padding: 49px 12px 0;
  .weui-cell {
    padding: 20px 0;
  }
  .weui-cell-top {
    display: flex;
    align-items: center;
    .icon {
      width: 29px;
      height: 29px;
    }
    .name {
      flex: 1;
      margin: 0 12px;
    }
    .btn {
      button {
        width: 50px;
        height: 23px;
        height: 23px;
        font-size: 14px;
        color: #fff;
        background: #F8A519;
        border: 0;
        border-radius: 2px;
      }
      button:disabled {
        background: #ccc;
      }
    }
  }
}
</style>
