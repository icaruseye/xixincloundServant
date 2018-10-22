<template>
  <div class="has-tabbar">
    <div class="title_input_container" style="margin-top:10px">
      <label class="title_input_label">标题</label>
      <div class="title_input_box">
        <input class="title_input_contorl" v-model="params.Title" placeholder="请输入" type="text">
      </div>
    </div>
    <div class="content_input_container">
      <label class="content_input_label">描述</label>
      <div class="content_input_box">
        <textarea class="content_input_textarea" v-model="params.Describe" placeholder="请输入"></textarea>
        <span class="content_input_nums_count">{{params.Describe ? params.Describe.length : 0}}/100</span>
      </div>
    </div>
    <div>
      <div class="title_text_container">
        <label class="title_text_label">推送类型</label>
        <div class="title_text_box" @click="selectPushType = true">{{type[params.PushType] || '请选择'}}<i class="iconfont icon-jiantouyou"></i></div>
      </div>
      <div class="title_text_container">
        <label class="title_text_label">推送名称</label>
        <div class="title_text_box" @click="selectStuffDialog">{{params.selectStuff || '请选择'}}<i class="iconfont icon-jiantouyou"></i></div>
      </div>
      <div class="title_text_container">
        <label class="title_text_label">推送时间</label>
        <div class="title_text_box" @click="selectDateTime">{{params.PushTime || '请选择推送时间'}}<i class="iconfont icon-jiantouyou"></i></div>
      </div>
      <div class="title_text_container">
        <label class="title_text_label">推送人员</label>
        <div
          v-if="params.PushPeople.length > 0"
          @click="go('/app/push/userlist')"
          class="title_text_box"
          style="display: flex;flex-direction: row-reverse;align-items: center;">
          <i class="iconfont icon-jiantouyou"></i>
          <span style="margin-left:5px;">{{params.PushPeople.split(',').length}}人</span>
          <div class="push-list">
            <img v-if="index < 4" v-for="(item, index) in params.avatarList" :key="item" :src="item | transformImgUrl" alt="">
          </div>
        </div>
        <div class="title_text_box" v-else @click="go('/app/push/userlist')">请选择<i class="iconfont icon-jiantouyou"></i></div>
      </div>
    </div>
    <button type="button" class="weui-btn weui-btn_primary" @click="submit">提交</button>

    <!-- 选择推送类型 -->
    <div v-transfer-dom
      :should-rerender-on-show="true"
      max-height="50%">
      <popup v-model="selectPushType" class="type-popup">
        <div class="type-list">
          <div class="item" @click="selectPushTypeHandle(0)">文章</div>
          <div class="item" @click="selectPushTypeHandle(1)">服务</div>
        </div>
        <div class="cancel" @click="selectPushType = false">取消</div>
      </popup>
    </div>

    <!-- 选择服务 -->
    <x-dialog
      v-model="selectPackage"
      class="dialog_selectPackage dialog"
      :hide-on-blur="true">
      <div class="dialog-content">
        <div class="dialog-title">服务推荐</div>
        <div class="dialog-list">
          <checker
            v-model="selectPackageIndex"
            default-item-class="item"
            selected-item-class="item-selected"
            :radio-required="true"
            @on-change="selectPackageHandle">
            <checker-item :value="index" :key="index" v-for="(item, index) in packageList">
              <img class="icon" :src="item.PackageType | xxMissionTypeIconFilter" alt="">
              <span class="item-title">{{item.Name}}</span>
              <span class="xx-radio-item" :class="selectPackageIndex === index ? 'active' : ''"></span>
            </checker-item>
          </checker>
        </div>
        <div style="height:5px;background:#f1f1f1;"></div>
        <div class="dialog-button_bar">
          <button class="dialog-button dialog-confirm" @click="selectPackage = false">确认</button>
          <button class="dialog-button dialog-close" @click="selectPackage = false">取消</button>
        </div>
      </div>
    </x-dialog>

    <!-- 选择文章 -->
    <x-dialog
      v-model="selectArticle"
      class="dialog_Article dialog"
      :hide-on-blur="true">
      <div class="dialog-content">
        <div class="dialog-title">文章列表</div>
        <!-- <div class="tabbar">
          <span class="tabbar-item active">最新</span>
          <span class="tabbar-item">热点</span>
          <span class="tabbar-item">推荐</span>
        </div> -->
        <div class="dialog-list">
          <checker
            v-model="selectArticleIndex"
            default-item-class="item"
            selected-item-class="item-selected"
            :radio-required="true"
            @on-change="selectArticleHandle">
            <checker-item :value="index" :key="index" v-for="(item, index) in articleList">
              <span class="xx-radio-item" :class="selectArticleIndex === index ? 'active' : ''"></span>
              <img class="img" :src="item.Cover | transformImgUrl" alt="">
              <div class="content">
                <div class="title">{{item.Title}}</div>
                <div class="info">
                  <span class="tag">{{item.Attributes}}</span>
                  <span class="date">{{item.CreateTime | xxTimeFormatFilter('MM-DD HH:mm')}}</span>
                </div>
              </div>
            </checker-item>
          </checker>
        </div>
        <div style="height:5px;background:#f1f1f1;"></div>
        <div class="dialog-button_bar">
          <button class="dialog-button dialog-confirm" @click="selectArticle = false">确认</button>
          <button class="dialog-button dialog-close" @click="selectArticle = false">取消</button>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import util from '@/plugins/util'
