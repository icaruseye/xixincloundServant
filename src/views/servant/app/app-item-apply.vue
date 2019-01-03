<template>
  <div>
    <!-- 筛选 -->
    <xx-filtrate :list="roleList" :roleIndex="roleIndex" @onItemClick="changeFilter"></xx-filtrate>
    <div v-if="itemList.length > 0" class="weui-panel weui-list-panel">
      <template v-for="(item, index) in itemList">
        <div class="weui-cell" :key="index">
          <div class="weui-cell-top">
            <!-- <div class="icon"><img :src="item.Img" alt=""></div> -->
            <div class="icon">
              <img :src="item.UseType | xxMissionTypeIconFilter" alt="任务">
            </div>
            <div class="name">{{item.Name}}</div>
            <div class="btn">
              <button v-if="item.State === 0" class="" @click="go(item.ID, index)">申请</button>
              <button v-if="item.State === 1" class="" disabled>已申请</button>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div  v-else style="height: 400px;position: relative">
      <xx-occupied-box>
        没有可以申请的服务项
        <router-link to="/user/authstep3" style="display: block; color: #3ac7f5">添加执业证</router-link>
      </xx-occupied-box>
    </div>
  </div>
</template>

<script>
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
      let tempList = []
      const that = this
      if (index === 0) {
        tempList = that.$_.flatten(that.allItems)
      } else {
        tempList = this.allItems[index - 1]
      }
      that.distinctList(tempList)
    },
    /**
     * 去重
     * @param arr
     */
    distinctList (arr) {
      const that = this
      that.itemList = []
      let idStrs = ''
      arr.map(item => {
        if (idStrs.indexOf(item.ID + ',') >= 0) {
        } else {
          idStrs += (item.ID + ',')
          that.itemList.push(item)
        }
      })
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
      this.$vux.loading.show('加载中')
      const res = await this.$http.get('/PackageList')
      this.$vux.loading.hide()
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
