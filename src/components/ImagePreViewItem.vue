<template>
  <div>
    <template  v-if="prewimgList != null">
      <div class="thumbs_container">
        <img v-for="(item, index) in prewimgList" 
          :src="item.src"
          v-lazy="item.src"
          :key="index"
          @click="previewImage(index)"
          class="previewer-img"
          :class="groupClass"
          @load="onloaded"
        >
      </div>
      <div v-transfer-dom>
        <previewer ref="previewer" :list="prewimgList"></previewer>
      </div>
    </template>
    <template v-else>
      <p style="font-size: 12px;color: #999; text-align:center;padding: 40px 0">图片列表为空</p>
    </template>
  </div>
</template>
<script>
import { Previewer, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  props: {
    list: ''
  },
  components: {
    Previewer
  },
  computed: {
    groupClass () {
      return `preview_image_${Math.floor(Math.random() * 9999 + 1000)}`
    },
    prewimgList () {
      if (this.list != null && this.list !== '') {
        const list = this.list.split(',')
        let newList = []
        list.map((item) => {
          newList.push({
            src: this.transformImgUrl(item)
          })
        })
        return newList
      } else {
        return null
      }
    }
  },
  methods: {
    onloaded () {
      this.$emit('onloaded')
    },
    previewImage (index) {
      this.$refs.previewer.show(index)
    },
    transformImgUrl (imageName) {
      if (!imageName) return
      if (imageName.indexOf('http') === -1) {
        if (imageName.indexOf('Upload') === -1) {
          // 值为id
          return `${process.env.IMAGE_HOST}/File/GetImage/` + imageName
        } else {
          // 第三种情况
          return imageName
        }
      }
      // 值为完整url
      return imageName
    }
  }
}
</script>
<style lang="less" scoped>
.thumbs_container
{
  padding-top: 20px;
  .previewer-img
  {
    display: inline-block;
    width: 65px;
    height: 65px;
    margin-right: 10px;
  }
}
</style>


