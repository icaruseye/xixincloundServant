<template>
  <div>
    <xx-go-back></xx-go-back>
      <template v-if="list.length > 0">
        <mail-list-item v-for="(item, index) in list"
          :id="item.ID"
          :key="index"
          :msgType="item.Type"
          :createTime="item.CreateTime"
          :count="item.State === 0 ? '未读': null"
          :title="item.Title"
        >
          <div style="width: 60%" v-html="item.Message">
          </div>
        </mail-list-item>
      </template>
      <xx-occupied-box v-else>
        {{type|xxSiteNoticeTypeTitleFilter}}列表为空
      </xx-occupied-box>
  </div>
</template>
<script>
import MailListItem from './components/MailListItem'
export default {
  components: {
    MailListItem
  },
  computed: {
    type () {
      return this.$route.params.type
    }
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$vux.loading.show('加载中')
      this.$http.get(`/SiteNoticeList/Unread?type=${this.type}`).then(result => {
        this.$vux.loading.hide()
        this.list = result.data.Data
      })
    }
  }
}
</script>
