<template>
    <div>
        <slot name="item"></slot>
    </div>
</template>
<script>
export default {
  name: 'checkerBox',
  data () {
    return {
      modelValue: []
    }
  },
  provide () {
    const that = this
    return {
      handleChecked: () => {
        that.modelValue = []
        let defaultSlots = that.$slots.item
        defaultSlots.map((item, index) => {
          if (item.componentInstance.modelChecked) {
            that.modelValue.push(item.componentInstance.value)
          }
        })
        that.$emit('input', that.modelValue)
      }
    }
  }
}
</script>
