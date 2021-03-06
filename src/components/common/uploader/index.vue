<template>
  <div class="weui-form-cell">
    <div class="weui-cell_bd">
      <!-- 普通图片 -->
      <div v-if="!isAvatar" class="weui-uploader">
        <div v-if="title" class="weui-uploader__hd" :style="titleStyle">
          {{title}}
          <span class="iconfont icon-wenhao" @click="tipsIsShow = true"></span>
        </div>
        <div class="weui-uploader__bd clearfix">
            <ul class="weui-uploader__files uploaderFiles">
              <template v-for="(img, index) in list" >
                <li
                  :key="index"
                  :style="{ 'background-image': 'url(' + img.url + ')'}"
                  class="weui-uploader__file weui-uploader__file_status">
                  <div class="weui-uploader__file-content">
                    <div class="progress-bar">
                      <div class="progress-bar_text">
                        <template v-if="img.progress >= 100">
                          上传成功
                        </template>
                        <template v-else>
                          {{img.progress}}%
                        </template>
                      </div>
                      <div class="progress-bar_in" :style="{'width': img.progress + '%'}"></div>
                    </div>
                    <i v-if="img.status === 1" class="iconfont iconfont-remove icon-guanbi" v-on:click="removeImg(index)"></i>
                  </div>
                </li>
              </template>
              <div class="weui-uploader__input-box" v-show="list.length !== limit">
                  <input class="weui-uploader__input" type="file" accept="image/*" @change="change">
              </div>
            </ul>
        </div>
      </div>
      <!-- 头像 -->
      <div v-else class="weui-uploader">
        <div class="is-avatar" :style="{ 'background-image': 'url(' + list[0].url + ')'}">
            <input class="weui-uploader__input" type="file" @change="change">
        </div>
      </div>
      <!-- 填出框：提示文字 -->
      <x-dialog 
        v-model="tipsIsShow"
        class="dialog"
        :hide-on-blur="true">
        <div class="content">
          <div class="title">图片上传失败原因可能有：</div>
          <ul>
            <li>1.图片格式不对，目前支持格式为jpg、jpeg、png、bmp、gif的图片，若不知如何转换图片格式，可将图片通过微信发送，并保存发送后的图片即可</li>
            <li>2.图片太大，图片大小需小于2M</li>
            <li>3.网络太慢，请最好在wifi环境下上传</li>
            <li>如以上方法均失败，请联系机构管理员。</li>
          </ul>
          <button class="close" @click="tipsIsShow = false">关闭</button>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import util from '@/plugins/util'
