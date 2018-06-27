<template>
  <div>
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="true">
      <xx-tab v-model="modelOrderTabIndex" active-color="#3AC7F5" custom-bar-width="25px">
        <xx-tab-item @on-item-click="onItemClick">全部</xx-tab-item>
        <xx-tab-item @on-item-click="onItemClick">待付款</xx-tab-item>
        <xx-tab-item @on-item-click="onItemClick">已付款</xx-tab-item>
      </xx-tab>
    </sticky>
    <div v-if="list.length > 0" class="mt10px">
        <list-item v-for="(item, index) in list" :key="index"
          :PayTime="item.PayTime"
        ></list-item>
    </div>
    <xx-occupied-box v-else>
      {{occupiedText}}
    </xx-occupied-box>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
import { Sticky } from 'vux'
import ListItem from './components/listItem'
export default {
  components: {
    Sticky,
    ListItem
  },
  metaInfo: {
    title: '我的订单'
  },
  data () {
    return {
      list: [],
      occupiedText: ''
    }
  },
  computed: {
    ...mapGetters([
      'orderTabIndex'
    ]),
    modelOrderTabIndex: {
      get () {
        return this.orderTabIndex
      },
      set (val) {
        this.SET_ORDER_TAB_INDEX(val)
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapMutations([
      'SET_ORDER_TAB_INDEX'
    ]),
    onItemClick (id) {
      this.init()
      this.modelOrderTabIndex = id
    },
    async init () {
      let stateName = ''
      this.list = []
      this.occupiedText = '正在请求数据…'
      switch (this.modelOrderTabIndex) {
        case 0:
          stateName = '全部'
          await this.getWaitingPayOrderList()
          await this.getPayedOrderList()
          this.occupiedText = '订单列表空空如也'
          break
        case 1:
          stateName = '待付款'
          await this.getWaitingPayOrderList()
          this.occupiedText = '没有待付款的订单'
          break
        case 2:
          stateName = '已付款'
          await this.getPayedOrderList()
          this.occupiedText = '没有已付款的订单'
          break
      }
      this.$vux.loading.show('加载中')
      this.occupiedText = '正在请求数据…'
      this.occupiedText = `没有${stateName}的订单`
      this.$vux.loading.hide()
    },
    async getWaitingPayOrderList () {
      await this.getData('/UserOrder/WaitToPay').then(value => {
        this.list = this.list.concat(value.Data)
      })
    },
    async getPayedOrderList () {
      await this.getData('/UserOrder/Payed').then(value => {
        this.list = this.list.concat(value.Data)
      })
    },
    async getData (url) {
      const res = await this.$http.get(url)
      return res.data
    }
  }
}
</script>
