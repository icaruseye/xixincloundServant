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
        <div>
          <list-items v-for="(item, index) in userList"
          :key="index"
          :Avatar="item.FriendAvatar"
          :UserName="item.UserName"
          :Attrs="item.Attrs"
          :ShowTime="item.AddTime"
          @click.native="redirectUrl(item.UserId)"
          >
          </list-items>
        </div>
        <xxPageSorter
          ref="xxPageSorterRef"
          :pageSize="pageSize"
          :total="totalNumber"
          :pageNumber="pageNumber"
          @nextPage="loadNextPage"
        >
        </xxPageSorter>
      </template>
      <xx-occupied-box v-else>
        无法找到相应的用户，<br/>请修改筛选条件后重试！
      </xx-occupied-box>
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
      Attrs: '',
      pageNumber: 1,
      pageSize: 10,
      totalNumber: 0
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
      this.initUserList()
    },
    init () {
      if (this.currentTabIndex === '0') {
        this.getTagsList()
      } else {
        this.Attrs = ''
      }
      this.initUserList()
    },
    loadNextPage () {
      this.pageNumber += 1
      this.getUserList().then(result => {
        this.$refs.xxPageSorterRef.loading = false
        if (result.Code === 100000) {
          this.totalNumber = result.Data.Total
          this.userList = [
            ...this.userList,
            ...result.Data.UserList
          ]
        }
      })
    },
    initUserList () {
      this.pageNumber = 1
      this.getUserList().then(result => {
        if (result.Code === 100000) {
          this.totalNumber = result.Data.Total
          this.userList = result.Data.UserList
        }
      })
    },
    /**
     * 获取用户列表
     */
    async getUserList () {
      const res = await this.$http.get(`/Attribute/Friends/UserList`, {
        Index: this.pageNumber,
        Size: this.pageSize,
        attrs: this.Attrs,
        search: this.searchValue,
        filterType: this.currentTabIndex
      })
      return res.data
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