import EXIF from 'exif-js'
import { AlertModule, XDialog, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog
  },
  props: {
    title: String,
    titleStyle: {
      type: Object,
      default: () => {}
    },
    limit: {
      type: Number,
      default: 1
    },
    url: String,
    maxSize: Number,
    maxWidth: {
      type: Number,
      default: 750
    },
    maxHeight: {
      type: Number,
      default: 750
    },
    imgList: {
      type: String,
      default: null
    },
    onSuccess: Function,
    onRemove: Function,
    isAvatar: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tipsIsShow: false,
      count: 0,
      list: [],
      guid: [],
      file: null,
      imgPackage: {},
      reader: new FileReader(),
      uploadImage: new Image(),
      orientation: null
    }
  },
  watch: {
    imgList () {
      this.initImgsList()
    }
  },
  created () {
    this.initImgsList()
  },
  mounted () {
    const that = this
    that.reader.onload = function (e) {
      that.imgPackage.progress = 15
      that.uploadImage.src = e.target.result
    }
    that.uploadImage.onload = function (e) {
      that.imgPackage.progress = 20
      util.compressImage({
        Img: this,
        maxWidth: that.maxWidth,
        maxHeight: that.maxHeight,
        file: that.file,
        fileType: that.file.type,
        orientation: that.orientation
      }, (blob, base64Url) => {
        that.imgPackage.name = that.file.name
        that.imgPackage.file = blob
        that.imgPackage.url = base64Url
        if (that.isAvatar) {
          that.list = [that.imgPackage]
        } else {
          that.list.push(that.imgPackage)
        }
        that.imgPackage.progress = 25
        that.$vux.loading.hide()
        that.upload(that.imgPackage)
      })
    }
  },
  methods: {
    initImgsList () {
      let imgs = []
      let imgsStrList = []
      if (this.imgList) {
        let list = this.imgList.split(',')
        list.map(item => {
          imgsStrList.push(item)
          imgs.push({
            url: util.transformImgUrl(item),
            progress: 100,
            status: 1
          })
        })
      }
      this.guid = imgsStrList
      this.list = imgs
    },
    change (e) {
      const that = this
      this.$vux.loading.show('图片压缩中')
      that.imgPackage = {
        url: '',
        status: 0,
        progress: 0,
        file: '',
        name: ''
      }
      that.file = e.target.files[0]
      if (!that.verifyFileType(that.file, e)) return false
      that.imgPackage.progress = 5
      if (!that.checkCount(e)) return false
      that.imgPackage.progress = 10
      EXIF.getData(that.file, function () {
        that.orientation = EXIF.getTag(this, 'Orientation')
      })
      that.reader.readAsDataURL(that.file)
      e.target.value = ''
    },
    async upload (_img) {
      const that = this
      let fd = new FormData()
      fd.append('fileUpload', _img.file)
      var options = {
        method: 'post',
        url: `${process.env.IMAGE_HOST}/File/Upload`,
        data: fd,
        timeout: 50000,
        onUploadProgress: function (progressEvent) {
          let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
          _img.progress = Math.floor((25 + complete * 0.75))
        }
      }
      try {
        this.count++
        let res = await axios(options)
        _img.status = 1
        if (this.isAvatar) {
          this.guid = [res.data.data.objectId]
        } else {
          this.guid.push(res.data.data.objectId)
        }
        this.$emit('onUpdate', this.guid)
      } catch (error) {
        this.count--
        AlertModule.show({
          title: '提示',
          content: '网络错误，上传失败'
        })
        that.list.pop()
        return false
      }
    },
    removeImg (index) {
      this.list.splice(index, 1)
      this.guid.splice(index, 1)
      this.count--
      this.$emit('onUpdate', this.guid)
    },
    checkCount (e) {
      if (this.isAvatar) {
        return true
      }
      if (this.list.length >= this.limit) {
        AlertModule.show({
          title: '提示',
          content: '上传图片张数已达上限'
        })
        e.target.value = ''
        return false
      }
      return true
    },
    verifyFileType (file, e) {
      if (file.type.indexOf('image') < 0) {
        AlertModule.show({
          title: '提示',
          content: '只能上传图片'
        })
        e.target.value = ''
        return false
      } else {
        return true
      }
    },
    checkSize (file, e) {
      if (file.size > this.maxSize) {
        AlertModule.show({
          title: '提示',
          content: '上传图片大小超出限制'
        })
        e.target.value = ''
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less">
.weui-cell_bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.weui-uploader__hd {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding-bottom: 10px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  font-size: 14px;
  color: #999;
  .iconfont {
    font-size: 15px;
    margin-left: 5px;
    color: #f8a519;
  }
}
.weui-uploader__title {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.weui-uploader__info {
  color: #b2b2b2;
}
.weui-uploader__bd {
  margin-bottom: -4px;
  margin-right: -9px;
}
.weui-uploader__files {
  list-style: none;
  display: flex;
  flex-flow: wrap;
}
.weui-uploader__file {
  width: 79px;
  height: 79px;
  overflow: hidden;
  margin: 0 10px 10px 0;
  border: 1px solid #eee;
  background: no-repeat center center;
  background-size: cover;
  border-radius: 0;
}
.weui-uploader__file_status {
  position: relative;
}
.weui-uploader__file_status:before {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 0;
}
.weui-uploader__file_status .weui-uploader__file-content {
  display: block;
}
.weui-uploader__file-content {
  display: none;
  color: #ffffff;
  width: 100%;
  height: 100%;
}

.weui-uploader__input-box {
  float: left;
  position: relative;
  margin-right: 9px;
  margin-bottom: 9px;
  border-radius: 0;
  width: 77px;
  height: 77px;
  border: 1px dashed #D0D0D0;
}
.weui-uploader__input-box:before,
.weui-uploader__input-box:after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #d9d9d9;
}
.weui-uploader__input-box:before {
  width: 2px;
  height: 24px;
}
.weui-uploader__input-box:after {
  width: 24px;
  height: 2px;
}
.weui-uploader__input-box:active {
  border-color: #999999;
}
.weui-uploader__input-box:active:before,
.weui-uploader__input-box:active:after {
  background-color: #999999;
}
.weui-uploader__input {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.weui-uploader__input-box {
    float: left;
    position: relative;
    margin-right: 9px;
    margin-bottom: 9px;
    width: 77px;
    height: 77px;
    border: 1px dashed #D9D9D9;
}
.progress-bar {
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 79px;
  height: 16px;
}
.progress-bar_text
{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 16px;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
  text-align: center;
}

.progress-bar_in {
  width: 0;
  height: 100%;
  text-align: center;
  background: rgba(65, 184,131,.2);
  transition: .3s;
}

.iconfont-remove {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  color: rgba(0,0,0,.5);
  line-height: 25px;
  font-size: 25px;
}

.is-avatar {
  float: right;
  width: 40px;
  height: 40px;
  background-size: cover;
}


.dialog {
  .content {
    padding: 15px;
    text-align: left;
    line-height: 2;
    color: #666;
    .title {
      font-size: 15px;
      color: #333;
      text-align: left;
    }
    li {
      margin-bottom: 10px;
      font-size: 14px;
    }
    .close {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: 30px;
      line-height: 30px;
      border: 0;
      border-radius: 2px;
      background: #f1f1f1;
      color: #999;
    }
  }
}
</style>
