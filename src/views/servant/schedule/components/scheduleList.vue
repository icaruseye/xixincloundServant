<template>
  <div class="list_container">
    <ul class="plans_list">
      <li class="plans_list_items" v-for="(plan, index) in plansList" :key="index">
        <div class="time_container">{{plan.startTime}} ~ {{plan.endTime}}</div>
        <div class="content_container">
          <span>
            可预约{{plan.total}}次，
          </span>
          <span>
            已预约{{plan.hasOrder}}次，
          </span>
          <span>
            剩余<b>{{plan.total - plan.hasOrder}}</b>次
          </span>
        </div>
        <i class="iconfont icon-trash plan_delete_icon"></i>
      </li>
    </ul>
    <div class="add_plan_btn" @click="addPlanDialogVisible = true">
      <i class="iconfont icon-hao"></i>
      添加排班计划
    </div>
    <x-dialog v-model="addPlanDialogVisible" :hide-on-blur="true">
      <div style="padding:15px;">
        添加排班计划
        <div>
          <div>
            <Datetime title="开始时间" format="HH:mm" hour-row="{value}点"></Datetime>
          </div>
        </div>
      </div>
      <div @click="addPlanDialogVisible=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { XDialog, Datetime } from 'vux'
export default {
  components: {
    XDialog,
    Datetime
  },
  data () {
    return {
      addPlanDialogVisible: false,
      plansList: [
        {
          startTime: '09:00',
          endTime: '10:00',
          total: 10,
          hasOrder: 5
        },
        {
          startTime: '13:00',
          endTime: '15:30',
          total: 10,
          hasOrder: 0
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.list_container
{
  margin-top: 10px;
  background-color: #fff;
  padding: 20px;
  .add_plan_btn
  {
    height: 40px;
    border: 1px solid #ddd;
    text-align: center;
    line-height: 40px;
    color: #999;
    font-size: 14px;
  }
  .plans_list_items
  {
    position: relative;
    margin-bottom: 20px;
    padding: 0px 10px;
    border-left: 1px solid #3AC7F5;
    .time_container
    {
      font-size: 14px;
      color: #666;
    }
    .content_container
    {
      span
      {
        display: inline-block;
        font-size: 12px;
        color: #999;
        b
        {
          font-weight: normal;
          color: #3AC7F5;
        }
      }
    }
    .plan_delete_icon
    {
      position: absolute;
      right: 0;
      top: 50%;
      display: block;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      transform: translateY(-50%);
      color: rgb(255, 95, 95);
    }
  }
}
</style>
