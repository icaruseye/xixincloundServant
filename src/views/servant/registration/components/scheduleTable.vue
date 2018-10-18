<template>
  <div class="wrapper">
    <div class="schedule_table_wrap">
      <div class="title" v-if="timeBucket.length > 0">
        <div class="item" v-for="item in timeBucket" :key="item.ID">{{item.Name}}</div>
      </div>
      <div class="weeklist">
        <template v-for="(item, index) in list">
          <div class="col" :key="index">
            <template v-for="(i, timeIndex) in item.scheduleRegistrResult">
              <div
                @click="clickItem(index, timeIndex)"
                class="item"
                :class="{ active: list[index].startTime === list[index].date && i.ReserveNum > 0 }"
                :key="timeIndex"
                :data-id="i.ScheduleID">
                <div v-if="i.AlreadyReserveNum > 0 && !isEdit">
                  挂 {{i.AlreadyReserveNum}}
                </div>
                <div v-if="i.ReserveNum > 0 && !isEdit">
                  余 {{i.ReserveNum}}
                </div>
                <div v-if="isEdit && i.ReserveNum">
                  {{i.ReserveNum}}
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <!-- 设置号源 -->
    <div v-transfer-dom>
      <x-dialog v-model="showToast" class="dialog-wrap">
        <div class="title">设置号源数量</div>
        <div style="padding: 0 15px;">
          <div style="display:flex;justify-content:space-between;height:45px;line-height:45px">
            <span>设置数量</span>
            <van-stepper v-model="count" :min="0"/>
          </div>
          <div style="display:flex;justify-content:space-between;height:45px;line-height:45px">
            <span>设置价格</span>
            <input type="number" v-model="price" placeholder="挂号价格（元）">
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;min-height:45px;">
            <span style="width: 80px;text-align:left">设置地址</span>
            <div class="address" @click="showAddressPopup">
              <div v-if="!address" style="text-align:right;width:100%">请选择地址<i class="iconfont icon-jiantouyou"></i></div>
              <div v-else style="text-align: left;">{{address}}</div>
              <i v-if="address" class="iconfont icon-jiantouyou"></i>
            </div>
          </div>
        </div>
        <div class="btns">
          <button class="submit" @click="setNumber" :disabled="submitDisable">确定</button>
          <button @click="showToast = false">取消</button>
        </div>
      </x-dialog>
    </div>
    <!-- 地址列表 -->
    <div
      v-transfer-dom
      :should-rerender-on-show="true"
      max-height="50%">
      <popup v-model="isShowAddressList" :popup-style="{zIndex: 9999}">
        <div class="address-list_title">请选择地址</div>
        <div class="address-list_container">
          <template v-for="(item, index) in addressList">
            <div class="address-list_item" :key="index" @click="chooseAdress(index)">
              <div class="tag">{{item.Remark}}<span v-if="index === 0">(默认)</span></div>
              <div class="detail">{{item.Province | _transformAddress}}{{item.City | _transformAddress}}{{item.Area | _transformAddress}}{{item.SpecificAddress}}</div>
              <i v-if="addressIndex === index" class="iconfont icon-xuanzhong" style="color:#3AC7F5"></i>
            </div>
          </template>
          <div class="address-list_item_add" @click="toEdit(-1, 0)">+新增地址</div>
          <div class="address-list_item_add" style="margin-top:10px" @click="isShowAddressList = false">取消</div>
        </div>
      </popup>
    </div>
    <!-- 新增编辑地址 -->
    <div v-transfer-dom>
      <popup
        v-model="showAddress"
        :should-rerender-on-show="true"
        height="100%" :popup-style="{zIndex: 9999}">
        <div v-if="showAddress">
          <AddressEdit :UserAddress="UserAddress" :id="addressID" :defaultOnly="addressList.length === 0" @cancel="cancelAddress" @success="successAddress"></AddressEdit>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import ChinaAddressV4Data from '@/plugins/datas/ChinaAddressV4Data.json'
