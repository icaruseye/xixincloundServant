<template>
  <div>
    <slot name="item"></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      modelValue: [],
      verify: true
    }
  },
  provide () {
    const that = this
    return {
      handleChange () {
        that.verify = true
        that.modelValue = []
        let defaultSlots = that.$slots.item
        defaultSlots.map((item, index) => {
          that.modelValue.push({
            id: item.componentInstance.name,
            value: item.componentInstance.modelValue
          })
          if (!item.componentInstance.verify) {
            that.verify = false
          }
        })
        that.$emit('input', that.modelValue)
      }
    }
  }
}
</script>

