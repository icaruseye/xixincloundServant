<template>
  <div class="weui-form">
    <div class="weui-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">投诉标题</label>
          <input v-model="nickname" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('nickname') }" name="nickname" type="text" placeholder="请输入投诉标题">
      </p>
      <span v-show="errors.has('nickname')" class="help is-danger">{{ errors.first('nickname') }}</span>
    </div>
    <div class="weui-cell">
      <p class="weui-cell-top">
          <label class="label" for="">投诉详情</label>
          <textarea name="" placeholder="请输入投诉详情..."></textarea>
      </p>
    </div>
    <div class="weui-cell">
      <uploader
        title="投诉图片"
        :limit="1"
        :maxSize="1024 * 1024 * 5"
        :imgList="imgList"
        @onUpdate="onUpdate">
      </uploader>
    </div>
    <div class="weui-cell">
      <button class="weui-btn weui-btn_primary">提交</button>
    </div>
  </div>
</template>

<script>
import uploader from '@/components/common/uploader'
export default {
  components: {
    uploader
  },
  data () {
    return {
      title: '',
      detail: '',
      imgList: []
    }
  },
  methods: {
    onUpdate (id) {
      console.log(id)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
