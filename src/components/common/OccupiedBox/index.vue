<template>
  <div class="occupied_container">
    <img v-if="iconType === 'image'" class="occupied_img" :src="imgUrl" alt="">
    <div v-if="iconType === 'svg'" class="svg_icon">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#icon-${iconName}`"></use>
      </svg>
    </div>
    <p class="occupied_text">
      <slot></slot>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    iconType: {
      type: String,
      default: 'image'
    },
    iconName: {
      type: String,
      default: 'empty_icon.png'
    }
  },
  computed: {
    imgUrl () {
      return require(`@/assets/images/${this.iconName}`)
    }
  }
}
</script>

<style lang="less" scoped>
  .occupied_container
  {
    padding: 120px 0;
  }
  .occupied_img
  {
    display: block;
    width: 80px;
    margin: 0 auto;
  }
  .occupied_text
  {
    margin-top: 10px;
    font-size: 14px;
    color: #999;
    text-align: center;
  }
  .svg_icon
  {
    font-size: 60px;
    text-align: center;
  }
</style>
