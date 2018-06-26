<template>
  <div class="wrap">
    <xx-step-bar :step="detail.State | stepFileter">
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

    <xx-timeLine :step="detail.State | stepFileter" class="mt10px">
      <xx-timeLine-items
        slot="items"
        title="已确认"
      >
        <template v-if="detail.State >= 3" slot="subhead">
            到达时间：{{detail.StartTime | timeFormat}}
        </template>
        <ul>
          <li class="desc_list_items">
            <p class="normal_desc_p" style="font-size: 14px; color: #666">任务名称：{{detail.ItemName}}</p>
            <p class="normal_desc_p">服务对象：{{detail.UserName}}</p>
            <p class="normal_desc_p">执行人：{{detail.ServantName}}</p>
            <p class="normal_desc_p">时间：2018/01/01 13:30</p>
            <p class="normal_desc_p" style="color:#FF3939;">工具：{{detail.NeedTools?'需要准备':'不需要准备'}}</p>
            <p class="normal_desc_p" style="color:#666666">药品：{{detail.NeedDrug?'需要准备':'不需要准备'}}</p>
            <p v-if="detail.ReserveRemark" class="normal_desc_p">备注：{{detail.ReserveRemark}}</p>
          </li>
          <li class="desc_list_items">
            <h5 class="desc_list_items_title">用户描述</h5>
            <p class="normal_desc_p">{{detail.ReserveDiscreption?detail.ReserveDiscreption: '该患者没有留言'}}</p>
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
            完成时间：{{detail.EndTime | timeFormat}}
        </template>
        <ul v-if="detail.State == 0">
          <li class="desc_list_items">
            <p class="normal_desc_p">
              用户联系电话：
              <span style="font-size: 12px;color: #999999;">{{detail.Mobile}}</span>
            </p>
            <p class="normal_desc_p">
              用户服务地址：
              <span style="font-size: 12px;color: #999999;">{{detail.Address}}</span>
            </p>
            <xx-hint style="margin: 0;height: 30px;line-height:30px">
              服务人员还未到达服务指定地点
            </xx-hint>
          </li>
        </ul>
        <ul v-if="detail.State == 3">
          <li class="desc_list_items">
            <p class="normal_title_p">任务服务需要完成标准动作</p>
            <div style="padding-top: 11px; margin: 0 10px">
              <xx-checker-box  v-model="actionListValue">
                <xx-checker-item v-for="(item, index) in actionList" :key="index" :value="item.ID" slot="item" name="testAction" style="display: block; margin-bottom: 18px;">
                  {{index+1}}：{{item.Name}}
                </xx-checker-item>
              </xx-checker-box>
            </div>
          </li>
          <li class="desc_list_items">
            <p class="normal_title_p">任务服务需要采集的信息</p>
            <div style="padding-top: 11px; margin: 0 10px">
              <xx-input-group-box ref="attributeInputGroup" v-model="attributeListValue">
                <xx-input-group-items v-for="(item, index) in attributeList" :key="index" :label="item.Name" slot="item" :name="item.ID" :unit="item.Unit"></xx-input-group-items>
              </xx-input-group-box>
            </div>
          </li>
          <li class="desc_list_items">
            <p class="normal_title_p">服务结果</p>
            <div class="service_remark_textarea_container">
              <textarea class="service_remark_textarea" placeholder="请输入文本" v-model="serviceResult"></textarea>
            </div>
          </li>
          <li class="desc_list_items">
            <p class="normal_title_p">备注 <span style="font-size: 12px; color:#A7A7A7">（患者不可见）</span></p>
            <div class="service_remark_textarea_container" style="height: 65px">
              <textarea class="service_remark_textarea" placeholder="请输入文本" v-model="remark"></textarea>
            </div>
          </li>
          <li class="desc_list_items">
            <p class="normal_title_p">服务相关图片</p>
            <div class="thumbs_container" style="margin-top: 14px">
              <xx-uploader 
              :limit="4"
              :maxSize="1024 * 1024 * 5"
              @onUpdate="onUpdate"
              ></xx-uploader>
            </div>
          </li>
        </ul>
        <!-- 待评价 -->
        <ul v-if="detail.State >= 4">
          <li class="desc_list_items">
            <p class="normal_title_p">任务服务需要完成标准动作</p>
            <div style="padding-top: 11px; margin: 0 10px">
              <p class="finished_action_list_item" v-for="(item, index) in actionList" :key="index">
                {{index+1}}：{{item.Name}}
                <span class="finished_action_list_tags" v-if="item.IsDone">已操作</span>
              </p>
            </div>
          </li>
          <li class="desc_list_items">
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
            <p class="normal_title_p">服务结果</p>
            <p class="normal_desc_p">
              {{detail.Result}}
            </p>
          </li>
          <li v-if="detail.Discription != null && detail.Discription != ''" class="desc_list_items">
            <p class="normal_title_p">备注 <span style="font-size: 12px; color:#A7A7A7">（患者不可见）</span></p>
            <div class="service_remark_textarea_container" style="height: 65px">
              <p class="normal_desc_p">
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
        <p v-if="detail.State == 4" class="normal_desc_p">等待患者对本次服务进行评价！</p>
        
        <template v-if="detail.State == 5 || detail.State == 6" slot="subhead">
            评价时间：{{reviewDetail.ReviewTime | timeFormat}}
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

    <div class="btn_bar">
      <button v-if="detail.CanCancel && detail.State < 3"  class="weui-btn weui-btn_primary" style="flex:1 0 30%;background-color: #ffc349" @click="cancelMissionEvent">取消任务</button>
      <button v-if="detail.State == 0" type="button" class="weui-btn weui-btn_primary" @click="startMissionEvent">已到达，开始服务</button>
      <button v-if="detail.State == 3" type="button" class="weui-btn weui-btn_primary" @click="completeMissionEvent">服务已完成</button>
    </div>
  </div>
