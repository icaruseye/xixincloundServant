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

    <xx-timeLine step="2" class="mt10px">
      <xx-timeLine-items
        slot="items"
        title="已确认"
        subhead="确认时间：2018/06/08 15:30"
      >
        <ul>
          <li class="desc_list_items">
            <p class="normal_desc_p" style="font-size: 14px; color: #666">任务名称：{{detail.ItemName}}</p>
            <p class="normal_desc_p">服务对象：{{detail.UserName}}</p>
            <p class="normal_desc_p">执行人：{{detail.ServantName}}</p>
            <p class="normal_desc_p">时间：2018/01/01 13:30</p>
            <p class="normal_desc_p" style="color:#FF3939;">工具：{{detail.NeedTools?'需要准备':'不需要准备'}}</p>
            <p class="normal_desc_p" style="color:#666666">药品：{{detail.NeedDrug?'需要准备':'不需要准备'}}</p>
            <p class="normal_desc_p">内容：{{detail.Discription?detail.Discription: '该患者没有留言'}}</p>
          </li>
          <li class="desc_list_items">
            <h5 class="desc_list_items_title">用户描述</h5>
            <p class="normal_desc_p">{{detail.Discription?detail.Discription: '该患者没有留言'}}</p>
          </li>
          <li class="desc_list_items">
            <h5 class="desc_list_items_title">相关图片</h5>
            <image-preview-item list=""></image-preview-item>
          </li>
        </ul>
      </xx-timeLine-items>

      <xx-timeLine-items
        slot="items"
        title="服务中"
      >
        <ul>
          <li class="desc_list_items">
            <p class="normal_desc_p">
              用户联系电话：
              <span style="font-size: 12px;color: #999999;">13541242122</span>
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
        <ul>
          <li class="desc_list_items">
            <p class="normal_desc_p">任务服务需要完成标准动作</p>
            <div style="padding-top: 11px; margin: 0 10px">
              <xx-checker-box  v-model="checkboxValue">
                <xx-checker-item value="1" slot="item" name="testAction" style="display: block; margin-bottom: 18px;">
                  1：伤口评估
                </xx-checker-item>
                <xx-checker-item value="2" slot="item" name="testAction" style="display: block; margin-bottom: 18px;">
                  2：清洗伤口
                </xx-checker-item>
                <xx-checker-item value="3" slot="item" name="testAction" style="display: block; margin-bottom: 18px;">
                  3：测量伤口长度
                </xx-checker-item>
                <xx-checker-item value="4" slot="item" name="testAction" style="display: block; margin-bottom: 18px;">
                  4：拍照记录
                </xx-checker-item>
                <xx-checker-item value="5" slot="item" name="testAction" style="display: block; margin-bottom: 18px;">
                  5：消毒
                </xx-checker-item>
                <xx-checker-item value="6" slot="item" name="testAction" style="display: block; margin-bottom: 18px;">
                  6：做好处理记录
                </xx-checker-item>
              </xx-checker-box>
            </div>
          </li>
          <li class="desc_list_items">
            <p class="normal_desc_p">服务结果</p>
            <div class="service_remark_textarea_container">
              <textarea class="service_remark_textarea" placeholder="请输入文本"></textarea>
            </div>
          </li>
          <li class="desc_list_items">
            <p class="normal_desc_p">备注 <span style="font-size: 12px; color:#A7A7A7">（患者不可见）</span></p>
            <div class="service_remark_textarea_container" style="height: 65px">
              <textarea class="service_remark_textarea" placeholder="请输入文本"></textarea>
            </div>
          </li>
          <li class="desc_list_items">
            <p class="normal_desc_p">服务相关图片</p>
            <div class="thumbs_container" style="margin-top: 14px">
              <xx-uploader :limit="4" @onUpdate="onUpdate"></xx-uploader>
            </div>
          </li>
        </ul>
      </xx-timeLine-items>

      <xx-timeLine-items
        slot="items"
        title="待评价"
      >
        <ul>
          <li class="desc_list_items">
            <p class="normal_desc_p">服务还未完成，不能进行评价</p>
          </li>
        </ul>
      </xx-timeLine-items>

    </xx-timeLine>

    <div class="btn_bar">
      <button v-if="detail.CanCancel"  class="weui-btn weui-btn_primary" style="flex:0 0 30%;background-color: #ffc349" @click="cancelMissionEvent">取消任务</button>
      <button type="button" class="weui-btn weui-btn_primary">已到达，开始服务</button>
    </div>
  </div>
</template>

<script>
import { Previewer, TransferDom } from 'vux'
import ImagePreviewItem from '@/components/ImagePreViewItem'
import http from '@/api'
export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer,
    ImagePreviewItem
  },
  data () {
    return {
      detail: {},
      checkboxValue: [],
      relatedPicturesList: [
        {
          src: 'https://img3.doubanio.com/icon/u53078059-35.jpg'
        },
        {
          src: 'https://img3.doubanio.com/icon/u53078059-35.jpg'
        },
        {
          src: 'https://img3.doubanio.com/icon/u53078059-35.jpg'
        },
        {
          src: 'https://img3.doubanio.com/icon/u53078059-35.jpg'
        },
        {
          src: 'https://img3.doubanio.com/icon/u53078059-35.jpg'
        },
        {
          src: 'https://img3.doubanio.com/icon/u53078059-35.jpg'
        },
        {
          src: 'https://img3.doubanio.com/icon/u53078059-35.jpg'
        },
        {
          src: 'https://img3.doubanio.com/icon/u53078059-35.jpg'
        }
      ],
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.preview_img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  computed: {
    MissionID () {
      return this.$route.params.id
    }
  },
  filters: {
    stepFileter (value) {
      switch (value) {
        case 0:
          return '1'
        case 3:
          return '2'
        default:
          return '0'
      }
    }
  },
  created () {
    this.initDetail()
  },
  methods: {

    /**
     * 取消任务
     */
    cancelMissionEvent () {
      const that = this
      that.$vux.confirm.show({
        content: '任务取消后不可恢复，请谨慎操作！',
        confirmText: '仍然取消',
        cancelText: '放弃',
        onConfirm () {
          that.cancelMission().then(value => {
            console.log(value)
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

    initDetail () {
      const that = this
      this.getData().then(value => {
        console.log(value)
        that.detail = value
      })
    },
    async getData () {
      const res = await http.get('/Mission/' + this.MissionID)
      return res.data.Data
    },
    relatedPicturesPreviewImage (index) {
      this.$refs.relatedPicturesListPreviewer.show(index)
    },
    onUpdate (value) {
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
  .normal_desc_p
  {
    font-size: 13px;
    color: #999999;
    text-align: justify;
    line-height: 20px;
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
</style>

