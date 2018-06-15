<template>
  <div class="wrap">
    <xx-step-bar step="1">
      <xx-step-items slot="items">
        待确认
      </xx-step-items>
      <xx-step-items slot="items">
        服务中
      </xx-step-items>
      <xx-step-items slot="items">
        已完成
      </xx-step-items>
    </xx-step-bar>

    <xx-cell class="mt10px">
      <xx-cell-items label="服务项" class="noraml_cell_right">
        PICC换药
      </xx-cell-items>
      <xx-cell-items label="服务对象" class="noraml_cell_right">
        刘一
      </xx-cell-items>
      <xx-cell-items label="联系电话" class="noraml_cell_right" style="color:#3AC7F5">
        13541210120
      </xx-cell-items>
      <xx-cell-items label="地址" class="noraml_cell_right" style="color:#3AC7F5">
        <p style="font-size: 12px;width: 216px;text-align: justify;float: right;">
          四川省成都市天府新区华阳街道天府大道 184号附298号
        </p>
      </xx-cell-items>
    </xx-cell>
    <h2 class="cells_title">
      用户需求描述
    </h2>
    <xx-cell>
      <xx-cell-items label="工具" class="noraml_cell_right" style="color: #FF3939">
        需要准备工具
      </xx-cell-items>
      <xx-cell-items label="药品" class="noraml_cell_right">
        不需要准备药品
      </xx-cell-items>
      <xx-cell-items label="用户描述" direction="vertical">
        <p style="margin-top: 20px;font-size: 13px;color: #999;text-align: justify;">
          感冒咳嗽，头晕眼花感冒咳嗽，头晕眼花感冒咳嗽，头晕眼花感冒咳嗽，头晕眼花感冒咳嗽，头晕眼花感冒咳嗽，头晕眼花
        </p>
      </xx-cell-items>
      <xx-cell-items label="相关图片" direction="vertical">
        <div class="thumbs_container">
          <img  v-for="(item, index) in prewimgList" :src="item.src" :key="index" @click="previewImage(index)" class="previewer-img" alt="">
        </div>
      </xx-cell-items>
    </xx-cell>
    <h2 class="cells_title">
      确认服务时间
    </h2>
    <xx-cell>
      <xx-cell-items label="用户申请服务时间段" direction="vertical">
        <div class="select-time_container">
          <div class="select-time_items">
            {{startTime}}
          </div>
          <span class="select-time_interval">至</span>
          <div class="select-time_items">
            {{endTime}}
          </div>
        </div>
      </xx-cell-items>
      <xx-cell-items :required="true" label="与用户沟通到达时间" class="noraml_cell_right" style="color: #3AC7F5" @click.native="selectArrivalTime">
        <template v-if="arrivalTime">
          {{arrivalTime}}
        </template>
        <div v-else>
          请选择
          <i class="iconfont icon-jiantouyou" style="color:#CCCCCC;"></i>
        </div>
      </xx-cell-items>
      <xx-hint>
        请服务者根据用户申请服务时间段确定到达时间点
      </xx-hint>
    </xx-cell>
    <xx-cell>
      <xx-cell-items label="服务备注（该内容患者不可见）" direction="vertical">
        <div class="service_remark_textarea_container">
          <textarea v-model="remark" class="service_remark_textarea" placeholder="请输入备注"></textarea>
          <span class="service_remark_textarea_nums_count">{{remark.length}} / 200</span>
        </div>
      </xx-cell-items>
    </xx-cell>
    <div class="btn-bar">
      <button type="button" class="weui-btn weui-btn_primary">取消任务</button>
      <button type="button" class="weui-btn weui-btn_primary">生成任务</button>
    </div>
    <div v-transfer-dom>
      <previewer ref="previewer" :list="prewimgList" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
import { Group, Datetime, Previewer, TransferDom, dateFormat } from 'vux'
const dataFormatRule = 'YYYY/MM/DD HH:mm'
export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    Datetime,
    Previewer
  },
  data () {
    const that = this
    return {
      startTime: dateFormat(new Date(), dataFormatRule),
      endTime: dateFormat(that.addOneDay(new Date()), dataFormatRule),
      arrivalTime: null,
      remark: '',
      prewimgList: [
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
          let thumbnail = document.querySelectorAll('.previewer-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  methods: {
    addOneDay (date) {
      return new Date(date.getTime() + 24 * 60 * 60 * 1000)
    },
    previewImage (index) {
      this.$refs.previewer.show(index)
    },
    selectStartTime () {
      const that = this
      that.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: dataFormatRule,
        value: that.startTime,
        yearRow: '{value}年',
        monthRow: '{value}月',
        dayRow: '{value}日',
        hourRow: '{value}时',
        minuteRow: '{value}分',
        clearText: '服务开始时间',
        onConfirm (val) {
          that.startTime = val
          that.endTime = dateFormat(that.addOneDay(new Date(val)), dataFormatRule)
        }
      })
    },
    selectEndTime () {
      const that = this
      that.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        startDate: that.startTime,
        format: dataFormatRule,
        value: that.endTime,
        yearRow: '{value}年',
        monthRow: '{value}月',
        dayRow: '{value}日',
        hourRow: '{value}时',
        minuteRow: '{value}分',
        clearText: '服务结束时间',
        onConfirm (val) {
          that.endTime = val
        }
      })
    },
    selectArrivalTime () {
      const that = this
      that.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        clearText: '预计到达时间',
        startDate: new Date(),
        yearRow: '{value}年',
        monthRow: '{value}月',
        dayRow: '{value}日',
        hourRow: '{value}时',
        minuteRow: '{value}分',
        minHour: new Date().getHours(),
        format: dataFormatRule,
        onConfirm (val) {
          that.arrivalTime = val
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap
  {
    padding-bottom: 90px;
  }
.mt10px
{
  margin-top: 10px;
}
.noraml_cell_right
{
  font-size:13px;
  color: #999999;
  text-align: right;
}
.cells_title
{
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  font-size: 15px;
  color: #999;
  font-weight: normal;
}
.btn-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  .weui-btn:nth-child(1) {
    background: #ffc349
  }
}
.thumbs_container
{
  padding-top: 20px;
  .previewer-img
  {
    display: inline-block;
    width: 65px;
    height: 65px;
    margin-right: 10px;
  }
}
  .select-time_container
  {
    display: flex;
    flex-flow: nowrap;
    align-content: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 18px;
  }
  .select-time_items
  {
    flex: 1;
    text-align: center;
    font-size: 15px;
    color: #999999;
  }
  .select-time_interval
  {
    flex: 0 0 35px;
    text-align: center;
    font-size: 15px;
    color: #333333;
  }
  .service_remark_textarea_container
  {
    margin-top: 12px;
    position: relative;
    height: 115px;
    border: 1px solid #E7F9F8;
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
    -webkit-tap-highlight-color: rgba(0,0,0,0);
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
</style>
