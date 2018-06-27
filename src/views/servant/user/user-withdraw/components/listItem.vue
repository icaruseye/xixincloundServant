<template>
  <div class="container">

  </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
.container
{
  position: relative;
  height: 80px;
  background-color: #fff;
  &::after
  {
    position: absolute;
    display: block;
    bottom: 0;
    left: 10px;
    right: 10px;
    content: '';
    height: 1px;
    background-color: RGBA(58, 199, 245, .2); 
    transform: scaleY(.5)
  }
}
</style>
