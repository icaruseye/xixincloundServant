<template>
  <div style="padding-bottom:80px">
    <xxGoBack></xxGoBack>
    <div class="list_contianer">
      <template v-if="list.length > 0">
        <div v-for="(item, index) in list" :key="index" class="list_items" @click="redirectUrl(`/schedule/scheme/${item.ID}/detail`)">
          <div class="list_items_title">{{item.SchemeName}}</div>
          <div class="list_items_content">
            <span>
              {{item.StartTime}}~{{item.EndTime}}
            </span>
            <span>
              可预约：{{item.ReserveNum}}次
            </span>
          </div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </template>
      <xx-occupied-box v-else>
        还没有创建排班方案
      </xx-occupied-box>
    </div>
    <div class="btn_container">
      <button class="btn" @click="redirectUrl(`/schedule/schemeEdit`)">
        <i class="iconfont icon-hao"></i>
        新建方案
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    redirectUrl (url) {
      this.$router.push(url)
    },
    getList () {
      this.$http.get(`/Schedule/Scheme/List`).then(result => {
        if (result.data.Code === 100000) {
          this.list = result.data.Data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.btn_container
{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  flex-flow: nowrap;
  .btn
  {
    flex: 1;
    border: none;
    background-color: #3AC7F5;
    color: #fff;
  }
}
.list_contianer
{
  padding-top: 10px;
  .list_items
  {
    position: relative;
    padding: 10px;
    background-color: #fff;
    margin-bottom: 1px;
    .list_items_title
    {
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #333;
    }
    .list_items_content
    {
      margin-top: 5px;
      height: 20px;
      line-height: 20px;
      color: #999;
      font-size: 12px;
      span
      {
        display: inline-block;
        margin-right: 40px;
      }
    }
    .icon-jiantouyou
    {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: #999;
    }
  }
}
</style>

