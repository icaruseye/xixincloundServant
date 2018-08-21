<template>
  <div>
    <xx-go-back></xx-go-back>
    <xx-search placeholder="搜索用户" v-model="searchValue" @confirm="init" @cancel="init"></xx-search>
    <div class="tabs_container">
      <router-link :class="['tabs_items', (currentTabIndex === '0')?'active': '']" to="?currentTabIndex=0">最新添加</router-link>
      <router-link :class="['tabs_items', (currentTabIndex === '1')?'active': '']" to="?currentTabIndex=1">最新购买</router-link>
      <router-link :class="['tabs_items', (currentTabIndex === '2')?'active': '']" to="?currentTabIndex=2">最后活动</router-link>
    </div>
    <tags-container v-if="(currentTabIndex === '0') && (tagsList != null) && tagsList.length > 0" :tags="tagsList" @change="tagChange" style="margin-top:5px"></tags-container>
    <div v-if="userList" style="margin-top:10px">
      <template v-if="userList.length > 0">
        <list-items v-for="(item, index) in userList"
        :key="index"
        :Avatar="item.FriendAvatar"
        :UserName="item.UserName"
        :Attrs="item.Attrs"
        :ShowTime="item.AddTime"
        @click.native="redirectUrl(item.UserId)"
        >
        </list-items>
      </template>
      <div v-else style="font-size: 120px;text-align:center;margin-top:60px">
        <i style="font-size:66px;display:block">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kong1"></use>
          </svg>
        </i>
        <p style="font-size:12px;color:#999;text-align:center;">没有找到对应的用户，请修改筛选条件后重试！</p>
      </div>
    </div>
  </div>
</template>
<script>
import xxSearch from '@/components/common/xxSearch'
import tagsContainer from './components/tagsContainer'
import listItems from './components/listItems'
export default {
  components: {
    xxSearch,
    tagsContainer,
    listItems
  },
  data () {
    return {
      searchValue: '',
      tagsList: null,
      userList: null,
      Attrs: ''
    }
  },
  watch: {
    currentTabIndex (val) {
      this.searchValue = ''
      this.init()
    }
  },
  computed: {
    currentTabIndex () {
      return this.$route.query.currentTabIndex || '0'
    }
  },
  created () {
    this.init()
  },
  methods: {
    redirectUrl (id) {
      this.$router.push(`/customer/${id}/detail`)
    },
    tagChange (val) {
      this.Attrs = val
      this.getUserList()
    },
    async init () {
      if (this.currentTabIndex === '0') {
        await this.getTagsList()
      } else {
        this.Attrs = ''
      }
      await this.getUserList()
    },
    /**
     * 获取用户列表
     */
    async getUserList () {
      const res = await this.$http.get(`/Attribute/Friends/UserList`, {
        Index: 0,
        Size: 1000,
        attrs: this.Attrs,
        search: this.searchValue,
        filterType: this.currentTabIndex
      })
      if (res.data.Code === 100000) {
        this.userList = res.data.Data.UserList
      }
    },
    // 获取标签列表
    async getTagsList () {
      const res = await this.$http.get(`/Attribute/UserAttribute/GetAttribute`)
      if (res.data.Code === 100000) {
        this.tagsList = res.data.Data
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tabs_container
{
  display: flex;
  flex-flow: nowrap;
  background-color: #fff;
  margin-top: 5px;
  height: 41px;
  .tabs_items
  {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #666;
    flex: 1;
    height: 41px;
    &::before
    {
      position: absolute;
      right: 0;
      top: 13px;
      bottom: 13px;
      width: 1px;
      display: block;
      content: '';
      background-color: #D8D8D8
    }
    &:last-child:before
    {
      display: none;
    }
    &.active
    {
      color: #3AC7F5;
      &::after
      {
        position: absolute;
        display: block;
        content: '';
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 25px;
        height: 4px;
        border-radius: 4px;
        background-color: #3AC7F5
      }
    }
  }
}
</style>


