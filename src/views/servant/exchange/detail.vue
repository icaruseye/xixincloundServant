<template>
  <div class="wrapper">
    <div class="exchange_list_wrap" v-if="list.length > 0">
      <template v-for="(item, index) in list">
        <div class="item" :key="index">
          <div class="index" :class="item.State === 0 ? 'used' : ''">NO.{{index + 1}}</div>
          <div class="main_content">
            <div class="content">
              <div class="code_box">
                <div class="number">卡号：{{item.CodeKey}}</div>
                <div class="number" v-if="item.CodeValue">卡密：{{item.CodeValue}}</div>
                <div class="number" v-if="!item.CodeValue" @click="getCodeVal(item.ID, index)">卡密：<span class="show_code">点击查看卡密</span></div>
              </div>
              <div class="status" v-if="item.State === 0">
                <i class="iconfont icon-yishiyong"></i>
              </div>
            </div>
            <div class="info" @click="showDetailHandle(index)">
              <div class="text">详情</div><i class="iconfont icon-xiangqing"></i>
            </div>
          </div>
        </div>
      </template>
      <xxPageSorter
        ref="xxPageSorterRef"
        :TotalPage="CommentPage"
        :pageNumber="page"
        @nextPage="loadNextPage"
      >
      </xxPageSorter>
      <!-- 详情弹窗 -->
      <div>
        <x-dialog v-model="showDetail" class="dialog_detail" :hide-on-blur="true">
          <div class="content" v-if="selectedIndex != null" id="modal">
            <div class="title">激活码详情</div>
            <div class="row">卡号: {{list[selectedIndex].CodeKey}}</div>
            <div class="row">卡密: {{list[selectedIndex].CodeValue || '未取得卡密'}}</div>
            <div class="row" v-if="new Date(list[selectedIndex].ActivityTime).getTime > 0">使用时间: {{list[selectedIndex].ActivityTime | xxTimeFormatFilter}}</div>
            <div class="row" v-if="list[selectedIndex].State === 0">使用人: </div>
            <button v-if="list[selectedIndex].State === 2" class="close" @click="copy">复制卡号卡密</button>
          </div>
        </x-dialog>
      </div>
    </div>
    <xx-occupied-box v-else>
      暂无数据
    </xx-occupied-box>
  </div>
</template>

<script>
import { XDialog } from 'vux'
export default {
  components: {
    XDialog
  },
  data () {
    return {
      showDetail: false,
      selectedIndex: null,
      CommentPage: 1,
      page: 1,
      pageSize: 10,
      list: []
    }
  },
  computed: {
    activationGenerateID () {
      return this.$route.params.id
    }
  },
  created () {
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      const res = await this.$http.get(`/Activation/ActivationCode/List?page=${this.page}&pageSize=${this.pageSize}&activationGenerateID=${this.activationGenerateID}`)
      if (res.data.Code === 100000) {
        this.list.push(...res.data.Data.activationGenerateCodeResponseList)
        this.CommentPage = Math.ceil(res.data.Data.total / this.pageSize)
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async getCodeVal (id, index) {
      const res = await this.$http.get(`/Activation/Scratch?id=${id}`)
      if (res.data.Code === 100000) {
        this.list.splice(index, 1, res.data.Data)
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async loadNextPage () {
      this.page++
      await this.getDetail()
      this.$refs.xxPageSorterRef.loading = false
    },
    showDetailHandle (index) {
      this.selectedIndex = index
      this.showDetail = true
    },
    copy () {
      let clipboardText = `卡号：${this.list[this.selectedIndex].CodeKey}
      卡密：${this.list[this.selectedIndex].CodeValue}
      请在微信小程序兑换激活码`
      this.$copyText(clipboardText).then((e) => {
        this.showDetail = false
        this.$vux.toast.text('已复制卡号卡密到剪贴板')
      }, function (e) {
        this.$vux.toast.text('当前浏览器不支持一键复制功能')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.exchange_list_wrap {
  padding: 12px;
  .item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    background: #fff;
    box-shadow: 0 1px 10px #f1f1f1;
    .index {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90px;
      height: 88px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      background: linear-gradient(to right, #5e95e0, #6483dc);
      &.used {
        background: #e1e1e1;
      }
    }
    .main_content {
      flex: 1;
      padding: 0 10px;
      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 10px;
        color: #666;
        .iconfont {
          color: #999;
        }
      }
    }
    .content {
      display: flex;
      padding: 6px 0;
      font-size: 14px;
      color: #666;
      border-bottom: 1px dashed #e1e1e1;
      .code_box {
        line-height: 1.8;
        flex: 1;
        color: #444;
      }
      .status {
        position: relative;
        .iconfont {
          position: absolute;
          top: -5px;
          right: -12px;
          margin-right: 5px;
          font-size: 40px;
          color: #d1d1d1;
        }
      }
      .show_code {
        color: #5193d4;
        font-size: 12px;
      }
    }
  }
}

.dialog_detail {
  .content {
    padding: 15px;
    .title {
      font-size: 15px;
    }
    .row {
      font-size: 12px;
      color: #666;
      text-align: left;
    }
    .close {
      margin-top: 10px;
      border: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      background: #fe5a32;
      color: #fff;
      &:disabled {
        background: #f1f1f1;
        color: #999;
      }
    }
  }
}
</style>
