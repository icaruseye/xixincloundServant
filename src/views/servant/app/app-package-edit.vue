<template>
  <div class="weui-form">
    <form action="">
      <div class="weui-cell-form-title">详情</div>
      <div class="weui-cell">
        <div class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">服务包名称</label>
            <input v-model="name" v-validate="'required'" name="name" type="text" placeholder="请输入服务包名称">
        </div>
        <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
      </div>
      <div class="weui-cell">
        <div class="weui-cell-top">
            <label class="label" for="">添加服务项</label>
            <a href="javascript:;" style="color:#3ecccc;flex:1;text-align:right;" @click="addItemPopup = true">+添加</a>
            <input type="hidden" v-validate="'required'" name="serviceItem">
        </div>
        <span v-show="errors.has('serviceItem')" class="help is-danger">{{ errors.first('serviceItem') }}</span>
      </div>
      <div class="weui-cell">
        <div class="weui-cell-add">
          <div class="title">换药</div>
          <div class="mid">
            <label for="">单价:</label><input type="number">
            <label for="">数量:</label><input type="number">
          </div>
          <span class="delete">删除</span>
        </div>
        <div class="weui-cell-add">
          <div class="title">换药</div>
          <div class="mid">
            <label for="">单价:</label><input type="number">
            <label for="">数量:</label><input type="number">
          </div>
          <span class="delete">删除</span>
        </div>
        <div class="weui-cell-add">
          <div class="title">换药</div>
          <div class="mid">
            <label for="">单价:</label><input type="number">
            <label for="">数量:</label><input type="number">
          </div>
          <span class="delete">删除</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">真实售价</label>
            <input v-model="name" v-validate="'required'" name="name" type="text" placeholder="请输入真实售价">
        </div>
        <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
      </div>
      <div class="weui-cell">
        <div class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">展示价格</label>
            <input v-model="name" v-validate="'required'" name="name" type="text" placeholder="请输入展示价格">
        </div>
        <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
      </div>
      <div class="weui-cell">
        <div class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">库存数量</label>
            <input v-model="name" v-validate="'required'" name="name" type="text" placeholder="请输入库存数量">
        </div>
        <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
      </div>
      <div class="weui-cell-form-title">详情</div>
      <div class="weui-cell">
        <div class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">服务包分类</label>
            <select name="" v-model="serviceType" @change="serviceTypeChange">
              <option :value="1">默认分类</option>
              <option :value="0">新增分类</option>
            </select>
            <i class="iconfont icon-jiantouyou"></i>
        </div>
        <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
      </div>
      <div class="weui-cell">
        <div class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">标签</label>
            <input v-model="name" v-validate="'required'" name="name" type="text" placeholder="请输入标签，支持多标签，用逗号隔开">
        </div>
        <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
      </div>
      <div class="weui-cell">
        <div class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">有效期单位</label>
            <select name="" v-model="serviceUnit">
              <option :value="0">年</option>
              <option :value="1">月</option>
              <option :value="2">日</option>
            </select>
            <i class="iconfont icon-jiantouyou"></i>
        </div>
        <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
      </div>
      <div class="weui-cell">
        <div class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">有效期时长</label>
            <input v-model="name" v-validate="'required'" name="name" type="text" placeholder="请输入有效期时长">
        </div>
        <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
      </div>
      <div class="weui-cell">
        <div class="weui-cell-top">
            <label class="label" for="">服务包介绍</label>
            <textarea name="intro" placeholder="请输入服务包介绍"></textarea>
        </div>
      </div>
      <uploader
        title="服务包封面"
        :limit="1"
        :maxSize="1024 * 1024 * 2"
        :imgList="imgList1"
        @onUpdate="onUpdate1"
      ></uploader>
      <div class="weui-cell-upload">
        <div class="weui-cell-top" :class="{ 'control': true }">
          <input v-validate="'required'" name="uploadeId1" type="hidden">
        </div>
        <span v-show="errors.has('uploadeId1')" class="help is-danger">{{ errors.first('uploadeId1') }}</span>
      </div>
      <div class="weui-cell">
        <button type="button" class="weui-btn weui-btn_primary" @click="validateBeforeSubmit">提交</button>
      </div>
    </form>
    <!-- 服务项列表 -->
    <div v-transfer-dom>
      <popup v-model="addItemPopup" height="100%" :hide-on-blur=false style="background: #fff;">
        <div class="popup">
          <div class="service-item_list">
            <ul>
              <li @click="chooseItem(0)">
                <div>
                  <img class="poster" src="http://192.168.2.236/Content/img/default_img_service.jpg" alt="">
                </div>
                <div class="title">换药</div>
                <i class="iconfont icon-jiantouyou"></i>
              </li>
              <li>
                <div>
                  <img class="poster" src="http://192.168.2.236/Content/img/default_img_service.jpg" alt="">
                </div>
                <div class="title">换药</div>
                <i class="iconfont icon-jiantouyou"></i>
              </li>
            </ul>
          </div>
          <div class="weui-cell" style="position:fixed;bottom:0;width:100%;display:flex;z-index:99">
            <a href="javascript:;" style="font-size:16px;padding:8px 0" class="weui-btn weui-btn_primary" @click="go('itemList')">管理服务项</a>
            <a href="javascript:;" style="font-size:16px;padding:8px 0" class="weui-btn weui-btn_warning" @click="addItemPopup = false">关闭</a>
          </div>
        </div>
      </popup>
    </div>
    <!-- 新增分类 -->
    <div v-transfer-dom>
      <confirm v-model="addType"
      show-input
      title="输入分类名称"
      :input-attrs="{type: 'text'}"
      @on-cancel="addTypeCancel"
      @on-confirm="addTypeonConfirm">
      </confirm>
    </div>
  </div>