</template>

<script>
import ImagePreviewItem from '@/components/ImagePreViewItem'
import { dateFormat, Rater } from 'vux'
export default {
  metaInfo: {
    title: '任务详情'
  },
  components: {
    ImagePreviewItem,
    Rater
  },
  data () {
    return {
      submitLocked: false,
      detail: {}, // 任务单详情
      actionListValue: '', // 动作列表选中的值
      actionList: [], // 动作列表
      attributeListValue: [], // 采集信息的值
      attributeList: [], // 采集信息列表
      serviceResult: '', // 服务结果
      remark: '', // 备注
      serivicePic: '', // 服务相关图片
      reviewDetail: {} // 评价
    }
  },
  computed: {
    MissionID () {
      return this.$route.params.id
    }
  },
  filters: {
    timeFormat (value) {
      return dateFormat(new Date(value), 'YYYY-MM-DD HH:mm')
    },
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
    /**
     * 完成任务
     */
    completeMissionEvent () {
      const that = this
      if (that.submitLocked) {
        return false
      }
      if (!that.$refs.attributeInputGroup.verify) {
        that.$vux.toast.show({
          width: '60%',
          type: 'text',
          position: 'middle',
          text: '请正确填写采集信息'
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
        content: '请确定已经正确填写了相关信息？',
        confirmText: '确认完成',
        cancelText: '没有完成',
        onConfirm () {
          that.submitLocked = true
          that.completeMission().then(value => {
            that.submitLocked = false
            if (value.Code === 100000) {
              that.initDetail()
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
      const that = this
      const res = await that.$http.put('/Mission/Start?MissionID=' + that.MissionID)
      return res.data
    },
    /**
     * 取消任务
     */
    cancelMissionEvent () {
      const that = this
      if (that.submitLocked) {
        return false
      }
      that.$vux.confirm.show({
        content: '任务取消后不可恢复，请谨慎操作！',
        confirmText: '仍然取消',
        cancelText: '放弃',
        onConfirm () {
          that.submitLocked = true
          that.cancelMission().then(value => {
            that.submitLocked = false
            if (value.Code === 100000) {
              that.$vux.toast.show({
                position: 'middle',
                text: '取消成功'
              })
              that.$router.push('/mission')
            } else {
              that.$vux.toast.show({
                width: '60%',
                type: 'text',
                position: 'middle',
                text: value.Msg
              })
            }
          })
        }
      })
    },
    async cancelMission () {
      const that = this
      const res = await that.$http.put('/Mission?missionID=' + that.MissionID)
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
        that.detail = value.Data
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
</style>

