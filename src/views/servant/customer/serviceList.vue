<template>
  <div v-if="orderList">
    <xx-go-back :url="`/customer/${userID}/detail`"></xx-go-back>
    <div v-if="orderList.length > 0">
      <section v-for="(order, orderIndex) in orderList" :key="orderIndex" class="order_sections">
        <div class="order_info">
          订单号：{{order.OrderCode}}
          <span style="float:right">下单时间：{{order.ConfirmTime | xxTimeFormatFilter('YYYY/MM/DD')}}</span>
        </div>
        <div class="service_items_container">
          <div class="service_items" v-for="(serviceItem, serviceIndex) in order.ServiceSetMealItems" :key="serviceIndex">
            <img class="service_items_icon" :src="serviceItem.UseType | xxMissionTypeIconFilter" alt="">
            <div class="service_items_name">{{serviceItem.ItemName}}</div>
            <div class="service_items_effectTime">到期时间：{{serviceItem.EffectTime | xxTimeFormatFilter('YYYY/MM/DD')}}</div>
            <span v-if="serviceItem.Surplus>0" style="color:rgb(58, 199, 245)" class="service_items_surplus">
                剩余：{{serviceItem.Surplus}}次
            </span>
            <span v-else class="service_items_surplus">
              无剩余次数
            </span>
          </div>
        </div>
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
      该用户没有可用的服务套餐
    </xx-occupied-box>
  </div>
</template>
<script>
export default {
  data () {
    return {
      orderList: null,
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
          this.orderList = [
            ...this.orderList,
            ...result.Data.ServiceSetMeals
          ]
        }
      })
    },
    init () {
      this.pageNumber = 1
      this.getList().then(result => {
        if (result.Code === 100000) {
          this.totalNumber = result.Data.Total
          this.orderList = result.Data.ServiceSetMeals
        }
      })
    },
    async getList () {
      const res = await this.$http.get(`/Attribute/ServiceSetMeal/List`, {
        userId: this.userID,
        index: this.pageNumber,
        size: this.pageSize
      })
      return res.data
    }
  }
}
</script>
<style lang="less" scoped>
.order_sections
{
  background-color: #fff;
  margin: 10px 5px;
  .order_info
  {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    font-size: 12px;
    color: #999;
    background-color: #fff;
    border-bottom: 1px solid #F8FCFC;
  }
}
.service_items_container
{
  padding: 10px;
  .service_items
  {
    position: relative;
    padding-left: 60px;
    height: 50px;
    border-bottom: 1px solid #F8FCFC;
    .service_items_icon
    {
      position: absolute;
      left: 15px;
      top: 50%;
      margin-top: -15px;
      width: 30px;
    }
    .service_items_name
    {
      height: 30px;
      line-height: 30px;
      color: #333;
      font-size: 16px;
    }
    .service_items_effectTime
    {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #999;
    }
    .service_items_surplus
    {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
