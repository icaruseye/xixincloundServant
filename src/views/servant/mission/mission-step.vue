<template>
  <div>
    <div class="weui-cell">
      <div class="title">任务服务需完成标准动作</div>
    </div>
    <group>
      <x-switch v-for="item in actionList" :key="item.name" :title="item.title" v-model="item.value" disabled></x-switch>
    </group>
    <div class="weui-cell nobor">
      <div class="title">采集信息</div>
    </div>
    <template v-for="(item, index) in collectList">
      <div class="weui-cell" :key="index" :class="{ nobor: index === 0}">
        <p class="weui-cell-top">
            <label class="label" for="">{{item.title}}({{item.units }})</label>
            <input v-model="item.value" :class="{'input': true, 'is-danger': errors.has('idcard') }" name="idcard" type="text" :placeholder="'请输入' + item.title" disabled>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import { Group, XSwitch } from 'vux'
export default {
  components: {
    Group,
    XSwitch
  },
  data () {
    return {
      actionList: [{
        title: '步骤一',
        name: 'step1',
        value: false
      }, {
        title: '步骤二',
        name: 'step2',
        value: false
      }],
      collectList: [{
        title: '采集1',
        name: '111',
        units: 'kg',
        value: ''
      }, {
        title: '采集2',
        name: '222',
        units: 'cm',
        value: ''
      }]
    }
  }
}
</script>

<style lang="less" scoped>
.weui-form {
  .title {
    color: #3ecccc;
    font-size: 14px;
  }
  .weui-cells__title {
    padding: 0;
  }
  .vux-no-group-title {
    margin: 0;
  }
}
</style>
