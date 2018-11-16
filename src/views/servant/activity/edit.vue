<template>
  <div class="wrapper has-tabbar">
    <div class="title_input_container">
      <label class="title_input_label">活动名称</label>
      <div class="title_input_box">
        <input class="title_input_contorl" v-model="params.ActivityName" placeholder="请输入" type="text">
      </div>
    </div>
    <div class="content_input_container" style="margin-top: 10px;padding-top:10px">
      <xx-uploader
        :limit="1"
        title="活动封面"
        :imgList="params.CoverPhoto"
        @onUpdate="onUpdateCover">
      </xx-uploader>
    </div>
    <div class="content_input_container">
      <label class="content_input_label">活动介绍</label>
      <div class="content_input_box">
        <textarea class="content_input_textarea" v-model="params.ActivityDescribe" placeholder="请输入"></textarea>
      </div>
    </div>
    <div class="content_input_container" style="padding-top:10px">
      <xx-uploader
        title="活动介绍图片"
        :limit="4"
        :imgList="params.ActivityIntroductionImg"
        @onUpdate="onUpdateIntro">
      </xx-uploader>
    </div>
    <div class="title_text_container">
      <label class="title_text_label">活动开始时间</label>
      <div class="title_text_box" @click="selectDateStartTime">{{params.StartTime || '请选择开始时间'}}<i class="iconfont icon-jiantouyou"></i></div>
    </div>
    <div class="title_text_container">
      <label class="title_text_label">活动结束时间</label>
      <div class="title_text_box" @click="selectDateEndTime">{{params.EndTime || '请选择结束时间'}}<i class="iconfont icon-jiantouyou"></i></div>
    </div>
    <div class="title_input_container">
      <label class="title_input_label">每人限购</label>
      <div class="title_input_box">
        <input class="title_input_contorl" v-model="params.QuantityPerPerson" placeholder="请输入" type="number">
      </div>
    </div>
    <!-- 添加服务 -->
    <div class="serviceItem_list" v-if="selectItem.Name || selectItem.Title">
      <div class="serviceItem_list_item">
        <img class="icon" :src="selectItem.PackageType | xxMissionTypeIconFilter" alt="" srcset="">
        <div class="content">
          <div class="title">{{selectItem.Name || selectItem.Title}}</div>
          <!-- <div class="price">￥{{selectItem.Price}}元</div> -->
        </div>
        <span style="color: #FF5F5F">￥</span>
        <input type="number" v-model="params.Price" class="count">
        <van-stepper v-model="params.AvailableDuantity" :min="1" :integer="true"/>
      </div>
    </div>
    <div class="serviceItem_list_item_add" @click="isShowSelectItem = true">添加服务</div>
    <button type="button" class="weui-btn weui-btn_primary weui-btn-bottom" @click="submit">提交</button>
    <!-- 选择服务或课程 -->
    <div v-transfer-dom>
      <popup v-model="isShowSelectItem" height="70%">
        <addServiceItem @selected="selectedItem"></addServiceItem>
      </popup>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TransferDom, Popup } from 'vux'
