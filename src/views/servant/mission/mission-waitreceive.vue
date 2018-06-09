<template>
  <div class="wrap">
    <step-bar step="2">
      <step-items slot="items">
        待确认
      </step-items>
      <step-items slot="items">
        服务中
      </step-items>
      <step-items slot="items">
        已完成
      </step-items>
    </step-bar>

    <timeLine-box step="2" class="mt10px">
      <timeLine-items
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
              <img class="preview_img" v-for="(item, index) in relatedPicturesList" :src="item.src" :key="index" @click="relatedPicturesPreviewImage(index)" alt="">
            </div>
            <div v-transfer-dom>
              <previewer ref="relatedPicturesListPreviewer" :list="relatedPicturesList" :options="options"></previewer>
            </div>
          </li>
        </ul>
      </timeLine-items>

      <timeLine-items
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
              <span style="font-size: 12px;color: #999999;">四川省成都市22号</span>
            </p>
          </li>
        </ul>
        <ul>
          <li class="desc_list_items">
            <p class="normal_desc_p">任务服务需要完成标准动作</p>
            <div style="padding-top: 11px; margin: 0 10px">
              <xx-radio v-model="radioValue" typeName="checkbox" name="xxx" style="display: block; margin-bottom: 18px;">
                1：伤口评估
              </xx-radio>
              <xx-radio v-model="radioValue2" name="xxx" typeName="checkbox" style="display: block; margin-bottom: 18px;">
                2：清洗伤口
              </xx-radio>
              <xx-radio typeName="checkbox" style="display: block; margin-bottom: 18px;">
                3：测量伤口长度
              </xx-radio>
              <xx-radio typeName="checkbox" style="display: block; margin-bottom: 18px;">
                4：拍照记录
              </xx-radio>
              <xx-radio typeName="checkbox" style="display: block; margin-bottom: 18px;">
                5：消毒
              </xx-radio>
              <xx-radio typeName="checkbox" style="display: block; margin-bottom: 18px;">
                6：做好处理记录
              </xx-radio>
            </div>
          </li>
          <li class="desc_list_items">
            <p class="normal_desc_p">服务结果</p>
            <div class="service_remark_textarea_container">
              <textarea class="service_remark_textarea" placeholder="请输入文本"></textarea>
            </div>
          </li>
        </ul>
      </timeLine-items>

      <timeLine-items
        slot="items"
        title="待评价"
      >
        <ul>
          <li class="desc_list_items">
            <p class="normal_desc_p">服务还未完成，不能进行评价</p>
          </li>
        </ul>
      </timeLine-items>

    </timeLine-box>

    <div class="btn_bar">
      <button type="button" class="weui-btn weui-btn_primary">已到达，开始服务</button>
    </div>
  </div>
</template>

<script>
import { Previewer, TransferDom } from 'vux'
import stepBar from '@/components/common/operationSteps/bar'
import stepItems from '@/components/common/operationSteps/items'
import timeLineBox from '@/components/common/timeLine/box'
import timeLineItems from '@/components/common/timeLine/items'
import xxRadio from '@/components/common/xxRadio'
export default {
  directives: {
    TransferDom
  },
  components: {
    stepBar,
    stepItems,
    timeLineBox,
    Previewer,
    timeLineItems,
    xxRadio
  },
  watch: {
    radioValue (val) {
      console.log(val)
    }
  },
  data () {
    return {
      radioValue: true,
      radioValue2: false,
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
  methods: {
    relatedPicturesPreviewImage (index) {
      this.$refs.relatedPicturesListPreviewer.show(index)
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
</style>

