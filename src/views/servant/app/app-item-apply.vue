<template>
  <div>
    <!-- 筛选 -->
    <xx-filtrate :list="roleList" :roleIndex="roleIndex" @onItemClick="changeFilter"></xx-filtrate>
    <div class="weui-panel weui-list-panel">
      <template v-for="(item, index) in itemList">
        <div class="weui-cell" :key="index">
          <div class="weui-cell-top">
            <!-- <div class="icon"><img :src="item.Img" alt=""></div> -->
            <div class="icon"><img src="@/assets/images/icon_tcmr.png" alt=""></div>
            <div class="name">{{item.Name}}</div>
            <div class="btn">
              <button v-if="item.State === 0" class="" @click="go(item.ID, index)">申请</button>
              <button v-if="item.State === 1" class="" disabled>已申请</button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import http from '@/api'
export default {
  data () {
    return {
      roleIndex: 0,
      roleList: [],
      itemList: [],
      allItems: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    changeFilter (index) {
      if (index === 0) {
        this.itemList = this.$_.flatten(this.allItems)
        return false
      }
      this.itemList = this.allItems[index - 1]
    },
    go (id, index) {
      this.$router.push(`/app/itemEdit/${id}?isAdd=1`)
    },
    getRoleList (list) {
      list.map((item) => {
        this.roleList.push(item.Name)
      })
    },
    getAllItems (list) {
      list.map((item) => {
        this.allItems.push(item.ItemList)
      })
    },
    async getList () {
      const res = await http.get('/PackageList')
      console.log(res)
      if (res.data.Code === 100000) {
        this.getRoleList(res.data.Data)
        this.getAllItems(res.data.Data)
        this.changeFilter(0)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.weui-list-panel {
  padding: 49px 12px 0;
  .weui-cell {
    padding: 20px 0;
  }
  .weui-cell-top {
    display: flex;
    align-items: center;
    width: 100%;
    .icon {
      width: 29px;
      height: 29px;
    }
    .name {
      flex: 1;
      margin: 0 12px;
    }
    .btn {
      button {
        width: 50px;
        height: 23px;
        height: 23px;
        font-size: 14px;
        color: #fff;
        background: #F8A519;
        border: 0;
        border-radius: 2px;
      }
      button:disabled {
        background: #ccc;
      }
    }
  }
}
</style>
