<template>
  <div class="list_warp">
    <list-items></list-items>
    <list-items></list-items>
  </div>
</template>
<script>
import ListItems from './components/listItems'
export default {
  components: {
    ListItems
  }
}
</script>
<style lang="less" scoped>
.list_warp
{
  margin-top: 20px;
  border: 1px solid #f6f6f6;
  border-left: none;
  border-right: none
}
</style>
