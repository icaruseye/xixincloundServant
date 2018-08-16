<template>
  <div v-if="visable" class="container">
    <div class="icon_box">
      <img class="icon" :src="useType | xxMissionTypeIconFilter" alt="">
    </div>
    <div class="info">
      <h3 class="title">{{title | titleFilter}}</h3>
      <p class="desc">{{price | priceFilter}}</p>
    </div>
    <div class="btn_box">
      <button class="btn">库存:{{count}}</button>
      <button class="btn blue_btn" :class="{'danger': !modelState}" @click="upDown">{{modelState ? '上架' : '下架'}}</button>
      <button class="btn blue_btn" @click="operatePopupVisable=true">操作</button>
    </div>
    
    <div v-transfer-dom>
      <popup v-model="operatePopupVisable">
        <div class="popup">
          <ul>
            <!-- <li>推荐</li> -->
            <li @click="modify">修改</li>
            <li @click="removoe">删除</li>
          </ul>
          <a href="javascript:;" class="cancel" @click="operatePopupVisable = false">取消</a>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { TransferDom, Popup } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup
  },
  data () {
    return {
      visable: true,
      operatePopupVisable: false
    }
  },
  props: {
    useType: 0,
    id: null,
    title: '',
    price: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    },
    state: {
      type: Number,
      default: 0
    },
    description: '',
    effectiveDay: 0,
    effectiveMonth: 0,
    effectiveYear: 0
  },
  filters: {
    titleFilter (val) {
      if (val.length > 8) {
        return val.substring(0, 8) + '…'
      } else {
        return val
      }
    },
    priceFilter (val) {
      if (val > 0) {
        return `￥${val.toFixed(2)}元`
      } else {
        return '免费'
      }
    },
    stateFilter (val) {
      return val === 0 ? '上架' : '下架'
    }
  },
  computed: {
    modelState: {
      get () {
        return this.state === 0
      },
      set (val) {
        this.$emit('changeState', val)
      }
    },
    effectiveType () {
      if (this.effectiveDay > 0) {
        return 3
      }
      if (this.effectiveMonth > 0) {
        return 2
      }
      if (this.effectiveYear > 0) {
        return 1
      }
    },
    effectiveValue () {
      if (this.effectiveDay > 0) {
        return this.effectiveDay
      }
      if (this.effectiveMonth > 0) {
        return this.effectiveMonth
      }
      if (this.effectiveYear > 0) {
        return this.effectiveYear
      }
    }
  },
  methods: {
    // 修改
    async modify () {
      sessionStorage.setItem('packageServiceDetail', JSON.stringify({
        ID: this.id,
        Name: this.title,
        Price: this.price,
        Count: this.count,
        EffectiveType: this.effectiveType,
        EffectiveValue: this.effectiveValue,
        Content: this.description
      }))
      this.$router.push(`/app/itemEdit/${this.id}?isAdd=0`)
    },
    // 删除服务项/套餐
    async removoe () {
      const res = await this.$http.delete(`/Bundle/${this.id}`)
      if (res.data.Code === 100000) {
        this.$vux.toast.text('删除成功')
        this.operatePopupVisable = false
        this.visable = false
      }
    },
    /** 上下架 */
    async upDown () {
      let url = this.state === 0 ? `/Bundle/${this.id}/OnTheShelf` : `/Bundle/${this.id}/OffTheShelf`
      const res = await this.$http.put(url)
      if (res.data.Code === 100000) {
        this.modelState = !this.modelState
      } else {
        this.$vux.toast.show('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .container
  {
    position: relative;
    height: 80px;
    background-color: #fff;
    display: flex;
    flex-flow: nowrap;
    align-items: center;
    .icon_box
    {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 50px;
      .icon
      {
        display: block;
        width: 29px;
        height: 29px;
      }
    }
    .info
    {
      display: flex;
      flex: 0 0 auto;
      padding-right: 10px; 
      flex-flow: column;
      justify-content: flex-start;
      .title
      {
        font-size: 16px;
        font-weight: normal;
        color: #666666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .desc
      {
        white-space: nowrap;
        width: 100%;
        font-size: 14px;
        color: #999999;
      }
    }
    .btn_box
    {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      display: flex;
      flex-flow: nowrap;
      align-content: space-around;
      background-color: #fff;
      padding: 0 10px;
      justify-content: center;
      align-items: center;
      flex-grow: 10;
      .btn
      {
        display: block;
        height: 25px;
        border: 1px solid #CCCCCC;
        border-radius: 2px;
        background-color: #fff;
        white-space: nowrap;
        padding: 0 5px;
        font-size: 12px;
        color: #999;
        min-width: 50px;
        outline: none;
        margin-right: 10px;
      }
      .btn:last-child
      {
        margin-right: 0;
      }
      .blue_btn
      {
        color: #3AC7F5;
        border-color: #3AC7F5
      }
      .danger {
        color: #fff;
        border: 1px solid #ff9800;
        color: #ff9800;
      }
    }
  }
  .container::after
  {
    position: absolute;
    bottom: 0;
    content: '';
    display: block;
    height: 1px;
    left: 12px;
    right: 12px;
    background-color: RGBA(0, 180, 171, .2);
    transform: scaleY(.5)
  }
  .container:last-child:after
  {
    display: none;
  }
.popup {
  color: #666;
  font-size: 14px;
  ul {
    margin-bottom: 8px;
    li {
    background: #fff;
    width: 100%;
    padding: 15px 0;
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid #f1f1f1;
    &:nth-child(1) {
      color: #f8a519
    }
    &:nth-child(2) {
      color: #f44336
    }
    }
  }
  .cancel {
    display: block;
    padding: 15px 0;
    width: 100%;
    text-align: center;
    border-top: 1px solid #f1f1f1;
    background: #fff;
    color: inherit;
  }
}
</style>

