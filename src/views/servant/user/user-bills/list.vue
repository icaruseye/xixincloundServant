<template>
  <div v-if="WalletLogList" class="list_warp">
    <list-items
      v-for="(WalletLog, index) in WalletLogList"
      @click.native="redirectToDetail(`/user/bills/${WalletLog.ID}/detail`)"
      :key="index"
      :Amount="WalletLog.Amount"
      :Type="WalletLog.OperatingType"
      :CreateTime="WalletLog.CreateTime">
    </list-items>
  </div>
</template>
<script>
import ListItems from './components/listItems'
export default {
  components: {
    ListItems
  },
  data () {
    return {
      pageNumber: 1,
      WalletLogList: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getBills()
    },
    getBills () {
      this.$http.get(`/WalletLogList`, {
        page: this.pageNumber
      }).then(result => {
        if (result.data.Code === 100000) {
          this.WalletLogList = result.data.Data
        }
      })
    },
    redirectToDetail (url) {
      this.$router.push(url)
    }
  }
}
</script>
<style lang="less" scoped>
.list_warp
{
  margin-top: 20px;
  border: 1px solid #f6f6f6;
  border-left: none;
  border-right: none
}
</style>
