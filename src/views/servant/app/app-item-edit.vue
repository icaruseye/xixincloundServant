<template>
  <div class="weui-form">
    <div class="weui-cell-form-title">填写服务项信息</div>
    <div class="weui-cell nobor">
      <div class="weui-cell-top" :class="{ 'control': true }">
        <label class="label" for="">服务项类型</label>
        <input v-model="itemName" type="text" readonly>
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top" :class="{ 'control': true }">
        <label class="label" for="">服务项名称</label>
        <input v-model="itemName" name="itemName" type="text" placeholder="请输入服务项名称">
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top" :class="{ 'control': true }">
        <label class="label" for="">指导价</label>
        <input v-model="itemPrice" name="itemPrice" type="number" placeholder="请输入展示价格">
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell-top">
        <label class="label" for="">说明介绍</label>
        <textarea name="intro" placeholder="请输入服务项说明介绍"></textarea>
      </div>
    </div>
    <div class="weui-cell">
      <button type="button" class="weui-btn weui-btn_primary">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      itemType: 1,
      itemName: '图文问诊',
      itemPrice: '',
      itemIntro: ''
    }
  },
  methods: {
    itemTypeChange () {}
  }
}
</script>

<style lang="less" scoped>
.weui-form {
  min-height: 100vh;
  background: #fff;
}

.icon-jiantouyou {
  color: #f8a519;
}
</style>
