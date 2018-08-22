<template>
  <div v-if="serviceList">
    <xx-go-back :url="`/customer/${userID}/detail`"></xx-go-back>
    <div v-if="serviceList.length > 0">
      <section class="service_section" v-for="(service, index) in serviceList" :key="index" @click="redirectToDetail(service.MissionId, service.UseType)">
        <img class="service_items_icon" :src="service.UseType | xxMissionTypeIconFilter" :alt="service.Name">
        <p class="service_name">{{service.Name}}</p>
        <p class="service_finishTime">
          {{service.FinishTime | xxTimeFormatFilter}}
          {{service.FinishTime | xxTimeFormatFilter('星期E')}}
        </p>
      </section>
      <div style="padding:20px 0;text-align:center;height:25px">
        <a v-if="totalPage > pageNumber" href="javascript:void(0)" style="color:#3AC7F5;line-height:25px" @click="loadNextPage">
          点击加载更多
        </a>
        <span v-else style="color:#999;font-szie:12px;line-height:25px">
          没有更多了
        </span>
      </div>
    </div>
    <xx-occupied-box v-else>
      还没有为该用户服务过哦！
    </xx-occupied-box>
  </div>
</template>
<script>
export default {
  data () {
    return {
      serviceList: null,
      pageNumber: 1,
      pageSize: 6,
      totalNumber: 0
    }
  },
  computed: {
    userID () {
      return this.$route.params.id
    },
    totalPage () {
      return Math.ceil(this.totalNumber / this.pageSize)
    }
  },
  created () {
    this.init()
  },
  methods: {
    loadNextPage () {
      this.pageNumber += 1
      this.getList().then(result => {
        if (result.Code === 100000) {
          this.totalNumber = result.Data.Total
          this.serviceList = [
            ...this.serviceList,
            ...result.Data.ServiceRecords
          ]
        }
      })
    },
    init () {
      this.getList().then(result => {
        if (result.Code === 100000) {
          this.totalNumber = result.Data.Total
          this.serviceList = result.Data.ServiceRecords
        }
      })
    },
    async getList () {
      const res = await this.$http.get(`/Attribute/ServiceRecord/List`, {
        userId: this.userID,
        index: this.pageNumber,
        size: this.pageSize
      })
      return res.data
    },
    redirectToDetail (id, UseType = 0) {
      switch (UseType) {
        case 2:
          this.$router.push(`/consult/${id}/detail`)
          break
        default:
          this.$router.push(`/mission/waitreceive/${id}`)
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.service_section
{
  position: relative;
  padding: 10px 10px 10px 60px;
  margin-top: 10px;
  background-color: #fff;
  .service_items_icon
  {
    position: absolute;
    position: absolute;
    left: 15px;
    top: 50%;
    margin-top: -15px;
    width: 30px;
  }
  .service_name
  {
    font-size: 16px;
    color: #333;
    height: 30px;
    line-height: 30px;
  }
  .service_finishTime
  {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #999;
  }
}
</style>
