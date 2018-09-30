<template>
  <div style="padding-bottom:80px">
    <xxGoBack :url="ID ? `/schedule/scheme/${ID}/detail` : `/schedule/schemeList`"></xxGoBack>
    <div class="form_container">
      <div class="select_items clearfix">
        方案名称
        <div class="select_items_content_container">
          <input type="text" v-model="SchemeName" class="SchemeName_input" placeholder="请输入方案名称">
        </div>
      </div>
      <div class="select_items clearfix">
        开始时间
        <div class="select_items_content_container">
          <Datetime v-model="startTime" :min-hour="6" :max-hour="18" placeholder="请选择时间" :minute-list="['00', '30']" format="HH:mm" hour-row="{value}点" minute-row="{value}分"></Datetime>
        </div>
      </div>
      <div class="select_items clearfix">
        结束时间
        <div class="select_items_content_container">
          <Datetime v-model="endTime" :min-hour="6" :max-hour="18" placeholder="请选择时间" :minute-list="['00', '30']" format="HH:mm" hour-row="{value}点" minute-row="{value}分"></Datetime>
        </div>
      </div>
      <div class="select_items clearfix">
        服务类型
        <div class="select_items_content_container" v-if="ScheduleType != null" @click="showServiceTypeHandle">
          {{typeText[ScheduleType]}}
        </div>
        <div class="select_items_content_container" v-else style="color:#999" @click="showServiceTypeHandle">
          请选择服务类型
        </div>
      </div>
      <div class="select_items clearfix" v-if="[1, 2].indexOf(ScheduleType) >= 0">
        设置服务
        <div class="select_items_content_container" style="color:#3ac7f5" @click="showServiceListHandle">
          <template v-if="selectItems.length === 0">
            <i class="iconfont icon-jiahao"></i>&nbsp;添加服务
          </template>
          <template v-else>已选择{{selectItems.length}}项</template>
        </div>
      </div>
      <div class="select_items clearfix">
        可预约次数
        <div class="select_items_content_container">
          <van-stepper v-model="ReserveNum" :min="1" :integer="true" :max="500"/>
        </div>
      </div>
    </div>
    <div class="apply_btn_box">
      <button class="apply_btn" @click="submit">
        <template v-if="isADD">
          确认新增方案
        </template>
        <template v-else>
          确认修改方案
        </template>
      </button>
    </div>

    <!-- 服务类型 -->
    <div v-transfer-dom>
      <popup :popup-style="{zIndex: 9999}" v-model="showServiceTypePopup" @on-hide="showServiceTypePopup = false">
        <div class="service_type_box">
          <ul class="xx_actionsheet">
            <li class="xx_actionsheet_item title">选择服务类型</li>
            <li class="xx_actionsheet_item" @click="selectServiceTypeHandle(0)">全部</li>
            <li class="xx_actionsheet_item" @click="selectServiceTypeHandle(1)">服务套餐</li>
            <li class="xx_actionsheet_item" @click="selectServiceTypeHandle(2)">服务项</li>
            <!-- <li class="xx_actionsheet_item" @click="selectServiceTypeHandle(3, '挂号')">挂号</li> -->
            <li class="xx_actionsheet_item cancel" @click="showServiceTypePopup = false">取消</li>
          </ul>
        </div>
      </popup>
    </div>

    <!-- 服务列表 -->
    <div v-transfer-dom>
      <popup :popup-style="{zIndex: 9999}" v-model="showServiceListPopup" @on-hide="showServiceTypePopup = false">
        <div class="service_type_box">
        <div class="xx_actionsheet">
          <div class="xx_actionsheet_item title">选择服务</div>
          <checker
            v-model="selectItems"
            type="checkbox"
            style="max-height:300px;overflow:auto;"
            default-item-class="xx_actionsheet_item checker_item"
            selected-item-class="xx_actionsheet_item-selected"
            @on-change="selectPackageHandle">
            <checker-item :value="item.ID" :key="index" v-for="(item, index) in itemList">
              <img class="icon" :src="item.PackageType | xxMissionTypeIconFilter" alt="">
              <span class="item-title">{{item.Name}}</span>
              <span class="xx-radio-item" :class="selectItems.indexOf(item.ID) >= 0 ? 'active' : ''"></span>
            </checker-item>
          </checker>
          <div class="xx_actionsheet_item cancel" @click="showServiceListPopup = false">确认</div>
        </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { XDialog, Datetime, TransferDom, Popup, Checker, CheckerItem } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog,
    Datetime,
    Popup,
    Checker,
    CheckerItem
  },
  data () {
    return {
      typeText: {
        0: '全部',
        1: '服务套餐',
        2: '服务项'
      },
      showServiceTypePopup: false,
      showServiceListPopup: false,
      ScheduleType: null, // 服务类型
      selectItems: [], // 所选服务列表索引
      itemList: [],
      SchemeName: '',
      startTime: null,
      endTime: null,
      ReserveNum: 1
    }
  },
  mounted () {
    if (!this.isADD) {
      this.getDetail()
    }
  },
  watch: {
    async ScheduleType (val) {
      // this.selectItems = []
      if ([1, 2].indexOf(val) >= 0) {
        // 根据类型获取对应的服务列表
        const res = await this.getServiceItemList(val)
        this.itemList = res
      }
    }
  },
  computed: {
    isADD () {
      if (this.ID) {
        document.title = '修改排班方案'
        return false
      } else {
        document.title = '新增排班方案'
        return true
      }
    },
    ID () {
      return this.$route.query.id
    }
  },
  methods: {
    getDetail () {
      this.$http.get(`/Schedule/Scheme/Detail?schemeId=${this.ID}`).then(result => {
        if (result.data.Code === 100000) {
          this.SchemeName = result.data.Data.SchemeName
          this.startTime = result.data.Data.StartTime
          this.endTime = result.data.Data.EndTime
          this.ReserveNum = result.data.Data.ReserveNum
          this.ScheduleType = result.data.Data.ScheduleType
          this.selectItems = result.data.Data.Items.split(',').map(Number)
        } else {
          this.$vux.toast.text(` 参数错误，错误码：${result.data.Code}`)
        }
        console.log(this.se)
      })
    },
    submit () {
      if (this.SchemeName.length === 0) {
        this.$vux.toast.text('请输入方案名称')
        return false
      }
      if (this.SchemeName.length > 10) {
        this.$vux.toast.text('方案名称不要超过10个字')
        return false
      }
      if (!this.startTime) {
        this.$vux.toast.text('请选择开始时间')
        return false
      }
      if (!this.endTime) {
        this.$vux.toast.text('请选择结束时间')
        return false
      }
      if (this.toIntTime(this.startTime) >= this.toIntTime(this.endTime)) {
        this.$vux.toast.text('结束时间必须大于开始时间')
        return false
      }
      if (this.isADD) {
        this.$http.post(`/Schedule/Add/Scheme`, {
          SchemeName: this.SchemeName,
          StartTime: this.startTime,
          EndTime: this.endTime,
          ReserveNum: this.ReserveNum,
          ScheduleType: this.ScheduleType,
          Items: this.selectItems.join()
        }).then(result => {
          if (result.data.Code === 100000) {
            this.$vux.toast.show('新增成功')
            this.$router.push(`/schedule/scheme/${result.data.Data}/detail`)
          } else {
            this.$vux.toast.text(`新增失败，错误码：${result.data.Code}`)
          }
        })
      } else {
        this.$http.put(`/Schedule/Modify/Scheme`, {
          ID: this.ID,
          SchemeName: this.SchemeName,
          StartTime: this.startTime,
          EndTime: this.endTime,
          ReserveNum: this.ReserveNum,
          ScheduleType: this.ScheduleType,
          Items: this.selectItems.join()
        }).then(result => {
          if (result.data.Code === 100000) {
            this.$vux.toast.show('修改成功')
            this.$router.push(`/schedule/scheme/${this.ID}/detail`)
          } else {
            this.$vux.toast.text(`修改失败，错误码：${result.data.Code}`)
          }
        })
      }
    },
    async getServiceItemList (val) {
      const url = {
        1: '/Push/Package/List',
        2: '/BundleList'
      }
      const res = await this.$http.get(url[val])
      if (res.data.Code === 100000) {
        return res.data.Data
      }
    },
    toIntTime (time) {
      return parseInt(time.replace(':', ''))
    },
    setMaskzIndex (val) {
      this.$nextTick(() => {
        document.querySelector('.vux-popup-mask').style.zIndex = val
      })
    },
    // 选择服务类型弹层
    showServiceTypeHandle () {
      this.showServiceTypePopup = true
      this.setMaskzIndex(9998)
    },
    // 选择服务列表弹层
    showServiceListHandle () {
      this.showServiceListPopup = true
      this.setMaskzIndex(9998)
    },
    selectPackageHandle () {
      console.log(this.selectItems)
    },
    async selectServiceTypeHandle (val) {
      if (this.ScheduleType !== val) {
        this.selectItems = []
      }
      this.showServiceTypePopup = false
      this.ScheduleType = val
    }
  }
}
</script>

<style lang="less" scoped>
.form_container
{
  background-color: #fff;
  .select_items
  {
    display: flex;
    flex-flow: nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0 10px 15px;
    font-size: 14px;
    .select_items_content_container
    {
      height: 40px;
      display: flex;
      flex-flow: nowrap;
      align-items: center;
      justify-content: space-between;
      .SchemeName_input
      {
        text-align: center;
        font-size: 14px;
      }
    }
  }
}
.apply_btn_box
{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  flex-flow: nowrap;
  .apply_btn
  {
    flex: 1;
    width: 100%;
    border: none;
    background-color: #3AC7F5;
    color: #fff
  }
}
.checker_item {
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  font-size: 14px;
  .icon {
    margin: 0 10px;
    width: 25px;
    height: 25px;
  }
  .item-title {
    flex: 1;
    text-align: left;
  }
}
</style>
