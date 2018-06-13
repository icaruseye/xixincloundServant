<template>
  <div class="weui-form-cell">
    <div class="weui-cell_bd">
      <!-- 普通图片 -->
      <div v-if="!isAvatar" class="weui-uploader">
        <div class="weui-uploader__hd">
          {{title}}
        </div>
        <div class="weui-uploader__bd">
            <ul class="weui-uploader__files uploaderFiles">
              <template v-for="(img, index) in list" >
                <li
                  :key="index"
                  :style="{ 'background-image': 'url(' + img.url + ')'}"
                  class="weui-uploader__file weui-uploader__file_status">
                  <div class="weui-uploader__file-content">
                    <div class="progress-bar">
                      <div class="progress-bar_in" :style="{'width': img.progress + '%'}"></div>
                    </div>
                    <i v-if="img.status === 1" class="iconfont iconfont-remove icon-shanchuguanbicha2" v-on:click="removeImg(index)"></i>
                  </div>
                </li>
              </template>
            </ul>
            <div class="weui-uploader__input-box" v-show="count !== limit">
                <input class="weui-uploader__input" type="file" @change="change">
            </div>
        </div>
      </div>
      <!-- 头像 -->
      <div v-else class="weui-uploader">
        <div class="is-avatar" :style="{ 'background-image': 'url(' + list[0].url + ')'}">
            <input class="weui-uploader__input" type="file" @change="change">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { AlertModule } from 'vux'
export default {
  props: {
    title: String,
    limit: {
      type: Number,
      default: 1
    },
    url: String,
    maxSize: Number,
    imgList: Array,
    onSuccess: Function,
    onRemove: Function,
    isAvatar: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      count: 0,
      list: [],
      guid: []
    }
  },
  created () {
    if (this.imgList) {
      this.list = this.imgList
    }
  },
  methods: {
    change (e) {
      const that = this
      let file = e.target.files[0]
      let reader = new FileReader()
      if (!this.checkSize(file, e)) return false
      if (!this.checkCount(e)) return false
      if (!this.checkName(file.name, e)) return false

      let img = {
        url: '',
        status: 0,
        progress: 0,
        file: '',
        name: ''
      }

      let _img = Object.assign({}, img)
      _img.file = file
      _img.name = file.name

      reader.readAsDataURL(file)
      reader.onload = function (e) {
        _img.url = this.result
        if (that.isAvatar) {
          that.list = [_img]
        } else {
          that.list.push(_img)
        }
      }
      this.upload(_img)

      e.target.value = ''
    },
    async upload (_img) {
      const that = this
      let fd = new FormData()
      fd.append('fileUpload', _img.file)
      var options = {
        method: 'post',
        url: 'http://xixincloud.com:6883/File/Upload',
        data: fd,
        timeout: 15000,
        onUploadProgress: function (progressEvent) {
          var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
          _img.progress = complete
        }
      }
      try {
        let res = await axios(options)
        _img.status = 1
        this.count++
        if (this.isAvatar) {
          this.guid = [res.data.data.objectId]
        } else {
          this.guid.push(res.data.data.objectId)
        }
        this.$emit('onUpdate', this.guid)
      } catch (error) {
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
      if (this.count === this.limit) {
        AlertModule.show({
          title: '提示',
          content: '上传图片张数已达上限'
        })
        e.target.value = ''
        return false
      }
      return true
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
    },
    checkName (name, e) {
      let flag = true
      this.list.map((i) => {
        if (name === i.name) {
          flag = false
          e.target.value = ''
          AlertModule.show({
            title: '提示',
            content: '请勿重复选取图片'
          })
        }
      })
      return flag
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
  overflow: hidden;
}
.weui-uploader__files {
  list-style: none;
}
.weui-uploader__file {
  float: left;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 79px;
  height: 79px;
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
  background-color: rgba(0, 0, 0, .6);
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
  height: 8px;
}

.progress-bar_in {
  width: 0;
  height: 100%;
  background: #41b883;
  transition: .3s;
}

.iconfont-remove {
  position: absolute;
  top: 45%;
  left: 50%;
  color: #d34330;
  font-size: 20px;
  transform: translate(-50%,-50%)
}

.is-avatar {
  float: right;
  width: 40px;
  height: 40px;
  background-size: cover;
}
</style>