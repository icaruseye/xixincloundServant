<template>
  <div>
    <div class="agreement_container" v-if="agreement != null">
      <h1 class="agreement_title">{{agreement.Title}}</h1>
      <div class="agreement_context_container" v-html="agreement.Content"></div>
    </div>
    <xx-occupied-box v-else>
      没有找到相应的协议
    </xx-occupied-box>
  </div>
</template>
<script>
export default {
  computed: {
    ID () {
      return this.$route.params.id
    },
    shopID () {
      return this.$route.query.shopID
    }
  },
  data () {
    return {
      agreement: null
    }
  },
  created () {
    this.getAgreement()
  },
  methods: {
    /**
     *  获取协议内容
     */
    async getAgreement () {
      let url = (this.shopID === undefined) ? `/ShopAgreement?protocalType=${this.ID}&itemID=0` : `/Agreement?type=${this.ID}&shopID=${this.shopID}`
      const res = await this.$http.get(url)
      if (res.data.Code === 100000 && res.data.Data != null) {
        this.agreement = res.data.Data
        document.title = res.data.Data.Title
      } else {
        document.title = '没有找到相应的协议'
      }
    }
  }
}
</script>
<style scoped>
  .agreement_container {
    padding: 20px;
    margin: 20px;
    background-color: #fff;
    border-radius: 5px;
  }
  .agreement_title
  {
    font-size: 18px;
    text-align: center;
  }
  .agreement_context_container
  {
    word-break: break-all;
    text-align: justify;
    margin-top: 20px
  }
  span
  {
    width: 100% !important;
  }
</style>

