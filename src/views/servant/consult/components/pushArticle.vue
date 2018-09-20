<template>
  <div class="wrapper">
    <!-- 选择文章 -->
    <x-dialog
      mask-z-index="1001"
      @on-hide="$emit('close')"
      v-model="selectArticle"
      class="dialog_Article dialog"
      :hide-on-blur="true">
      <div class="dialog-content">
        <div class="dialog-title">文章列表</div>
        <div class="tabbar">
          <span class="tabbar-item active">最新</span>
          <span class="tabbar-item">热点</span>
          <span class="tabbar-item">推荐</span>
        </div>
        <div class="dialog-list">
          <checker v-model="selectStuffId" default-item-class="item" selected-item-class="item-selected" :radio-required="true">
            <checker-item :value="0">
              <span class="xx-radio-item" :class="selectStuffId === 0 ? 'active' : ''"></span>
              <img class="img" src="https://wx2.sinaimg.cn/mw690/497f855dgy1fvba0f3ypcj21w01w0npd.jpg" alt="">
              <div class="content">
                <div class="title">根据公众号的历史文章、类型等，…</div>
                <div class="info">
                  <span class="tag">糖尿病</span>
                  <span class="date">8月5日 12:30:22</span>
                </div>
              </div>
            </checker-item>
            <checker-item :value="1">
              <span class="xx-radio-item" :class="selectStuffId === 1 ? 'active' : ''"></span>
              <img class="img" src="https://wx2.sinaimg.cn/mw690/497f855dgy1fvba0f3ypcj21w01w0npd.jpg" alt="">
              <div class="content">
                <div class="title">根据公众号的历史文章、类型等，…</div>
                <div class="info">
                  <span class="tag">糖尿病</span>
                  <span class="date">8月5日 12:30:22</span>
                </div>
              </div>
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
      this.selectArticle = this.value
    }
  },
  data () {
    return {
      selectArticle: false,
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
.dialog_Article {
  .tabbar {
    padding-top: 12px;
    display: flex;
    justify-content: center;
    .tabbar-item {
      margin: 0 20px;
      font-size: 12px;
      color: #999;
      &.active {
        color: #3AC7F5
      }
    } 
  }
  .dialog-list {
    .item {
      display: flex;
      align-items: center;
      padding: 25px 12px;
      &:first-child {
        padding: 20px 12px 25px;
      }
      .img {
        margin: 0 8px 0 17px;
        width: 80px;
        height: 60px;
        border-radius: 4px;
        overflow: hidden;
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        .title {
          font-size: 14px;
          color: #666;
          text-align: left;
        }
        .info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-size: 9px;
          color: RGBA(0, 0, 0, 0.5);
        }
      }
    }
  }
}
</style>
