<template>
  <div class="warp_container" v-if="detail">
    <xx-step-bar :step="detail.State | stepFileter">
      <xx-step-items slot="items">
        用户资料
      </xx-step-items>
      <xx-step-items slot="items">
        服务者资料
      </xx-step-items>
      <xx-step-items slot="items">
        客服仲裁
      </xx-step-items>
      <xx-step-items slot="items">
        结果
      </xx-step-items>
    </xx-step-bar>
    <div class="card_titile_container">
      投诉编号：{{complaintId}}
    </div>
    <div class="mission_card_container" @click="redirectMissionDetail">
      <div class="left">
        <img :src="detail.UseType | xxMissionTypeIconFilter" alt="任务">
      </div>
      <div class="right">
        <h3 class="mission_title">
          {{detail.MissionName |textFilter(25)}}
        </h3>
        <p class="mission_content">服务单号：{{detail.ServiceID}}</p>
      </div>
    </div>
    <div v-if="detail.State >= 1" class="card_titile_container">
      客服仲裁结果
    </div>
    <dl v-if="detail.State >= 1" class="arbitration_result_container">
      <template  v-if="detail.State === 1">
        <dt>客服还未提交仲裁结果</dt>
        <dd>请耐心等待，谢谢！</dd>
      </template>
      <template  v-if="detail.State === 2">
        <dt>您好，根据您和用户所提交的资料中和判定</dt>
        <dd><span style="color:#666">结果为：</span>投诉成功</dd>
      </template>
      <template  v-if="detail.State === 3">
        <dt>您好，根据您和用户所提交的资料中和判定</dt>
        <dd><span style="color:#666">结果为：</span>投诉失败</dd>
        <div style="font-size:12px;color:#999;margin-top: 10px">驳回原因：{{detail.FailReason}}</div>
      </template>
    </dl>

    <div v-if="detail.State >= 1" class="card_titile_container">
      服务者回复内容
      <span class="right">
      </span>
    </div>
    <xx-cell v-if="detail.State >= 1">
      <xx-cell-items label="其他备注" :labelStyle="labelStyle" class="noraml_cell_right">
        <p class="cell_content_desc">
          {{detail.ServantAppealContent}}
        </p>
      </xx-cell-items>
      <xx-cell-items v-if="detail.ServantAppealImgs != null && detail.ServantAppealImgs != ''" label="相关图片" :labelStyle="labelStyle" class="noraml_cell_right" style="color:#3AC7F5">
        <image-preview-item :list="detail.ServantAppealImgs"></image-preview-item>
      </xx-cell-items>
    </xx-cell>

    <div class="card_titile_container">
      用户投诉内容
      <span class="right">
        提交时间：{{detail.CreateTime | xxTimeFormatFilter}}
      </span>
    </div>
    <xx-cell>
      <xx-cell-items label="投诉人" :labelStyle="labelStyle" class="noraml_cell_right">
        <p class="cell_content_desc">
          {{detail.UserName}}
        </p>
      </xx-cell-items>
      <xx-cell-items label="投诉原因" :labelStyle="labelStyle" class="noraml_cell_right">
        <p class="cell_content_desc">
          {{detail.UserComplaintTitle}}
        </p>
      </xx-cell-items>
      <xx-cell-items label="其他备注" :labelStyle="labelStyle" class="noraml_cell_right">
        <p class="cell_content_desc">
          {{detail.UserComplaintContent}}
        </p>
      </xx-cell-items>
      <xx-cell-items v-if="detail.UserComplaintImgs != null && detail.UserComplaintImgs != ''" label="相关图片" :labelStyle="labelStyle" class="noraml_cell_right" style="color:#3AC7F5">
        <image-preview-item :list="detail.UserComplaintImgs"></image-preview-item>
      </xx-cell-items>
    </xx-cell>
    <div class="card_titile_container"  v-if="detail.State === 0">
      服务者回复内容
      <span class="right">
      </span>
    </div>
    <xx-cell  v-if="detail.State === 0">
      <xx-cell-items label="其他备注" direction="vertical">
        <div class="service_remark_textarea_container">
          <textarea v-model="remark" class="service_remark_textarea" placeholder="请输入备注"></textarea>
          <span class="service_remark_textarea_nums_count">{{remark.length}} / 200</span>
        </div>
      </xx-cell-items>
      <xx-cell-items label="相关图片上传" direction="vertical">
        <xx-uploader :limit="9" @onUpdate="onUpdate"></xx-uploader>
      </xx-cell-items>
    </xx-cell>
    <div v-if="detail.State === 0" class="btn_bar">
      <button type="button" class="weui-btn weui-btn_primary" @click="commitAppealContentEvent">提交</button>
    </div>
  </div>
