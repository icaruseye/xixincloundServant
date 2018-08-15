<template>
  <div class="search_container">
    <div class="input_container">
      <i class="iconfont icon-sousuo"></i>
      <input v-model="modelValue" type="text" :placeholder="placeholder">
      <i v-if="modelValue.length > 0" class="clear_input_btn iconfont icon-shanchuguanbicha2" @click.stop="clearInput"></i>
    </div>
    <div class="action_container" @click="confirm">
      确定
    </div>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    modelValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    clearInput () {
      this.modelValue = ''
      this.$nextTick(() => {
        this.$emit('cancel')
      })
    },
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>
<style lang="less" scoped>
  .search_container
  {
    display: flex;
    flex-flow: nowrap;
    height: 50px;
    background-color: #fff
  }
  .action_container
  {
    padding-right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #999;
  }
  .input_container
  {
    position: relative;
    flex: 1;
    padding: 8px 12px;
    box-sizing: border-box;
    .icon-sousuo
    {
      position: absolute;
      left: 24px;
      top: 50%;
      transform: translateY(-50%);
      color: #B8B8B8;
    }
    .clear_input_btn
    {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }
    input
    {
      display: block;
      width: 100%;
      height: 100%;
      font-size: 12px;
      background-color: #eee;
      border-radius: 15px;
      padding: 0 20px 0 45px;
      color: #999;
      box-sizing: border-box;
      &::-webkit-input-placeholder
      {
        color: #B8B8B8;
        text-align: center;
      }
    }
  }
</style>