import AddressEdit from '../../user/user-address/edit'
import { XDialog, TransferDomDirective as TransferDom, dateFormat, Popup } from 'vux'
import { mapGetters } from 'vuex'
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog,
    AddressEdit,
    Popup
  },
  filters: {
    _transformAddress (val) {
      let name = ''
      ChinaAddressV4Data.map((item) => {
        if (item.value === val) {
          name = item.name
        }
      })
      return name
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    start: String,
    end: String
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ])
  },
  watch: {
    start (val) {
      this.startDate = val
      this.endDate = this.end
      this.getList()
    }
  },
  data () {
    return {
      showToast: false,
      submitDisable: false,
      isShowAddressList: false,
      showAddress: false,
      address: null,
      addressList: [],
      addressIndex: null,
      addressID: null,
      UserAddress: {},
      count: 1,
      startDate: this.start,
      endDate: this.end,
      timeBucket: [],
      list: [],
      scheduleList: [],
      index: null,
      timeIndex: null,
      price: null
    }
  },
  mounted () {
    if (!this.start) {
      this.setStartAndEndDate()
    }
    this.getTimeBucket().then(res => {
      this.getList()
      this.getAddressList()
    })
  },
  methods: {
    async getList () {
      this.$vux.loading.show()
      const res = await this.$http.get(`/Registration/Registr-Situation-List?startTime=${dateFormat(this.startDate, 'YYYY-MM-DD')}&endTime=${dateFormat(this.endDate, 'YYYY-MM-DD')}`)
      if (res.data.Code === 100000) {
        this.scheduleList = res.data.Data
        this.createWeekList()
        this.mergeWeekList()
      }
      this.$vux.loading.hide()
    },
    async getTimeBucket () {
      const res = await this.$http.get(`/Registration/List/Info`)
      if (res.data.Code === 100000) {
        this.timeBucket = res.data.Data
      }
    },
    async addInfo (data) {
      const res = await this.$http.post('/Registration/Add-Registr-Schedule', {
        ShopId: this.userAccount.ShopID,
        StartTime: data.StartTime,
        EndTime: data.EndTime,
        ReserveNum: data.ReserveNum,
        RegistrationFee: data.RegistrationFee,
        Address: data.Address
      })
      if (res.data.Code === 100000) {
        this.showToast = false
        this.$vux.toast.text('提交成功')
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async editInfo (data) {
      const res = await this.$http.put('/Registration/Modify-Registr-Schedule', {
        ViewID: this.userAccount.ViewID,
        ScheduleID: data.ScheduleID,
        ReserveNum: data.ReserveNum,
        RegistrationFee: data.RegistrationFee,
        Address: data.Address
      })
      if (res.data.Code === 100000) {
        this.showToast = false
        this.$vux.toast.text('提交成功')
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async getAddressList () {
      const res = await this.$http.get('/ServantAddressList')
      if (res.data.Code === 100000) {
        this.addressList = res.data.Data
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    async setNumber () {
      // if (this.price <= 0) {
      //   this.$vux.toast.text('定价不能小于等于0')
      //   return false
      // }
      if (this.address.trim().length === 0) {
        this.$vux.toast.text('请选择一个地址')
        return false
      }
      this.submitDisable = true
      if (this.list[this.index].scheduleRegistrResult[this.timeIndex].ReserveNum) {
        await this.editInfo({
          ScheduleID: this.list[this.index].scheduleRegistrResult[this.timeIndex].ScheduleID,
          ReserveNum: this.count,
          RegistrationFee: parseInt(this.price * 100),
          Address: this.address
        })
      } else {
        await this.addInfo({
          StartTime: `${this.list[this.index].date} ${dateFormat(new Date(this.timeBucket[this.timeIndex].StartTime), 'HH:mm:ss')}`,
          EndTime: `${this.list[this.index].date} ${dateFormat(new Date(this.timeBucket[this.timeIndex].EndTime), 'HH:mm:ss')}`,
          ReserveNum: this.count,
          RegistrationFee: parseInt(this.price * 100),
          Address: this.address
        })
      }
      this.submitDisable = false
      this.getList()
    },
    clickItem (index, timeIndex) {
      if (this.isEdit) {
        this.index = index
        this.timeIndex = timeIndex
        this.showToast = true
        if (this.list[index].scheduleRegistrResult[timeIndex].ReserveNum) {
          this.count = this.list[index].scheduleRegistrResult[timeIndex].ReserveNum
          this.price = (this.list[index].scheduleRegistrResult[timeIndex].RegistrationFee / 100).toFixed(2)
          this.address = this.list[index].scheduleRegistrResult[timeIndex].Address
        } else {
          this.count = 1
          this.address = ''
          this.price = 0
        }
      }
      this.$emit('on-item-click', this.list[index].scheduleRegistrResult[timeIndex])
    },
    // 选择地址
    chooseAdress (index) {
      // this.addressIndex = index
      this.isShowAddressList = false
      this.address = this.concatAdress(this.addressList[index])
    },
    // 编辑新增地址
    toEdit (id, index) {
      if (id !== -1) { // 编辑
        this.UserAddress = this.addressList[index]
        this.UserAddress.IsDefault = (index === 0) ? 1 : 0
      } else {
        this.UserAddress = { // 新增
          IsDefault: this.addressList.length > 0 ? 0 : 1
        }
      }
      this.showAddress = true
      this.isShowAddressList = false
      this.addressID = id
    },
    showAddressPopup () {
      this.isShowAddressList = true
      this.showAddress = false
      this.setMaskzIndex(9998)
    },
    cancelAddress () {
      this.showAddressPopup()
    },
    successAddress () {
      this.isShowAddressList = true
      this.showAddress = false
      this.getAddressList()
    },
    // 转换地址
    concatAdress (address) {
      return this.transformAddress(address.Province) + this.transformAddress(address.City) + this.transformAddress(address.Area) + address.SpecificAddress
    },
    transformAddress (val) {
      let name = ''
      ChinaAddressV4Data.map((item) => {
        if (item.value === val) {
          name = item.name
        }
      })
      return name
    },
    setMaskzIndex (val) {
      this.$nextTick(() => {
        document.querySelector('.vux-popup-mask').style.zIndex = val
      })
    },
    createWeekList () {
      this.list = []
      for (let index = 0; index < 7; index++) {
        let date = new Date(this.startDate)
        date.setDate(new Date(this.startDate).getDate() + index)
        let _obj = Object.assign({
          date: dateFormat(date, 'YYYY-MM-DD'),
          scheduleRegistrResult: []
        }, {})
        this.list.push(_obj)
      }
    },
    mergeWeekList () {
      for (let item of this.list) {
        for (let index = 0; index < this.timeBucket.length; index++) {
          item.scheduleRegistrResult.push({
            ReserveNum: 0,
            AlreadyReserveNum: 0,
            EndTime: this.timeBucket[index].EndTime,
            StartTime: this.timeBucket[index].StartTime,
            ScheduleID: null
          })
        }
      }
      for (let schedule of this.scheduleList) {
        for (let item of this.list) {
          if (item.date === dateFormat(new Date(schedule.startTime), 'YYYY-MM-DD')) {
            item.startTime = item.date
            for (let a = 0; a < item.scheduleRegistrResult.length; a++) {
              for (let b = 0; b < schedule.scheduleRegistrResult.length; b++) {
                if (dateFormat(new Date(item.scheduleRegistrResult[a].StartTime), 'HH:mm:ss') === dateFormat(new Date(schedule.scheduleRegistrResult[b].StartTime), 'HH:mm:ss')) {
                  item.scheduleRegistrResult[a] = Object.assign(schedule.scheduleRegistrResult[b])
                }
              }
            }
          }
        }
      }
    },
    setStartAndEndDate () {
      let week = new Date().getDay()
      week = week === 0 ? 7 : week
      this.startDate = this.addDayToDate(new Date(), (1 - week))
      this.endDate = this.addDayToDate(new Date(), (7 - week))
      console.log(this.startDate, this.endDate)
    },
    addDayToDate (date, day) {
      let curDate = new Date()
      curDate.setDate(date.getDate() + day)
      return curDate
    }
  }
}
</script>

<style lang="less" scoped>
.schedule_table_wrap {
  background: #fff;
  border-top: 1px solid #f1f1f1;
  display: flex;
  .title {
    width: 40px;
    .item {
      width: 100%;
      letter-spacing: 4px;
      -webkit-writing-mode: vertical-rl;
    }
  }
  .weeklist {
    flex: 1;
    display: flex;
    .col {
      flex: 1;
      &:last-child {
        border-right: 0;
      }
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 74px;
    font-size: 12px;
    color: #666;
    text-align: center;
    border-right: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
    div {
      height: 25px;
      line-height: 25px;
    }
    &.active {
      background: #3AC7F5;
      color: #fff;
      font-size: 14px;
    }
  }
}
.dialog-wrap {
  .title {
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #E7E7E7;
    margin-bottom: 20px;
  }
  input {
    margin: 7px 0;
    width: 115px;
    height: 30px;
    line-height: 30px;
    background: #F6F6F6;
    border: 1px solid #eaeaea;
    font-size: 12px;
    padding: 0 10px;
    box-sizing: border-box;
    border-radius: 2px;
    text-align: center;
  }
  .address {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
    width: 150px;
    .iconfont {
      font-size: 12px;
    }
  }
  .btns {
    display: flex;
    justify-content: center;
    button {
      margin: 20px;
      width: 90px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 18px;
      color: #fff;
      border-radius: 15px;
      border: 0;
      background: #ccc;
      &.submit {
        background: #3AC7F5;
        &:disabled {
          background: #ccc;
        }
      }
    }
  }
}
.address-list_title {
  text-align: center;
  padding: 10px;
  background: #fff;
  color: #f8a519;
  border-bottom: 1px solid #eee;
}
.address-list_item_add {
  position: relative;
  padding: 15px;
  color: #f8a519;
  background: #fff;
  font-size: 14px;
  text-align: center;
}
.address-list_container {
  min-height: 100px;
}
.address-list_item {
  position: relative;
  background: #fff;
  padding: 15px;
  display: flex;
  align-items: center;
  font-size: 14px;
  &::after {
    content: " ";
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 0;
    height: 1px;
    border-bottom: 1px solid #d9f7f5;
    color: #d9f7f5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  .tag {
    width: 100px;
    color: #999;
  }
  .detail {
    flex: 1;
    color: #666;
    padding-right: 10px;
  }
}
</style>
