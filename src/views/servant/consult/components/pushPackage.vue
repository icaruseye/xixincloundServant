<template>
  <div class="wrapper">
    <!-- 选择服务 -->
    <x-dialog
      mask-z-index="1001"
      @on-hide="$emit('close')"
      v-model="selectPackage"
      class="dialog_selectPackage dialog"
      :hide-on-blur="true">
      <div class="dialog-content">
        <div class="dialog-title">服务推荐</div>
        <div class="dialog-list">
          <checker v-model="selectStuffId" default-item-class="item" selected-item-class="item-selected" :radio-required="true">
            <checker-item :value="0">
              <img class="icon" src="@/assets/images/icon_consult_item.png" alt="">
              <span class="item-title">院内陪诊</span>
              <span class="xx-radio-item" :class="selectStuffId === 0 ? 'active' : ''"></span>
            </checker-item>
            <checker-item :value="1">
              <img class="icon" src="@/assets/images/icon_consult_item.png" alt="">
              <span class="item-title">院内陪诊</span>
              <span class="xx-radio-item" :class="selectStuffId === 1 ? 'active' : ''"></span>
            </checker-item>
          </checker>
        </div>
        <div style="height:5px;background:#f1f1f1;"></div>
        <div class="dialog-button_bar">
          <button class="dialog-button dialog-confirm" @click="submit">确认</button>
          <button class="dialog-button dialog-close" @click="close">取消</button>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { TransferDom, XDialog, Checker, CheckerItem } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Checker,
    CheckerItem,
    XDialog
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value () {
      console.log('change')
      this.selectPackage = this.value
    }
  },
  data () {
    return {
      selectPackage: false,
      selectStuffId: null
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    submit () {
      this.selectPackage = false
      this.$emit('close')
    },
    close () {
      this.selectPackage = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.dialog {
  .dialog-title {
    font-size: 15px;
    color: #666;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid RGBA(204, 240, 238, 1);
  }
  .dialog-list {
    max-height: 300px;
    overflow: scroll;
    .item {
      border-bottom: 1px solid RGBA(204, 240, 238, 1);
      &:last-child {
        border: 0;
      }
    }
  }
  .dialog-button_bar {
    display: flex;
  }
  .dialog-button {
    position: relative;
    flex: 1;
    background: transparent;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    color: #666;
    border: 0;
    &:nth-child(2) {
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 50px;
        width: 1px;
        background: #f1f1f1;
      }
    }
  }
  .dialog-confirm {
    color: #3AC7F5;
  }
}
.dialog_selectPackage {
  .dialog-list {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 54px;
      padding: 0 60px;
      .icon {
        margin-right: 18px;
        width: 24px;
        height: 24px;
      }
      .item-title {
        flex: 1;
        font-size: 14px;
        color: #A6A6A6;
        text-align: left;
      }
    }
  }
}
</style>
