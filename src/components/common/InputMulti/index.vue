<template>
  <div class="text_item_box">
    <div
      class="text_item clearfix"
      v-for="(item, index) in itemList"
      :key="index"
    >
      <label class=label_name>
        <span class="required_tag">*</span>
        {{item.label}}：
      </label>
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
    init () {
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
    this.init()
  }
}
</script>
<style lang="less" scoped>
.text_item_box
{
  .text_item
  {
    height: 40px;
    padding: 10px 0;
    background-color: #fff;
    border-bottom: 1px solid #f6f6f6;
    .label_name
    {
      float: left;
      width: 80px;
      text-align: right;
      line-height: 40px;
      font-size: 12px;
      padding: 0 10px;
      .required_tag
      {
        color: #ff0000;
      }
    }
    .label_content
    {
      float: left;
      height: 40px;
      .label_content_input
      {
        height: 40px;
        font-size: 12px;
        color: #999;
      }
    }
    &:last-child
    {
      border-bottom: none
    }
  }
}
</style>