import addServiceItem from './add-serviceItem'
import util from '@/plugins/util'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    addServiceItem
  },
  data () {
    return {
      isShowSelectItem: false,
      selectItem: {},
      params: {
        ViewID: '',
        ActivityName: '',
        CoverPhoto: '', // 封面
        ActivityDescribe: '', // 介绍
        ActivityIntroductionImg: '', // 介绍图片
        StartTime: '',
        EndTime: '',
        QuantityPerPerson: '', // 每人可购买数量
        CommodityType: '', // 活动类型
        CommodityID: '', // 关联ID
        OriginalPrice: '',
        Price: '',
        AvailableDuantity: '' // 库存数量
      },
      authText: {
        ActivityName: {
          text: '活动名称',
          required: true
        },
        CoverPhoto: {
          text: '活动封面',
          required: true
        },
        StartTime: {
          text: '开始时间',
          required: true
        },
        EndTime: {
          text: '结束时间',
          required: true
        },
        CommodityID: {
          text: '服务或课程',
          required: true
        },
        Price: {
          text: '价格',
          required: true
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ])
  },
  mounted () {
    if (this.$route.params.id !== 'add') {
      this.getActivityDetail()
    }
  },
  methods: {
    async getActivityDetail () {
      const res = await this.$http.get(`/Activity-Detail?activityId=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        this.params = res.data.Data
        this.params.Price = (res.data.Data.PresentPrice / 100).toFixed(2)
        this.params.StartTime = util.timeFormatFilter(this.params.StartTime, 'YYYY-MM-DD')
        this.params.EndTime = util.timeFormatFilter(this.params.EndTime, 'YYYY-MM-DD')
        this.selectItem.Name = res.data.Data.CommodityName
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async addActivity () {
      const that = this
      this.params.ViewID = this.userAccount.ViewID
      const isValidate = util.validateForm(this.params, this.authText)
      if (isValidate) {
        this.params.PresentPrice = Math.floor(this.params.Price * 100)
        const res = await this.$http.post(`/Add-Activity`, this.params)
        if (res.data.Code === 100000) {
          this.$vux.toast.show({
            text: '提交成功',
            onHide () {
              that.$router.back()
            }
          })
        } else {
          this.$vux.toast.text(res.data.Msg)
        }
      }
    },
    async editActivity () {
      const that = this
      this.params.ActivityID = this.params.ID
      const isValidate = util.validateForm(this.params, this.authText)
      if (isValidate) {
        this.params.PresentPrice = Math.floor(this.params.Price * 100)
        const res = await this.$http.put(`/Edit-Activity`, this.params)
        if (res.data.Code === 100000) {
          this.$vux.toast.show({
            text: '提交成功',
            onHide () {
              that.$router.back()
            }
          })
        } else {
          this.$vux.toast.text(res.data.Msg)
        }
      }
    },
    submit () {
      if (this.$route.params.id !== 'add') {
        this.editActivity()
      } else {
        this.addActivity()
      }
    },
    // 设置活动开始时间
    selectDateStartTime () {
      const that = this
      this.$vux.datetime.show({
        value: this.params.StartTime,
        format: 'YYYY-MM-DD',
        startDate: util.timeFormatFilter(new Date(), 'YYYY-MM-DD'),
        onConfirm (value) {
          if (new Date(value).getTime() > new Date(that.params.EndTime).getTime()) {
            that.$vux.toast.text('开始时间不能在结束时间之后')
          } else {
            that.params.StartTime = value
          }
        }
      })
    },
    // 设置活动结束时间
    selectDateEndTime () {
      const that = this
      this.$vux.datetime.show({
        value: this.params.EndTime,
        format: 'YYYY-MM-DD',
        startDate: util.timeFormatFilter(new Date(), 'YYYY-MM-DD'),
        onConfirm (value) {
          if (new Date(value).getTime() < new Date(that.params.StartTime).getTime()) {
            that.$vux.toast.text('结束时间不能在开始时间之前')
          } else {
            that.params.EndTime = value
          }
        }
      })
    },
    // 选择服务或者课程
    selectedItem (data) {
      this.isShowSelectItem = false
      this.selectItem = data
      this.params.CommodityID = data.ID || data.CourseId
      this.params.CommodityType = data.CommodityType
    },
    // 上传封面
    onUpdateCover (val) {
      this.params.CoverPhoto = val.join()
    },
    // 上传介绍图
    onUpdateIntro (val) {
      this.params.ActivityIntroductionImg = val.join()
    }
  }
}
</script>

<style lang="less" scoped>
.title_text_container {
  display: flex;
  align-items: center;
  padding: 20px 12px 12px 12px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 180, 171, 0.1);
  &:last-child {
    border: 0;
  }
  .title_text_label {
    font-size: 14px;
    color: #666;
  }
  .title_text_box {
    flex: 1;
    text-align: right;
    font-size: 12px;
    color: #999;
    .iconfont {
      margin-left: 5px;
      font-size: 12px;
    }
  }
}

.title_input_container
{
  display: flex;
  width: 100%;
  flex-flow: nowrap;
  background-color: #fff;
  height: 57px;
  padding-right: 13px;
  box-sizing: border-box;
  border-bottom: 1px solid RGBA(0, 180, 171, .1);
  .title_input_label
  {
    display: flex;
    align-items: center;
    flex: 0 0 70px;
    font-size: 14px;
    color: #666;
    padding-left: 12px;
  }
  .title_input_box
  {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .title_input_contorl
    {
      width: 100%;
      box-sizing: border-box;
      height: 33px;
      background-color: #F6F6F6;
      border-radius: 2px;
      padding: 0 13px;
      font-size: 13px;
    }
  }
}
.content_input_container
{
  padding: 0 12px 5px;
  background-color: #fff;
  .content_input_label
  {
    height: 40px;
    line-height: 40px;
    color: #666666;
    font-size: 14px;
  }
  .content_input_box
  {
    position: relative;
    height: 130px;
    background-color: #F6F6F6;
    border-radius: 4px;
    .content_input_textarea
    {
      border: none;
      background-color: #F6F6F6;
      resize: none;
      width: 100%;
      height: 100px;
      box-sizing: border-box;
      padding: 10px 14px;
      font-size: 13px;
      color: #999;
    }
    .content_input_nums_count
    {
      position: absolute;
      right: 14px;
      bottom: 14px;
      font-size: 12px;
      color: #999;
    }
  }
}

.serviceItem_list {
  background: #fff;
  padding: 0 10px;
  align-items: center;
  border-bottom: 1px solid RGBA(0, 180, 171, .1);
  .serviceItem_list_item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid RGBA(0, 180, 171, .1);
    &:last-child {
      border: 0;
    }
    .icon {
      margin-right: 10px;
      width: 29px;
      height: 29px;
      border-radius: 4px;
    }
    .content {
      flex: 1;
      .title {
        font-size: 15px;
        color: #666;
        font-weight: bold;
      }
      .price {
        color: #FF5F5F;
        font-size: 15px;
      }
    }
    .count {
      width: 50px;
      height: 28px;
      line-height: 30px;
      background: #F6F6F6;
      border-radius: 4px;
      margin: 0 15px 0 5px;
      border: 1px solid #eee;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
  }
}
.serviceItem_list_item_add {
  display: block;
  margin-bottom: 20px;
  height: 48px;
  line-height: 48px;
  background: #fff;
  text-align: center;
  font-size: 15px;
  color: #3AC7F5;
}
</style>
