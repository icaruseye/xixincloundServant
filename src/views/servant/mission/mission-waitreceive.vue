<template>
  <div class="wrap">
    <xx-step-bar v-if="detail.State != -1" :step="detail.State | stepFileter">
      <xx-step-items slot="items">
        已确认
      </xx-step-items>
      <xx-step-items slot="items">
        服务中
      </xx-step-items>
      <xx-step-items slot="items">
        已完成
      </xx-step-items>
    </xx-step-bar>
    <div class="canceled_container clearfix" v-else>
      <div class="cancel_icon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yiquxiao"></use>
        </svg>
      </div>
      <h2 v-if="detail.CancelTypeMsg" class="canceled_title">
        {{detail.CancelTypeMsg}}
      </h2>
      <p v-if="detail.CancelDescription" class="canceled_reason">{{detail.CancelDescription}}</p>
    </div>
    <xx-timeLine :step="detail.State | stepFileter" class="mt10px">
      <xx-timeLine-items
        slot="items"
        title="已确认"
      >
        <template v-if="detail.State >= 3" slot="subhead">
            到达时间：{{detail.StartTime | xxTimeFormatFilter}}
        </template>
        <ul>
          <li class="desc_list_items">
            <p class="normal_desc_p" style="font-size: 14px; color: #666">任务名称：{{detail.ItemName}}</p>
            <p class="normal_desc_p">服务单号：{{detail.ServiceID}}</p>
            <p class="normal_desc_p">服务对象：{{detail.UserName}}</p>
            <p class="normal_desc_p">执行人：{{detail.ServantName}}</p>
            <p class="normal_desc_p">约定到达时间：{{detail.ConfirmArriveTime | xxTimeFormatFilter}}</p>
            <p v-if="detail.ReserveRemark" class="normal_desc_p" style="word-break: break-all">备注：{{detail.ReserveRemark}}</p>
            <div style="margin-top: 5px" v-if="carryTags.length > 0">
              <i v-for="(item, index) in carryTags" :key="index" class="i_tags" :style="{'background-color': colorToRgb('#f56c6c', .2),'color': '#f56c6c','borderColor': '#f56c6c'}">
                {{item.ViewName}}
              </i>
            </div>
          </li>
          <li class="desc_list_items">
            <h5 class="desc_list_items_title">用户描述</h5>
            <p class="normal_desc_p" style="word-break: break-all">{{detail.ReserveDiscreption?detail.ReserveDiscreption: '该用户没有留言'}}</p>
          </li>
          <li class="desc_list_items" v-if="detail.ReserveImgs != null && detail.ReserveImgs != ''">
            <h5 class="desc_list_items_title">相关图片</h5>
            <image-preview-item :list="detail.ReserveImgs"></image-preview-item>
          </li>
        </ul>
      </xx-timeLine-items>

      <xx-timeLine-items
        slot="items"
        :title="detail.State>=4?'已服务': '服务中'"
      >
        <template v-if="detail.State >= 4" slot="subhead">
            完成时间：{{detail.EndTime | xxTimeFormatFilter}}
        </template>
        <ul v-if="detail.State == 0">
          <li class="desc_list_items">
            <p class="normal_desc_p">
              用户联系电话：
              <a :href="'tel:'+detail.Mobile" style="font-size: 12px;color: #999999;">{{detail.Mobile}}</a>
            </p>
            <p class="normal_desc_p">
              服务地址：
              <span style="font-size: 12px;color: #999999;">{{detail.Address}}</span>
            </p>
            <xx-hint style="margin: 0;height: 30px;line-height:30px">
              {{detail.UseType === 3 ? '用户' : '服务人员'}}还未到达服务指定地点
            </xx-hint>
          </li>
        </ul>
        <ul v-if="detail.State == 3">
          <li v-if="actionList.length > 0" class="desc_list_items">
            <p class="normal_title_p">任务服务需要完成标准动作</p>
            <div style="padding-top: 11px; margin: 0 10px">
              <xx-checker-box  v-model="actionListValue">
                <xx-checker-item ref="actionCheckItems" v-for="(item, index) in actionList" :key="index" :value="item.ID" slot="item" name="testAction" :labelName="item.Name" style="display: block; margin-bottom: 18px;">
                  {{index+1}}：{{item.Name}}
                </xx-checker-item>
              </xx-checker-box>
            </div>
          </li>
          <li v-if="attributeList.length > 0" class="desc_list_items">
            <p class="normal_title_p">任务服务需要采集的信息</p>
            <div style="padding-top: 11px; margin: 0 10px">
              <xx-input-group-box ref="attributeInputGroup" v-model="attributeListValue">
                <xx-input-group-items ref="attributeItems" v-for="(item, index) in attributeList" :key="index" :label="item.Name" slot="item" :name="item.ID" :unit="item.Unit"></xx-input-group-items>
              </xx-input-group-box>
            </div>
          </li>
          <li class="desc_list_items">
            <p class="normal_title_p">服务报告</p>
            <div class="service_remark_textarea_container">
              <textarea class="service_remark_textarea" placeholder="请输入文本" v-model="serviceResult"></textarea>
            </div>
          </li>
          <li class="desc_list_items">
            <p class="normal_title_p">备注 <span style="font-size: 12px; color:#A7A7A7">（用户不可见）</span></p>
            <div class="service_remark_textarea_container" style="height: 65px">
              <textarea class="service_remark_textarea" placeholder="请输入文本" v-model="remark"></textarea>
            </div>
          </li>
          <li class="desc_list_items">
            <p class="normal_title_p">服务相关图片</p>
            <div class="thumbs_container" style="margin-top: 14px">
              <xx-uploader
              :limit="9"
              @onUpdate="onUpdate"
              ></xx-uploader>
            </div>
          </li>
        </ul>
        <!-- 待评价 -->
        <ul v-if="detail.State >= 4">
          <li v-if="actionList.length > 0" class="desc_list_items">
            <p class="normal_title_p">任务服务需要完成标准动作</p>
            <div style="padding-top: 11px; margin: 0 10px">
              <p class="finished_action_list_item" v-for="(item, index) in actionList" :key="index">
                {{index+1}}：{{item.Name}}
                <span class="finished_action_list_tags" v-if="item.IsDone">已操作</span>
              </p>
            </div>
          </li>
          <li v-if="attributeList.length > 0" class="desc_list_items">
            <p class="normal_title_p">任务服务需要采集的信息</p>
            <div style="padding-top: 11px; margin: 0 10px">
              <p class="finished_action_list_item" v-for="(item, index) in attributeList" :key="index">
                {{item.Name}}：
                <template v-if="item.Value != '' && item.Value != null">
                  {{item.Value}}{{item.Unit}}
                </template>
                <template v-else>
                  未采集此项
                </template>
              </p>
            </div>
          </li>
          <li v-if="detail.Result != null && detail.Result != ''" class="desc_list_items">
            <p class="normal_title_p">服务报告</p>
            <p class="normal_desc_p" style="word-break: break-all">
              {{detail.Result}}
            </p>
          </li>
          <li v-if="detail.Discription != null && detail.Discription != ''" class="desc_list_items">
            <p class="normal_title_p">备注 <span style="font-size: 12px; color:#A7A7A7">（用户不可见）</span></p>
            <div class="service_remark_textarea_container" style="height: 65px">
              <p class="normal_desc_p" style="word-break: break-all">
                {{detail.Discription}}
              </p>
            </div>
          </li>
          <li v-if="detail.ServiceImgs != ''" class="desc_list_items">
            <p class="normal_title_p">服务相关图片</p>
            <div class="thumbs_container" style="margin-top: 14px">
              <image-preview-item :list="detail.ServiceImgs"></image-preview-item>
            </div>
          </li>
        </ul>
      </xx-timeLine-items>
      <xx-timeLine-items
        slot="items"
        :title="detail.State<=4?'待评价': '已评价'"
      >
        <p v-if="detail.State < 4" class="normal_desc_p">服务还未完成，不能进行评价</p>
        <p v-if="detail.State == 4" class="normal_desc_p">等待用户对本次服务进行评价！</p>
        
        <template v-if="detail.State == 5 || detail.State == 6" slot="subhead">
            评价时间：{{reviewDetail.ReviewTime | xxTimeFormatFilter}}
        </template>
        <div v-if="detail.State == 5 || detail.State == 6" class="evaluate_content_container">
          <h4 style="font-size: 12px;color: #666;font-weight:400">服务评价</h4>
          <p style="font-size: 12px;color:#999">{{reviewDetail.Remark}}</p>
          <div class="clearfix">
            <rater :value="reviewDetail.Score" :disabled="true" style="float:right;" :font-size="14">
            </rater>
          </div>
        </div>
        <div v-if="detail.State == 7">
          <p style="font-size: 14px;color:#F8A519">本次服务正在被用户投诉中</p>
        </div>
      </xx-timeLine-items>
    </xx-timeLine>

    <div v-if="detail.State != -1" class="btn_bar">
      <button v-if="detail.CanCancel && detail.State < 3"  class="weui-btn weui-btn_primary" style="background-color: #ffc349" @click="cancelMissionPopupVisible = true">取消任务</button>
      <button v-if="detail.State == 0" type="button" class="weui-btn weui-btn_primary" @click="startMissionEvent">已到达，开始服务</button>
      <button v-if="detail.State == 3" type="button" class="weui-btn weui-btn_primary" @click="completeMissionEvent">服务已完成</button>
    </div>
    <cancel-mission-popup v-model="cancelMissionPopupVisible" @confirmCancel="cancelMissionEvent"></cancel-mission-popup>
  </div>
