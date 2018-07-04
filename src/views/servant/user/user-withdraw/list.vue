<template>
  <div>
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="true">
      <xx-tab v-model="modelWithDrawTabIndex" active-color="#3AC7F5" custom-bar-width="25px">
        <xx-tab-item @on-item-click="onItemClick">可提现</xx-tab-item>
        <xx-tab-item @on-item-click="onItemClick">提现中</xx-tab-item>
        <xx-tab-item @on-item-click="onItemClick">已提现</xx-tab-item>
      </xx-tab>
    </sticky>
    <div  v-if="list.length > 0" class="mt10px">
      <list-item v-for="(item, index) in list" 
        :key="index"
        :OrderInfo="item"
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
  data () {
    return {
      list: [],
      occupiedText: ''
    }
  },
  computed: {
    ...mapGetters([
      'withDrawTabIndex'
    ]),
    modelWithDrawTabIndex: {
      get () {
        return this.withDrawTabIndex
      },
      set (val) {
        this.SET_WITHDRAW_TAB_INDEX(val)
      }
    }
  },
  created () {
    this.init()
  },
  watch: {
    modelWithDrawTabIndex () {
      this.init()
    }
  },
  methods: {
    ...mapMutations([
      'SET_WITHDRAW_TAB_INDEX'
    ]),
    onItemClick (id) {
      this.modelWithDrawTabIndex = id
    },
    async init () {
      let url = ''
      let stateName = ''
      switch (this.modelWithDrawTabIndex) {
        case 0:
          url = '/ServantWithDrawRecordApplyList'
          stateName = '可提现'
          break
        case 1:
          url = '/ServantWithDrawRecordList'
          stateName = '提现中'
          break
        case 2:
          url = '/ServantWithDrawRecordPayedList'
          stateName = '已提现'
          break
      }
      this.$vux.loading.show('加载中')
      this.occupiedText = '正在请求数据…'
      await this.getData(url).then(value => {
        if (value.Code === 100000) {
          this.list = value.Data
        } else {
          this.$vux.toast.show(value.Msg)
        }
      })
      this.occupiedText = `没有${stateName}的订单`
      this.$vux.loading.hide()
    },
    async getData (url) {
      const res = await this.$http.get(url)
      return res.data
    }
  }
}
</script>
