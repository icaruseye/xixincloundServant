<template>
  <div>
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="false">
      <xx-tab v-model="currentTabIndex" active-color="#3AC7F5" custom-bar-width="25px">
        <xx-tab-item @on-item-click="onItemClick">投诉中</xx-tab-item>
        <xx-tab-item @on-item-click="onItemClick">已完成</xx-tab-item>
      </xx-tab>
    </sticky>
    <div class="weui-panel">
      <div v-for="(item, index) in list" :key="index" class="weui-cell">
        <div class="left">
          <div class="title">换药测试-换药</div>
          <div class="name">用户姓名:名好牛</div>
          <div class="time">投诉时间:2018-05-09</div>
        </div>
        <div class="right">
          <a href="javascript:;" class="btn" @click="modified(1)">修改</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sticky } from 'vux'
export default {
  components: {
    Sticky
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    currentTabIndex: {
      set () {
      },
      get () {
        console.log(this.$route.hash)
        return 0
      }
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      this.getList().then(value => {
        this.list = value.Data
      })
    },
    async getList () {
      const res = await this.$http.get('/Complaint/GetAll')
      return res.data
    },
    modified (id) {
      this.$router.push(`/user/complaint/${id}`)
    },
    onItemClick (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
.weui-panel {
  margin-top: 0;
}
.weui-cell {
  display: flex;
  align-items: center;
  .left {
    flex: 1;
    line-height: 1.8;
    .title {
      font-size: 14px;
      color: #333;
    }
    .name {
      font-size: 12px;
      color: #666;
    }
    .time {
      font-size: 12px;
      color: #f8a519;
    }
  }
  .right {
    .btn {
      padding: 4px 10px;
      font-size: 14px;
      color: #fff;
      background: #3ecccc;
      border-radius: 2px;
      border: 0;
    }
  }
}
</style>

