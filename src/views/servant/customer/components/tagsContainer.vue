<template>
  <div class="tags_container">
    <h4 class="title">用户标签</h4>
    <div class="tag_select_contianer_outer" :style="unfoldTagsContainer ? '':'maxHeight:80px'">
      <div class="tag_select_contianer" ref="tagSelectContianerRef">
        <div class="tags_checkbox_flex" v-for="(item, index) in tags" :key="index">
          <label class="tags_checkbox_box">
            <input type="checkbox" :value="item" class="tags_checkbox_control" @change="change">
            <span class="tags_checkbox_label">
              {{item}}
            </span>
          </label>
        </div>
      </div>
    </div>
    <a href="javascript:void(0)" class="show_more_tags_btn" v-if="tagIsOverFlow" @click="unfoldTagsContainer = !unfoldTagsContainer">{{unfoldTagsContainer?'收起':'点击查看所有标签'}}</a>
  </div>
</template>
<script>
export default {
  mounted () {
    this.tagSelectContianerHeight = this.$refs.tagSelectContianerRef.offsetHeight
  },
  computed: {
    tagIsOverFlow () {
      return this.tagSelectContianerHeight > 80
    }
  },
  methods: {
    change () {
      const checkboxItems = document.querySelectorAll('.tags_checkbox_control:checked')
      let list = ''
      for (let i = 0; i < checkboxItems.length; i++) {
        list += checkboxItems[i].value + ','
      }
      this.$emit('change', list.substring(0, list.lastIndexOf(',')))
    }
  },
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      unfoldTagsContainer: false,
      tagSelectContianerHeight: 0
    }
  }
}
</script>

<style lang="less" scoped>
.tags_container
{
  background-color: #fff;
  padding: 15px 12px 5px 12px;
  .title
  {
    position: relative;
    font-size: 16px;
    color: #666666;
    padding-left: 12px;
    height: 15px;
    line-height: 15px;
    font-weight: normal;
    &::before
    {
      position: absolute;
      display: block;
      content: '';
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      border-radius: 2px;
      background-color: #3AC7F5
    }
  }
  .tag_select_contianer_outer
  {
    overflow: hidden;
  }
  .tag_select_contianer
  {
    margin-top: 10px;
    display: flex;
    align-content: space-around;
    flex-flow: wrap;
    .tags_checkbox_flex
    {
      display: flex;
      align-content: center;
      align-items: center;
      padding: 0 5px;
      height: 35px;
      .tags_checkbox_box
      {
        position: relative;
        .tags_checkbox_control
        {
          position: absolute;
          visibility: hidden;
          &:checked + .tags_checkbox_label
          {
            background-color: rgba(59, 199, 245, .2);
            color: #3AC7F5
          }
        }
        .tags_checkbox_label
        {
          display: block;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          color: #999;
          background-color: #F6F6F6;
          border-radius: 13px;
          padding: 0 13px;
          white-space: nowrap;
        }
      }
    }
  }
  .show_more_tags_btn
  {
    display: block;
    width: 100%;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-size: 12px;
    color: #999;
    padding-top: 10px;
    margin-top: 5px;
    border-top: 1px solid #f0f0f0
  }
}
</style>

