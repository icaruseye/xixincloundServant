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
  </div>
</template>
<script>
import { Datetime } from 'vux'
export default {
  components: {
    Datetime
  },
  data () {
    return {
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
        } else {
          this.$vux.toast.text(` 参数错误，错误码：${result.data.Code}`)
        }
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
          ReserveNum: this.ReserveNum
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
          ReserveNum: this.ReserveNum
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
    toIntTime (time) {
      return parseInt(time.replace(':', ''))
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
</style>
