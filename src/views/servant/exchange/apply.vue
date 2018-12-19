<template>
  <div class="wrapper has-tabbar">
    <div class="title_input_container">
      <label class="title_input_label">商品类型</label>
      <div class="title_input_box" @click="showTypeMenus = true">
        <div class="title_input_box_inner">
          {{typeMenus[0].label || '请选择'}}
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
    </div>
    <div class="title_input_container">
      <label class="title_input_label">商品名称</label>
      <div class="title_input_box" @click="showItemPopupHandle">
        <div class="title_input_box_inner">
          {{ selectedItem.Title|| '请选择'}}
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>
    </div>
    <div class="title_input_container">
      <label class="title_input_label">数量</label>
      <div class="title_input_box">
        <input class="title_input_contorl" v-model.number="params.GenerateNum" placeholder="请输入" type="number">
      </div>
    </div>
    <button type="button" class="weui-btn weui-btn_primary weui-btn-bottom" @click="submit">提交</button>
    <!-- 选择商品类型 -->
    <actionsheet v-model="showTypeMenus" :menus="typeMenus" @on-click-menu="clickType" show-cancel></actionsheet>
    <!-- 选择商品 -->
    <div v-transfer-dom>
      <popup v-model="showItemPopup" height="410px" style="background:#fff;">
        <div class="serviceItem_list">
          <checker
            v-model="selectedItemIndex"
            @on-change="showItemPopupChange"
            default-item-class="serviceItem_list_item"
            selected-item-class="serviceItem_list_item_selected"
            radio-required>
            <template v-for="(item, index) in itemList">
              <checker-item :value="index" :key="index">
                <div class="tag">ID:{{item.CourseId}}</div>
                <div class="content">
                  <div class="title">{{item.Title}}</div>
                  <div class="price">￥{{item.Price | price}}</div>
                </div>
                <i class="iconfont icon-gouSolid-copy-copy" v-if="selectedItemIndex == index"></i>
              </checker-item>
            </template>
          </checker>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TransferDom, Popup, Actionsheet, Checker, CheckerItem } from 'vux'
import util from '@/plugins/util'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Actionsheet,
    Checker,
    CheckerItem
  },
  filters: {
    price (val = 0) {
      return (val / 100).toFixed(2)
    }
  },
  data () {
    return {
      isShowSelectItem: false,
      showTypeMenus: false,
      showItemPopup: false,
      selectedItemIndex: null,
      itemList: [],
      selectedItem: {},
      typeMenus: [{
        label: '课程',
        type: 6
      }],
      params: {
        ViewID: '',
        PackageType: 6,
        PackageID: '', // 关联ID
        GenerateNum: '' // 库存数量
      },
      authText: {
        PackageID: {
          text: '商品',
          required: true
        },
        GenerateNum: {
          text: '数量',
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
  },
  methods: {
    // 获取服务包列表
    async getItemList () {
      const res = await this.$http.get(`/Push/Package/List`)
      if (res.data.Code === 100000) {
        this.itemList = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 获取课程列表
    async getCourseList () {
      const res = await this.$http.get(`/Proxy-Courses-List`)
      if (res.data.Code === 100000) {
        this.itemList = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    async applyActivation () {
      const that = this
      const isValidate = util.validateForm(this.params, this.authText)
      if (isValidate) {
        const res = await this.$http.post(`/Activation/ActivationGenerate/Add`, this.params)
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
    clickType (menuKey, menuItem) {
      this.params.PackageType = menuItem.type
    },
    clickItem () {

    },
    showItemPopupChange (val) {
      this.showItemPopup = false
      this.selectedItem = this.itemList[val]
      this.params.PackageID = this.itemList[val].CourseId
    },
    showItemPopupHandle () {
      this.showItemPopup = true
      if (!this.params.PackageType) {
        this.$vux.toast.text('请选择商品类型')
      }
      if (this.params.PackageType === 6) {
        this.getCourseList()
      }
    },
    submit () {
      this.applyActivation()
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
      font-size: 14px;
    }
    .title_input_box_inner {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 13px;
      color: #666;
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
.serviceItem_list_item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid RGBA(0, 180, 171, .1);
  .content {
    flex: 1;
  }
  .tag {
    display: inline-block;
    width: 35px;
    height: 20px;
    line-height: 20px;
    background: #3ac7f5;
    color: #fff;
    padding: 0 5px;
    font-size: 12px;
    margin-right: 10px;
    border-radius: 2px;
    text-align: center;
  }
  .price {
    font-size: 12px;
    color: #FF5F5F;
  }
  .title {
    font-size: 14px;
    color: #666;
  }
  .iconfont {
    font-size: 22px;
    color: #F8A519;
  }
}
</style>
