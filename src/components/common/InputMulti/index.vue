<template>
  <div class="text_item_box">
    <div
      class="text_item clearfix"
      v-for="(item, index) in itemList"
      :key="index"
    >
      <div class=label_name>
        <div class="required_tag">*</div>
        <div class="name_flex_box" v-html="titleAddTag(item.label)"></div>
        <div class="title_colon">：</div>
      </div>
      <div class="label_content">
          <input class="label_content_input" :placeholder="`请输入${item.label}`" type="text" v-model="item.value" @keyup="assemblyValue">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: String,
      default: ''
    },
    labelNames: {
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
    },
    itemList () {
      let list = []
      if (this.labelNames) {
        list = this.labelNames.split(',')
        list = list.map(item => {
          return {
            label: item,
            value: ''
          }
        })
      }
      return list
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  methods: {
    titleAddTag (title) {
      const list = title.split('')
      let str = ''
      list.map(item => {
        str += `<div>${item}</div>`
      })
      return str
    },
    assemblyValue () {
      let str = ''
      if (this.itemList && this.itemList.length > 0) {
        this.itemList.map(item => {
          str += `${item.value},`
        })
        str = str.substring(0, str.lastIndexOf(','))
      }
      this.modelValue = str
    },
    validateParams () {
      for (let i = 0; i < this.itemList.length; i++) {
        let item = this.itemList[i]
        if (item.value === null || item.value === '') {
          this.$vux.toast.text(`请填写${item.label}`)
          return false
        }
      }
      return true
    }
  },
  created () {},
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.text_item_box
{
  .text_item
  {
    display: flex;
    flex-flow: nowrap;
    margin-bottom: 20px;
    .label_name
    {
      display: flex;
      flex-flow: nowrap;
      flex: 0 0 100px;
      align-items: center;
      font-size: 12px;
      color: #333;
      .name_flex_box
      {
        flex: 1;
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
      }
      .required_tag
      {
        flex: 0 10px;
        text-align: left;
        color: #ff0000;
      }
      .title_colon
      {
        flex: 0 020px;
        text-align: center;
      }
    }
    .label_content
    {
      display: flex;
      align-items: center;
      flex: 1;
      border-bottom: 1px solid #ddd;
      padding: 10px 10px;
      .label_content_input
      {
        font-size: 12px;
        color: #5d5d5d;
        width: 100%;
      }
    }
    &:last-child
    {
      border-bottom: none
    }
  }
}
</style>
