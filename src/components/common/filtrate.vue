<template>
  <div class="xixin-filtrate">
    <div class="xixin-filtrate-active" @click="showList">{{currentText}}<i class="iconfont icon-sanjiao"></i></div>
    <div class="xixin-filtrate-list" :class="active ? 'fadein' : ''" v-show="isShowList">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          :class="currentIndex === index ? 'active' : ''"
          @click="changeItem(item, index)">{{item}}</li>
      </ul>
    </div>
    <div class="mask" v-show="isShowList" :class="active ? 'active' : ''" @click="close"></div>
  </div>
</template>

<script>
export default {
  name: 'filtrate',
  props: {
    list: Array
  },
  data () {
    return {
      isShowList: false,
      active: false,
      currentIndex: 0,
      currentText: '全部'
    }
  },
  methods: {
    showList () {
      if (this.isShowList) {
        this.close()
        return false
      }
      this.isShowList = !this.isShowList
      setTimeout(() => {
        this.active = !this.active
      }, 50)
    },
    close () {
      this.active = false
      setTimeout(() => {
        this.isShowList = false
      }, 300)
    },
    changeItem (item, index) {
      this.currentIndex = index
      this.currentText = item
      this.close()
    }
  }
}
</script>

<style lang="less" scoped>
.xixin-filtrate-active {
  z-index: 12;
  position: absolute;
  width: 100%;
  background: #fff;
  top: 0;
  height: 49px;
  margin-bottom: 5px;
  box-shadow: 0 1px 6px RGBA(153, 153, 153, 0.5);
  display: flex;
  align-items: center;
  padding-left: 17px;
  color: #666;
  .iconfont {
    font-size: 24px;
    color: #D8D8D8;
    position: relative;
    top: -1px;
  }
}

.xixin-filtrate-list {
  z-index: 10;
  position: absolute;
  top: 49px;
  background: #fff;
  width: 100%;
  transform: translateY(-100%);
  opacity: 0;
  transition: 300ms;
  li {
    position: relative;
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    color: #666;
    padding-left: 17px;
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid RGBA(187, 187, 187, .3);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    &:last-child::after {
      border: 0;
    }
  }
  li.active {
    color: #3AC7F5;
  }
}

.fadein {
  opacity: 1;
  transform: translateY(0%);
}

.mask {
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .4);
  opacity: 0;
  transition: 300ms;
}

.mask.active {
  opacity: 1;
}

</style>
