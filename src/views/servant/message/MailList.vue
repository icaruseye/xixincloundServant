<template>
  <div>
    <div>  
      <mail-list-item></mail-list-item>
      <mail-list-item></mail-list-item>
      <mail-list-item></mail-list-item>
    </div>
    <div class="mt10px">  
      <mail-list-item></mail-list-item>
      <mail-list-item></mail-list-item>
      <mail-list-item></mail-list-item>
    </div>
  </div>
</template>
<script>
import MailListItem from './components/MailListItem'
export default {
  components: {
    MailListItem
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      await this.getData().then(value => {
        this.list = value.Data
      })
    },
    async getData () {
      const res = await this.$http.get('/SiteNotice')
      return res.data
    }
  }
}
</script>