</template>

<script>
import uploader from '@/components/common/uploader'
import { TransferDom, Popup, Confirm } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    uploader,
    Confirm,
    Popup
  },
  data () {
    return {
      addItemPopup: false, // 添加服务项
      addType: false, // 新增分类
      name: '',
      serviceItem: [],
      serviceType: 1,
      serviceUnit: 0,
      imgList1: [],
      uploadeId1: [],
      serviceItemList: [] // 服务项列表
    }
  },
  mounted () {
    const id = this.$route.params.id
    if (id === 'add') return
    this.getData(id)
  },
  methods: {
    getData (id) {},
    onUpdate1 (id) {
      this.uploadeId1 = id
    },
    go (name) {
      this.$router.push(`/app/${name}`)
    },
    chooseItem (index) {
      let obj = Object.assign({}, this.serviceItemList[index])
      this.serviceItem.push(obj)
    },
    serviceTypeChange () {
      if (this.serviceType === 0) {
        this.addType = true
      }
    },
    addTypeonConfirm () {
    },
    addTypeCancel () {
    },
    async validateBeforeSubmit () {
      let res = await this.$validator.validateAll()
      if (res) {
        console.log('验证通过')
      } else {
        // 设置焦点到第一个未验证通过的表单元素
        let field = this.$validator.errors.items[0].field
        this.$validator.fields.items.map((i) => {
          if (i.name === field) {
            return i.el.focus()
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
body {
  background: #f8f8f8;
}

.weui-form {
  background: #f8f8f8;
}

.iconfont {
  color: #f8a519
}

.service-item_list {
  padding: 0 15px 50px;
  li {
    position: relative;
    display: flex;
    padding: 15px 0;
    align-items: center;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #d9f7f5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
    .poster {
      display: block;
      width: 40px;
      margin-right: 10px;
    }
    .title {
      flex: 1;

    }
  }
}

.weui-cell-add {
  display: flex;
  border-left: 3px solid #3ecccc;
  margin-bottom: 5px;
  margin: 10px 0;
  padding: 0 10px;
  .title {
    flex: 1;
  }
  .mid {
    width: 200px;
    display: flex;
    align-items: center;
    input {
      width: 40px;
      background: #e5e5e5;
      margin: 0 5px;
      color: #3ecccc;
      border-radius: 2px;
      height: 20px;
      line-height: 1;
      padding: 0 5px;
      text-align: center;
    }
  }
  .delete {
    color: #FF5722;
  }
}
</style>