</template>
<script>
import { Confirm, TransferDom } from 'vux'
import ImagePreviewItem from '@/components/ImagePreViewItem'
export default {
  directives: {
    TransferDom
  },
  components: {
    ImagePreviewItem,
    Confirm
  },
  data () {
    return {
      labelStyle: 'flex: 0 0 100px;font-size: 14px',
      detail: {},
      showCancel: false,
      disabled: false,
      remark: '',
      imageList: ''
    }
  },
  filters: {
    textFilter (value = '', len = 10) {
      return value.length > len ? value.substring(0, len) + '…' : value
    },
    timeFormat (value = '') {
      value = value.replace('T', ' ')
      return value
    },
    stepFileter (value) {
      if (value === 0) {
        return '2'
      }
      if (value === 1) {
        return '3'
      }
      if (value === 2 || value === 3 || value === -1) {
        return '4'
      }
      return '0'
    }
  },
  computed: {
    complaintId () {
      return this.$route.params.id
    }
  },
  created () {
    this.initDetail()
  },
  methods: {
    redirectMissionDetail () {
      this.$router.push(`/mission/waitreceive/${this.detail.MissionID}`)
    },
    async initDetail () {
      this.$vux.loading.show({
        text: '加载中'
      })
      await this.getData().then(value => {
        if (value.Data.State === -1) {
          this.$vux.alert.show('用户已取消投诉')
          this.$router.push('/user')
        } else {
          this.detail = value.Data
        }
      })
      this.$vux.loading.hide()
      document.documentElement.scrollTop = 0
    },
    async getData () {
      const res = await this.$http.get(`/Complaint?complaintID=${this.complaintId}`)
      return res.data
    },
    /**
     * 提交申诉内容
     */
    commitAppealContentEvent () {
      const that = this
      if (that.remark.length < 5) {
        that.$vux.toast.show({
          width: '60%',
          type: 'text',
          position: 'middle',
          text: '备注不可少于5个字！'
        })
        return false
      }
      if (that.remark.length > 200) {
        that.$vux.toast.show({
          width: '60%',
          type: 'text',
          position: 'middle',
          text: '备注不可超过200字！'
        })
        return false
      }
      that.commitAppealContent().then(value => {
        if (value.Code === 100000) {
          that.$vux.toast.show({
            width: '60%',
            type: 'text',
            position: 'middle',
            text: '提交成功！'
          })
          that.initDetail()
        } else {
          that.$vux.toast.show({
            width: '60%',
            type: 'text',
            position: 'middle',
            text: value.Msg
          })
        }
      })
    },
    async commitAppealContent () {
      const res = await this.$http.post(`/Complaint/Appeal?ID=${this.detail.ID}`, {
        AppealTitle: `【申诉】${this.detail.UserComplaintTitle}`,
        AppealContent: this.remark,
        EvidenceImgs: this.imageList
      })
      return res.data
    },
    /**
     * 图片上传回调
     */
    onUpdate (value) {
      let imgsStr = ''
      value.map((item) => {
        imgsStr += item + ','
      })

      this.imageList = imgsStr.substring(0, imgsStr.lastIndexOf(','))
    }
  }
}
</script>

<style scoped lang="less">
.warp_container
{
  padding-bottom: 100px;
}
.card_titile_container
{
  height:30px;
  line-height:30px;
  font-size: 14px;
  color: #999;
  padding: 0 15px;
  .right
  {
    font-size: 12px;
    float: right;
  }
}
.mission_card_container
{
  display: flex;
  flex-flow: nowrap;
  padding: 10px 0;
  background-color: #fff;
  .left
  {
    display: flex;
    flex: 0 0 57px;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .right
  {
    display: flex;
    flex: 1;
    flex-flow: column;
    justify-content: center;
    align-items: left;
    padding-right: 10px;
    .mission_title
    {
      position: relative;
      font-size: 16px;
      color: #666;
      font-weight: 400;
      line-height: 20px;
      width: 100%;
      .mission_id
      {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
        color: #999;
      }
    }
    .mission_content
    {
      font-size: 12px;
      margin-top: 10px;
      color: #999;
    }
  }
}
.cell_content_desc
{
  font-size: 12px;
  max-width: 216px;
  color: #999;
  word-break: break-all;
  text-align: justify;
}
.btn_bar
{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 52px;
  display: flex;
  flex-flow: nowrap
}

.service_remark_textarea_container
{
  margin-top: 12px;
  position: relative;
  height: 115px;
}
.service_remark_textarea
{
  box-sizing: border-box;
  background-color: #f6f6f6;
  outline: none;
  padding: 12px;
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  border-radius: 2px;
}
.service_remark_textarea_nums_count
{
  position: absolute;
  right: 16px;
  bottom: 7px;
  height: 18px;
  line-height: 18px;
  color: #999999;
  font-size: 13px;
}
.arbitration_result_container
{
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 160px;
  dt
  {
    color: #666;
    font-size: 14px;
  }
  dd
  {
    color: #F8A519;
    font-size: 14px;
  }
}
</style>