import { TransferDom, Popup, Checker, CheckerItem, XDialog } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Checker,
    CheckerItem,
    XDialog
  },
  data () {
    return {
      selectPushType: false,
      selectPackage: false,
      selectArticle: false,
      type: ['文章', '服务'],
      articleList: null,
      packageList: null,
      selectArticleIndex: null,
      selectPackageIndex: null,
      params: {
        selectStuff: '',
        PushType: -1, // 0: 文章；1：服务包；-1：未选择
        Title: '',
        Describe: '',
        SourceID: '',
        PushTime: '',
        PushPeople: [],
        PushPeopleName: []
      },
      authText: {
        Title: {
          required: true,
          text: '推送标题'
        },
        Describe: {
          required: false,
          text: '推送描述'
        },
        PushType: {
          required: true,
          text: '推送类型'
        },
        selectStuff: {
          required: true,
          text: '推送名称'
        },
        PushTime: {
          required: true,
          text: '推送时间'
        },
        PushPeople: {
          required: true,
          text: '推送人员'
        }
      }
    }
  },
  computed: {
    id () {
      if (this.$route.params.id !== 'add') {
        return this.$route.params.id
      } else {
        return 'add'
      }
    }
  },
  watch: {
    selectArticleIndex () {
      console.log(this.selectArticleIndex)
      this.params.SourceID = this.articleList[this.selectArticleIndex].ArticleId
    },
    selectPackageIndex () {
      console.log(this.selectPackageIndex)
      this.params.SourceID = this.packageList[this.selectPackageIndex].ID
    }
  },
  mounted () {
    this.getPushDetail(this.id)
    if (sessionStorage.getItem('addPushParams')) {
      this.params = JSON.parse(sessionStorage.getItem('addPushParams'))
    }
  },
  methods: {
    async getPushDetail (id) {
      if (id === 'add') {
        return false
      }
      const res = await this.$http.get(`/Push/Detail?pushID=${id}`)
      if (res.data.Code === 100000) {
        const data = res.data.Data
        this.params = {
          selectStuff: data.PushType === 0 ? data.ArticleRes.ArticleTitle : data.PackageRes.Name,
          PushType: data.PushType, // 0: 文章；1：服务包；-1：未选择
          Title: data.Title,
          Describe: data.Describe,
          SourceID: data.SourceID,
          PushTime: util.timeFormatFilter(data.CreateTime, 'YYYY-MM-DD HH:mm'),
          PushPeople: data.PushPeople,
          PushPeopleName: data.PushPeopleName
        }
      }
    },
    // 获取文章列表
    async getArticleList () {
      const res = await this.$http.get(`/ArticleList?Index=1`)
      if (res.data.Code === 100000) {
        this.articleList = res.data.Data.ArticleResponses
      }
    },
    // 获取服务列表
    async getPackageList () {
      const res = await this.$http.get(`/Push/Package/List`)
      if (res.data.Code === 100000) {
        this.packageList = res.data.Data
      }
    },
    async submit () {
      const that = this
      const method = this.id === 'add' ? 'post' : 'put'
      const url = this.id === 'add' ? '/Push/Add' : '/Push/Modify'
      const validate = util.validateForm(this.params, this.authText)

      if (!validate) return false
      if (this.id) {
        this.params.ID = +this.id
      }

      this.$vux.loading.show({text: 'Loading'})
      const res = await this.$http.send(url, method, this.params)
      if (res.data.Code === 100000) {
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type: 'text',
          text: '提交成功',
          time: 1000,
          onHide () {
            sessionStorage.removeItem('addPushParams')
            that.$router.back()
          }
        })
      } else {
        this.$vux.loading.hide()
      }
    },
    // 选择推送类型
    selectPushTypeHandle (id) {
      this.params.PushType = id
      this.selectPushType = false
    },
    // 选择文章
    selectArticleHandle (index) {
      this.params.selectStuff = this.articleList[index].Title
    },
    // 选择服务
    selectPackageHandle (index) {
      this.params.selectStuff = this.packageList[index].Name
    },
    // 根据类型弹出服务或文章
    selectStuffDialog () {
      if (this.params.PushType === -1) {
        this.$vux.toast.text('请先选择推送的类型')
      }
      if (this.params.PushType === 0) {
        this.selectArticle = true
        this.getArticleList()
      }
      if (this.params.PushType === 1) {
        this.selectPackage = true
        this.getPackageList()
      }
    },
    // 寻找推送时间
    selectDateTime () {
      const that = this
      this.$vux.datetime.show({
        value: this.params.PushTime,
        format: 'YYYY-MM-DD HH:mm',
        startDate: util.timeFormatFilter(new Date(), 'YYYY-MM-DD'),
        onConfirm (value) {
          that.params.PushTime = value
        }
      })
    },
    go (url) {
      sessionStorage.setItem('addPushParams', JSON.stringify(this.params))
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.weui-btn {
  position: fixed;
  bottom: 0;
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
    flex: 0 0 55px;
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
    border-radius: 2px;
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
.push-list {
  display: flex;
  img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: -10px;
  }
}
.type-popup {
  color: #666;
  .type-list {
    .item {
      position: relative;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      text-align: center;
      background-color: #fff;
      &:active {
        background: #e8e8e8;
      }
      &::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        pointer-events: none;
        box-sizing: border-box;
        border: 1px solid #eee;
      }
    }
  }
  .cancel {
    margin-top: 10px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    background-color: #fff;
    &:active {
      background: #e8e8e8;
    }
  }
}
.dialog {
  .dialog-title {
    font-size: 15px;
    color: #666;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid RGBA(204, 240, 238, 1);
  }
  .dialog-list {
    max-height: 300px;
    overflow: scroll;
    .item {
      border-bottom: 1px solid RGBA(204, 240, 238, 1);
      &:last-child {
        border: 0;
      }
    }
  }
  .dialog-button_bar {
    display: flex;
  }
  .dialog-button {
    position: relative;
    flex: 1;
    background: transparent;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    color: #666;
    border: 0;
    &:nth-child(2) {
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 50px;
        width: 1px;
        background: #f1f1f1;
      }
    }
  }
  .dialog-confirm {
    color: #3AC7F5;
  }
}
.dialog_selectPackage {
  .dialog-list {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 54px;
      padding: 0 60px;
      .icon {
        margin-right: 18px;
        width: 24px;
        height: 24px;
      }
      .item-title {
        flex: 1;
        font-size: 14px;
        color: #A6A6A6;
        text-align: left;
      }
    }
  }
}
.dialog_Article {
  .tabbar {
    padding-top: 12px;
    display: flex;
    justify-content: center;
    .tabbar-item {
      margin: 0 20px;
      font-size: 12px;
      color: #999;
      &.active {
        color: #3AC7F5
      }
    } 
  }
  .dialog-list {
    .item {
      display: flex;
      align-items: center;
      padding: 25px 12px;
      &:first-child {
        padding: 20px 12px 25px;
      }
      .img {
        margin: 0 8px 0 17px;
        width: 80px;
        height: 60px;
        border-radius: 4px;
        overflow: hidden;
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        .title {
          font-size: 14px;
          color: #666;
          text-align: left;
        }
        .info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-size: 9px;
          color: RGBA(0, 0, 0, 0.5);
        }
      }
    }
  }
}
.dialog_Time {
  .item {
    display: flex;
    align-items: center;
    padding: 15px 35px;
    .datetime {
      flex: 1;
      text-align: left;
      color: #999;
    }
  }
}
</style>