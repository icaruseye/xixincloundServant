<template>
  <div class="wrapper">
    <div class="ac_detail_info">
      <div style="position: relative;top: -13px;">
        <img class="icon" :src="info.CoverPhoto | transformImgUrl" alt="">
      </div>
      <div class="content">
        <div class="title">{{info.ActivityName}}</div>
        <div class="price">￥{{info.PresentPrice | price}}元</div>
        <div class="date">{{info.StartTime | timeFormatFilter}}～{{info.EndTime | timeFormatFilter}}</div>
      </div>
      <img :src="info.StartTime | statusIcon" alt="" class="status">
    </div>
    <div class="ac_detail_list_title">
      <span>参与人数</span>
      <span><span style="color: #F8A519">{{info.UserResults.length}}</span>人</span>
    </div>
    <div class="ac_detail_list" v-if="info.UserResults.length > 0">
      <template v-for="(item, index) in info.UserResults">
        <div class="ac_detail_list_item" :key="index">
          <img :src="item.Avatar | transformImgUrl" alt="" class="avatar">
          <div class="name">{{item.NickName}}</div>
          <!-- <button class="btn">查看服务</button> -->
        </div>
      </template>
    </div>
    <xx-occupied-box v-else style="background: #fff">
      暂无用户参加次活动
    </xx-occupied-box>
  </div>
</template>

<script>
import util from '@/plugins/util'
export default {
  filters: {
    statusIcon (val) {
      if (new Date(util.timeFormatFilter(val, 'YYYY-MM-DD')).getTime() >= new Date(util.timeFormatFilter(new Date(), 'YYYY-MM-DD')).getTime()) {
        return require('@/assets/images/ic_yks.png')
      } else {
        return require('@/assets/images/ic_wks.png')
      }
    },
    timeFormatFilter (val) {
      return util.timeFormatFilter(new Date(val), 'YYYY/MM/DD')
    },
    price (val = 0) {
      return (val / 100).toFixed(2)
    }
  },
  data () {
    return {
      info: {
        UserResults: []
      }
    }
  },
  created () {
  },
  mounted () {
    this.getActivityUserList()
    console.log(new Date('2018-11-07').getTime())
    console.log(new Date(util.timeFormatFilter('2018-11-07T00:00:00+08:00', 'YYYY-MM-DD')).getTime())
  },
  methods: {
    async getActivityUserList () {
      const res = await this.$http.get(`/Activity-User-List?activityId=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        this.info = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ac_detail_info {
  display: flex;
  align-items: center;
  padding: 17px 20px 20px 17px;
  background: #fff;
  .icon {
    margin-right: 14px;
    width: 29px;
    height: 29px;
    border-radius: 4px;
  }
  .content {
    flex: 1;
    .title {
      font-size: 18px;
      color: #666;
      font-weight: bold;
    }
    .price {
      font-size: 15px;
      color: #FF5F5F;
    }
    .date {
      font-size: 12px;
      color: #999;
    }
  }
  .status {
    width: 50px;
    height: 50px;
  }
}


.ac_detail_list_title {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  background: #F6F6F6;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #666;
}

.ac_detail_list {
  padding: 0 12px;
  background: #fff;
  .ac_detail_list_item {
    display: flex;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid RGBA(0, 180, 171, .1);
    &:last-child {
      border: 0;
    }
    .avatar {
      margin-right: 16px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    .name {
      flex: 1;
      font-size: 15px;
      color: #666;
    }
    .btn {
      padding: 2px 8px;
      font-size: 13px;
      color: #3AC7F5;
      border: 1px solid #3AC7F5;
      border-radius: 2px;
      background: #fff;
    }
  }
}

</style>
