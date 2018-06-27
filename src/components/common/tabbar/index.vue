<template>
  <div class="weui-tabbar-wrap">
    <tabbar class="">
      <tabbar-item
        link="/message"
        :selected="'message' == this.$route.path.split('/')[1] || '' == this.$route.path.split('/')[1]"
        class="weui-tabbar__icon_1">
        <div slot="icon"></div>
        <span slot="label">消息</span>
      </tabbar-item>
      <tabbar-item
        link="/mission"
        :selected="'mission' == this.$route.path.split('/')[1]"
        class="weui-tabbar__icon_2">
        <div slot="icon"></div>
        <span slot="label">任务</span>
      </tabbar-item>
      <tabbar-item
        link="/app"
        :selected="'app' == this.$route.path.split('/')[1]"
        class="weui-tabbar__icon_3">
        <div slot="icon"></div>
        <span slot="label">应用</span>
      </tabbar-item>
      <tabbar-item
        link="/user"
        :selected="'user' == this.$route.path.split('/')[1]"
        class="weui-tabbar__icon_4">
        <div slot="icon"></div>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style lang="less">
.weui-tabbar-wrap {
  .weui-tabbar {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .weui-tabbar__label {
    font-size: 12px;
  }
  .weui-tabbar__item
  .weui-tabbar__icon {
    margin: 2px 0;
    width: 20px;
    height: 20px;
  }
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: #3ac7f5;
  }
  .weui-tabbar__icon_1 {
    .weui-tabbar__icon {
      background: url(../../../assets/images/icon-1.png) no-repeat center;
      background-size: contain;
    }
  }
  .weui-tabbar__icon_2 {
    .weui-tabbar__icon {
      background: url(../../../assets/images/icon-2.png) no-repeat center;
      background-size: contain;
    }
  }
  .weui-tabbar__icon_3 {
    .weui-tabbar__icon {
      background: url(../../../assets/images/icon-3.png) no-repeat center;
      background-size: contain;
    }
  }
  .weui-tabbar__icon_4 {
    .weui-tabbar__icon {
      background: url(../../../assets/images/icon-4.png) no-repeat center;
      background-size: contain;
    }
  }
  .weui-tabbar__icon_1.weui-bar__item_on {
    .weui-tabbar__icon {
      background: url(../../../assets/images/icon-1-on.png) no-repeat center;
      background-size: contain;
    }
  }
  .weui-tabbar__icon_2.weui-bar__item_on {
    .weui-tabbar__icon {
      background: url(../../../assets/images/icon-2-on.png) no-repeat center;
      background-size: contain;
    }
  }
  .weui-tabbar__icon_3.weui-bar__item_on {
    .weui-tabbar__icon {
      background: url(../../../assets/images/icon-3-on.png) no-repeat center;
      background-size: contain;
    }
  }
  .weui-tabbar__icon_4.weui-bar__item_on {
    .weui-tabbar__icon {
      background: url(../../../assets/images/icon-4-on.png) no-repeat center;
      background-size: contain;
    }
  }
}
</style>


