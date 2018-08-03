<template>
  <div>
    <div>
      <mail-group-item :msgType="1"></mail-group-item>
      <mail-group-item :msgType="2"></mail-group-item>
    </div>
    <div v-if="list.length > 0" class="mt10px">
      <mail-list-item v-for="(item, index) in list"
        :id="item.ID"
        :key="index"
        :msgType="item.Type"
        :createTime="item.CreateTime"
        :count="item.State === 0 ? '未读': null"
        :title="item.Title"
      >
        {{item.Message | xxTextTruncateFilter(15)}}
      </mail-list-item>
    </div>
  </div>
</template>
<script>
import MailListItem from './components/MailListItem'
import MailGroupItem from './components/MailGroupItem'
export default {
  components: {
    MailListItem,
    MailGroupItem
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
      this.$vux.loading.show('加载中')
      await this.getData().then(value => {
        this.list = value.Data
      })
      this.$vux.loading.hide()
    },
    async getData () {
      const res = await this.$http.get('/SiteNoticeList/Unread?type=4')
      return res.data
    }
  }
}
</script>