</template>

<script>
import CancelMissionPopup from '@/components/cancelMissionPopup'
import ImagePreviewItem from '@/components/ImagePreViewItem'
import { Rater } from 'vux'
import util from '@/plugins/util'
export default {
  components: {
    ImagePreviewItem,
    Rater,
    CancelMissionPopup
  },
  data () {
    return {
      cancelMissionPopupVisible: false,
      submitLocked: false,
      detail: {}, // 任务单详情
      actionListValue: '', // 动作列表选中的值
      actionList: [], // 动作列表
      attributeListValue: [], // 采集信息的值
      attributeList: [], // 采集信息列表
      serviceResult: '', // 服务结果
      remark: '', // 备注
      serivicePic: '', // 服务相关图片
      reviewDetail: {}, // 评价
      carryTags: []
    }
  },
  computed: {
    MissionID () {
      return this.$route.params.id
    }
  },
  filters: {
    stepFileter (value) {
      if (value === 0) {
        return '1'
      }
      if (value >= 1 && value <= 4) {
        return '2'
      }
      if (value >= 5) {
        return '3'
      }
      return '0'
    }
  },
  created () {
    this.initDetail()
  },
  methods: {
    colorToRgb (color, clarity) {
      return util.colorToRgb(color, clarity)
    },
    /**
     * 完成任务
     */
    verifyActionList () {
      if (this.actionList.length > 0) {
        const actionCheckItemsRefs = this.$refs.actionCheckItems
        for (let i = 0; i < actionCheckItemsRefs.length; i++) {
          let item = actionCheckItemsRefs[i]
          if (!item.modelChecked) {
            this.$vux.toast.text(`请确认是否完成【${item.labelName}】动作`)
            return false
          }
        }
        return true
      } else {
        return true
      }
    },
    verifyAttributeList () {
      if (this.attributeList.length > 0) {
        const attributeItemsRefs = this.$refs.attributeItems
        for (let i = 0; i < attributeItemsRefs.length; i++) {
          let item = attributeItemsRefs[i]
          if (item.modelValue.length <= 0) {
            this.$vux.toast.text(`请填写【${item.label}】`)
            return false
          } else if (item.modelValue.length > item.maxLen) {
            this.$vux.toast.text(`【${item.label}】不可超过${item.maxLen}字`)
            return false
          }
        }
        return true
      } else {
        return true
      }
    },
    completeMissionEvent () {
      const that = this
      if (that.submitLocked) {
        return false
      }
      if (!that.verifyActionList()) {
        return false
      }
      if (!that.verifyAttributeList()) {
        return false
      }
      if (that.attributeList.length > 0 && !that.$refs.attributeInputGroup.verify) {
        that.$vux.toast.show({
          width: '60%',
          type: 'text',
          position: 'middle',
          text: '请正确填写采集信息'
        })
        return false
      }
      if (!that.serviceResult) {
        that.$vux.toast.show({
          width: '60%',
          type: 'text',
          position: 'middle',
          text: '请先完善服务报告'
        })
        return false
      }
      if (that.serviceResult.length > 200) {
        that.$vux.toast.show({
          width: '60%',
          type: 'text',
          position: 'middle',
          text: '服务结果不可超过200字！'
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
      that.$vux.confirm.show({
        content: '请确认已经正确填写了所有信息',
        confirmText: '确认完成',
        cancelText: '继续填写',
        onConfirm () {
          that.submitLocked = true
          that.completeMission().then(value => {
            that.submitLocked = false
            if (value.Code === 100000) {
              that.initDetail()
              that.$vux.toast.show({
                position: 'middle',
                width: '60%',
                text: '服务已完成，请等待用户评价'
              })
            } else {
              that.$vux.toast.show({
                type: 'text',
                width: '60%',
                position: 'middle',
                text: value.Msg
              })
            }
          })
        }
      })
    },
    async completeMission () {
      const res = await this.$http.post('/Mission?missionID=' + this.MissionID, {
        Action: this.actionListValue,
        Attribute: this.attributeListValue,
        ViewResult: this.serviceResult,
        HideResult: this.remark,
        Imgs: this.serivicePic
      })
      return res.data
    },
    /**
     * 开始任务
     */
    startMissionEvent () {
      const that = this
      if (that.submitLocked) {
        return false
      }
      that.submitLocked = true
      that.startMission().then(value => {
        that.submitLocked = false
        if (value.Code === 100000) {
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
    async startMission () {
      const res = await this.$http.put(`/Mission/Start?MissionID=${this.MissionID}`)
      return res.data
    },
    /**
     * 取消任务
     */
    async cancelMissionEvent (option) {
      const that = this
      if (that.submitLocked) {
        return false
      }
      that.submitLocked = true
      const res = await this.$http.put(`/Mission?missionID=${this.MissionID}`, option)
      that.submitLocked = false
      if (res.data.Code === 100000) {
        that.$vux.toast.show({
          position: 'middle',
          text: '任务取消成功'
        })
        that.$router.push('/mission')
      } else {
        that.$vux.toast.show({
          width: '60%',
          type: 'text',
          position: 'middle',
          text: res.data.Msg
        })
      }
    },
    async cancelMission () {
      const res = await this.$http.put(`/Mission?missionID=${this.MissionID}`)
      return res.data
    },
    /**
     * 初始化
     */
    async initDetail () {
      const that = this
      that.$vux.loading.show({
        text: '加载中'
      })
      await that.getData().then(value => {
        if (value.Code === 100000) {
          that.detail = value.Data
        } else {
          that.$vux.loading.hide()
          that.$vux.toast.show(value.Msg)
        }
      })
      await this.getCarryTags().then(value => {
        this.carryTags = value
      })
      if (that.detail.State >= 3) {
        await that.getActionList().then(value => {
          that.actionList = value.Data
        })
        await that.getAttributeList().then(value => {
          that.attributeList = value.Data
        })
      }
      if (that.detail.State >= 5) {
        await that.getReviewDetail().then(value => {
          that.reviewDetail = value.Data
        })
      }
      that.$vux.loading.hide()
      document.documentElement.scrollTop = 0
    },
    async getData () {
      const res = await this.$http.get('/Mission/' + this.MissionID)
      return res.data
    },
    /**
     * 获取任务动作列表
     */
    async getActionList () {
      const res = await this.$http.get('/ItemActionList?missionID=' + this.MissionID)
      return res.data
    },
    /**
     * 获取任务采集信息列表
     */
    async getAttributeList () {
      const res = await this.$http.get('/ItemAttributeList?missionID=' + this.MissionID)
      return res.data
    },
    /**
     * 获取评价内容
     */
    async getReviewDetail () {
      const res = await this.$http.get('/ServantReviewDetails?missionID=' + this.MissionID)
      return res.data
    },
    /**
     * 获取携带物品标签
     */
    async getCarryTags () {
      if (this.detail.PrepareGoodsTags) {
        const res = await this.$http.get(`/CarryGoodsList?tags=${this.detail.PrepareGoodsTags}`)
        return res.data.Data
      } else {
        return []
      }
    },
    /**
     * 图片上传回调
     */
    onUpdate (value) {
      let imgsStr = ''
      value.map((item) => {
        imgsStr += item + ','
      })

      this.serivicePic = imgsStr.substring(0, imgsStr.lastIndexOf(','))
    }
  }
}
</script>
<style scoped lang="less">
  .mt10px
  {
    margin-top: 10px;
  }
  .wrap
  {
    padding-bottom: 100px;
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
  .normal_title_p
  {
    font-size: 14px;
    color: #666;
    text-align: left;
    line-height: 25px;
  }
  .normal_desc_p
  {
    font-size: 12px;
    color: #999999;
    text-align: justify;
    line-height: 25px;
    &.redColor
    {
      color: #FF3939
    }
  }
  .desc_list_items
  {
    position: relative;
    padding-bottom: 11px;
    margin-bottom: 11px;
  }
  .desc_list_items::after
  {
    position: absolute;
    content: '';
    display: block;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    transform: scaleY(.5);
    background-color: #D8F4FD;
  }
  .desc_list_items_title
  {
    font-size: 15px;
    color: #333333;
    font-weight: normal;
    height: 21px;
    line-height: 21px;
    margin-bottom: 7px;
  }
  .preview_img
  {
    display: inline-block;
    width: 65px;
    height: 65px;
    margin-right: 10px;
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
    outline: none;
    padding: 12px;
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    background-color: #f6f6f6;
    border-radius: 3px;
    color: #333333;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  .finished_action_list_item
  {
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
  }
  .finished_action_list_tags
  {
    display: inline-block;
    font-size: 12px;
    color: #FAB43E;
    border: 1px solid #FAB43E;
    border-radius: 4px;
    padding: 0 10px;
    height: 18px;
    margin-left: 10px;
    line-height: 18px;
  }
  .evaluate_content_container
  {
    position: relative;
    background-color: #F2F2F2;
    border-radius: 5px;
    padding: 10px;
    margin-top: 20px;
  }
  .evaluate_content_container::before {
    position: absolute;
    content: '';
    display: block;
    top: -10px;
    left: 20px;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent transparent #F2F2F2 transparent;
    border-width: 0px 10px 10px 10px;
  }
  .canceled_container
  {
    position: relative;
    background-color: #fff;
    text-align: left;
    padding: 25px 20px 25px 100px;
    height: 60px;
    display: flex;
    flex-flow: column;
    .cancel_icon
    {
      position: absolute;
      left: 20px;
      top: 20px;
      font-size: 60px;
      height: 60px;
      line-height: 60px;
      color: #FF5F5F;
    }
    .canceled_title
    {
      font-size: 16px;
      font-weight: normal;
      color: #FF5F5F;
      .iconfont{
        font-size: 26px;
      }
    }
    .canceled_reason
    {
      font-size: 14px;
      color: #999;
      height: 25px;
      line-height: 25px;
    }
  }
  .i_tags
  {
    display: inline-block;
    margin-right: 5px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    padding: 0 5px;
    font-style: normal;
    word-break: break-word;
  }
</style>

