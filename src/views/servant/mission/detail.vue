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

    <template v-if="state == 1">
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
        <xx-cell-items label="服务备注（该内容用户不可见）" direction="vertical">
          <div class="service_remark_textarea_container">
            <textarea v-model="remark" class="service_remark_textarea" placeholder="请输入备注"></textarea>
            <span class="service_remark_textarea_nums_count">{{remark.length}} / 200</span>
          </div>
        </xx-cell-items>
      </xx-cell>
      <div v-transfer-dom>
        <previewer ref="previewer" :list="prewimgList" :options="options"></previewer>
      </div>
    </template>

    <template v-else>
      <xx-timeLine step="2" class="mt10px">
        <xx-timeLine-items
          slot="items"
          title="已确认"
          subhead="确认时间：2018/06/08 15:30"
        >
          <ul>
            <li class="desc_list_items">
              <p class="normal_desc_p" style="font-size: 14px; color: #666">任务名称：PICC换药</p>
              <p class="normal_desc_p">服务对象：贾秉仁</p>
              <p class="normal_desc_p">执行人：王二小</p>
              <p class="normal_desc_p">时间：2018/01/01 13:30</p>
              <p class="normal_desc_p" style="color:#FF3939;">工具：需要准备</p>
              <p class="normal_desc_p">药品：不需要准备</p>
              <p class="normal_desc_p">内容：阿莫西林3颗含服</p>
            </li>
            <li class="desc_list_items">
              <h5 class="desc_list_items_title">用户描述</h5>
              <p class="normal_desc_p">感冒咳嗽，头晕眼花</p>
            </li>
            <li class="desc_list_items">
              <h5 class="desc_list_items_title">相关图片</h5>
              <div class="thumbs_container">
                <img class="previewer-img" v-for="(item, index) in prewimgList" :src="item.src" :key="index" @click="relatedPicturesPreviewImage(index)" alt="">
              </div>
              <div v-transfer-dom>
                <previewer ref="relatedPicturesListPreviewer" :list="prewimgList" :options="options"></previewer>
              </div>
            </li>
          </ul>
        </xx-timeLine-items>

        <xx-timeLine-items
          slot="items"
          title="服务中"
        >
          <ul>
            <li v-if="state == 2" class="desc_list_items">
              <p class="normal_desc_p">
                用户联系电话：
                <span style="font-size: 12px;color: #999999;">13541242122</span>
              </p>
              <p class="normal_desc_p">
                用户服务地址：
                <span style="font-size: 12px;color: #999999;">四川省成都市22号</span>
              </p>
              <xx-hint style="margin: 0;height: 30px;line-height:30px">
                服务人员还未到达服务指定地点
              </xx-hint>
            </li>
            <li v-if="state == 3 || state == 4 || state == 5 " class="desc_list_items">
              <p class="normal_desc_p">任务服务需要完成标准动作</p>
              <div style="padding-top: 11px; margin: 0 10px">
                <xx-checker-box v-if="state == 3">
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
            <li v-if="state == 3" class="desc_list_items">
              <p class="normal_desc_p">服务结果</p>
              <div class="service_remark_textarea_container">
                <textarea class="service_remark_textarea" placeholder="请输入文本"></textarea>
              </div>
            </li>
            <li v-if="state == 3" class="desc_list_items">
              <p class="normal_desc_p">备注 <span style="font-size: 12px; color:#A7A7A7">（用户不可见）</span></p>
              <div class="service_remark_textarea_container" style="height: 65px">
                <textarea class="service_remark_textarea" placeholder="请输入文本"></textarea>
              </div>
            </li>
            <li v-if="state == 3" class="desc_list_items">
              <p class="normal_desc_p">服务相关图片</p>
              <div class="thumbs_container">
                <xx-uploader :limit="4"></xx-uploader>
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
    </template>
    
    <div class="btn_bar">
      <template v-if="state == 1">
        <button type="button" class="weui-btn weui-btn_primary" style="background-color:#ffc349">取消任务</button>
        <button type="button" class="weui-btn weui-btn_primary" @click="createMission">生成任务</button>
      </template>
      <button  v-if="state == 2" type="button" class="weui-btn weui-btn_primary" @click="startMission">已到达，开始服务</button>
      <button  v-if="state == 3" type="button" class="weui-btn weui-btn_primary" @click="finisnMission">服务已完成</button>
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
      state: 1,
      startTime: dateFormat(new Date(), dataFormatRule),
      endTime: dateFormat(that.addOneDay(new Date()), dataFormatRule),
      arrivalTime: null, // 与用户沟通的到达时间
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
    /**
     * 生成任务
     */
    createMission () {
      this.state = 2
    },
    /**
     * 开始任务
     */
    startMission () {
      this.state = 3
    },
    /**
     * 任务结束
     */
    finisnMission () {
      this.state = 4
    },

    addOneDay (date) {
      return new Date(date.getTime() + 24 * 60 * 60 * 1000)
    },
    previewImage (index) {
      this.$refs.previewer.show(index)
    },
    relatedPicturesPreviewImage (index) {
      this.$refs.relatedPicturesListPreviewer.show(index)
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
  .btn_bar
  {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 52px;
  }
.btn_bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 52px;
  display: flex;
}
</style>
