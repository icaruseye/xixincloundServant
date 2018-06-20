<template>
  <div style="padding: 5px 0">
    <label class="item-label_container">
      <span class="item-label_title">{{label}}{{unit?'('+unit+')': ''}}：</span>
      <input :name="name" class="item-label_input" type="text" @change="change" v-model="modelValue" @keyup="keyup">
    </label>
    <p v-if="!verify" style="font-size: 12px;color: #ff3939;margin-top:5px">{{label}}不可超过{{maxLen}}个字!</p>
  </div>
</template>
<script>
export default {
  props: {
    label: '',
    unit: '',
    name: '',
    maxLen: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {
      modelValue: '',
      verify: true
    }
  },
  inject: ['handleChange'],
  methods: {
    change () {
      this.handleChange()
    },
    keyup () {
      if (this.modelValue.length > this.maxLen) {
        this.verify = false
      } else {
        this.verify = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.item-label_container
{
  position: relative;
  height: 35px;
  display: block;
  padding:0 0 0 120px;
}
.item-label_title
{
  position: absolute;
  left: 0;
  top: 0;
  width: 120px;
  height: 35px;
  line-height: 35px;
  color: #999;
  font-size: 14px;
}
.item-label_input
{
  height: 35px;
  padding: 0 10px;
  background-color: #f6f6f6;
  box-sizing: border-box;
  width: 100%;
}
</style>

