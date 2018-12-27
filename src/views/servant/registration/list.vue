<template>
  <div class="wrapper" v-if="info.StartTime">
    <xx-go-back :url="goBackRedirect"></xx-go-back>
    <div class="date_info_wrap">
      <div class="date">{{info.StartTime | dateFormat('MM-DD')}}</div>
      <div class="week">星期{{info.StartTime | week}} {{info.StartTime | dateFormat('HH:mm')}} - {{info.EndTime | dateFormat('HH:mm')}}</div>
      <div class="count_wrap">
        <span>总号源： {{info.ReserveNum}}</span>
        <span>已挂号： {{info.AlreadyReserveNum}}</span>
        <span>余号： {{info.ReserveNum - info.AlreadyReserveNum}}</span>
      </div>
    </div>
    <div class="list_wrap">
      <div class="title">挂号列表</div>
      <ul>
        <template v-if="list.length > 0">
          <li class="item" :key="index" v-for="(item, index) in list">
            <div class="rank">第{{index + 1}}号</div>
            <div class="avatar" @click="to(item.UserID)">
              <img :src="item.Avatar | transformImgUrl" alt="">
            </div>
            <div class="name" @click="to(item.UserID)">{{item.NickName}}</div>
            <div class="btn" :class="item.State !== 0 ? 'finished' : ''" @click="SetRegisterationFinish(item.ID, item.State)">{{item.State | _State}}</div>
            <!-- <i class="iconfont icon-jiantouyou"></i> -->
          </li>
        </template>
        <xx-occupied-box v-else>
          暂无挂号信息
        </xx-occupied-box>
      </ul>
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
export default {
  data () {
    return {
      pageIndex: 1,
      list: [],
      info: {}
    }
  },
  filters: {
    week (val) {
      let text = ['日', '一', '二', '三', '四', '五', '六']
      return text[new Date(val).getDay()]
    },
    dateFormat (val, format = 'YYYY-MM-DD HH:mm:ss') {
      return dateFormat(new Date(val), format)
    },
    _State (val) {
      switch (val) {
        case -1:
          return '已删除'
        case 0:
          return '确认完成'
        case 1:
          return '已使用'
        case 2:
          return '已失效'
        case 4:
          return '已取消'
        default:
          break
      }
    }
  },
  computed: {
    goBackRedirect () {
      return this.$route.query.redirect || null
    },
    scheduleId () {
      return this.$route.params.id
    }
  },
  created () {
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      this.$vux.loading.show()
      const res = await this.$http.get(`/Registration/List?pageIndex=${this.pageIndex}&scheduleId=${this.scheduleId}`)
      if (res.data.Code === 100000) {
        console.log(res.data.Data)
        this.info = res.data.Data
        this.list = res.data.Data.RegistrationResponses
      }
      this.$vux.loading.hide()
    },
    async SetRegisterationFinish (id, state) {
      if (state !== 0) return
      const res = await this.$http.put(`/Registration/SetRegisterationFinish?registerID=${id}`)
      if (res.data.Code === 100000) {
        this.$vux.toast.text('已确认该挂号完成')
        this.getList()
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    to (id) {
      this.$router.push(`/customer/${id}/detail`)
    }
  }
}
</script>

<style lang="less" scoped>
.date_info_wrap {
  padding: 12px;
  height: 110px;
  box-sizing: border-box;
  background: linear-gradient(to right, #65D5F9, #9BC3F9);
  color: #fff;
  font-size: 12px;
  .date {
    font-size: 25px;
    font-weight: bold;
  }
  .week {
    margin-bottom: 10px;
  }
  .count_wrap {
    display: flex;
    justify-content: space-between;
  }
}
.list_wrap {
  .title {
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #666;
    background: #F6F6F6;
  }
  ul {
    background: #fff;
    padding: 0 12px;
  }
  .item {
    position: relative;
    padding: 15px 0;
    display: flex;
    align-items: center;
    font-size: 15px;
    &::after {
      content: " ";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      color: #d9f7f5;
      border-bottom: 1px solid #d9f7f5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
    &:last-child::after {
      display: none;
    }
    .btn {
      padding: 0 5px;
      height: 25px;
      line-height: 25px;
      font-size: 12px;
      background: #3AC7F5;
      color: #fff;
      border-radius: 2px;
      &.finished {
        background: #ccc;
      }
    }
    .rank {
      padding-right: 25px;
      color: #999;
      border-right: 1px solid #D8D8D8;
    }
    .avatar {
      margin: 0 16px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      overflow: hidden;
    }
    .name {
      flex: 1;
      color: #666;
    }
    .iconfont {
      color: #ccc;
    }
  }
}
</style>
