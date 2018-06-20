<template>
  <div>
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="true">
      <xx-tab v-model="currentTabIndex" active-color="#3AC7F5" custom-bar-width="25px">
        <xx-tab-item @on-item-click="onItemClick">投诉中</xx-tab-item>
        <xx-tab-item @on-item-click="onItemClick">已完成</xx-tab-item>
      </xx-tab>
    </sticky>
    <div class="weui-panel">
      <div v-for="(item, index) in list" :key="index" class="weui-cell">
        <div class="left">
          <img class="img_icon" src="@/assets/images/icon_tcmr.png" alt="">
        </div>
        <div class="right">
          <div class="title">
            {{item.ComplaintEntity.MissionName}}
            <span class="username">用户：{{item.ComplaintEntity.UserName}}</span>
          </div>
          <div class="desc">投诉原因:{{item.ComplaintEntity.UserComplaintTitle}}</div>
          <div class="time">投诉时间:{{item.ComplaintEntity.CreateTime | timeFormat}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sticky, dateFormat } from 'vux'
export default {
  components: {
    Sticky
  },
  data () {
    return {
      list: []
    }
  },
  filters: {
    timeFormat (value) {
      return dateFormat(new Date(value), 'YYYY-MM-DD HH:mm:ss')
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
  .left
  {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 100px;
    .img_icon {
      width: 50px;
      height: 50px;
    }
  }
  .right {
    flex: 1;
    line-height: 1.8;
    .title {
      font-size: 18px;
      color: #333;
      height: 30px;
      line-height: 30px;
      .username{
        float: right;
        font-size: 12px;
        color: #3AC7F5;
      }
    }
    .desc {
      font-size: 14px;
      color: #666;
    }
    .time {
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>

