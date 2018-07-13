<template>
  <div>
    <popup
      style="background:#fff;padding:15px 0 0"
      v-model="modelValue">
        <div class="title">咨询结果</div>
        <div class="cells result" style="flex:1;color:#A6A6A6">
          {{result}}
        </div>
        <!-- 已评价 -->
        <div>
          <div v-if="commentsContent != null" class="cells">
            <div class="left" style="font-size:16px;color:#333;font-weight:bold">已评价</div>
            <div class="right" style="font-size:12px">评价时间： 2018/12/12</div>
          </div>
          <div v-else class="cells">
            <div class="left" style="font-size:16px;color:#333;font-weight:bold">待评价</div>
          </div>
          <div style="padding:15px;">
            <div v-if="commentsContent != null" class="comments-done">
              <div class="comment">12</div>
              <div class="rates" style="text-align: right;">
                <rater v-model="rater" disabled="disabled" active-color="#F8A519" :font-size="14"></rater>
              </div>
            </div>
            <p v-else style="font-size: 14px;color:#999">
              服务还未完成，不能进行评价
            </p>
          </div>
          <button type="button" class="weui-btn" @click="modelValue = false">关闭</button>
        </div>
    </popup>
  </div>
</template>
<script>
import { Popup, PopupHeader, Rater } from 'vux'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    result: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      rater: 3,
      state: 0,
      commentsContent: null
    }
  },
  computed: {
    MissionID () {
      return this.$route.params.id || ''
    },
    modelValue: {
      set (val) {
        if (val) this.getReviewDetail()
        this.$emit('input', val)
      },
      get () {
        return this.value
      }
    }
  },
  components: {
    Popup,
    PopupHeader,
    Rater
  },
  methods: {
    /**
     * 获取评价内容
     */
    async getReviewDetail () {
      const res = await this.$http.get(`/ServantReviewDetails?missionID=${this.MissionID}`)
      if (res.data.Code === 100000) {
        this.commentsContent = res.data.Data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.service_remark_textarea_container {
  flex: 1;
  position: relative;
  height: 115px;
  background: #f2f2f2;
  border-radius: 3px;
}
.service_remark_textarea {
  box-sizing: border-box;
  outline: none;
  padding: 12px;
  width: 100%;
  height: 90px;
  resize: none;
  border: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.service_remark_textarea_nums_count {
  position: absolute;
  right: 16px;
  bottom: 7px;
  height: 18px;
  line-height: 18px;
  color: #999999;
  font-size: 13px;
  &.warn {
    color: #f44336
  }
}
.cells {
  position: relative;
  padding: 15px 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #999;
}
.cells.result {
  padding: 15px;
}
.cells.result::after {
  position: absolute;
  content: '';
  display: block;
  bottom: 0;
  left: 15px;
  right: 15px;
  height: 1px;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
  background-color: #D8F4FD;
}
.title {
  color: #333;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
}
.ic_gth {
  position: relative;
  top: 0px;
  margin-right: 5px;
  width: 12px;
  height: 12px;
  background: #F6E5C8;
  border-radius: 50%;
}
.tips {
  display: flex;
  align-items: center;
  padding: 5px 0;
  font-size: 11px;
  color: #999;
}
.btn {
  font-size: 18px;
  display: block;
  width: 90px;
  height: 30px;
  line-height: 32px;
  text-align: center;
  border: 0;
  border-radius: 15px;
  color: #fff;
  &:nth-child(1) {
    margin-right: 70px;
  }
  &.green {
   background: #3ecccc; 
  }
  &.gray {
    background: #ccc;
  }
}
.comments-done {
  position: relative;
  margin-top: 5px;
  padding: 12px 12px 9px 12px;
  background: #F2F2F2;
  border-radius: 4px;
  &::after {
    content: "";
    position: absolute;
    top: -20px;
    left: 10px;;
    width:0;
    height:0;
    border:10px solid #f00283;
    border-color: transparent transparent #F2F2F2 transparent;
  }
}
</style>
