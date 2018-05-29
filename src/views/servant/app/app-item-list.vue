<template>
  <div class="has-tabbar">
    <div class="package-box">
      <div class="package-box_title">默认分类</div>
      <div class="package-box_list">
        <div class="package-box_item">
          <div class="top">
            <div><img class="poster" src="http://192.168.2.236/Content/img/default_img_service.jpg" alt=""></div>
            <div class="top-md">
              <p class="top-md_mtext">上门打针</p>
              <p class="top-md_stext">描述信息描述信息</p>
            </div>
            <div class="top-rd">
              <a href="javascript:;" class="weui-btn_mini weui-btn_default" @click="openPopup(12)">操作</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="weui-btn weui-btn_primary" @click="toAdd">新增服务项</button>
    <div v-transfer-dom>
      <popup v-model="itemPopup">
        <div class="popup">
          <ul>
            <li @click="toEdit">修改服务项</li>
            <li @click="removeItem">删除服务项</li>
          </ul>
          <a href="javascript:;" class="cancel" @click="itemPopup = false">取消</a>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { TransferDom, Popup } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup
  },
  data () {
    return {
      itemPopup: false,
      currentId: null
    }
  },
  methods: {
    openPopup (id) {
      this.itemPopup = true
      this.currentId = id
    },
    recommendItem (id) {
      console.log(id)
    },
    removeItem (id) {
      console.log(id)
    },
    toAdd () {
      this.$router.push('/app/itemEdit/add')
    },
    toEdit () {
      this.$router.push(`/app/itemEdit/${this.currentId}`)
    }
  }
}
</script>

<style lang="less" scoped>
.weui-btn {
  position: fixed;
  bottom: 0;
}

.package-box {
  background: #fff;
  padding: 0 15px;
  .package-box_title {
    padding: 10px 0;
    font-size: 14px;
    color: #666;
  }
}

.package-box_item {
  position: relative;
  padding: 15px 0;
  &:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d9f7f5 ;
    color: #E5E5E5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .top {
    display: flex;
    width: 100%;
    font-size: 14px;
    align-items: center;
    .poster {
      margin-right: 10px;
      width: 80px;
      display: block;
    }
    .top-md {
      flex: 1;
      .top-md_mtext {
        font-size: 15px;
        color: #666;
      }
      .top-md_stext {
        font-size: 13px;
        color: #999;
      }
    }
    .top-rd {
      width: 80px;
      color: #f8a519;
      font-size: 16px;
      text-align: right;
      .weui-btn_mini {
        border-radius: 2px;
        color: #666;
        border: 1px solid #f3f3f3;
        box-sizing: border-box;
      }
    }
  }
}

.popup {
  color: #666;
  font-size: 14px;
  ul {
    margin-bottom: 8px;
    li {
    background: #fff;
    width: 100%;
    padding: 15px 0;
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid #f1f1f1;
    &:nth-child(1) {
      color: #f8a519
    }
    &:nth-child(2) {
      color: #f44336
    }
    }
  }
  .cancel {
    display: block;
    padding: 15px 0;
    width: 100%;
    text-align: center;
    border-top: 1px solid #f1f1f1;
    background: #fff;
    color: inherit;
  }
}
</style>
