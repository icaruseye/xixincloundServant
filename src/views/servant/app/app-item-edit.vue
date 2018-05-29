<template>
  <div class="form-panel">
    <div class="weui-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">服务项类型</label>
          <select name="itemType" v-model="itemType" @change="itemTypeChange">
            <option :value="1">默认分类</option>
            <option :value="0">新增分类</option>
          </select>
          <i class="iconfont icon-jiantouyou"></i>
      </p>
      <span v-show="errors.has('itemType')" class="help is-danger">{{ errors.first('itemType') }}</span>
    </div>
    <div class="weui-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">服务项名称</label>
          <input v-model="itemName" v-validate="'required'" name="itemName" type="text" placeholder="请输入展示价格">
      </p>
      <span v-show="errors.has('itemName')" class="help is-danger">{{ errors.first('itemName') }}</span>
    </div>
    <div class="weui-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">指导价</label>
          <input v-model="itemPrice" v-validate="'required'" name="itemPrice" type="text" placeholder="请输入展示价格">
      </p>
      <span v-show="errors.has('itemPrice')" class="help is-danger">{{ errors.first('itemPrice') }}</span>
    </div>
    <div class="weui-cell">
      <p class="weui-cell-top">
          <label class="label" for="">说明介绍</label>
          <textarea name="intro" placeholder="请输入服务项说明介绍"></textarea>
      </p>
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
      itemName: '',
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
body {
  background: #fff;
}

.form-panel {
  min-height: 100vh;
}

.icon-jiantouyou {
  color: #f8a519;
}
</style>
