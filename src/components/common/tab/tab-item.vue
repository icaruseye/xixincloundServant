<template>
  <div
    class="xixin-tab-item"
    :class="[currentSelected ? activeClass : '', {
      'xixin-tab-selected': currentSelected
    }]"
    @click="onItemClick">
  <slot></slot>
  </div>
</template>

<script>
import { childMixin } from '../../mixins/multi-items'
export default {
  name: 'tab-item',
  mixins: [childMixin],
  props: {
    activeClass: String
  }
}
</script>